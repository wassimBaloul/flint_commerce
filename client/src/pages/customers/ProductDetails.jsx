import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sizeOptions } from "../../config/config";
import { BadgeCheck, IndianRupeeIcon, Plus, RefreshCcw, SendHorizonal } from "lucide-react";
import { handleAddtoCart } from "@/store/customer-slice/cart";
import { useToast } from "@/hooks/use-toast";
import { fetchProductDetails, fetchSimilarProducts } from "@/store/customer-slice/products";
import StarRating from "../../components/utility/StarRating";
import { Input } from "@/components/ui/input";
import { addReview, fetchProductReviews } from "@/store/customer-slice/review";
import Review_Tile from "@/components/customers/Review_Tile";
import Customer_ProductCard from "@/components/customers/Customer_ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

function sortedTiles(data) {
  return [...data].sort((a, b) => {
    return sizeOptions.indexOf(a.size) - sizeOptions.indexOf(b.size);
  });
}

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, productDetail, similarProducts } = useSelector((state) => state.customerProduct);
  const { cartProducts } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { reviewList } = useSelector((state) => state.review);
  const [displayImage, setDisplayImage] = useState(null);
  const [displaySizes, setDisplaySizes] = useState([]);
  const [size, setSize] = useState("");
  const { toast } = useToast();
  const [displayProduct, setDisplayProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";

  function generateSizeTiles(data) {
    const sizes = sortedTiles(data);
    const filteredSizes = sizes.filter((item) => item.quantity !== 0);

    setDisplaySizes(filteredSizes);
  }

  function AddToCart() {
    if (!user) {
      // Handle unauthenticated users: Store cart items in local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const newItem = { productId: displayProduct._id, size, quantity: 1 };
      cartItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast({
        title: "Item added to local cart. Please log in to sync with your account.",
      });
      return;
    }

    if (user.role === "ADMIN") {
      toast({
        title: "Admins can only view the product",
        variant: "destructive",
      });
      return;
    }

    if (size !== "") {
      const productToBeAdded = cartProducts.find((item) => item.ProductId === displayProduct._id);
      if (productToBeAdded) {
        const qty = displayProduct.Size.find((item) => item.size === size).quantity;
        if (productToBeAdded.Quantity + 1 > qty) {
          toast({
            title: `Only ${qty} items are currently available in stock. You've reached your limit with this product.`,
            variant: "destructive",
          });
          setSize("");
          return;
        }
      }

      dispatch(
        handleAddtoCart({
          token: token,
          userId: user.id,
          productId: displayProduct?._id,
          size,
          quantity: 1,
        })
      ).then((data) => {
        if (data.payload.success) {
          setSize("");
          toast({
            title: "Product added to cart successfully",
          });
        }
      });
    } else {
      toast({
        title: "Select a size of your choice",
        variant: "destructive",
      });
    }
  }

  function handleSetRating(data) {
    setRating(data);
  }

  function handleCreateReview() {
    if (!user) {
      toast({
        title: "Please log in to leave a review.",
        variant: "destructive",
      });
      return;
    }

    if (user.role === "ADMIN") {
      setComment("");
      setRating(0);
      toast({
        title: "Admins cannot publish a review",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addReview({
        token: token,
        reviewData: {
          userId: user?.id,
          productId: id,
          username: user?.username,
          rating,
          comment,
        },
      })
    ).then((data) => {
      if (data.payload.success) {
        setComment("");
        setRating(0);
        toast({
          title: "Review added successfully",
        });
      } else {
        setComment("");
        setRating(0);
        toast({
          title: data.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  const selectedProduct = products.find((item) => item._id === id);

  useEffect(() => {
    if (!selectedProduct) {
      dispatch(fetchProductDetails({ token, id }));
    } else {
      window.scroll(0, 0);
      dispatch(fetchProductReviews({ token, productId: selectedProduct?._id }));
      dispatch(fetchSimilarProducts({ token, id: selectedProduct?._id }));
      setDisplayProduct(selectedProduct);
      setDisplayImage(selectedProduct?.Image?.[0]);
      generateSizeTiles(selectedProduct?.Size || []);
      setComment("");
      setRating(0);
      setSize("");
    }
  }, [id, dispatch]);

  useEffect(() => {
    const loadedProduct = productDetail[0] && productDetail[0]._id === id && productDetail[0];
    if (loadedProduct) {
      window.scroll(0, 0);
      dispatch(fetchProductReviews({ token, productId: loadedProduct?._id }));
      dispatch(fetchSimilarProducts({ token, id: loadedProduct?._id }));
      setDisplayProduct(loadedProduct);
      setDisplayImage(loadedProduct?.Image?.[0]);
      generateSizeTiles(loadedProduct?.Size || []);
    }
  }, [productDetail]);

  const productRating =
    reviewList && reviewList.length > 0 && reviewList.reduce((sum, item) => sum + item.Rating, 0) / reviewList.length;

  if (!displayProduct) {
    return (
      <div className="pt-5 flex justify-center">
        <div className="w-[80%] flex justify-center gap-5 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto justify-evenly sm:justify-normal sm:w-[18.7%] w-full">
              <Skeleton className="w-[24%] h-[100px] sm:w-full sm:mb-3 flex-shrink-0" />
            </div>
            <div className="w-full sm:w-[80%]">
              <Skeleton className="w-full h-[calc(100vh-100px)]" />
            </div>
          </div>
          <div className="flex-1">
            <Skeleton className="h-5 w-[80%]" />
            <div className="flex my-3 gap-2">
              <Skeleton className="h-6 w-[70px]" />
              <Skeleton className="h-6 w-[70px]" />
            </div>
            <Skeleton className="h-28 w-[80%]" />
            <Skeleton className="mt-3 h-4 w-[250px]" />
            <Skeleton className="mt-3 h-4 w-[250px]" />
            <Skeleton className="mt-3 h-4 w-[250px]" />
            <Skeleton className="mt-3 h-10 w-[100px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="pt-5 flex justify-center">
        <div className="w-[80%] flex justify-center gap-5 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto justify-evenly sm:justify-normal sm:w-[18.7%] w-full">
              {displayProduct?.Image.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  onClick={() => setDisplayImage(item)}
                  className={`${item === displayImage ? "border border-gray-300" : ""} w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer`}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={displayImage} />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-3xl mt-2">{displayProduct.Title}</h1>
            <div className="flex my-3 gap-2">
              <span className="bg-blue-100 border border-blue-700 px-3 rounded-full">{displayProduct?.Category}</span>
              <span className="bg-green-100 border border-green-700 px-3 rounded-full">{displayProduct?.Brand}</span>
            </div>
            {productRating && (
              <div className="mt-2 flex items-center gap-1">
                <div className="flex items-center">
                  <StarRating rating={productRating} isEditable={false} />
                </div>
                <span className="text-gray-500">{`(${productRating.toFixed(2)})`}</span>
              </div>
            )}
            <div className="mt-2 text-2xl font-medium">
              {displayProduct.SalePrice ? (
                <div className="flex items-end gap-1">
                  <span>{displayProduct.SalePrice} MAD</span>
                  <span className="text-base line-through">{displayProduct.Price} MAD</span>
                </div>
              ) : (
                <span>{displayProduct.Price} MAD</span>
              )}
            </div>
            <p className="mt-3 text-gray-500 md:w-4/5">{displayProduct.Description}</p>
            {displaySizes.length > 0 ? (
              <div className="flex flex-col gap-2 my-6">
                <p className="font-medium">Select Size</p>
                <div className="flex gap-3">
                  {displaySizes.map((item, index) => (
                    <button
                      onClick={() => setSize(item.size)}
                      key={index}
                      className={`${size === item.size ? "border-black " : ""} border px-3 py-2 bg-gray-200 rounded-sm`}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-3 text-red-600">Product currently out of stock</p>
            )}
            <Button onClick={() => AddToCart()} disabled={displaySizes.length <= 0} className="my-3">
              ADD TO CART
            </Button>
            <Separator />
            <div className="flex flex-col gap-2 mt-5 text-sm text-gray-500">
              <p className="flex justify-start gap-1 items-center">
                <span>
                  <BadgeCheck size={21} />
                </span>
                100% Authentic product
              </p>
              <p className="flex justify-start gap-2 items-center">
                <span>
                  <RefreshCcw size={19} />
                </span>
                Fast and Secure Shipping
              </p>
              <p className="flex justify-start gap-2 items-center">
                <span>
                  <IndianRupeeIcon size={17} />
                </span>
                No Hidden Charges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      {similarProducts.length > 0 && (
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h2 className="text-2xl font-medium tracking-wide text-gray-800 text-center">
            SIMILAR <span className="text-red-500 font-normal">PRODUCTS</span>
          </h2>
          <div className="w-[80%] grid justify-center gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {similarProducts.map((item, index) => (
              <Customer_ProductCard key={index} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* Review */}
      <div className="w-full flex flex-col items-center gap-2">
        <h2 className="text-2xl font-medium tracking-wide text-gray-800 text-center">
          PRODUCT <span className="text-red-500 font-normal">REVIEW</span>
        </h2>
        {/* Send review */}
        <div className="w-[80%] flex flex-col gap-2">
          <h3 className="font-semibold text-gray-700">Write your Review</h3>
          <div className="flex">
            <StarRating rating={rating} handleSetRating={handleSetRating} isEditable={true} />
          </div>
          <div className="flex gap-2">
            <Input
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="px-3 w-[95%] border border-gray-500"
              placeholder="Leave your comment ..."
            />
            <Button
              disabled={rating === 0 || comment.trim() === ""}
              className="rounded-full p-2"
              onClick={() => handleCreateReview()}
            >
              <SendHorizonal />
            </Button>
          </div>
        </div>

        {/* Get review */}
        <div className="w-[80%] mt-2 flex flex-col gap-4 mb-10">
          {reviewList && reviewList.length > 0 ? (
            reviewList.map((item, index) => <Review_Tile key={index} review={item} />)
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <Plus className="w-16 h-16 text-gray-400" />
              <p className="text-lg font-semibold text-gray-600">Be the first one to review the product</p>
              <p className="text-sm text-gray-500 mt-2">Your feedback helps others make informed decisions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;