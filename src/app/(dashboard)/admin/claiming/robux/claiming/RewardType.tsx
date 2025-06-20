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
import {  Search} from 'lucide-react'
import CreateRobuxCodeForm from '@/components/forms/CreateRobuxCode'
import { useGetRobuxList } from '@/apis/robux'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import EditRobuxCodeForm from '@/components/forms/EditRobuxCode'
import DeleteRobuxCodeForm from '@/components/forms/DeleteRobuxCode'
import statusColor, { statusData } from '@/lib/reusable'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

  
  
  
  
export default function Rewardtype() {
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const [status, setStatus]= useState('')
    
    const {data, isLoading} = useGetRobuxList(currentPage, 10, filter,search)
    


    
   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setTotalpage(data?.totalPages || 0)
  },[data])


  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <div className=' flex flex-wrap items-end gap-4'>
            <div className=' relative w-fit flex items-center justify-center'>
                <Search size={15} className=' absolute left-2'/>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Code' className=' w-fit pl-7'/>
            </div>

            <CreateRobuxCodeForm/>

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
                                        <SelectItem  value='to-generate' className="text-xs">
                                          To Generate
                                        </SelectItem>
                                     
                                    </SelectContent>
                                  </Select> 
              </div> */}


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
            <TableHead className="">Item</TableHead>
          
            <TableHead className=" ">Status</TableHead>
            <TableHead className=" ">Action</TableHead>
            
        </TableRow>
        </TableHeader>
        <TableBody>
             {data?.data.map((item, index) => (
            <TableRow>
              {/* <TableCell><input type='checkbox'/></TableCell>robuxcodeid, robuxcode, item, name */}
              <TableCell>{item.robuxcode}</TableCell>
              <TableCell>{item.item?.itemname}</TableCell>
              <TableCell className={` ${statusColor(item.status)}`}>{item.status}</TableCell>
              <TableCell className=' flex items-center gap-2'><EditRobuxCodeForm id={item.id} code={item.robuxcode} item={item.item?.id} name={item.name}/>
              <DeleteRobuxCodeForm id={item.id} code={item.robuxcode}/>
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
