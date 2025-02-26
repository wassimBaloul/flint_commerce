import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger,SheetHeader,SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { LogOut, Menu, Search, ShoppingCart, UserCog } from 'lucide-react';
import {CustomerHomeMenuItems} from "../../config/config.js"
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { resetAuthentication } from '@/store/auth-slice';
import Cart_Wrapper from './Cart_Wrapper';
import { handleFetchCartItems } from '@/store/customer-slice/cart';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

function MenuBar({setCustomerDrawer})
{

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams();

  function handleFilteredNavigation(item,route)
  {
    sessionStorage.removeItem("filter");
    
    if(item === "Home")
    {
      navigate(route);
      return;
    }
    else if(item === "Collection")
    {
      navigate(route);
      return;
    }

    const filter = {
      Category : [item]
    };
    sessionStorage.setItem("filter",JSON.stringify(filter));

    location.pathname.includes('catalog') && filter !== null 
    ?
    setSearchParams(new URLSearchParams(`?Category=${item}`))
    :
    navigate(route);
  }

  return (
    <nav className='flex flex-col gap-6 mb-3 lg:mb-0 lg:items-center lg:flex-row'>
      {
              CustomerHomeMenuItems.map((item) => 
              <Label onClick={() => {handleFilteredNavigation(item.label,item.route);setCustomerDrawer(false);}} className="font-medium cursor-pointer text-[17px]" key={item.id} >
                {item.label}
              </Label>)
      }
      <Label>
        <a target="_blank" href="/admin/dashboard" className="rounded-full px-3 py-1 inline border border-red-400">ADMIN</a>
      </Label>
    </nav>
    
  );
}

