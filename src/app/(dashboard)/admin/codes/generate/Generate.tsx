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
import { RefreshCcw, Scan, Search } from 'lucide-react'
import GenerateCodesForm from '@/components/forms/GenerateCodesForm'
import { getCodesList, useGetCodesList } from '@/apis/codes'
import Loader from '@/components/common/Loader'
import PaginitionComponent from '@/components/common/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetItemsList } from '@/apis/items'
import { useGetChestList } from '@/apis/chests'
import { Button } from '@/components/ui/button'
import DashboardCard from '@/components/common/Card'

  
  
  
export default function Generate() {
     const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const [type, setType]= useState('')
    const [itemfilter, setItemFilter]= useState('')
    const [status, setStatus]= useState('')
    const [chestfilter, setChestFilter]= useState('')
    const {data: items} = useGetItemsList()
    const {data: chests} = useGetChestList()
    const {data, isLoading} = useGetCodesList(currentPage, 10, status, type, itemfilter, chestfilter,search)

      
      
          
         //paginition
         const handlePageChange = (page: number) => {
          setCurrentpage(page)
        }
      
        useEffect(() => {
          setTotalpage(data?.totalPages || 0)
        },[data])


        const reset = () => {
          setType('')
          setItemFilter('')
          setChestFilter('')
          setStatus('')
          setSearch('')
        }

  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-4'>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Total Codes" value={data?.totalDocs ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
              <DashboardCard title="Total Used Codes" value={data?.usedCodesCount ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
              <DashboardCard title="Total Unused Codes" value={data?.unusedCodesCount ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
              <DashboardCard title="Total Expired Codes" value={data?.usedCodesCount ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
            </div>
        <div className=' flex items-end gap-4 mt-8'>
          
          <GenerateCodesForm/>

        </div>

        

          <div className=' flex items-end flex-wrap gap-4'>
            <div className=' relative w-fit flex items-center justify-center mt-4'>
              <Search size={15} className=' absolute left-2'/>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className=' w-fit pl-7'/>
            </div>

          <div className=" flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Type</label>
            <Select value={type} onValueChange={setType} >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder=" Type" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem  value='robux' className="text-xs">
                  Robux
                </SelectItem>
                  <SelectItem  value='ticket' className="text-xs">
                  Ticket
                </SelectItem>
                 <SelectItem  value='ingame' className="text-xs">
                  In Game
                </SelectItem>
            </SelectContent>
          </Select> 
          </div>

           <div className=" flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Items</label>
            <Select value={itemfilter} onValueChange={setItemFilter} >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder=" Items" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              {items?.data.map((item, index) => (
                 <SelectItem key={index} value={item.id} className="text-xs">
                  {item.itemname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> 
          </div>

           <div className=" flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Status</label>
            <Select value={status} onValueChange={setStatus} >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder=" Status" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem  value='claimed' className="text-xs">
                  Claimed
                </SelectItem>
                  <SelectItem  value='approved' className="text-xs">
                  Approved
                </SelectItem>
                 <SelectItem  value='rejected' className="text-xs">
                  Rejected
                </SelectItem>
            </SelectContent>
          </Select> 
          </div>

          <div className=" flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Chest</label>
            <Select value={chestfilter} onValueChange={setChestFilter} >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder=" Chest" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              {chests?.data.map((item, index) => (
                <SelectItem key={index} value={item.id} className="text-xs">
                  {item.chestname}
                </SelectItem>
              ))}
               
             
            </SelectContent>
          </Select> 
          </div>

          <Button onClick={reset} className=' p-2'><RefreshCcw size={15}/></Button>

         

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
                    <TableCell>{item.items.map((item) => item.itemname).join(',')}</TableCell>
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
