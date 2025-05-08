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
  
  
  
  
export default function Rewardtype() {
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const {data, isLoading} = useGetRobuxList(currentPage,10,filter, search)


    
   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setTotalpage(data?.totalPages || 0)
  },[data])


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <div className=' flex items-center gap-4'>
            <div className=' relative w-fit flex items-center justify-center'>
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
            </Popover>

         <CreateRobuxCodeForm/>

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
            <TableHead className="">ROBUX Code</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className=" ">Claim Status</TableHead>
            <TableHead className=" flex items-center gap-1 ">Availability

            <HoverCard openDelay={10} closeDelay={10}>
            <HoverCardTrigger className=' cursor-pointer'><CircleHelp size={15}/></HoverCardTrigger>
            <HoverCardContent className=' bg-orange-100 text-xs'>
                If the code is already used on the chests.
            </HoverCardContent>
            </HoverCard>

            </TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={item.id}>
                    <TableCell>{item.robuxcode}</TableCell>
                    <TableCell>{item.amount.toLocaleString()}</TableCell>
                    <TableCell className={` ${statusColor(item.status)}`}>{item.status}</TableCell>
                    <TableCell >
                        <p className={` w-fit rounded-full ${!item.isUsed ? 'bg-red-500 px-3 py-1 text-[.6rem] text-white' : 'bg-green-500 px-3 py-1 text-[.6rem] text-white'}`}>{!item.isUsed ? 'Not Available' : 'Available'}</p>
                    </TableCell>
                    <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                    <TableCell className=' flex items-center gap-2'>
        
                       <EditRobuxCodeForm id={item.id} code={item.robuxcode} amount={item.amount}/>
                        <DeleteRobuxCodeForm id={item.id} code={item.robuxcode}/>
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
