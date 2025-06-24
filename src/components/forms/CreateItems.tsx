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
import { useCreateItems } from '@/apis/items'

type ItemType = 'robux' | 'ticket'

interface Item {
  id: string
  itemtype?: ItemType
  quantity?: number
}

const allTypes: ItemType[] = ['robux', 'ticket']

const typeOptions = [
  { name: "Chest", value: "chest" },
  { name: "Ingame", value: "ingame" },
  { name: "Exclusive Items", value: "exclusive" },
  // { name: "Items", value: "item" },
  { name: "Robux", value: "robux" },
  { name: "Tickets", value: "ticket" },
];


export default function CreateItemsForm() {
    const {mutate: createItems, isPending} = useCreateItems()
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateItems>({
    resolver: zodResolver(createItemvalidations),
    defaultValues: {
    },
  })


  const onSubmit = (data: CreateItems) => {
   createItems({itemid: '', itemname: data.itemname, quantity: data.quantity, category: data.type, rarity: data.rarity, code: code},{
       onSuccess: () => {
         toast.success(`Item created successfully`);
         setOpen(false)
         reset()
       },
     })
  }

  const selectedType = watch('type')


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer px-4 py-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <SquarePlus size={15} />
        Create
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create Items 
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
           <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Item Code</label>
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
              <label className="text-xs text-zinc-400">Item Name</label>
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

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Quantity</label>
              <Input
                placeholder="Quantity"
                type="number"
                {...register('quantity', {valueAsNumber: true})}
              />
              {errors.quantity && (
                <p className="form-error">{errors.quantity.message}</p>
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
        </form> */}

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
      

           <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Reward Type</label>
            <Select onValueChange={(val) => setValue('type', val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder=" Type" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem  value='chest' className="text-xs">Chest</SelectItem>
                <SelectItem  value='ingame' className="text-xs">Ingame</SelectItem>
                <SelectItem  value='exclusive' className="text-xs">Exclusive Items</SelectItem>
                <SelectItem  value='robux' className="text-xs">Robux</SelectItem>
                <SelectItem  value='ticket' className="text-xs">Tickets</SelectItem>
               
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="form-error">{errors.type.message}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Rarity</label>
            <Select onValueChange={(val) => setValue('rarity', val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder=" Type" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem  value='common' className="text-xs">Common</SelectItem>
                <SelectItem  value='uncommon' className="text-xs">Uncommon</SelectItem>
                <SelectItem  value='rare' className="text-xs">Rare</SelectItem>
                <SelectItem  value='epic' className="text-xs">Epic</SelectItem>
                <SelectItem  value='legendary' className="text-xs">Legendary</SelectItem>
               
              </SelectContent>
            </Select>
            {errors.rarity && (
              <p className="form-error">{errors.rarity.message}</p>
            )}
          </div>

          {/* {selectedType === 'ticket' && (
             <div className="flex items-center gap-4">
              <div className="w-full flex flex-col gap-1">
                <label className="text-xs text-zinc-400">Ticket Code</label>
                <Input
                  placeholder="Ticket Code"
                  type="text"
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                />
                {errors.itemname && (
                  <p className="form-error">{errors.itemname.message}</p>
                )}
              </div>
            
            </div>
          )} */}

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Item Name</label>
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

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Quantity</label>
              <Input
                placeholder="Quantity"
                type="number"
                {...register('quantity', {valueAsNumber: true})}
              />
              {errors.quantity && (
                <p className="form-error">{errors.quantity.message}</p>
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
