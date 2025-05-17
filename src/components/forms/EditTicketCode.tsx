'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Pen, Plus, Scan, SquarePlus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    CreateRobuxCode,
  createRobuxvalidations,
  CreateTicketCode,
  createTicketvalidations,
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'
import { useCreateRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useCreateTicket, useEditTicket, useGetTicketTypeList } from '@/apis/tickets'
import { useGetItemsList } from '@/apis/items'
import { Button } from '../ui/button'

interface Props {
    id: string
    ticketid: string,
    item: string
    category: string
    tickettype: string
    ticketname: string
}


export default function EditTicketCodeForm(prop: Props) {
    const {mutate: editTicket, isPending} = useEditTicket()
    const [open, setOpen] = useState(false)
    // const {data} = useGetTicketTypeList()
    const {data: items} = useGetItemsList()
    

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<CreateTicketCode>({
    resolver: zodResolver(createTicketvalidations),
    defaultValues: {
     ticketid: prop.ticketid,
     item: prop.item,
     category: prop.category,
     tickettype: prop.tickettype,
     ticketname: prop.ticketname
    },
  })


  const onSubmit = (data: CreateTicketCode) => {
     editTicket({id:prop.id,ticketid: data.ticketid, item: data.item, category: data.tickettype, tickettype: data.tickettype, ticketname: data.ticketname },{
         onSuccess: () => {
           toast.success(`Ticket code updated successfully`);
           setOpen(false)
         },
       })
  }

  useEffect(() => {
    if(prop){
        reset({
             ticketid: prop.ticketid,
            item: prop.item,
            category: prop.category,
            tickettype: prop.tickettype,
            ticketname: prop.ticketname
        })
    }
    
  },[prop])



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <Pen size={12} />
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Ticket <span className="text-orange-500">Code</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
           <div className="w-full flex flex-col gap-1">
                      <label className="text-xs text-zinc-400">Item</label>
                      <Select defaultValue={prop.item} onValueChange={(val) => setValue('item', val)}>
                      <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                          {items?.data.map((item, index) => (
                          <SelectItem key={item.id} value={item.id}>{item.itemname}</SelectItem>
                          ))}
                        
                      </SelectContent>
                      </Select>
              </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Ticket Id</label>
            <Input
                placeholder="Ticket Id"
                type="text"
                {...register('ticketid')}
              />
              {errors.ticketid && (
                <p className="form-error">{errors.ticketid.message}</p>
              )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Category</label>
            <Input
                placeholder="Category"
                type="text"
                {...register('category')}
              />
              {errors.category && (
                <p className="form-error">{errors.category.message}</p>
              )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Ticket Type</label>
            <Input
                placeholder="Ticket Type"
                type="text"
                {...register('tickettype')}
              />
              {errors.tickettype && (
                <p className="form-error">{errors.tickettype.message}</p>
              )}
          </div>

         <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Ticket Name</label>
            <Input
                placeholder="Ticket Name"
                type="text"
                {...register('ticketname')}
              />
              {errors.ticketname && (
                <p className="form-error">{errors.ticketname.message}</p>
              )}
          </div>

         

   

          <div className="w-full flex justify-end gap-2">
            <Button disabled={isPending} >
                            {isPending && (
                                <Loader type={'loader'}/>
                            )}
                          Save
                        </Button>
            <button onClick={() => setOpen(false)} type="button" className="ghost-btn">
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
