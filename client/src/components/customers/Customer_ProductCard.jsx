import { useNavigate } from "react-router-dom"
import { Tag } from "lucide-react";

function Customer_ProductCard({product}) {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/shop/product/${product._id}`)} className="relative mx-auto max-w-[400px] cursor-pointer">
        { product.SalePrice && product.Price > product.SalePrice &&
            <div className="flex gap-1 items-center absolute z-20 top-1 left-1 p-1 bg-gradient-to-r from-pink-200 via-red-200 to-orange-100 text-red-600 border border-red-300 text-xs font-semibold rounded-lg">
                <Tag size={14}/>
                Sale
            </div>
        }
        <div className=" relative overflow-hidden">
            <img
            className="border border-gray-200 rounded-sm hover:scale-110 transition ease-in-out"
            src={product?.Image[0]}
            />
        </div>
        <p className="pt-2 pb-1 px-1 text-md tracking-tighter">
            {product?.Title}
        </p>
        {
            product?.SalePrice && product.SalePrice > 0
            ?
            <div className="px-1">
                <span className="text-lg font-medium">{product?.SalePrice} MAD</span>
                <span className="text-sm line-through">{product?.Price} MAD</span>
            </div>
            :
            <span className="text-lg font-medium px-1">{product?.Price} MAD</span>
        }
    </div>
  )
}

export default Customer_ProductCard