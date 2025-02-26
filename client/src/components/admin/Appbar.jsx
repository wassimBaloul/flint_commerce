import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { resetAuthentication } from '@/store/auth-slice';
import { useNavigate } from 'react-router-dom';

function Appbar({setDrawerOpening}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout()
  {
    dispatch(resetAuthentication());
    navigate("/auth/login");
  }

  return (
    <header className='sticky z-40 top-0 flex justify-between lg:justify-end items-center px-3 py-2 bg-background border-b'>
      
      <Button variant="ghost" onClick={() => setDrawerOpening(true)} className='lg:hidden sm:block'>
        <AlignJustify />
        <span className='sr-only'>Toggle</span>
      </Button>
      <div className="flex lg:hidden justify-center border-b">
          <div className="flex flex-col items-start ">
            <span className='font-stick-no-bills text-4xl font-bold'>FLINT
              <span className='text-red-400 text-5xl'>.</span>
            </span>
            <span className="text-xs text-slate-600 mt-[-8px]">ADMIN PANEL</span>
        </div>
      </div>
      <div className='flex lg:mr-3'>
        <Button variant="outline" className="p-2 flex gap-2" onClick={() => handleLogout()}>
          <LogOut className='w-5 h-5'/> Logout
        </Button>
      </div>
      
    </header>
  )
}

export default Appbar