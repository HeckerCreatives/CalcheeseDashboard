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
  EditCodes,
  editCodesvalidations,
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'
import { useCreateRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useCreateTicket, useEditTicket, useGetTicketTypeList } from '@/apis/tickets'
import { useGetItemsList } from '@/apis/items'
import { Button } from '../ui/button'
import { useGetChestList } from '@/apis/chests'
import MultiSelect from '../common/Multiselect'
import { useUpdateCodes } from '@/apis/codes'

export interface Item {
  id: string;
  itemid: string;
  itemname: string;
  quantity: number;
}

export interface Chest {
  id: string;
  chestid: string;
  chestname: string;
}

export interface CodeData {
  id: string;
  code: string;
  status: 'to-claim' | 'claimed' | string; 
  chest: Chest;
  items: Item[];
  expiration: string;
  type: 'ingame' | string;
  isUsed: boolean;
  claimdate: string;
}

interface Props {
  ids: string[],
  codes: CodeData[]
  chestid: string,
  type: string
  status: string,
}


export default function EditCodeForm(prop: Props) {
    const [open, setOpen] = useState(false)
    // const {data} = useGetTicketTypeList()
    const {data: items} = useGetItemsList(0, 100, '')
    const {data: chest} = useGetChestList()
    const {data} = useGetItemsList(0, 100)
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const {mutate: updateCodes, isPending} = useUpdateCodes()

    
    
    
    

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<EditCodes>({
    resolver: zodResolver(editCodesvalidations),
    defaultValues: {
        chesttype: prop.codes[0]?.chest?.id,
        expiration: prop.codes[0]?.expiration,
        type: prop.type,
        status: prop.status

    },
  })


  const onSubmit = (data: EditCodes) => {
      updateCodes({ids: prop.ids, type: data.type, chest: data.chesttype, items: selectedItemIds, expiration: data.expiration, status: data.status },{
          onSuccess: () => {
            toast.success(`Code updated successfully`);
            setOpen(false)
          },
        })
  }

  useEffect(() => {
    if(prop){
        reset({
           chesttype: prop.codes[0]?.chest?.id,
           expiration: prop.codes[0]?.expiration,
           type: prop.type,
           status: prop.status
        })
    }
    
  },[prop])

     useEffect(() => {
     
        const ids = prop.codes[0]?.items.map(item => item.id);
        setSelectedItemIds(ids);
    }, [prop]);

console.log(errors)



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-3 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
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
              <label className="text-xs text-zinc-400">Chest</label>
              <Select defaultValue={prop.codes[0]?.chest?.id} onValueChange={(val) => setValue('chesttype', val)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chest" className="text-xs" />
                            </SelectTrigger>
                            <SelectContent>
                              {chest?.data.map((item) => (
                                <SelectItem key={item.id} value={item.id} className="text-xs">
                                  {item.chestname}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.chesttype && (
                            <p className="form-error">{errors.chesttype.message}</p>
                          )}
            </div>

             <div className="w-full flex flex-col gap-1">
                                <label className="text-xs text-zinc-400">Type</label>
                                <Select defaultValue={prop.type} onValueChange={(val) => setValue('type', val)}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder=" Type" className="text-xs" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem  value='robux' className="text-xs">
                                        Robux
                                      </SelectItem>
                                        <SelectItem  value='ticket' className="text-xs">
                                        Ticket
                                      </SelectItem>
                                       <SelectItem  value='ingame' className="text-xs">
                                        In Game
                                      </SelectItem>
                                  </SelectContent>
                                </Select>
                                {errors.type && (
                                  <p className="form-error">{errors.type.message}</p>
                                )}
                              </div>

                               <div className=" flex flex-col gap-1 w-full">
                                          <label className="text-xs text-zinc-400">Status</label>
                                          <Select defaultValue={prop.status} onValueChange={(val) => setValue('status', val)} >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder=" Status" className="text-xs" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem  value='claimed' className="text-xs">
                                                Claimed
                                              </SelectItem>
                                               <SelectItem  value='to-claim' className="text-xs">
                                                Unclaimed
                                              </SelectItem>
                                                <SelectItem  value='approved' className="text-xs">
                                                Approved
                                              </SelectItem>
                                               <SelectItem  value='rejected' className="text-xs">
                                                Rejected
                                              </SelectItem>
                                              <SelectItem  value='expired' className="text-xs">
                                                Expired
                                              </SelectItem>
                                          </SelectContent>
                                        </Select> 

                                          {errors.status && (
                                            <p className="form-error">{errors.status.message}</p>
                                            )}
                                        </div>

        

        
       

       

       
           <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Expiration</label>
            <Input
                placeholder="Ticket Name"
                type="date"
                {...register('expiration')}
              />
              {errors.expiration && (
                <p className="form-error">{errors.expiration.message}</p>
              )}
          </div>

          
                                           <div className="w-full flex flex-col gap-1">
                                                <label className="text-xs text-zinc-400">Items</label>
                                                <MultiSelect
                                                    data={data?.data}
                                                    onChange={(ids) => setSelectedItemIds(ids)} selectedIds={selectedItemIds}/>
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
