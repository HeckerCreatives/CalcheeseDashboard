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
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'
import { useCreateRobux, useEditRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useGetItemsList } from '@/apis/items'
import { Button } from '../ui/button'

interface Props {
    id: string,
    code: string,
    item: string,
    name: string
    status: string
}

export default function EditRobuxCodeForm( prop: Props) {
    const {mutate: editRobux, isPending} = useEditRobux()
    const [open, setOpen] = useState(false)
  const {data} = useGetItemsList(0,100)
    

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<CreateRobuxCode>({
    resolver: zodResolver(createRobuxvalidations),
    defaultValues: {
      code: prop.code,
      item: prop.item,
      name: prop.name
    },
  })


  const onSubmit = (data: CreateRobuxCode) => {
    editRobux({robuxcodeid: prop.id, robuxcode: data.code, item: data.item, name: data.name, status: ''},{
        onSuccess: () => {
          toast.success(`Robux code updated successfully`);
          setOpen(false)
        },
      })
  }

  
    useEffect(() => {
      if(prop){
          reset({
              code: prop.code,
              item: prop.item,
              name: prop.name
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
            Edit ROBUX <span className="text-orange-500">Code</span>
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
              
                {data?.data
                 .filter((item) =>
                  ['ROBUX', 'Robux'].some(keyword =>
                    item.itemname.includes(keyword)
                  )
                )
                .map((item, index) => (
                <SelectItem value={item.id}>{item.itemname}</SelectItem>
                ))}
              
            </SelectContent>
            </Select>
          </div>

         
                  
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
              <label className="text-xs text-zinc-400">Name</label>
              <Input
                placeholder="Name"
                type="text"
                {...register('name')}
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
            </div>
          
          </div>

   

          <div className="w-full flex justify-end gap-2">
            <Button disabled={isPending} type="submit">
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
