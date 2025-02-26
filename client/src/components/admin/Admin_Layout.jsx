import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Appbar from './Appbar'
import Drawer from './Drawer'

function Admin_Layout() {

const [openDrawer,setDrawerOpening] = useState(false);

  return (
    <div className='flex min-h-screen w-full'>
        <Drawer openDrawer={openDrawer} setDrawerOpening={setDrawerOpening} />
        <div className='flex flex-1 flex-col'>
            <Appbar setDrawerOpening={setDrawerOpening}/>
            <main className='flex flex-1 flex-col bg-muted/40 p-4 md:p-6'> 
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Admin_Layout;