import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sales from "../../components/admin/Analytics/Sales"
import Orders from "../../components/admin/Analytics/Orders"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Products from "@/components/admin/Analytics/Products";

function Dashboard() {

  const [analyticFilter,setAnalyticFilter] = useState("All-Time")

  return (
      <Tabs defaultValue="sales">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1 ">
          <span className="hidden sm:block text-sm text-gray-600">{analyticFilter} •</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center border-gray-300 justify-evenly gap-2">
                <Calendar className='h-4 w-4'/>
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={analyticFilter} onValueChange={(value) => setAnalyticFilter(value)} >
                    <DropdownMenuRadioItem className='cursor-pointer' value="All-Time">
                      All Time
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className='cursor-pointer' value="Past-3-months">
                      Past 3 months
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className='cursor-pointer' value="Past-6-months">
                      Past 6 months
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <TabsContent value="sales">
          <Sales analyticFilter={analyticFilter}/>
        </TabsContent>
        <TabsContent value="order">
          <Orders analyticFilter={analyticFilter} />
        </TabsContent>
        <TabsContent value="product">
          <Products analyticFilter={analyticFilter} />
        </TabsContent>
      </Tabs>
  )
}

export default Dashboard