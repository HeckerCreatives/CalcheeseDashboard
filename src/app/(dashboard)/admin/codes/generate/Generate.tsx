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
import { Scan, Search } from 'lucide-react'
import GenerateCodesForm from '@/components/forms/GenerateCodesForm'
import { getCodesList, useGetCodesList } from '@/apis/codes'
import Loader from '@/components/common/Loader'
import PaginitionComponent from '@/components/common/Pagination'

  
  
  
export default function Generate() {
     const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const {data, isLoading} = useGetCodesList(currentPage, 10, '', '', '', '', '')

      
      
          
         //paginition
         const handlePageChange = (page: number) => {
          setCurrentpage(page)
        }
      
        useEffect(() => {
          setTotalpage(data?.totalPages || 0)
        },[data])

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
            {/* {data?.data.length === 0 && (
                <TableCaption>No data</TableCaption>
            )} */}

            {isLoading && (
                <TableCaption><Loader type={'loader-secondary'}/></TableCaption>
            ) }
        <TableHeader>
        <TableRow>
            <TableHead className="">Code</TableHead>
            <TableHead>Chest Name</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={index} className=' text-xs'>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.chest.chestname}</TableCell>
                    <TableCell>{item.items.itemname}</TableCell>
                    <TableCell>{item.expiration}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.isUsed ? 'Claimed' : 'Unclaimed'}</TableCell>
                    
                  
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
