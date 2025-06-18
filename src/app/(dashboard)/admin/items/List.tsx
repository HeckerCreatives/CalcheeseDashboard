'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { CircleHelp, ListFilter, Pen, Plus, Scan, Search, Trash } from 'lucide-react'
import CreateRobuxCodeForm from '@/components/forms/CreateRobuxCode'
import { useGetRobuxList } from '@/apis/robux'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import CreateItemsForm from '@/components/forms/CreateItems'
import { useGetItemsList } from '@/apis/items'
import EditItemsForm from '@/components/forms/EditItems'
import DeleteItemForm from '@/components/forms/DeleteItems'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
  
  
 const typeOptions = [
  { name: "All", value: "all" },
  { name: "Chest", value: "chest" },
  { name: "Ingame", value: "ingame" },
  { name: "Exclusive Items", value: "exclusive" },
  { name: "Robux", value: "robux" },
  { name: "Tickets", value: "ticket" },
];
  
export default function List() {
    const [currentPage, setCurrentpage] = useState(0)
    const [tab, setTab] = useState('all')

    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const [rarity, setRarity] = useState('')
    const {data, isLoading} = useGetItemsList(currentPage, 10, tab, rarity)


    
   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setTotalpage(data?.totalPages || 0)
  },[data])

  useEffect(() => {
    setRarity('')
  },[tab])


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <div className=' flex flex-wrap items-center gap-4'>
            {/* <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Robux code' className=' w-fit pl-7'/>
            </div>

            <Popover>
                <PopoverTrigger className=' text-xs flex items-center gap-1 cursor-pointer bg-white px-3 py-1 rounded-sm'><ListFilter size={15}/>Status: {value}</PopoverTrigger>
                <PopoverContent className=' text-xs flex flex-col gap-2'>
                    {statusData.map((item, index) => (
                    <p key={index} onClick={() =>{ setFilter(item.name), setValue(item.name)}} className={`  p-1 rounded-sm w-full cursor-pointer ${filter === item.value ? 'bg-zinc-100' : 'hover:bg-zinc-50' }`}>{item.name}</p>
                    ))}

                </PopoverContent>
            </Popover> */}

         <CreateItemsForm/>

        

        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full mt-4">
        <TabsList className=" lg:w-fit w-full flex items-start justify-start overflow-x-auto whitespace-nowrap no-scrollbar">
           
            {typeOptions.map((item, index) => (
            <TabsTrigger key={index} value={item.value} className="px-3 shrink-0">
                {item.name}
            </TabsTrigger>
            ))}
        </TabsList>

        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

         <div className=" flex flex-col gap-1 mt-4">
             <label className="text-xs text-zinc-400">Rarity</label>
             <Select value={rarity} onValueChange={setRarity} >
            <SelectTrigger className="w-fit">
                <SelectValue placeholder=" Select" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem  value='common' className="text-xs">Common</SelectItem>
                <SelectItem  value='uncommon' className="text-xs">Uncommon</SelectItem>
                <SelectItem  value='rare' className="text-xs">Rare</SelectItem>
                <SelectItem  value='epic' className="text-xs">Epic</SelectItem>
                <SelectItem  value='legendary' className="text-xs">Legendary</SelectItem>
            
            </SelectContent>
            </Select>
         </div>

       
        <Table className=' text-sm mt-8'>
            {data?.data.length === 0 && (
                <TableCaption>No data</TableCaption>

            )}

             {isLoading && (
                <TableCaption><Loader type={'loader-secondary'}/></TableCaption>
            ) }
        <TableHeader>
        <TableRow>
            {/* <TableHead className="">Item Code</TableHead> */}
            <TableHead className="">Item Name</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="">Rarity</TableHead>
            <TableHead className="">Quantity</TableHead>
            
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={item.id}>
                    {/* <TableCell>{item.itemid}</TableCell> */}
                    <TableCell>{item.itemname}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.rarity}</TableCell>
                    <TableCell>{item.quantity.toLocaleString()}</TableCell>
                   
                    <TableCell className=' flex items-center gap-2'>
        
                       <EditItemsForm id={item.id} itemcode={item.itemid} itemname={item.itemname} quantity={item.quantity} type={item.category} rarity={item.rarity}/>
                        <DeleteItemForm id={item.id}/>
                    </TableCell>
                </TableRow>
            ))}
        
        </TableBody>
    </Table>

    {data?.data.length !== 0 && (
          <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
        )}
    </div>
    
  
  )
}
