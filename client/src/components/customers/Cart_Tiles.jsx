import { MinusCircleIcon, PlusCircleIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteCartItems, handleUpdateCartItems } from "@/store/customer-slice/cart";
import { useToast } from "@/hooks/use-toast";

function Cart_Tiles({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.customerProduct);
  const { toast } = useToast();
  const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";

  // Ensure cartItem and cartItem.Image are defined
  if (!cartItem || !cartItem.Image || cartItem.Image.length === 0) {
    return null; // or return a placeholder/fallback UI
  }

  function updateCartItem(actionType) {
    const updatedQuantity = actionType === "Increase" ? cartItem.Quantity + 1 : cartItem.Quantity - 1;

    const productToBeUpdated = products.find((item) => item._id === cartItem.ProductId);
    if (productToBeUpdated) {
      const qty = productToBeUpdated.Size.find((item) => item.size === cartItem.Size).quantity;

      if (updatedQuantity > qty) {
        toast({
          title: `Only ${cartItem.Quantity} items are currently available in stock.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!user) {
      // Handle unauthenticated users: Update cart items in local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = cartItems.map((item) =>
        item.productId === cartItem.ProductId && item.size === cartItem.Size
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return;
    }

    // Handle authenticated users: Update cart items in the backend
    dispatch(
      handleUpdateCartItems({
        token: token,
        userId: user?.id,
        productId: cartItem.ProductId,
        size: cartItem.Size,
        quantity: updatedQuantity,
      })
    ).then((data) => {
      if (!data.payload.success) {
        toast({
          title: data.payload.message,
          variant: "destructive",
        });
      }
    });
  }

  function deleteCartItem() {
    if (!user) {
      // Handle unauthenticated users: Remove cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== cartItem.ProductId || item.size !== cartItem.Size
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast({
        title: "Product removed from cart successfully",
      });
      return;
    }

    // Handle authenticated users: Remove cart items from the backend
    dispatch(
      handleDeleteCartItems({
        token: token,
        userId: user?.id,
        productId: cartItem.ProductId,
        size: cartItem.Size,
      })
    ).then((data) => {
      if (data.payload?.success) {
        toast({
          title: "Product removed from cart successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 h-auto">
      <img
        className="w-20 h-full rounded object-cover"
        src={cartItem.Image[0]} // Ensure cartItem.Image[0] is defined
        alt={cartItem.Title || "Product Image"} // Fallback alt text
      />
      <div className="flex-1">
        <h3 className="ml-2 tracking-tighter text-sm font-semibold">{cartItem.Title}</h3>
        <span className="ml-2 text-sm text-gray-600">Size : {cartItem.Size}</span>
        <div className="flex items-center mt-1 gap-2">
          <Button
            disabled={cartItem.Quantity <= 1}
            onClick={() => updateCartItem("Decrease")}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-none"
          >
            <MinusCircleIcon className="w-4 h-4" />
          </Button>
          <span className="font-semibold">{cartItem.Quantity}</span>
          <Button
            onClick={() => updateCartItem("Increase")}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-none"
          >
            <PlusCircleIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-8">
        <p className="font-semibold text-sm">
          {cartItem.SalePrice > 0
            ? `${(cartItem.SalePrice * cartItem.Quantity).toFixed(2)}`
            : `${(cartItem.Price * cartItem.Quantity).toFixed(2)}`}{" "}
          MAD
        </p>
        <Button
          onClick={() => deleteCartItem()}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-none"
        >
          <Trash2 className="w-4 h-4 text-red-400 cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}

export default Cart_Tiles;