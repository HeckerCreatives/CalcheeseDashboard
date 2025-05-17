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
import { useCreateChest, useEditChest } from '@/apis/chests'
import MultiSelect from '../common/Multiselect'

type ItemType = 'robux' | 'ticket'

type Item = {
  id: string;
  itemid: string;
  itemname: string;

};

interface Props {
  chestid: string
  chestname: string
  items: Item []
  id: string
}

const allTypes: ItemType[] = ['robux', 'ticket']

export default function EditChestForm(prop: Props) {
    const {mutate: editChest, isPending} = useEditChest()
    const [open, setOpen] = useState(false)
    const {data} = useGetItemsList()
   const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

   useEffect(() => {
   
      const ids = prop.items.map(item => item.id);
      setSelectedItemIds(ids);
  }, [prop.items]);

  console.log(prop, selectedItemIds)


    

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<CreateChests>({
    resolver: zodResolver(createChestvalidations),
    defaultValues: {
      chestid: prop.chestid,
      chestname: prop.chestname
    },
  })


  const onSubmit = (data: CreateChests) => {
    editChest({id:prop.id,chestid: data.chestid, chestname: data.chestname, itemid: selectedItemIds},{
        onSuccess: () => {
          toast.success(`Chest updated successfully`);
          setOpen(false)
        },
      })
  }


  useEffect(() => {
        if(prop){
            reset({
                 chestid: prop.chestid,
                chestname: prop.chestname
            })
        }
        
      },[prop])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <Pen size={15} />
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Chest 
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
              onChange={(ids) => setSelectedItemIds(ids)} selectedIds={selectedItemIds}/>
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
