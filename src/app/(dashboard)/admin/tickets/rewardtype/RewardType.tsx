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
import { Pen, Plus, Scan, Search, Trash } from 'lucide-react'
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
  
  
  
export default function Rewardtype() {
  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <div className=' flex items-center gap-4'>
            <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input placeholder='Search' className=' w-fit pl-7'/>

            </div>

            <Dialog>
            <DialogTrigger className=' cursor-pointer px-4 py-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm'><Plus size={15}/>Add</DialogTrigger>
            <DialogContent className=' w-[95%] md:max-w-[500px] bg-yellow-50'>
                <DialogHeader>
                <DialogTitle className=' flex items-center gap-2'>Add
                    <span className=" text-orange-500">
                       Codes
                    </span>
                </DialogTitle>
                <DialogDescription>
                   
                </DialogDescription>
                </DialogHeader>
                <form action="" className=' flex flex-col gap-4'>

                    <div className=' w-full flex flex-col gap-1'>
                        <label htmlFor="" className=' text-xs text-zinc-400'>Ticket Type</label>
                        <Select>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Chest Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Type</SelectItem>
                            
                        </SelectContent>
                        </Select>
                    </div>

                    <div className=' w-full flex flex-col gap-1'>
                        <label htmlFor="" className=' text-xs text-zinc-400'>Item Name</label>
                        <Input placeholder='Name' type='text'/>
                    </div>

                    <div className=' w-full flex flex-col gap-1'>
                        <label htmlFor="" className=' text-xs text-zinc-400'>Quantity</label>
                        <Input placeholder='Quantity' type='number'/>
                    </div>

                    <div className=' w-full flex items-end justify-end gap-2'>
                        <button className='primary-btn'>Save</button>
                        <button className='ghost-btn'>Cancel</button>
                    </div>
                  


                </form>
            </DialogContent>
            </Dialog>

        </div>
       
        <Table className=' text-sm mt-8'>
        <TableCaption>No data</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead className="">Select</TableHead>
            <TableHead className="">Item Id</TableHead>
            <TableHead className="">Item Name</TableHead>
            <TableHead>Ticket Type</TableHead>
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow>
            <TableCell><input type='checkbox'/></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className=' flex items-center gap-2'>

                <button className='primary-btn flex items-center gap-1'><Pen size={15}/>Edit</button>
                <button className='danger-btn flex items-center gap-1'><Trash size={15}/>Delete</button>
            </TableCell>
        </TableRow>
        </TableBody>
    </Table>
    </div>
    
  
  )
}
