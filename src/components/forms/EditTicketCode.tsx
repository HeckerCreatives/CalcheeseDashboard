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
import { useCreateTicket, useEditTicket, useGetTicketTypeList } from '@/apis/tickets'

interface Props {
    code: string
    type: string
    id: string
}
export default function EditTicketCodeForm(prop: Props) {
    const {mutate: editTicket, isPending} = useEditTicket()
    const [open, setOpen] = useState(false)
    const {data} = useGetTicketTypeList()

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
      type: prop.type,
      code: prop.code
    },
  })


  const onSubmit = (data: CreateTicketCode) => {
     editTicket({ticketcode: data.code,ticketid: prop.id, tickettype: data.type},{
         onSuccess: () => {
           toast.success(`Ticket code updated successfully`);
           setOpen(false)
         },
       })
  }

  useEffect(() => {
    if(prop){
        reset({
            code: prop.code,
            type: prop.type
        })
    }
    
  },[prop])

  console.log(prop)


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
              defaultValue={prop.type}
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
