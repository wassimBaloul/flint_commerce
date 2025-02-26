import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="max-w-md text-center">
      <div onClick={() => navigate("/shop/home")} className="absolute cursor-pointer top-0 left-4 flex flex-col items-start ">
          <span className='font-stick-no-bills text-4xl font-bold'>FLINT
            <span className='text-red-400 text-5xl'>.</span>
          </span>
      </div>
      <Button variant="outline" className="absolute top-3 right-6 border border-black" onClick={() => navigate("/shop/home")}>Go to Home</Button>
        <div className='flex h-10 gap-5 justify-evenly items-center'>
          <span className='text-3xl font-bold'>404</span>
          <Separator orientation="vertical" className="bg-slate-700" />
          <span className='text-lg text-gray-800 font-semibold'>This page could not be found</span>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound