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
import EditRobuxCodeForm from '@/components/forms/EditRobuxCode'
import DeleteRobuxCodeForm from '@/components/forms/DeleteRobuxCode'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import statusColor, { statusData } from '@/lib/reusable'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import CreateItemsForm from '@/components/forms/CreateItems'
import { useGetItemsList } from '@/apis/items'
import EditItemsForm from '@/components/forms/EditItems'
import DeleteItemForm from '@/components/forms/DeleteItems'
import { useGetChestList } from '@/apis/chests'
import CreateChestForm from '@/components/forms/CreateChests'
import EditChestForm from '@/components/forms/EditChest'
import DeleteChestForm from '@/components/forms/DeleteChest'
  
  
  
  
export default function List() {
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const {data, isLoading} = useGetChestList()


    
   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setTotalpage(data?.totalPages || 0)
  },[data])


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

         <CreateChestForm/>

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
            <TableHead className="">Type</TableHead>
            <TableHead className="">Chest Name</TableHead>
            <TableHead className="">Items</TableHead>
            
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={item.id}>
                    <TableCell>{item.chestid}</TableCell>
                    <TableCell>{item.chestname}</TableCell>
                    <TableCell>{item.items.map(ite => ite.itemname).join(', ')}</TableCell>
                   
                    <TableCell className=' flex items-center gap-2'>
        
                       <EditChestForm chestid={item.chestid} chestname={item.chestname} items={item.items} id={item.id} />
                        <DeleteChestForm id={item.id} name={item.chestname}/>
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
