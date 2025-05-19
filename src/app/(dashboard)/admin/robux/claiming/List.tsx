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
import { Filter, ListFilter, Pen, Scan, Search, Ticket, TicketCheck, Trash } from 'lucide-react'
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useGetRobuxList } from '@/apis/robux'
import statusColor, { statusData } from '@/lib/reusable'
import Loader from '@/components/common/Loader'
import { useGetCodesList } from '@/apis/codes'
  
  
  
  
export default function List() {
    const [currentPage, setCurrentpage] = useState(0)
      const [totalpage, setTotalpage] = useState(0)
      const [search, setSearch] = useState('')
      const [filter, setFilter] = useState('')
      const [value, setValue] = useState('All')
      // const {data, isLoading} = useGetRobuxList(currentPage,10,filter, search)
      const {data, isLoading} = useGetCodesList(currentPage, 10, status, 'robux', '', '',search)
      

  
  
      
     //paginition
     const handlePageChange = (page: number) => {
      setCurrentpage(page)
    }
  
    useEffect(() => {
      setTotalpage(data?.totalPages || 0)
    },[data])


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <p className=' text-lg font-semibold text-orange-500'>Robux Lists</p>
        <div className=' flex flex-wrap items-center gap-4 mt-4'>

            <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input placeholder='Search' className=' w-fit pl-7'/>

            </div>

            <div className=' flex items-center gap-4 text-xs'>
                <p className=' text-zinc-400'>Filter:</p>
                <Popover>
                    <PopoverTrigger className=' text-xs flex items-center gap-1 cursor-pointer bg-white px-3 py-1 rounded-sm'><ListFilter size={15}/>Status: {value}</PopoverTrigger>
                    <PopoverContent className=' text-xs flex flex-col gap-2'>
                        {statusData.map((item, index) => (
                        <p key={index} onClick={() =>{ setFilter(item.name), setValue(item.name)}} className={`  p-1 rounded-sm w-full cursor-pointer ${filter === item.value ? 'bg-zinc-100' : 'hover:bg-zinc-50' }`}>{item.name}</p>
                        ))}
    
                    </PopoverContent>
                </Popover>

             
            </div>

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
            {/* <TableHead className="">Select</TableHead> */}
            <TableHead className="">Robux Code</TableHead>
            <TableHead className="">Item</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Status</TableHead>
       
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item, index) => (
            <TableRow>
              {/* <TableCell><input type='checkbox'/></TableCell>robuxcodeid, robuxcode, item, name */}
              <TableCell>{item.robuxcode.robuxcode}</TableCell>
              <TableCell>{item.items.map((item) => item.itemname).join(',')}</TableCell>
              <TableCell>{item.form?.name}</TableCell>
              <TableCell>{item.form?.email}</TableCell>
              <TableCell className={` ${item.isUsed ? 'text-green-500' : 'text-orange-500'}`}>{item.isUsed ? 'Claimed' : 'UnClaimed'}</TableCell>
              <TableCell className=' flex items-center gap-2'>

                  {/* <button className='primary-btn flex items-center gap-1'><Pen size={15}/>Edit</button>
                  <button className='danger-btn flex items-center gap-1'><Trash size={15}/>Delete</button> */}
                  <button className='ghost-btn flex items-center gap-1'><TicketCheck size={15}/>Claimed</button>
              </TableCell>
          </TableRow>
          ) )}
        
        </TableBody>
    </Table>
    </div>
    
  
  )
}
