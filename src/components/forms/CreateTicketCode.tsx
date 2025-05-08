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
import { useGetChests } from '@/apis/codes'
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
    const {data} = useGetTicketTypeList()

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateTicketCode>({
    resolver: zodResolver(createTicketvalidations),
    defaultValues: {
      
    },
  })


  const onSubmit = (data: CreateTicketCode) => {
     createTicket({ticketcode: data.code, tickettype: data.type},{
         onSuccess: () => {
           toast.success(`Ticket code created successfully`);
           setOpen(false)
         },
       })
  }

  console.log(data)

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
          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Code</label>
            <Input
                placeholder="Code"
                type="text"
                {...register('code')}
              />
              {errors.code && (
                <p className="form-error">{errors.code.message}</p>
              )}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Ticket Type</label>
              <Select
              onValueChange={(val) => setValue('type', val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                {data?.data.map((type) => (
                  <SelectItem
                    key={type._id}
                    value={type._id}
                   
                    className="text-xs"
                  >
                    {type.ticketname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          
          </div>

         

   

          <div className="w-full flex justify-end gap-2">
            <button disabled={isPending} type="submit" className="primary-btn">
                            {isPending && (
                                <Loader type={'loader'}/>
                            )}
                          Save
                        </button>
            <button onClick={() => setOpen(false)} type="button" className="ghost-btn">
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
