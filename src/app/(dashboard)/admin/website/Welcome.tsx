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
import { useGetMinigameListRandom } from '@/apis/minigames'


const status =[
    {value: '', name: 'All'},
    {value: 'pending', name: 'Pending'},
    {value: 'claimed', name: 'Claimed'},
]
  
  
export default function Welcome() {
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const {data} = useGetMinigameListRandom()


    
   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  console.log(data)

  return (
    <div className=' w-full h-fit flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <h2 className=' text-lg font-bold'>Welcome To CalCheese World</h2>


        <h2 className=' text-sm mt-4'>Mini Games Thumbnails Displayed</h2>
       
       
        <div className=' w-full grid grid-cols-3 gap-4 mt-8'>
            {data?.data.map((items, index) => (
                 <div key={items.id} className=' w-full bg-white'>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${items.image}`}/>
                 </div>
            ))}
     
        </div>
    </div>
    
  
  )
}
