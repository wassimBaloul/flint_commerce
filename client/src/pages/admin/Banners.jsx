import React, { useEffect, useState } from 'react'
import Banner_Image_Uploader from '../../components/admin/Banner_Image_Uploader'
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddBanner, handleDeleteBanner, handleFetchBanners } from '@/store/banner-slice';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

function Banners() {

  const [bannerImage , setBannerImage] = useState(null);
  const dispatch = useDispatch();
  const {isLoading,bannerList} = useSelector((state) => state.banner)
  const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";
  const {toast} = useToast();

  function onSubmit()
  {
    const MultipartData = new FormData();
    bannerImage && MultipartData.append("image",bannerImage);
    dispatch(handleAddBanner({token,formData : MultipartData})).then((data) => {
      if(data.payload.success)
      {
        setBannerImage(null);
        toast({
          title  :"Image uploaded successfully"
        })
      }
    })
  }

  function handleDelete(bannerId)
  { 
    if(bannerList.length <= 1)
    {
      toast({
        title : "There must be atleast 1 banner",
        variant : "destructive"
      })
      return;
    }
    
    dispatch(handleDeleteBanner({token,bannerId})).then((data) => {
      if(data.payload?.success)
      {
        toast({
          title : "Banner deleted successfully"
        })
      }
    })
  }

  useEffect(() => {
    dispatch(handleFetchBanners(token));
    window.scroll({
      top  :0,
      left : 0,
      behavior : "smooth"
    });
  },[])


  return (
    <div className='w-full flex flex-col gap-5'>
        <Banner_Image_Uploader bannerLength={bannerList.length} bannerImage={bannerImage} setBannerImage={setBannerImage} onSubmit={onSubmit} isLoading={isLoading}/>
        <Separator />
        <div className='flex flex-col'>
          <div className='flex justify-between px-3'>
          <h3 className='text-lg font-semibold'>Your Banners</h3>
          <span className='text-muted-foreground text-lg font-normal'>{bannerList.length} Banners</span>
          </div>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-center'>
            {
              bannerList.length > 0 &&
              bannerList.map((item,index) => 
                <div key={index} className='mt-8 w-full h-full group relative cursor-pointer'>
                  <img className="w-full h-56 object-contain border rounded-md border-gray-200" src={item.BannerImage} />
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                 </div>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Banners