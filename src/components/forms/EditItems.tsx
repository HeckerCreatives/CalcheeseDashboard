'use client'

import React, { useState } from 'react'
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
    CreateItems,
    createItemvalidations,
    CreateRobuxCode,
  createRobuxvalidations,
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'
import { useCreateRobux, useEditRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useEditItems, useGetItemsList } from '@/apis/items'
import { Button } from '../ui/button'


interface Props {
    id: string,
    itemcode: string,
    itemname: string
}

export default function EditItemsForm( prop: Props) {
    const {mutate: editItems, isPending} = useEditItems()
    const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateItems>({
    resolver: zodResolver(createItemvalidations),
    defaultValues: {
      itemcode: prop.itemcode,
      itemname: prop.itemname
    },
  })


  const onSubmit = (data: CreateItems) => {
     editItems({id: prop.id, itemname: data.itemname, itemid: data.itemcode},{
         onSuccess: () => {
           toast.success(`Item updated successfully`);
           setOpen(false)
         },
       })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
         <Pen size={12} />
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Items 
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            
           <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Robux Code</label>
              <Input
                placeholder="Item Code"
                type="text"
                {...register('itemcode')}
              />
              {errors.itemcode && (
                <p className="form-error">{errors.itemcode.message}</p>
              )}
            </div>
          
          </div>

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Name</label>
              <Input
                placeholder="Item Name"
                type="text"
                {...register('itemname')}
              />
              {errors.itemname && (
                <p className="form-error">{errors.itemname.message}</p>
              )}
            </div>
          
          </div>

   

          <div className="w-full flex justify-end gap-2">
            <Button disabled={isPending} className="">
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

