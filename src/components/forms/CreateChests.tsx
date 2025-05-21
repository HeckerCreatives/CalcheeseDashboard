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
  CreateChests,
    createChestvalidations,
    CreateItems,
    createItemvalidations,
    CreateRobuxCode,
  createRobuxvalidations,
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'
import { useCreateRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { Button } from '../ui/button'
import { useCreateItems, useGetItemsList } from '@/apis/items'
import { useCreateChest } from '@/apis/chests'
import MultiSelect from '../common/Multiselect'

type ItemType = 'robux' | 'ticket'

interface Item {
  id: string
  itemtype?: ItemType
  quantity?: number
}

const allTypes: ItemType[] = ['robux', 'ticket']

export default function CreateChestForm() {
    const {mutate: createChest, isPending} = useCreateChest()
    const [open, setOpen] = useState(false)
    const {data} = useGetItemsList(0, 100)
   const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);


    

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateChests>({
    resolver: zodResolver(createChestvalidations),
    defaultValues: {
      
    },
  })


  const onSubmit = (data: CreateChests) => {
    createChest({chestid: data.chestid, chestname: data.chestname, itemid: selectedItemIds},{
        onSuccess: () => {
          toast.success(`Chest created successfully`);
          setOpen(false)
        },
      })
  }


  console.log(selectedItemIds)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer px-4 py-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <SquarePlus size={15} />
        Create
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create Chest 
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
           <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Chest id</label>
              <Input
                placeholder="Chest id"
                type="text"
                {...register('chestid')}
              />
              {errors.chestid && (
                <p className="form-error">{errors.chestid.message}</p>
              )}
            </div>
          
          </div>

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Chest Name</label>
              <Input
                placeholder="Chest Name"
                type="text"
                {...register('chestname')}
              />
              {errors.chestname && (
                <p className="form-error">{errors.chestname.message}</p>
              )}
            </div>
          
          </div>

            <div className="w-full flex flex-col gap-1">
                      <label className="text-xs text-zinc-400">Item</label>
                    
                      <MultiSelect
              data={data?.data}
              onChange={(ids) => setSelectedItemIds(ids)}  selectedIds={selectedItemIds}                   />
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
