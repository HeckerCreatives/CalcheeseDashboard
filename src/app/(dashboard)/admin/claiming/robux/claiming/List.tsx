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
import { Filter, ListFilter, Pen, RefreshCcw, Scan, Search, Ticket, TicketCheck, Trash } from 'lucide-react'
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useGetRobuxList } from '@/apis/robux'
import statusColor, { statusData } from '@/lib/reusable'
import Loader from '@/components/common/Loader'
import { useApproveClaim, useGetCodesList } from '@/apis/codes'
import PaginitionComponent from '@/components/common/Pagination'
import ApproveClaimForm from '@/components/forms/ApproveClaim'
import { useGetItemsList } from '@/apis/items'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
  
  
  
  
export default function List() {
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('All')
    const [type, setType]= useState('robux')
    const [itemfilter, setItemFilter]= useState('')
    const [status, setStatus]= useState('')
    const [rarity, setRarity] = useState('')
    
    const {data, isLoading} = useGetCodesList(currentPage, 10, 'robux',rarity, itemfilter, 'claimed',search)
    const {data: items} = useGetItemsList(currentPage,100,type, rarity)
            
    const {mutate: approveClaim} = useApproveClaim()
      

  
  
      
     //paginition
     const handlePageChange = (page: number) => {
      setCurrentpage(page)
    }
  
    useEffect(() => {
      setTotalpage(data?.totalPages || 0)
    },[data])

       const reset = () => {
          setItemFilter('')
          setStatus('claimed')
          setSearch('')
          setRarity('')
        }


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <p className=' text-lg font-semibold text-orange-500'>ROBUX Code Claiming Lists</p>
        <div className=' flex flex-wrap items-end gap-4 mt-4'>

            <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input placeholder='Search' className=' w-fit pl-7'/>

            </div>

            <div className="w-fit flex flex-col gap-1">
                          <label className="text-xs text-zinc-400">Rarity</label>
                          <Select disabled={type === ''} value={rarity} onValueChange={setRarity}>
                            <SelectTrigger className="w-fit">
                              <SelectValue placeholder="Select" className="text-xs" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem  value='common' className="text-xs">Common</SelectItem>
                              <SelectItem  value='uncommon' className="text-xs">Uncommon</SelectItem>
                              <SelectItem  value='rare' className="text-xs">Rare</SelectItem>
                              <SelectItem  value='epic' className="text-xs">Epic</SelectItem>
                              <SelectItem  value='legendary' className="text-xs">Legendary</SelectItem>
                             
                            </SelectContent>
                          </Select>
                       
            </div>
            
            <div className="w-fit flex flex-col gap-1">
                          <label className="text-xs text-zinc-400">Items</label>
                          <Select disabled={rarity === ''} value={itemfilter} onValueChange={setItemFilter}>
                            <SelectTrigger className="w-fit">
                              <SelectValue placeholder="Select" className="text-xs" />
                            </SelectTrigger>
                            <SelectContent>
                              {items?.data.map((item, index) => (
                                <SelectItem key={item.id}  value={item.id} className="text-xs">{item.itemname}</SelectItem>
                              ))}
                              
                            </SelectContent>
                          </Select>
                       
            </div>

             {/* <div className=" flex flex-col gap-1">
                                    <label className="text-xs text-zinc-400">Status</label>
                                    <Select value={status} onValueChange={setStatus} >
                                    <SelectTrigger className="w-fit">
                                      <SelectValue placeholder=" Status" className="text-xs" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem  value='claimed' className="text-xs">
                                          Claimed
                                        </SelectItem>
                                         <SelectItem  value='to-claim' className="text-xs">
                                          Unclaimed
                                        </SelectItem>
                                     
                                    </SelectContent>
                                  </Select> 
              </div> */}

            <Button onClick={reset} className=' p-2'><RefreshCcw size={15}/></Button>

        </div>

        <div className=' flex items-center gap-4 mt-6 text-xs'>
          <p>Total Number of Claimed Codes: {data?.totalDocs.toLocaleString()}</p>
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
                  <TableHead className="">Rarity</TableHead>
                  <TableHead className="">Item</TableHead>
                  <TableHead className="">Roblox Id</TableHead>
                  <TableHead className="">Email</TableHead>
                
                  <TableHead className=" ">Claim Status</TableHead>
                  
                  <TableHead className="">Action</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
                   {data?.data.map((item, index) => (
                  <TableRow>
                    {/* <TableCell><input type='checkbox'/></TableCell>robuxcodeid, robuxcode, item, name */}
                    <TableCell>{item.code}</TableCell>
                    <TableCell className=' uppercase'>{item.items[0]?.rarity}</TableCell>
                    <TableCell>
                      {item.items.length > 0
                        ? item.items.map((item) => item.itemname).join(', ')
                        : 'No items'}
                    </TableCell>
                    <TableCell>{item.form?.name}</TableCell>
                    <TableCell>{item.form?.email}</TableCell>

                    <TableCell className={` ${statusColor(item.status)}`}>{item.status}</TableCell>
                    <TableCell className=' flex items-center gap-2'>
                        <ApproveClaimForm id={item.id} status={'approved'} code={item.code} name={item.form?.name}/>
                    </TableCell>
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
