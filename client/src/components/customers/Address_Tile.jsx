import { Label } from "../ui/label";

import { Card, CardContent } from "../ui/card";
import { Hash, Map, MapPinHouseIcon, Phone, PyramidIcon } from "lucide-react";
import { Button } from "../ui/button";


function Address_Tile({address,handleAddressDelete,setSelectedAddress,handleAddressEdit,selectedId}) {


  return (
    <Card onClick={() => setSelectedAddress(address)} className={`relative cursor-pointer ${selectedId === address?._id ? "border border-black" : ""} hover:shadow-lg hover:border hover:border-red-300`}>
        <CardContent className="grid p-4 gap-4">
            <Label>
                <div className="flex gap-2 items-center">
                    <Map className="w-4 h-4"/>
                    <span className="w-[90%] text-wrap break-words text-slate-600">
                        {address?.Address}
                    </span>
                </div>
            </Label>
            <Label>
                <div className="flex gap-2 items-center">
                    <MapPinHouseIcon className="w-4 h-4"/>
                    <span className="w-[90%] text-wrap break-words text-slate-600">
                        {address?.City}
                    </span>
                </div>
            </Label>
            <Label>
                <div className="flex gap-2 items-center">
                    <Hash className="w-4 h-4"/>
                    <span className="w-[90%] text-wrap break-words text-slate-600">
                        {address?.Pincode}
                    </span>
                </div>
            </Label>
            <Label>
                <div className="flex gap-2 items-center">
                    <Phone className="w-4 h-4"/>
                    <span className="w-[90%] text-wrap break-words text-slate-600">
                        {address?.Contact}
                    </span> 
                </div>
            </Label>
            <Label>
                <div className="flex gap-2 items-center">
                    <PyramidIcon className="w-4 h-4" />
                    <span className="w-[90%] text-wrap break-words text-slate-600">
                        {address?.Landmark ? address?.Landmark : "No Landmark information"}
                    </span>
                </div>
            </Label>
        </CardContent>
        <div className="mt-14">
            <Button onClick={() => handleAddressEdit(address)} className="absolute bottom-1 left-3">Edit</Button>
            <Button onClick={() => handleAddressDelete(address)} className="absolute bottom-1 right-3">Delete</Button>
        </div>
    </Card>
  )
}

export default Address_Tile