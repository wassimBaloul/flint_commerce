import React, { Fragment } from 'react'
import { LayoutDashboard , ShoppingBasket , HandCoins, GalleryHorizontalEnd, SquareArrowOutUpRight } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

const AdminDrawerTemplate = [
  {
    name : "Dashboard",
    route : '/admin/dashboard',
    icon : <LayoutDashboard />
  },
  {
    name : "Products",
    route : '/admin/products',
    icon : <ShoppingBasket />
  },
  {
    name : "Orders",
    route : '/admin/orders',
    icon : <HandCoins />
  },
  {
    name : "Banners",
    route : '/admin/banners',
    icon : <GalleryHorizontalEnd />
  }
];

function Drawer({openDrawer,setDrawerOpening}) {

  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={openDrawer} onOpenChange={() => setDrawerOpening(false)} className="relative">
        <SheetContent side='left' className='w-64'>
            <div className='flex flex-col h-full'>
                <SheetHeader className='border-b my-4'>
                  <SheetTitle className='text-center'>
                      <div className="flex justify-center border-b">
                        <div className="flex flex-col items-start ">
                          <span className='font-stick-no-bills text-4xl font-bold'>FLINT
                            <span className='text-red-400 text-5xl'>.</span>
                          </span>
                          <span className="text-xs text-slate-600 mt-[-8px]">ADMIN PANEL</span>
                      </div>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="text-center">Manage your store efficiently</SheetDescription>
                </SheetHeader>
                <div className='flex flex-col items-center justify-center gap-2'>
                  {
                    AdminDrawerTemplate.map((it) => (
                      <div key={it.name} onClick={() => {
                        navigate(it.route)
                        setDrawerOpening(false);
                      }} 
                      className='flex items-center tracking-wider hover:bg-muted hover:text-foreground cursor-pointer w-full gap-2 px-1 py-2 rounded-md '>
                        {it.icon}
                        <h1>{it.name}</h1>
                      </div>
                    ))
                  }
              </div>
            </div>
            <a href="/shop/home" target="_blank" className='absolute w-[80%] bottom-0 border-t border-gray-400 hover:bg-gray-300'>
              <div className='flex items-center gap-3 px-4 py-3'>
                <SquareArrowOutUpRight  size={22} className='text-gray-600'/>
                <span className="text-sm font-medium">Visit Shop</span>
              </div>
            </a>
        </SheetContent>
      </Sheet>

      <aside className="hidden z-40 h-screen sticky left-0 top-0 w-52 flex-col border-r bg-background lg:flex">

      <div className="flex justify-center border-b">
          <div onClick={() => navigate("/admin/dashboard")} className="flex flex-col items-start cursor-pointer">
            <span className='font-stick-no-bills text-4xl font-bold'>FLINT
              <span className='text-red-400 text-5xl'>.</span>
            </span>
            <span className="text-xs text-slate-600 mt-[-8px]">ADMIN PANEL</span>
        </div>
      </div>


      <div className="flex flex-col mt-4 space-y-1">
        {AdminDrawerTemplate.map((it) => (
          <NavLink
            key={it.name}
            to={it.route}
            style={({isActive}) => ({
              color: isActive && "#111",
              backgroundColor: isActive ? "#d1d5db" : "transparent"
            })}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <span className="text-xl text-gray-600">{it.icon}</span>
            <h1 className="text-sm font-medium">{it.name}</h1>
          </NavLink>
        ))}
      </div>


        <a href="/shop/home" target="_blank" className='absolute w-full bottom-0 border-t border-gray-400 hover:bg-gray-300'>
          <div className='flex items-center gap-3 px-4 py-3'>
            <SquareArrowOutUpRight  size={22} className='text-gray-600'/>
            <span className="text-sm font-medium">Visit Shop</span>
          </div>
        </a>

    </aside>

    </Fragment>
  )
}

export default Drawer