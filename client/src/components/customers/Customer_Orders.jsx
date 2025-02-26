import React , {useEffect, useState} from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
import Customer_Order_Details from './Customer_Order_Details'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchAllOrders } from '@/store/customer-slice/orders'
import { Badge } from '../ui/badge'

function orderColorMapper(status)
{
    let colorCode = "";
    
    switch (status) {
        case "Confirmed":
            colorCode = "bg-[#5A82B4]"; break;
        case "Processing":
            colorCode = "bg-[#728AB7]"; break;
        case "Shipping":
            colorCode = "bg-[#4C9A76]"; break;
        case "Out for Delivery":
            colorCode = "bg-[#D39F5D]"; break;
        case "Delivered":
            colorCode = "bg-[#76A365]"; break;
        case "Cancelled":
            colorCode = "bg-[#B46969]"; break;
        default:
            break;
    }

    return colorCode;
}

function Customer_Orders() {

  const [openCustomerOrderDialog,setOpenCustomerOrderDialog] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const {orderList} = useSelector((state) => state.order)
  const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";
  const [selectedOrder,setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(handleFetchAllOrders({token , userId : user?.id}))
  },[dispatch])

  return (
    <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
        <TableCaption>A list of your recent orders</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="text-center">Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                orderList && orderList.length > 0 &&
                orderList.map((item,index) => 
                    <TableRow key={index} className="h-5">
                        <TableCell className="p-0">
                            <div className='relative flex justify-center'>
                                {
                                    item.OrderItems.slice(0,3).map((orderitem,index) => 
                                            <img key={index} style={{zIndex : 3 - index }} src={orderitem.Image[0]} className={`bg-white w-10 h-10 rounded-full border border-gray-300 shadow-md ${
                                                index !== 0 ? '-ml-4' : ''
                                              } `} />
                                    )
                                }
                            </div>
                        </TableCell>
                        <TableCell>{item?.OrderCreationDate.split('T')[0]}</TableCell>
                        <TableCell>
                            <Badge className={
                                `px-3 py-1 ${orderColorMapper(item.OrderStatus)}`
                            }>
                                {item.OrderStatus}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{item.OrderTotal} MAD</TableCell>
                        <TableCell className="flex justify-center">
                            <Button key={index} onClick={() => {
                                    setOpenCustomerOrderDialog(true);
                                    setSelectedOrder(item);
                                }} >View Details</Button>
                        </TableCell>
                    </TableRow>
                )
            }
        </TableBody>
        </Table>
            {
                selectedOrder !== null &&
            <Dialog
                open={openCustomerOrderDialog}
                onOpenChange={setOpenCustomerOrderDialog}
            >
                <Customer_Order_Details order={selectedOrder}/>
            </Dialog>
            }
        </CardContent>
    </Card>
  )
}

export default Customer_Orders