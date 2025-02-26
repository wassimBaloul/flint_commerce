import React from 'react'
import CustomerAppbar from './CustomerAppbar'
import { Outlet } from 'react-router-dom'
import Customer_Footer from './Customer_Footer';


function Customer_Layout() {
  return (
    <div className='flex flex-col bg-white'>
        <CustomerAppbar />
        <main className='flex flex-col w-full'>
            <Outlet />
        </main>
        <Customer_Footer />
    </div>
  )
}

export default Customer_Layout;