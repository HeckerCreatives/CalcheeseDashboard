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
import { Download, Eye, RefreshCcw, Scan, Search, Trash } from 'lucide-react'
import GenerateCodesForm from '@/components/forms/GenerateCodesForm'
import { getCodesList, useDeleteCodes, useExportCodeslist, useGetCodesList } from '@/apis/codes'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import { useGetDashboardCount } from '@/apis/dashboard'


  
  
  
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
    const {data: items} = useGetItemsList(currentPage,100)
    const {data: chests} = useGetChestList()
      const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetCodesList(currentPage, 10, status, type, itemfilter, chestfilter,search)
    const {mutate: exportCodeslist, isPending} = useExportCodeslist()
    const {data: codes} = useGetDashboardCount()
    const {mutate: deleteCodes, isPending: deletePending} = useDeleteCodes()
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

    

      
      
          
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

       

          const exportCsv = () => {
              exportCodeslist({type: ''},{
                  onSuccess: () => {
                    toast.success(`Success`);
                    setOpen(false)
                    reset()
                  },
                })
            }


           const deleteCodeData = () => {
             deleteCodes(
                    { ids: selectedCodes },
                    {
                      onSuccess: () => {
                        toast.success('Codes deleted successfully!');
                        setOpen(false);
                        setOpen(false)
                        setSelectedCodes([]);
                      },
                    }
                  );
           }

            console.log(selectedCodes)

        

  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-4'>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <DashboardCard title="Total Codes" value={codes?.data.totalcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
            <DashboardCard title="Total Claimed Codes" value={codes?.data.totalusedcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
            <DashboardCard title="Total Unclaimed Codes" value={codes?.data.totalunusedcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
            <DashboardCard title="Total Expired Codes" value={codes?.data.totalexpiredcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
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
                <SelectItem  value='expired' className="text-xs">
                  Expired
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

          {/* <Dialog>
            <DialogTrigger className=' p-2 bg-red-600 rounded-sm text-yellow-100'><Trash size={19}/></DialogTrigger>
            <DialogContent className=' bg-yellow-50'>
              <DialogHeader>
                <DialogTitle>Delete Codes</DialogTitle>
                <DialogDescription>
                  
                </DialogDescription>
              </DialogHeader>
              <div className=' flex flex-col gap-2 text-amber-950'>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-xs text-zinc-400">Type</label>
                  <Select >
                    <SelectTrigger className="w-full">
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

                <div className="w-full flex flex-col gap-1">
                  <label className="text-xs text-zinc-400">No. of code to delete</label>
                  <Input
                    placeholder="Quantity"
                    type="number"
                  />
                                   
                </div>

                <div className="w-full flex justify-end gap-2">
              
                  <button onClick={() => setOpen(false)} type="button" className="ghost-btn">
                    Cancel
                  </button>
                </div>
               
              </div>

              
            </DialogContent>
          </Dialog> */}

          <Button disabled={isPending}  onClick={exportCsv} className=' flex items-center p-2'>
            {isPending && <Loader type={'loader'} />}
            <Download size={15}/> Csv</Button>

         <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className='p-[.6rem] bg-red-600 rounded-sm text-yellow-100'>
            <Trash size={15} />
          </DialogTrigger>
          <DialogContent className='bg-yellow-50 p-6 min-w-sm'>
            <DialogHeader>
              <DialogTitle>Delete Codes</DialogTitle>
              <DialogDescription>Are you sure you want to delete the selected codes?</DialogDescription>
            </DialogHeader>

            <div className='flex flex-col gap-2 text-amber-950 text-sm mt-4 max-h-64 overflow-y-auto'>
              

              {selectedCodes.map((id) => {
                const selectedItem = data?.data.find((item) => item.id === id);
                return (
                  <label key={id} className='flex items-center gap-2'>
                    {selectedItem?.code || 'Unknown'}
                  </label>
                );
              })}
            </div>

            <div className='w-full flex items-end justify-end mt-4'>
              <Button
                disabled={deletePending}
                onClick={() => {
                 deleteCodeData()
                }}
                className='bg-red-600'
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>


         

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
           <TableHead>
            <input
              type='checkbox'
              checked={selectedCodes.length === data?.data.length && data?.data.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  const allIds = data?.data.map((item) => item.id) || [];
                  setSelectedCodes(allIds);
                } else {
                  setSelectedCodes([]);
                }
              }}
            />
          </TableHead>
            <TableHead className="">Code</TableHead>
            <TableHead>Chest Name</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {data?.data.map((item, index) => (
                <TableRow key={item.id} className=' text-xs'>
                  <TableCell>
                    <input
                      type='checkbox'
                      checked={selectedCodes.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCodes((prev) => [...prev, item.id]);
                        } else {
                          setSelectedCodes((prev) =>
                            prev.filter((id) => id !== item.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.chest.chestname}</TableCell>
                    <TableCell>
                      {item.items.length > 0
                        ? item.items.map((item) => item.itemname).join(', ')
                        : 'No items'}
                    </TableCell>
                    <TableCell>{item.expiration}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className={` ${item.isUsed ? 'text-green-500' : 'text-orange-500'}`}>{item.isUsed ? 'Claimed' : 'UnClaimed'}</TableCell>
                    <TableCell className=' flex gap-2'>
                      <Dialog>
                      <DialogTrigger className=' p-2 bg-orange-500 rounded-sm text-yellow-100'><Eye size={15}/></DialogTrigger>
                      <DialogContent className=' bg-yellow-50'>
                        <DialogHeader>
                          <DialogTitle>Code Details</DialogTitle>
                          <DialogDescription>
                            
                          </DialogDescription>
                        </DialogHeader>

                        <div className=' flex flex-col gap-2 text-amber-950 mt-2'>
                          <p>Code: {item.code}</p>
                          <p>Chest Name: {item.chest.chestname}</p>
                          <p>Items: {item.items.map((item) => item.itemname).join(',')}</p>
                          <p>Expiration: {item.expiration}</p>
                          <p>Type: {item.type}</p>
                          <p>Status: {item.isUsed ? 'Claimed' : 'UnClaimed'}</p>

                        </div>
                      </DialogContent>
                    </Dialog>

                     <Dialog>
                      <DialogTrigger onClick={() => selectedCodes.push(item.id)} className=' p-2 bg-red-600 rounded-sm text-yellow-100'><Trash size={15}/></DialogTrigger>
                      <DialogContent className=' bg-yellow-50 p-8'>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this codes?</DialogTitle>
                          <DialogDescription>
                            
                          </DialogDescription>
                        </DialogHeader>

                        <div className=' flex flex-col gap-2 text-amber-950 mt-2'>
                          <p>Code: {item.code}</p>
                          <p>Chest Name: {item.chest.chestname}</p>
                          <p>Items: {item.items.map((item) => item.itemname).join(',')}</p>
                          <p>Expiration: {item.expiration}</p>
                          <p>Type: {item.type}</p>
                          <p>Status: {item.isUsed ? 'Claimed' : 'UnClaimed'}</p>

                        </div>

                        <div className=' w-full flex items-end justify-end mt-4'>
                          <Button disabled={deletePending} onClick={deleteCodeData} className=' bg-red-600 flex items-center justify-center gap-2 '>
                            
                          {deletePending &&  <Loader type={'loader-secondary'}/>}Continue</Button>
                        </div>

                      </DialogContent>
                    </Dialog>

                    </TableCell>
                  
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
