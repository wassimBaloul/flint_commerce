import Address from '@/components/customers/Address';
import Cart_Tiles from '../../components/customers/Cart_Tiles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { handleCreateOrder } from '@/store/customer-slice/orders';
import { useToast } from '@/hooks/use-toast';

function Payment() {
  const { cartProducts, cartId } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const token = localStorage.getItem('flint_token') ? localStorage.getItem('flint_token') : 'Invalid';

  const totalCartAmount =
    cartProducts && cartProducts.length > 0
      ? cartProducts
          .reduce((sum, item) => sum + (item?.SalePrice > 0 ? item.SalePrice : item.Price) * item.Quantity, 0)
          .toFixed(2)
      : 0;

  const FinalCheckoutTotal = (parseInt(totalCartAmount) + 10).toFixed(2);

  async function paymentRedirector() {
    if (selectedAddress === null) {
      toast({
        title: 'Select an address before proceeding to checkout',
        variant: 'destructive',
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId,
      cartProducts,
      addressInfo: {
        AddressId: selectedAddress?._id,
        Address: selectedAddress?.Address,
        City: selectedAddress?.City,
        Pincode: selectedAddress?.Pincode,
        Contact: selectedAddress?.Contact,
        Landmark: selectedAddress?.Landmark !== null ? selectedAddress.Landmark : '',
      },
      orderStatus: 'Pending',
      paymentMethod: 'Cash on Delivery', // Updated payment method
      paymentStatus: 'Pending',
      totalAmount: FinalCheckoutTotal,
      orderCreationDate: new Date(),
      orderUpdationDate: new Date(),
    };

    dispatch(handleCreateOrder({ token, orderData })).then((data) => {
      if (data.payload?.success) {
        toast({
          title: 'Order placed successfully!',
          variant: 'default',
        });
        // Optionally, you can redirect the user to an order confirmation page
        // window.location.href = `/order-confirmation/${data.payload.orderId}`;
      } else {
        toast({
          title: 'Failed to place order. Please try again.',
          variant: 'destructive',
        });
      }
    });
  }

  if (cartProducts.length === 0) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col justify-center items-center text-center">
        <img src="/empty-cart.png" width="280px" />
        <span className="text-gray-600 text-lg font-bold">Your cart is currently empty</span>
        <span className="text-gray-600 italic">Browse our products and add items to your cart to see them here</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 p-5">
      <div className="flex flex-col gap-3">
        <h3 className="text-center text-xl font-semibold">DELIVERY INFORMATION ——</h3>
        <Address selectedId={selectedAddress?._id} setSelectedAddress={setSelectedAddress} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-center text-xl font-semibold">CART ITEMS ——</h3>
        <div className="flex flex-col gap-4">
          {cartProducts &&
            cartProducts.length > 0 &&
            cartProducts.map((item, index) => <Cart_Tiles key={index} cartItem={item} />)}
        </div>
        <div className="mt-2 space-y-4">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between mt-2">
              <span className="text-gray-600 italic">Subtotal</span>
              <span className="text-gray-600 mb-1">₹ {totalCartAmount}</span>
            </div>
            <Separator />
            <div className="flex justify-between mt-2">
              <span className="text-gray-600 italic">Delivery Fee</span>
              <span className="text-gray-600 mb-1">₹ 10.00</span>
            </div>
            <Separator />
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹ {FinalCheckoutTotal}</span>
            </div>
          </div>
          <div className="w-full">
            <Button onClick={paymentRedirector} className="w-full">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;