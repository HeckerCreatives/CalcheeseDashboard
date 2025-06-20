'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Plus, Scan, SquarePlus, X } from 'lucide-react'
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
import { useCreateTicket, useGetTicketTypeList } from '@/apis/tickets'
import { useGetItemsList } from '@/apis/items'
import { Button } from '../ui/button'

type ItemType = 'robux' | 'ticket'

interface Item {
  id: string
  itemtype?: ItemType
  quantity?: number
}

const allTypes: ItemType[] = ['robux', 'ticket']

export default function CreateTicketCodeForm() {
    const {mutate: createTicket, isPending} = useCreateTicket()
    const [open, setOpen] = useState(false)
    const {data: items} = useGetItemsList(0,100,'ticket')
    

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
      
    },
  })


  const onSubmit = (data: CreateTicketCode) => {
     createTicket({ticketid: data.ticketid, item: data.item, category: data.tickettype, tickettype: data.tickettype, ticketname: data.ticketname },{
         onSuccess: () => {
           toast.success(`Ticket code created successfully`);
           setOpen(false)
           reset()
         },
       })
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer px-4 py-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <SquarePlus size={15} />
        Create
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create Ticket <span className="text-orange-500">Code</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
           {/* <div className="w-full flex flex-col gap-1">
                      <label className="text-xs text-zinc-400">Item</label>
                      <Select onValueChange={(val) => setValue('item', val)}>
                      <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                          {items?.data
                            .filter((item) =>
                              ['Disneyland', 'Ocean Park', 'Enchanted Kingdom'].some(keyword =>
                                item.itemname.includes(keyword)
                              )
                            )
                            .map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.itemname}
                              </SelectItem>
                          ))}
                        
                      </SelectContent>
                      </Select>
            </div> */}

            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Items</label>
              <Select  onValueChange={(val) => setValue('item', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" className="text-xs" />
                </SelectTrigger>
                <SelectContent>
                  {items?.data.map((item, index) => (
                    <SelectItem key={item.id}  value={item.id} className="text-xs">{item.itemname}</SelectItem>
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
