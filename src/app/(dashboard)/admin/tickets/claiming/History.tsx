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
  
  
  
  
export default function History() {
  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <div className=' flex items-center gap-4'>
            <p className=' text-lg font-semibold text-orange-500'>Claim History</p>

        </div>
       
        <Table className=' text-sm mt-8'>
        <TableCaption>No data</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead className="">Ticket Id</TableHead>
            <TableHead className="">Ticket Type</TableHead>
            <TableHead className="">User</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Picture</TableHead>
            <TableHead className="">Code</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Date</TableHead>
       
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
           
        </TableRow>
        </TableBody>
    </Table>
    </div>
    
  
  )
}
