import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Dialog ,    DialogContent,
    DialogTitle} from '../ui/dialog'
import { ArrowUpDown, Ellipsis , Plus, RadarIcon, Trash2 } from 'lucide-react'
import { useState } from "react"
import Paginator from "../utility/Paginator"
import { 
    Select ,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { FilterOptions } from "@/config/config";
import { Label } from "../ui/label";

function Admin_Product_List({
    products,
    setFormData,
    setCurrentEditedID,
    setProductOpeningDrawer,
    handleProductDelete,
    orderToBeDeleted,
    setOrderToBeDeleted,
    openDeleteDialogDialog,
    setOpenDeleteDialog,
    currentProductPage,
    setCurrentProductPage,
    pageCount,
    productCategory,
    productBrand,
    productStock,
    handleFetchProductList
    }) {

    
  const initialState = {
    Category : "",
    Brand : "",
    Stock : ""
  }

  const [filterData,setFilterData] = useState(initialState);

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Your Products</h3>
                    <div className="hidden sm:flex mt-1 gap-2">
                        <div className="flex items-center text-sm pr-2 border border-blue-800 rounded-full">
                            <span className="font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Category</span>
                            <span className="ml-1"> {`${productCategory === "" ? "All" : productCategory}`}</span>
                        </div>
                        <div className="flex items-center text-sm pr-2 border border-green-800 rounded-full">
                            <span className="font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Brand</span>
                            <span className="ml-1">{`${productBrand === "" ? "All" : productBrand}`}</span>
                        </div>
                        <div className="flex items-center text-sm pr-2 border border-yellow-800 rounded-full">
                            <span className="font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Stock</span>
                            <span className="ml-1">{`${productStock=== "" ? "Available" : productStock}`}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border border-gray-500 flex items-center px-2 justify-evenly gap-1">
                            <ArrowUpDown className="w-4 h-5" />
                            <span>Filter</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="flex flex-col gap-2 w-[200px]">
                            <div className="flex flex-col gap-1">
                                <Label>Category</Label>
                                <Select value={filterData.Category} onValueChange={(value) => setFilterData((prevData) => {
                                    return {
                                        ...prevData,
                                        Category : value
                                    }
                                })}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        FilterOptions.Category.map(opt => 
                                        <SelectItem key={opt.id} value={opt.label}>
                                                {opt.label}
                                        </SelectItem>)
                                    }
                                </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-1">
                                <Label>Brand</Label>
                                <Select value={filterData.Brand} onValueChange={(value) => setFilterData((prevData) => {
                                    return {
                                        ...prevData,
                                        Brand : value
                                    }
                                })}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Brand"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        FilterOptions.Brand.map(opt => 
                                        <SelectItem key={opt.id} value={opt.label}>
                                                {opt.label}
                                        </SelectItem>)
                                    }
                                </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-1">
                                <Label>Stock</Label>
                                <Select value={filterData.Stock} onValueChange={(value) => setFilterData((prevData) => {
                                    return {
                                        ...prevData,
                                        Stock : value
                                    }
                                })}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Stock"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="available" value="Available">
                                            Available
                                    </SelectItem>
                                    <SelectItem key="available" value="Out of Stock">
                                            Out of Stock
                                    </SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-center gap-1">
                            <DropdownMenuItem><Button onClick={() => handleFetchProductList(filterData)}>Apply</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button onClick={() => {setFilterData(initialState);handleFetchProductList(initialState)}}>Reset</Button></DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={() => setProductOpeningDrawer(true)} className='flex gap-1 px-2 items-center justify-center'>
                        <Plus color="white" size={20}/>
                        Add Product
                    </Button>
                </div>
            </CardTitle>
            <CardDescription>Manage your product inventory efficiently. Add, edit, or remove products.</CardDescription>
        </CardHeader>
        <CardContent>
        {
            products && products.length > 0
            ?
            <div className="
            max-[400px]:w-[19rem]
            max-[420px]:w-[20rem]
            max-[450px]:w-[21rem]
            max-[500px]:w-[23rem]
            max-[520px]:w-[26rem]
            max-[550px]:w-[28rem]
            max-[595px]:w-[30rem]
            ">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products.map((product,index) => 
                            <TableRow key={index} className="h-5">
                                <TableCell>
                                    <img
                                    width={50}
                                    src={product?.Image[0]}
                                    />
                                </TableCell>
                                <TableCell>{product?.Title}</TableCell>
                                <TableCell>
                                    {product?.Category}
                                </TableCell>
                                <TableCell>
                                    {product?.Brand}
                                </TableCell>
                                <TableCell>
                                    <div className="flex h-full items-center justify-end">
                                    {
                                        product.SalePrice > 0
                                        ?
                                        <div className='flex items-end'>
                                            <span className="text-[17px]">{product.SalePrice} MAD</span>
                                            <span className='text-xs text-gray-500 line-through'>{product.Price} MAD</span>
                                        </div>
                                        :
                                        <span>{product.Price} MAD</span>
                                    }
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex gap-2 justify-evenly items-center'>
                                        <Button variant="outline" size="icon" onClick={() => {
                                            setProductOpeningDrawer(true);
                                            setCurrentEditedID(product?._id);
                                            setFormData({
                                                title : product.Title,
                                                description : product.Description,
                                                category : product.Category,
                                                brand : product.Brand,
                                                price : product.Price,
                                                salePrice : product?.SalePrice,
                                                featured : product?.Featured,
                                                sizes : product?.Size,
                                            });
                                        }}>
                                            <Ellipsis className='w-4 h-4 text-green-600'/>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => {setOrderToBeDeleted(product);setOpenDeleteDialog(true);}}>
                                            <Trash2 className='w-4 h-4 text-red-400'/>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                </Table>
                 <div className="mt-5 flex w-full justify-center">
                    <Paginator
                        currentPage={currentProductPage}
                        setCurrentPage={setCurrentProductPage}
                        pageCount={pageCount}
                    />
                </div> 
            </div>  
            :
            <div className="flex mt-3 flex-col h-full items-center justify-center gap-1 text-center">
                <RadarIcon className='w-16 h-16 text-gray-600'/>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h2>
                <p className="max-w-80 text-gray-500 mb-6">It looks like there are no products in this category or brand. Add more products by clicking on <span onClick={() => setProductOpeningDrawer(true)} className="underline font-semibold cursor-pointer">Add New Product</span></p>
            </div>
        }

        {
            orderToBeDeleted !== null && 
            <Dialog open={openDeleteDialogDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent className="flex flex-col gap-1">
                    <DialogTitle>Are you absolutely sure,</DialogTitle>
                    <span className='text-gray-600'>You want to delete the following product from your inventory</span>
                    <div className='mt-4 flex justify-start gap-5'>
                        <img className='w-28 h-auto' src={orderToBeDeleted?.Image[0]} />
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold'>{orderToBeDeleted?.Title}</span>
                            <div className="flex flex-col space-y-2">
                                <div className="border-l-4 border-blue-300 pl-2">
                                    <span className="text-sm font-semibold text-gray-700">Category</span>
                                    <p className="text-sm text-gray-600">{orderToBeDeleted?.Category}</p>
                                </div>
                                <div className="border-l-4 border-green-400 pl-2">
                                    <span className="text-sm font-semibold text-gray-700">Brand</span>
                                    <p className="text-sm text-gray-600">{orderToBeDeleted?.Brand}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-4 tracking-wider bg-red-500 border border-red-800" onClick={() => handleProductDelete(orderToBeDeleted?._id)}>
                        DELETE
                    </Button>
                </DialogContent>
            </Dialog>
        }
        </CardContent>
    </Card>

  )
}

export default Admin_Product_List