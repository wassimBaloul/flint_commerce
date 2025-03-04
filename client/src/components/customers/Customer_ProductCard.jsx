import { useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";

function Customer_ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/shop/product/${product._id}`)}
      className="relative w-full cursor-pointer flex flex-col border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Sale Tag */}
      {product.SalePrice && product.Price > product.SalePrice && (
        <div className="flex gap-1 items-center absolute z-20 top-1 left-1 p-1 bg-gradient-to-r from-pink-200 via-red-200 to-orange-100 text-red-600 border border-red-300 text-xs font-semibold rounded-lg">
          <Tag size={12} />
          Sale
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden flex-shrink-0 h-[120px] sm:h-[150px]">
        <img
          className="w-full h-full object-cover border-b border-gray-200 hover:scale-110 transition-transform ease-in-out"
          src={product?.Image[0]}
          alt={product?.Title}
        />
      </div>

      {/* Product Title */}
      <p className="pt-2 pb-1 px-2 text-sm tracking-tighter font-medium text-gray-800 truncate">
        {product?.Title}
      </p>

      {/* Product Price */}
      <div className="px-2 mt-auto pb-2">
        {product?.SalePrice && product.SalePrice > 0 ? (
          <div>
            <span className="text-md font-medium text-red-600">
              {product?.SalePrice} MAD
            </span>
            <span className="text-xs line-through text-gray-500 ml-2">
              {product?.Price} MAD
            </span>
          </div>
        ) : (
          <span className="text-md font-medium text-gray-800">
            {product?.Price} MAD
          </span>
        )}
      </div>
    </div>
  );
}

export default Customer_ProductCard;