function Cart_Account_Bar({ drawerMode, setCustomerDrawer }) {
  const { user } = useSelector((state) => state.auth);
  const { cartProducts } = useSelector((state) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";

  useEffect(() => {
    if (user) {
      dispatch(handleFetchCartItems({ token, userId: user?.id }));
    }
  }, [dispatch, user, token]);

  if (!user) {
    // Show login and signup options for unauthenticated users
    return (
      <div>
        {drawerMode ? (
          <div className='absolute w-[80%] flex flex-col gap-3 bottom-2'>
            <div className='flex h-6 gap-2 justify-evenly items-center'>
              <div
                className='flex gap-1 items-center cursor-pointer'
                onClick={() => {
                  navigate("/shop/search");
                  setCustomerDrawer(false);
                }}
              >
                <Search className='w-5 h-5' />
                <span className="font-medium text-[18px]">Search</span>
              </div>
              <Separator orientation="vertical" className="bg-gray-400" />
              <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <div
                  onClick={() => setOpenCartSheet(true)}
                  className='flex gap-1 cursor-pointer items-center'
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium text-[18px]">Cart</span>
                </div>
                <Cart_Wrapper cartProducts={cartProducts} setOpenCartSheet={setOpenCartSheet} />
              </Sheet>
            </div>
            <Separator className="bg-gray-400" />
            <div className='flex h-9 gap-1 justify-evenly items-center'>
              <div
                className='flex gap-1 items-center cursor-pointer'
                onClick={() => {
                  setCustomerDrawer(false);
                  navigate("/auth/login");
                }}
              >
                <UserCog className='w-5 h-5' />
                <span className="font-medium text-[18px]">Login</span>
              </div>
              <Separator orientation="vertical" className="bg-gray-500" />
              <div
                className='flex gap-1 items-center cursor-pointer'
                onClick={() => {
                  setCustomerDrawer(false);
                  navigate("/auth/signup");
                }}
              >
                <UserCog className='w-5 h-5' />
                <span className="font-medium text-[18px]">Sign Up</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
            <Button
              onClick={() => navigate("/shop/search")}
              variant="ghost"
              size="icon"
              className="w-6 h-8 rounded"
            >
              <Search className='w-6 h-6' />
            </Button>

            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
              <Button
                onClick={() => setOpenCartSheet(true)}
                variant="outline"
                size='icon'
                className="relative border-none"
              >
                <ShoppingCart className={`w-6 h-6 ${cartProducts.length !== 0 ? " mt-2" : ""}`} />
                {cartProducts.length !== 0 && (
                  <Badge className="absolute top-0 right-0 p-1 h-4">{cartProducts.length}</Badge>
                )}
              </Button>
              <Cart_Wrapper cartProducts={cartProducts} setOpenCartSheet={setOpenCartSheet} />
            </Sheet>

            <Button
              onClick={() => navigate("/auth/login")}
              variant="outline"
              className="font-medium text-[16px]"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/auth/signup")}
              variant="outline"
              className="font-medium text-[16px]"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {drawerMode ? (
        <div className='absolute w-[80%] flex flex-col gap-3 bottom-2'>
          <div className='flex h-6 gap-2 justify-evenly items-center'>
            <div
              className='flex gap-1 items-center cursor-pointer'
              onClick={() => {
                navigate("/shop/search");
                setCustomerDrawer(false);
              }}
            >
              <Search className='w-5 h-5' />
              <span className="font-medium text-[18px]">Search</span>
            </div>
            <Separator orientation="vertical" className="bg-gray-400" />
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
              <div
                onClick={() => setOpenCartSheet(true)}
                className='flex gap-1 cursor-pointer items-center'
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium text-[18px]">Cart</span>
              </div>
              <Cart_Wrapper cartProducts={cartProducts} setOpenCartSheet={setOpenCartSheet} />
            </Sheet>
            <Separator orientation="vertical" className="bg-gray-400" />
            <div
              className='flex gap-1 items-center cursor-pointer'
              onClick={() => {
                navigate("/shop/account");
                setCustomerDrawer(false);
              }}
            >
              <UserCog className='w-5 h-5' />
              <span className="font-medium text-[18px]">Account</span>
            </div>
          </div>
          <Separator className="bg-gray-400" />
          <div className='flex h-9 gap-1 justify-evenly items-center'>
            <div className='flex items-center gap-2'>
              <Avatar className="bg-black">
                <AvatarFallback className="bg-black text-white">
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className='text-lg font-semibold'>{user.username}</h2>
            </div>
            <Separator orientation="vertical" className="bg-gray-500" />
            <div
              className='flex gap-1 items-center cursor-pointer'
              onClick={() => {
                setCustomerDrawer(false);
                dispatch(resetAuthentication());
                navigate("/auth/login");
              }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-[18px]">Logout</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
          <Button
            onClick={() => navigate("/shop/search")}
            variant="ghost"
            size="icon"
            className="w-6 h-8 rounded"
          >
            <Search className='w-6 h-6' />
          </Button>

          <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              variant="outline"
              size='icon'
              className="relative border-none"
            >
              <ShoppingCart className={`w-6 h-6 ${cartProducts.length !== 0 ? " mt-2" : ""}`} />
              {cartProducts.length !== 0 && (
                <Badge className="absolute top-0 right-0 p-1 h-4">{cartProducts.length}</Badge>
              )}
            </Button>
            <Cart_Wrapper cartProducts={cartProducts} setOpenCartSheet={setOpenCartSheet} />
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-black cursor-pointer">
                <AvatarFallback className="bg-black text-white">
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-56">
              <DropdownMenuLabel>
                <div className='flex flex-col'>
                  <span>
                    {user?.username}{" "}
                    {user.role === "ADMIN" && (
                      <span className='px-1 text-xs rounded-full bg-yellow-200 border border-red-400'>
                        ADMIN
                      </span>
                    )}
                  </span>
                  <span className='text-sm font-normal text-gray-500'>{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/shop/account")}
                className="flex items-center tracking-wide cursor-pointer"
              >
                <UserCog className='mr-2 h-5 w-5' />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  dispatch(resetAuthentication());
                  navigate("/auth/login");
                }}
                className="flex items-center tracking-wide cursor-pointer"
              >
                <LogOut className='mr-2 h-5 w-5' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

function CustomerAppbar() {

  const navigate = useNavigate();
  const [customerDrawer,setCustomerDrawer] = useState(false);

  return (
    <header className='sticky top-0 left-0 w-full z-40 border-b bg-background shadow-sm'>
        <div className='flex h-16 items-center justify-between px-4'>
          <NavLink to='/shop/home'>
            <span className='font-stick-no-bills text-4xl font-bold'>FLINT<span className='text-red-400 text-5xl'>.</span></span>
          </NavLink>
          <Sheet className="relative" open={customerDrawer} onOpenChange={() => setCustomerDrawer(!customerDrawer)}>
            <SheetTrigger asChild>
              <Button variant='outline' onClick={() => setCustomerDrawer(true)} size='icon' className='lg:hidden border-none'>
                <Menu />
                <span className='sr-only'>Toggle</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs "> 
              <SheetHeader>
                <SheetTitle>
                  <span className='font-stick-no-bills text-4xl font-bold'>FLINT<span className='text-red-400 text-5xl'>.</span></span>
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <MenuBar setCustomerDrawer={setCustomerDrawer}/>
              <Cart_Account_Bar drawerMode={true} setCustomerDrawer={setCustomerDrawer}/>
            </SheetContent>
          </Sheet>
          <div className='hidden lg:block'>
            <MenuBar setCustomerDrawer={setCustomerDrawer}/>
          </div>
          <div className='hidden lg:block'>
            <Cart_Account_Bar drawerMode={false}/>
          </div>
        </div>
    </header>
  )
}

export default CustomerAppbar;