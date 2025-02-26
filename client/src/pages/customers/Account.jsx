import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Customer_Orders from '../../components/customers/Customer_Orders'
import Address from '../../components/customers/Address'

function Account() {
  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="/accountBanner.jpg"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className='grid grid-cols-1 gap-8 p-4'>
          <div className='flex flex-col justify-center items-center rounded-lg border bg-background p-4 shadow-sm'>
            <Tabs defaultValue="orders" className='w-full'>
              <div className='flex justify-center items-center'>
              <TabsList className="bg-gray-200 w-[300px]">
                <TabsTrigger className="w-1/2" value="orders">Orders</TabsTrigger>
                <TabsTrigger className="w-1/2"  value="address">Address</TabsTrigger>
              </TabsList>
              </div>
                <TabsContent value="orders">
                  <Customer_Orders />
                </TabsContent>
                <TabsContent value="address">
                  <Address />
                </TabsContent>
            </Tabs>
          </div>
      </div>
    </div>
  )
}

export default Account