import { Button } from "../ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import Cart_Tiles from "./Cart_Tiles";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";

function Cart_Wrapper({ cartProducts, setOpenCartSheet }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Calculate the total cart amount
  const totalCartAmount =
    cartProducts && cartProducts.length > 0
      ? cartProducts
          .reduce((sum, item) => {
            const price = item.SalePrice > 0 ? item.SalePrice : item.Price;
            return sum + (isNaN(price) ? 0 : price * item.Quantity);
          }, 0)
          .toFixed(2)
      : 0;

  // Calculate the final checkout total (including delivery fee)
  const deliveryFee = 10.0; // Fixed delivery fee
  const FinalCheckoutTotal = (parseFloat(totalCartAmount) + deliveryFee).toFixed(2);

  // Handle unauthenticated users
  if (!user) {
    return (
      <SheetContent className="min-w-full sm:min-w-28 md:min-w-28 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Please log in to view your cart.</SheetDescription>
        </SheetHeader>
        <div className="mt-8 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-600">You need to log in to view your cart.</p>
          <Button
            onClick={() => {
              navigate("/auth/login");
              setOpenCartSheet(false);
            }}
            className="mt-4"
          >
            Log In
          </Button>
        </div>
      </SheetContent>
    );
  }

  return (
    <SheetContent className="min-w-full sm:min-w-28 md:min-w-28 overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>Review your items and proceed to checkout</SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartProducts && cartProducts.length > 0 ? (
          cartProducts.map((item, index) => <Cart_Tiles key={index} cartItem={item} />)
        ) : (
          <div className="mt-4">
            <img src="/empty-cart.png" alt="Empty Cart" />
          </div>
        )}
      </div>
      {cartProducts && cartProducts.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between mt-2">
              <span className="text-gray-600 italic">Subtotal</span>
              <span className="text-gray-600 mb-1">{totalCartAmount} MAD</span>
            </div>
            <Separator />
            <div className="flex justify-between mt-2">
              <span className="text-gray-600 italic">Delivery Fee</span>
              <span className="text-gray-600 mb-1">{deliveryFee.toFixed(2)} MAD</span>
            </div>
            <Separator />
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{FinalCheckoutTotal} MAD</span>
            </div>
          </div>
        </div>
      )}
      <Button
        disabled={cartProducts.length <= 0}
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="mt-6 w-full"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default Cart_Wrapper;