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
import CreateItemsForm from '@/components/forms/CreateItems'
import { useDeleteMultipleItem, useGetItemsList } from '@/apis/items'
import EditItemsForm from '@/components/forms/EditItems'
import DeleteItemForm from '@/components/forms/DeleteItems'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
  
  
 const typeOptions = [
  { name: "All", value: "all" },
  { name: "Chest", value: "chest" },
  { name: "Ingame", value: "ingame" },
  { name: "Exclusive Items", value: "exclusive" },
  { name: "Robux", value: "robux" },
  { name: "Tickets", value: "ticket" },
];
  
export default function List() {
    const [currentPage, setCurrentpage] = useState(0)
    const [tab, setTab] = useState('all')

    const [totalpage, setTotalpage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [value, setValue] = useState('')
    const [rarity, setRarity] = useState('')
    const {data, isLoading} = useGetItemsList(currentPage, 10, tab, rarity === 'all' ? '' : rarity)
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const {mutate: deleteMultipleItem, isPending} = useDeleteMultipleItem()
    const [open, setOpen] = useState(false)

    const isAllSelected = (data?.data ?? []).length > 0 && selectedIds.length === (data?.data ?? []).length;


    const toggleSelectAll = () => {
    if (isAllSelected) {
        setSelectedIds([]);
    } else {
        const allIds = data?.data.map(item => item.id.toString()) || [];
        setSelectedIds(allIds);
    }
    };

    const toggleSelectOne = (id: string) => {
    setSelectedIds(prev =>
        prev.includes(id)
        ? prev.filter(existingId => existingId !== id)
        : [...prev, id]
    );
    };

    
              const deleteMultipleData = () => {
                 deleteMultipleItem(
                        { ids: selectedIds },
                        {
                          onSuccess: () => {
                            toast.success('Codes deleted successfully!');
                           setOpen(false)
                          },
                        }
                  );
               }





    
   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setTotalpage(data?.totalPages || 0)
  },[data])

  useEffect(() => {
    setRarity('')
  },[tab])



  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>

      <div className=' flex flex-wrap items-end gap-4'>
         <CreateItemsForm/>

          <Dialog open={open} onOpenChange={setOpen} >
                   <DialogTrigger className='p-[.6rem] bg-red-600 rounded-sm text-yellow-100'>
                     <Trash size={15} />
                   </DialogTrigger>
                   <DialogContent className='bg-yellow-50 p-6 min-w-sm'>
                     <DialogHeader>
                       <DialogTitle>Delete Codes</DialogTitle>
                       <DialogDescription>Are you sure you want to delete the selected codes?</DialogDescription>
                     </DialogHeader>
         
         
                     <div className='w-full flex items-end justify-end mt-4'>
                       <Button
                         disabled={isPending}
                         onClick={() => {
                          deleteMultipleData()
                         }}
                         className='bg-red-600'
                       >
                         Continue
                       </Button>
                     </div>
                   </DialogContent>
          </Dialog>

          <div className=" flex flex-col gap-1 mt-4">
             <label className="text-[.7rem] text-zinc-400">Rarity</label>
             <Select value={rarity} onValueChange={setRarity} >
            <SelectTrigger className="w-fit text-xs">
                <SelectValue placeholder=" Select" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem  value='all' className="text-xs">All</SelectItem>
                <SelectItem  value='common' className="text-xs">Common</SelectItem>
                <SelectItem  value='uncommon' className="text-xs">Uncommon</SelectItem>
                <SelectItem  value='rare' className="text-xs">Rare</SelectItem>
                <SelectItem  value='epic' className="text-xs">Epic</SelectItem>
                <SelectItem  value='legendary' className="text-xs">Legendary</SelectItem>
            
            </SelectContent>
            </Select>
         </div>

        

      </div>
       

      <Tabs value={tab} onValueChange={setTab} className="w-full mt-4">
        <TabsList className=" lg:w-fit w-full flex items-start justify-start overflow-x-auto whitespace-nowrap no-scrollbar">
           
            {typeOptions.map((item, index) => (
            <TabsTrigger key={index} value={item.value} className="px-3 shrink-0">
                {item.name}
            </TabsTrigger>
            ))}
        </TabsList>

        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

        

        

       
        <Table className=' text-sm mt-8'>
            {data?.data.length === 0 && (
                <TableCaption>No data</TableCaption>

            )}

             {isLoading && (
                <TableCaption><Loader type={'loader-secondary'}/></TableCaption>
            ) }
        <TableHeader>
        <TableRow>
            <TableHead className="w-[30px]">
            <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
            />
            </TableHead>

            <TableHead className="">Item Name</TableHead>
            {tab === 'ticket' && 
            <TableHead className="">Code</TableHead>
            }
            <TableHead className="">Category</TableHead>
            <TableHead className="">Rarity</TableHead>
            <TableHead className="">Quantity</TableHead>
            
            <TableHead className="">Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {data?.data.map((item) => {
            const itemId = item.id.toString();
            const isChecked = selectedIds.includes(itemId);

            return (
            <TableRow key={itemId}>
                <TableCell className="w-[30px]">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelectOne(itemId)}
                />
                </TableCell>
                <TableCell>{item.itemname}</TableCell>
                {tab === 'ticket' && 
                  <TableCell className="">Code</TableCell>
                }
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.rarity}</TableCell>
                <TableCell>{item.quantity.toLocaleString()}</TableCell>
                <TableCell className="flex items-center gap-2">
                <EditItemsForm
                    id={item.id}
                    itemcode={item.itemid}
                    itemname={item.itemname}
                    quantity={item.quantity}
                    type={item.category}
                    rarity={item.rarity}
                />
                <DeleteItemForm id={item.id} />
                </TableCell>
            </TableRow>
            );
        })}
        </TableBody>

    </Table>

    {data?.data.length !== 0 && (
          <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
        )}
    </div>
    
  
  )
}
