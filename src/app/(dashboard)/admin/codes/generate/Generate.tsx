'use client'
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
import { Scan, Search } from 'lucide-react'
import GenerateCodesForm from '@/components/forms/GenerateCodesForm'
import { useGetChests } from '@/apis/codes'
import Loader from '@/components/common/Loader'

  
  
  
export default function Generate() {
    const {data, isLoading} = useGetChests()

    console.log(data)
  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-4'>
        <div className=' flex items-center gap-4'>
            {/* <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input placeholder='Search' className=' w-fit pl-7'/>

            </div> */}

          <GenerateCodesForm/>

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
            <TableHead className="">Chest Name</TableHead>
            <TableHead>Chest Type</TableHead>
            <TableHead>Total Codes</TableHead>
            <TableHead className="">Created at</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={index} className=' text-xs'>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className=' uppercase'>{item.type}</TableCell>
                    <TableCell className=' uppercase'>{item.totalCodes.toLocaleString()}</TableCell>
                    <TableCell className="">{new Date(item.createdAt).toDateString()}</TableCell>
                </TableRow>
            ))}
       
        </TableBody>
    </Table>
    </div>
    
  
  )
}
