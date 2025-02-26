import {
    DialogContent , DialogTitle
} from "../../components/ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function Customer_Order_Details({order}) {

  return (
    <DialogContent className="max-h-[80%] sm:max-w-[500px] sm:max-h-[90%] overflow-auto">
    <DialogTitle>Order Summary</DialogTitle>
    <Separator />
    <div className="grid gap-2">
        <div className="grid gap-1">
            <div className="flex justify-between items-center">
                <p className="font-medium">Order ID</p>
                <Label>{order._id}</Label>
            </div>
            <div className="flex justify-between items-center mt-1">
                <p className="font-medium">Date</p>
                <Label>{order?.OrderCreationDate.split('T')[0]}</Label>
            </div>
            <div className="flex justify-between items-center mt-1">
                <p className="font-medium">Order Status</p>
                <Label>{order.OrderStatus}</Label>
            </div>
            <div className="flex justify-between items-center mt-1">
                <p className="font-medium">Payment Method</p>
                <Label>{order.PaymentMethod}</Label>
            </div>
            <div className="flex justify-between items-center mt-1">
                <p className="font-medium">Payment Status</p>
                <Label>{order.PaymentStatus}</Label>
            </div>
        </div>
        <Separator />
        <div className="grid gap-1">
            <div className="grid gap-2">
                <div className="font-medium">Order Details</div>
                <ul className="grid gap-3">
                {
                    order.OrderItems && order.OrderItems.length > 0 &&
                    order.OrderItems.map((item,index) => 
                            <li key={index} className="flex justify-between">
                                <div className='flex items-start gap-2'>
                                    <img width="40px" className=" rounded-sm" src={item.Image[0]} />
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-semibold'>{item.Title}</span>
                                        <span className='text-sm text-gray-600'>Size • {item.Size}</span>
                                    </div>
                                </div>
                                <span>{`${item.Quantity} x ${item.SalePrice > 0 ? item.SalePrice.toFixed(2) :  item.Price.toFixed(2)} MAD`}</span>
                            </li>
                    )
                }
                    <li className="flex justify-between items-center">
                        <span className='text-gray-600 font-semibold text-sm'>Shipping Fee</span>
                        <span>10.00 MAD</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className='font-bold'>Total</span>
                        <span className='font-bold'>{order?.OrderTotal.toFixed(2)} MAD</span>
                    </li>
                </ul>
            </div>
        </div>
        <Separator />
        <div className="grid gap-1">
            <div className="grid gap-2">
                <div className="font-medium">Shipping Details</div>
                <div className="grid gap-1">
                    <span>{order?.OrderAddress.Address}</span>
                    <span>{order?.OrderAddress.City} - {order?.OrderAddress.Pincode}</span>
                    <span>{order?.OrderAddress.Contact}</span>
                </div>
            </div>
        </div>
    </div>
</DialogContent>
  )
}

export default Customer_Order_Details