const mongoose = require("mongoose")
const Stripe = require('stripe');
const Order = require("../../models/Orders")
const Cart = require("../../models/Carts")
const Product = require("../../models/Products")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createOrder = async (req,res) => {
    try
    {
        const {
            userId,
            cartId,
            cartProducts,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderCreationDate,
            orderUpdationDate
        } = req.body;

        const { origin } = req.headers;

        const newOrder = await Order({
            UserId : userId,
            CartId : cartId,
            OrderItems : cartProducts,
            OrderAddress : addressInfo,
            OrderStatus : orderStatus,
            PaymentMethod : paymentMethod,
            PaymentStatus : paymentStatus,
            OrderTotal : totalAmount,
            OrderCreationDate : orderCreationDate,
            OrderUpdationDate : orderUpdationDate
        });

        await newOrder.save();

        const line_items = cartProducts.map((item) => ({
            price_data : {
                currency : "inr",
                product_data : {
                    name : item.Title,
                    description : `Size • ${item.Size}`,
                    images : item.Image
                },
                unit_amount : item.SalePrice > 0 ? item.SalePrice * 100 : item.Price * 100
            },
            quantity : item.Quantity
        }))

        line_items.push({
            price_data : {
                currency : "inr",
                product_data : {
                    name : "Shipping Fee"
                },
                unit_amount : 10 * 100
            },
            quantity : 1
        })

        const checkoutSession = await stripe.checkout.sessions.create({
            line_items,
            mode : 'payment',
            success_url : `${origin}/shop/payment?status=success&order_Id=${newOrder._id}&session_Id={CHECKOUT_SESSION_ID}`, 
            cancel_url : `${origin}/shop/payment?status=rejected&order_Id=${newOrder._id}&session_Id={CHECKOUT_SESSION_ID}`
        });

        if(!checkoutSession)
        {
            return res.status(400).json({
                success : false,
                message : "Unable to process checkout"
            })
        }

        res.status(200).json({
            success : true,
            session_url : checkoutSession.url,
            orderId : newOrder._id
        })
        
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Create Order | Internal Server Error"
        })
    }
}

const paymentValidator = async(req,res) => {

    const transactionSession = await mongoose.startSession();
    transactionSession.startTransaction();

    try
    {
        const { status , order_Id , session_Id } = req.body;

        const session = await stripe.checkout.sessions.retrieve(session_Id);

        if(session.payment_status === "paid" && status === "success")
        {
            const order = await Order.findByIdAndUpdate(order_Id, {
                OrderStatus : "Confirmed",
                PaymentStatus : "Paid"
            },{session : transactionSession});

            if(!order)
            {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                  });
            }

            for(let item of order.OrderItems)
            {
                const {ProductId , Size , Quantity} = item;

                const updatedProduct = await Product.findOneAndUpdate(
                    {
                        _id : ProductId,
                        "Size.size" : Size
                    },
                    {
                        $inc : {"Size.$.quantity" : -Quantity}
                    },
                    {new : true , session : transactionSession}
                );

                if(!updatedProduct)
                {
                    throw new Error("Product with the requested size not available");
                }
            }

            await Cart.findByIdAndDelete(order.CartId,{session : transactionSession});

            await transactionSession.commitTransaction();
            transactionSession.endSession();

            res.status(200).json({
                success : true,
                message : "Order created and Cart emptied"
            })
        }
        else
        {
            await Order.findByIdAndDelete(order_Id,{session : transactionSession});

            await transactionSession.commitTransaction();
            transactionSession.endSession();

            res.status(200).json({
                success : false,
                message : "Order not created"
            });
        }

    }
    catch(e)
    {
        await transactionSession.abortTransaction();
        transactionSession.endSession();
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Payment Validation | Internal Server Error"
        })
    }
}

const fetchAllOrders = async (req,res) => {
    try
    {
        const {userId} = req.params;

        const orders = await Order.find({UserId : userId}).sort({createdAt : -1});

        if(orders.length === 0)
        {
            return res.status(400).json({
                success : false,
                message : "No orders for this user yet"
            })
        }

        res.status(200).json({
            success : true,
            orders
        })
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Fetch Orders | Internal Server Error"
        })
    }
}

const fetchOrderDetail = async (req,res) => {
    try
    {
        const {orderId} = req.params;

        const order = await Order.findById(orderId)

        if(!order)
        {
            return res.status(404).json({
                success : false,
                message : "Order not found"
            })
        }

        res.status(200).json({
            success : true,
            order
        })
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Fetch Order Details | Internal Server Error"
        })
    }
}

module.exports = {
    createOrder,
    paymentValidator,
    fetchAllOrders,
    fetchOrderDetail
}