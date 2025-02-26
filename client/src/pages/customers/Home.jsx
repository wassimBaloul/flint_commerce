import { ChevronLeft, ChevronRight } from 'lucide-react';
import {Button} from "../../components/ui/button"
import { useEffect, useState } from 'react';
import {BrandTemplate} from "../../config/config"
import { useSelector,useDispatch } from 'react-redux';
import { fetchFeaturedandLatest } from '@/store/customer-slice/products';
import Customer_ProductCard from '../../components/customers/Customer_ProductCard';
import { useNavigate } from 'react-router-dom';
import { handleFetchBanners } from '@/store/banner-slice';
import { BadgeCheck, DollarSign , RefreshCcw } from "lucide-react";


function Home() {

  const dispatch = useDispatch();

  const { featuredProducts , latestProducts } = useSelector((state) => state.customerProduct)

  const [currentSlide,setCurrentSlide] = useState(1);
  const navigate = useNavigate();
  const { bannerList} = useSelector((state) => state.banner)
  const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";
  
  function handleFilteredNavigation(item,filterType)
  {
    sessionStorage.removeItem("filter");
    const filter = {
      [filterType] : [item]
    };
    sessionStorage.setItem("filter",JSON.stringify(filter));
    navigate("/shop/catalog");
  }

  useEffect(() => {
    
    dispatch(fetchFeaturedandLatest(token));
    dispatch(handleFetchBanners(token));
    window.scroll({
      top  :0,
      left : 0,
      behavior : "smooth"
    });
    const carouselTimer = setInterval(() => {
      bannerList.length > 0 && setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerList.length);
    }, 5000);
    
    return () => clearInterval(carouselTimer);
    
  },[dispatch])

  return (
<div className='flex flex-col min-h-screen bg-gray-50'>
  <div className="relative w-full h-[250px] sm:h-[600px] md:h-[400px] lg:h-[600px] overflow-hidden">
  {bannerList.map((item, index) => (
    <img
      key={index}
      src={item.BannerImage}
      className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full 
        h-full object-cover sm:object-contain transition-opacity duration-1000`}
    />
  ))}
  <Button
    onClick={() => setCurrentSlide((prevSlide) => ((prevSlide - 1) + bannerList.length) % bannerList.length)}
    className="absolute rounded-full top-[50%] left-4 transform -translate-y-[50%] bg-white/80"
    variant="outline"
    size="icon"
  >
    <ChevronLeft className="w-4 h-4" />
  </Button>
  <Button
    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerList.length)}
    className="absolute rounded-full top-[50%] right-4 transform -translate-y-[50%] bg-white/80"
    variant="outline"
    size="icon"
  >
    <ChevronRight className="w-4 h-4" />
  </Button>
</div>

  <section className='py-12 bg-gray-50'>
    <div className='container mx-auto px-4'>
      <h2 className="text-3xl font-medium tracking-wide text-gray-800 text-center mb-8">
        BRAND <span className="text-red-500 font-normal">SHOWCASE</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {BrandTemplate && BrandTemplate.map((brand, index) => (
          <div key={index} onClick={() => handleFilteredNavigation(brand.label,"Brand")} className="flex flex-col items-center w-[45%] md:w-[30%] p-4 border rounded-lg cursor-pointer bg-white
          transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <img src={brand.logo} alt={brand.label} className="w-20 h-20 object-contain" />
            <p className="mt-2 text-lg font-semibold">{brand.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className='bg-slashed py-16 bg-gray-50'>
    <div className='flex flex-col sm:flex-row text-center justify-evenly items-center gap-10 container mx-auto'>
        <p className="flex flex-col justify-start gap-1 items-center">
          <span><BadgeCheck  size={44}/></span>
          <span className='mt-2 font-semibold'>100% Authentic product</span>
          <span className='mt-[-6px] text-gray-500'>Verified quality & genuine brands</span>
        </p>
        <p className="flex flex-col justify-start gap-1 items-center">
          <span><RefreshCcw size={40}/></span>
          <span className='mt-2 font-semibold'>Fast and Secure Shipping</span>
          <span className='mt-[-6px] text-gray-500'>Safe and reliable delivery of products</span>
          </p>
        <p className="flex flex-col justify-start gap-1 items-center">
          <span><DollarSign  size={40}/></span>
          <span className='mt-2 font-semibold'>No Hidden Charges</span>
          <span className='mt-[-6px] text-gray-500'>Transparent pricing, no unexpected costs</span>
          </p>
    </div>
  </section>

  {latestProducts && latestProducts.length > 0 &&
    <section className='py-12 bg-gray-50'>
    <div className='container mx-auto px-4'>
      <h2 className="text-3xl font-medium tracking-wide text-gray-800 text-center mb-8">
        LATEST <span className="text-red-500 font-normal">DROPS</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {
           latestProducts.map((item,index) => 
            <Customer_ProductCard key={index} product={item} />
          )
        }
      </div>
    </div>
  </section>
  }

  {featuredProducts && featuredProducts.length > 0 &&
    <section className='py-12 bg-gray-50'>
    <div className='container mx-auto px-4'>
      <h2 className="text-3xl font-medium tracking-wide text-gray-800 text-center mb-8">
        FEATURED <span className="text-red-500 font-normal">PRODUCTS</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {
           featuredProducts.map((item,index) => 
            <Customer_ProductCard key={index} product={item} />
          )
        }
      </div>
    </div>
  </section>
  }
</div>
  )
}

export default Home