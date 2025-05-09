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
import { useGetTicketList } from '@/apis/tickets'
import CreateTicketCodeForm from '@/components/forms/CreateTicketCode'
import EditTicketCodeForm from '@/components/forms/EditTicketCode'
import DeleteTicketCodeForm from '@/components/forms/DeleteTicketCode'
import statusColor from '@/lib/reusable'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"


const status =[
    {value: '', name: 'All'},
    {value: 'pending', name: 'Pending'},
    {value: 'claimed', name: 'Claimed'},
]
  
  
export default function Rewardtype() {
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const {data, isLoading} = useGetTicketList(currentPage,10,filter, search)


    
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
            <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Ticket code' className=' w-fit pl-7'/>
            </div>

         <CreateTicketCodeForm/>

         <Popover>
                <PopoverTrigger className=' text-xs flex items-center gap-1 cursor-pointer bg-white px-3 py-1 rounded-sm'><ListFilter size={15}/>Status: {value}</PopoverTrigger>
                <PopoverContent className=' text-xs flex flex-col gap-2'>
                    {status.map((item, index) => (
                    <p key={index} onClick={() =>{ setFilter(item.name), setValue(item.name)}} className={`  p-1 rounded-sm w-full cursor-pointer ${filter === item.value ? 'bg-zinc-100' : 'hover:bg-zinc-50' }`}>{item.name}</p>
                    ))}
                   
                </PopoverContent>
            </Popover>

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
            <TableHead className="">Ticket Code</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead className=" uppercase">Type</TableHead>
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
                    <TableCell>{item.ticketcode}</TableCell>
                    <TableCell>{item.ticketname}</TableCell>
                    <TableCell>{item.tickettype}</TableCell>
                    <TableCell className={` ${statusColor(item.status)}`}>{item.status}</TableCell>
                    <TableCell >
                        <p className={` w-fit rounded-full ${!item.isUsed ? 'bg-red-500 px-3 py-1 text-[.6rem] text-white' : 'bg-green-500 px-3 py-1 text-[.6rem] text-white'}`}>{!item.isUsed ? 'Not Available' : 'Available'}</p>
                    </TableCell>
                    <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                    <TableCell className=' flex items-center gap-2'>
        
                       {/* <EditRobuxCodeForm id={item.id} code={item.ticketcode} amount={item.amount}/> */}
                       <EditTicketCodeForm code={item.ticketcode} type={item.tickettypeid} id={item.id}/>
                        <DeleteTicketCodeForm id={item.id} code={item.ticketcode}/>
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
