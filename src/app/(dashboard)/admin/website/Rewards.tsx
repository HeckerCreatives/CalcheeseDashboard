'use client'
import React, { useCallback, useEffect, useState } from 'react'
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
import Loader from '@/components/common/Loader'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { useCreateNewTab, useDeleteNews, useEditNews, usegetNewtab } from '@/apis/whatsnew'
import PaginitionComponent from '@/components/common/Pagination'
import { useCreatePromo, useDeletePromoItems, useEditPromos, useGetPromos } from '@/apis/promocodes'
  
  
export default function Rewards() {
    const {mutate: createPromo, isPending} = useCreatePromo()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [id, setId] = useState('')
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)

    const {data, isLoading} = useGetPromos()
    const {mutate: deletePromoItems} = useDeletePromoItems()
    const {mutate: editPromo} = useEditPromos()
    const [tab, setTab] = useState('')
    const [description, setDescription] = useState('')



  const addNewTab = () => {
   
        createPromo({title: tab, description: description},{
            onSuccess: () => {
              toast.success(`Content is added successfully.`);
              setOpen(false)
              setTab('')
              setDescription('')
            },
        })
    
      
    }

    const deletePromo = (data: string) => {
        deletePromoItems({id: data},{
                onSuccess: () => {
                  toast.success(`Data deleted successfully.`);
                  setOpen2(false)
                },
            })
          
    }

    const editPromosData = () => {
      
            editPromo({ id: id, title: tab, description: description},{
                onSuccess: () => {
                  toast.success(`Content updated successfully.`);
                  setOpen3(false)
                },
            })
       
        
      
    }
    

    useEffect(() => (
        setTab(''),
        setDescription('')
    ),  [open])

    const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
    
      useEffect(() => {
        setTotalpage(data?.totalpages || 0)
      },[data])


    

  return (
    <div className=' w-full flex flex-col text-sm bg-yellow-50 border-[1px] border-zinc-100 rounded-md p-8'>
        <h2 className=' text-lg font-bold'>Promo Codes</h2>

        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='mt-4 flex items-center justify-center gap-1 text-white w-fit bg-orange-500 px-3 py-1 rounded-sm'>
        <Plus size={15}/> Add 
      </DialogTrigger>
      <DialogContent className="p-6 bg-yellow-50 flex flex-col gap-1 max-w-[400px] w-full">
        <DialogHeader>
          <DialogTitle>Add Promo Code Content</DialogTitle>
          <DialogDescription>Fill out the form below.</DialogDescription>
        </DialogHeader>

        <label htmlFor="" className=' text-xs mt-4'>Title</label>
        <Input placeholder='Title' type='text' value={tab} onChange={(e) => setTab(e.target.value)}/>

        <label htmlFor="" className=' text-xs mt-2'>Description</label>
        <Textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>

        <div className=' flex items-end justify-end mt-4'>
            <Button disabled={isPending} onClick={addNewTab}>
                {isPending && (
                    <Loader type={'loader'}/>
                )}
                Save</Button>

        </div>
      </DialogContent>
    </Dialog>



       
       
       
         <Table className=' mt-8 p-4 text-xs'>
                    {data?.data.length === 0 && (
                        <TableCaption>No data</TableCaption>
        
                    )}
        
                     {isLoading && (
                        <TableCaption><Loader type={'loader-secondary'}/></TableCaption>
                    ) }
                <TableHeader>
                <TableRow>
                    <TableHead className="">Title</TableHead>
                    <TableHead className=" max-w-[300px] ">Description</TableHead>
                    <TableHead className="">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                           
                            <TableCell className=''>
                              <p className='max-w-[300px] text-xs whitespace-pre-wrap'>{item.description}</p>
                            </TableCell>
                            <TableCell className=''>
                              <div className=' flex items-center gap-2'>
                              <Dialog open={open2} onOpenChange={setOpen2}>
                              <DialogTrigger className=' flex items-center justify-center gap-1 text-white w-fit bg-red-500 p-1 rounded-sm'>
                                  <Trash size={15}/>
                              </DialogTrigger>
                              <DialogContent className="p-6 bg-yellow-50 max-w-[400px] w-full">
                                  <DialogHeader>
                                  <DialogTitle>Delete Data</DialogTitle>
                                  <DialogDescription>Are you sure you want to delete this data?</DialogDescription>
                                  </DialogHeader>

                                  <div className=' flex items-end justify-end mt-4'>
                                      <Button disabled={isPending} onClick={() => deletePromo(item.id)}>
                                          {isPending && (
                                              <Loader type={'loader'}/>
                                          )}
                                          Continue</Button>

                                  </div>
                              </DialogContent>
                              </Dialog>

                              <Dialog open={open3} onOpenChange={setOpen3}>
                              <DialogTrigger onClick={() =>{ setId(item.id), setTab(item.title),setDescription(item.description)}} className=' flex items-center justify-center gap-1 text-white w-fit bg-orange-500 p-1 rounded-sm'>
                                  <Pen size={15}/>
                              </DialogTrigger>
                              <DialogContent className="p-6 bg-yellow-50 flex flex-col gap-1 max-w-[400px] w-full">
                                  <DialogHeader>
                                  <DialogTitle>Edit Content</DialogTitle>
                                  <DialogDescription>Fill out the form below.</DialogDescription>
                                  </DialogHeader>

                                  <label htmlFor="" className=' text-xs mt-4'>Title</label>
                                  <Input placeholder='Title' type='text' value={tab} onChange={(e) => setTab(e.target.value)}/>

                                  <label htmlFor="" className=' text-xs mt-2'>Description</label>
                                  <Textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>


                                

                                  <div className=' flex items-end justify-end'>
                                      <Button disabled={isPending} onClick={() => editPromosData()}>
                                          {isPending && (
                                              <Loader type={'loader'}/>
                                          )}
                                      Save</Button>

                                  </div>
                              </DialogContent>
                              </Dialog>
                              </div>
                              

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
