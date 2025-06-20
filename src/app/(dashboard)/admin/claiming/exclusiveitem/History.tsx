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
import { useGetCodesList } from '@/apis/codes'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import statusColor from '@/lib/reusable'

  
  
  
  
export default function History() {
  const [currentPage, setCurrentpage] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('approved')
  const [value, setValue] = useState('All')
  const [status, setStatus]= useState('')
        
  const {data, isLoading} = useGetCodesList(currentPage, 10, 'exclusive','', '', 'claimed','')
      
        
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
            <p className=' text-lg font-semibold text-orange-500'>Claim History</p>

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
                  <TableHead className=""> Code</TableHead>
                  <TableHead className=""> Rarity</TableHead>
                  <TableHead className="">Item</TableHead>
                
                  <TableHead className=" ">Claim Status</TableHead>
                  
              </TableRow>
              </TableHeader>
              <TableBody>
                   {data?.data.map((item, index) => (
                  <TableRow>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.items[0]?.rarity}</TableCell>
                    <TableCell>{item.items.map((item) => item.itemname).join(',')}</TableCell>

                    <TableCell className={` ${statusColor(item.status)}`}>{item.status}</TableCell>
                    
                </TableRow>
                ) )}
              
              </TableBody>
          </Table>
      
          {data?.data.length !== 0 && (
                <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
              )}
    </div>
    
  
  )
}
