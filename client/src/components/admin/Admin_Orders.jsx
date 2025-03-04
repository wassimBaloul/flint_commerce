import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
  import { 
    Select ,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { OrderStatusColor } from '@/config/config';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Dialog } from '../ui/dialog'
import Admin_Order_Detail from './Admin_Order_Detail'
import { useDispatch , useSelector } from 'react-redux'
import { handleFetchAllAdminOrders ,handleDeleteOrder } from '@/store/admin-slice/admin_orders'
import Paginator from '../utility/Paginator'
import { Label } from '../ui/label'
import { PackageOpen , Trash2  } from 'lucide-react';

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

function Orders() {

const [openDetailDialog,setOpenDetailDialog] = useState(false);
const [adminSelectedOrder,setAdminSelectedOrder] = useState(null);
const dispatch = useDispatch();
const {orderList , pageCount} = useSelector((state) => state.adminOrder)
const token = localStorage.getItem("flint_token") ? localStorage.getItem("flint_token") : "Invalid";
const [currentOrderPage,setCurrentOrderPage] = useState(1);
const [filterStatus,setFilterStatus] = useState("All");

useEffect(() => {
    if(openDetailDialog)return;
    dispatch(handleFetchAllAdminOrders({token,currentOrderPage,filterStatus}));
},[currentOrderPage,dispatch,openDetailDialog])

useEffect(() => {
    setCurrentOrderPage(1);
    dispatch(handleFetchAllAdminOrders({token,currentOrderPage,filterStatus}));
    window.scroll({
        top  :0,
        left : 0,
        behavior : "smooth"
    });
},[filterStatus])

const handleRemoveOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
        await dispatch(handleDeleteOrder(orderId)); // Dispatch the delete action
        dispatch(handleFetchAllAdminOrders({ token, currentOrderPage, filterStatus })); // Refresh the order list
    }
};

  return (
    <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>All Orders</CardTitle>
            <div>
                <Label>Order Status</Label>
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)} >
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="All"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="available" value="All">
                                All
                        </SelectItem>
                        {
                            Object.keys(OrderStatusColor).map((item) => 
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
            {
                orderList && orderList.length > 0 
                ?
                <div className="
                max-[400px]:w-[19rem]
                max-[420px]:w-[20rem]
                max-[470px]:w-[21rem]
                max-[500px]:w-[23rem]
                max-[520px]:w-[26rem]
                max-[550px]:w-[27rem]
                max-[600px]:w-[30rem]
                max-[620px]:w-[31rem]
                max-[650px]:w-[34rem]
                max-[700px]:w-[36rem]
                max-[720px]:w-[37rem]
                max-[750px]:w-[41rem]
                max-[785px]:w-[43rem]
                ">
                    <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Order</TableHead>
                                    <TableHead className="w-[100px]">Order ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    orderList.map((order,index) => 
                                        <TableRow key={index} className="h-5">
                                            <TableCell className="p-0">
                                                <div className='relative flex justify-center'>
                                                    {
                                                        order.OrderItems.slice(0,3).map((orderitem,index) => 
                                                                <img style={{zIndex : 3 - index }} src={orderitem.Image[0]} className={`bg-white w-10 h-10 rounded-full border border-gray-300 shadow-md ${
                                                                    index !== 0 ? '-ml-4' : ''
                                                                } `} />
                                                        )
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{order?._id}</TableCell>
                                            <TableCell>{order?.OrderCreationDate.split('T')[0]}</TableCell>
                                            <TableCell>
                                                <Badge className={
                                                    `px-3 py-1 ${orderColorMapper(order.OrderStatus)}`
                                                }>
                                                    {order.OrderStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{order.OrderTotal} MAD</TableCell>
                                            <TableCell className="flex justify-center">
                                                <Button key={index} variant="" onClick={() => {
                                                    setAdminSelectedOrder(order);
                                                    setOpenDetailDialog(true);
                                                    }} >View Details</Button>
                                                     <Button
                                                variant="destructive"
                                                onClick={() => handleRemoveOrder(order._id)}
                                            >
                                                <Trash2 className="w-4 h-4" /> {/* Add a trash icon */}
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                    </Table>
                    <div className='w-full mt-5'>
                        <Paginator
                            currentPage={currentOrderPage}
                            setCurrentPage={setCurrentOrderPage}
                            pageCount={pageCount}
                        />
                    </div>
                </div>
                :
                <div className="flex mt-3 flex-col h-full items-center justify-center gap-1 text-center">
                    <PackageOpen className='w-16 h-16 text-gray-600'/>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Orders Found</h2>
                    <p className="max-w-80 text-gray-500 mb-6">It looks like there are no orders in this status. Check back later to find any orders.</p>
                </div>
            }
       
            {
                adminSelectedOrder !== null && 
                <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
                    <Admin_Order_Detail order={adminSelectedOrder} setOpenDetailDialog={setOpenDetailDialog} />
                </Dialog>
            }
        </CardContent>
    </Card>
  )
}

export default Orders