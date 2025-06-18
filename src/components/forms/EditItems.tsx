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
    itemname: string,
    quantity: number
    type: string
    rarity: string
}

export default function EditItemsForm( prop: Props) {
    const {mutate: editItems, isPending} = useEditItems()
    const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<CreateItems>({
    resolver: zodResolver(createItemvalidations),
    defaultValues: {
      // itemcode: prop.itemcode,
      itemname: prop.itemname,
      quantity: prop.quantity,
      type: prop.type,
      rarity: prop.rarity
    },
  })


  const onSubmit = (data: CreateItems) => {
     editItems({id: prop.id, itemname: data.itemname, itemid:'', quantity: data.quantity, category: data.type, rarity: data.rarity},{
         onSuccess: () => {
           toast.success(`Item updated successfully`);
           setOpen(false)
         },
       })
  }

  useEffect(() => {
    if(prop){
      reset({
        //  itemcode: prop.itemcode,
        itemname: prop.itemname,
        quantity: prop.quantity,
      type: prop.type,
      rarity: prop.rarity


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
            Edit Items 
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            
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

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
              
        
                   <div className="w-full flex flex-col gap-1">
                    <label className="text-xs text-zinc-400">Reward Type</label>
                    <Select defaultValue={prop.type} onValueChange={(val) => setValue('type', val)}>
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
                              <Select defaultValue={prop.rarity} onValueChange={(val) => setValue('rarity', val)}>
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

