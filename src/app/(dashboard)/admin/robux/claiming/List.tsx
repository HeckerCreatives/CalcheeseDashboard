import React from 'react'
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
  
  
  
export default function List() {
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
                <PopoverTrigger className=' text-xs flex items-center gap-1 cursor-pointer bg-white px-3 py-1 rounded-sm'><ListFilter size={15}/>Status:</PopoverTrigger>
                <PopoverContent className=' text-xs'>filter here</PopoverContent>
                </Popover>

             
            </div>

        </div>
       
        <Table className=' text-sm mt-8'>
        <TableCaption>No data</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead className="">Robux Id</TableHead>
            <TableHead className="">Robux Type</TableHead>
            <TableHead className="">User</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Picture</TableHead>
            <TableHead className="">Code</TableHead>
            <TableHead className="">Status</TableHead>
       
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow>
            <TableCell><input type='checkbox'/></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className=' flex items-center gap-2'>

                <button className='primary-btn flex items-center gap-1'><Pen size={15}/>Edit</button>
                <button className='danger-btn flex items-center gap-1'><Trash size={15}/>Delete</button>
                <button className='ghost-btn flex items-center gap-1'><TicketCheck size={15}/>Claimed</button>
            </TableCell>
        </TableRow>
        </TableBody>
    </Table>
    </div>
    
  
  )
}
