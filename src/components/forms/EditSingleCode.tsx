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
  rarity: string
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
  rarity: string
}

interface Props {
  ids: string[],
  codes: CodeData[]
  chestid: string,
  type: string
  status: string,
  length: string
  rarity: string,
  open: boolean,
  onCLick?: () => void,
  onClose?: () => void,
  archive: any
}


export default function EditSingleCodeForm(prop: Props) {

     const {
        register,
        handleSubmit,
        setValue,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm<EditCodes>({
        resolver: zodResolver(editCodesvalidations),
        defaultValues: {
            // chesttype: prop.codes[0]?.chest?.id,
            expiration: prop.codes[0]?.expiration,
            type: prop.type,
            status: prop.status

        },
    })


  const selectedType = watch('type');

    const [open, setOpen] = useState(false)
        const [rarity, setRarity] = useState('')
    
    // const {data} = useGetTicketTypeList()
    const {data: items} = useGetItemsList(0, 100)
    const {data: chest} = useGetChestList()
    const {data} = useGetItemsList(0, 100, selectedType, rarity)
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const {mutate: updateCodes, isPending} = useUpdateCodes()
    const [status, setStatus] = useState('')
    const [archive, setArchive] = useState('false')
    
    

    
    
    
    

 

  const onSubmit = (data: EditCodes) => {
    console.log(data)
      updateCodes({ids: prop.ids, type: data.type, chest: '', items: selectedItemIds, expiration: data.expiration, status: status, rarity: rarity},{
          onSuccess: () => {
            toast.success(`Code updated successfully`);
            // setOpen(false)
            reset()
             prop.onClose?.(); 
          },
        })
  }

  useEffect(() => {
    if(prop){
        reset({
        //    chesttype: prop.codes[0]?.chest?.id,
           expiration: prop.codes[0]?.expiration,
           type: prop.type,
           status: prop.status
        })
    }

    setRarity(prop.codes[0]?.items[0]?.rarity)
    // setRarity(prop.codes[0]?.rarity)
    setStatus(prop.codes[0]?.status)
    
  },[prop])

     useEffect(() => {
     
        const ids = prop.codes[0]?.items.map(item => item.id);
        setSelectedItemIds(ids);
        setOpen(prop.open)
    }, [prop]);


    useEffect(() => {
      if(selectedType !== prop.type){
      setSelectedItemIds([])

      }
    },[selectedType])






  return (
    <Dialog open={prop.open} onOpenChange={(val) => {
  if (!val) prop.onClose?.();
}} >
      {/* <DialogTrigger className="cursor-pointer p-3 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <Pen size={12} />
      </DialogTrigger> */}
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50 shadow-md ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit <span className="text-orange-500">Code</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
          

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

             <div className=" flex flex-col gap-1">
                         <label className="text-xs text-zinc-400">Rarity</label>
                         <Select value={rarity} onValueChange={setRarity} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder=" Select" className="text-xs" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem  value='common' className="text-xs">Common</SelectItem>
                            <SelectItem  value='uncommon' className="text-xs">Uncommon</SelectItem>
                            <SelectItem  value='rare' className="text-xs">Rare</SelectItem>
                            <SelectItem  value='epic' className="text-xs">Epic</SelectItem>
                            <SelectItem  value='legendary' className="text-xs">Legendary</SelectItem>
                        
                        </SelectContent>
                        </Select>
                     </div>
            


                                            <div className="w-full flex flex-col gap-1">
                                                <label className="text-xs text-zinc-400">Items</label>
                                                <MultiSelect
                                                    data={data?.data}
                                                    onChange={(ids) => setSelectedItemIds(ids)} selectedIds={selectedItemIds}/>
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


           <div className=" flex flex-col gap-1">
                                                                  <label className="text-xs text-zinc-400">Status</label>
                                                                  <Select value={status} onValueChange={setStatus} >
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
                                                                        {/* <SelectItem  value='to-generate' className="text-xs">
                                                                        To-Generate
                                                                      </SelectItem> */}
                                                                   
                                                                  </SelectContent>
                                                                </Select> 
                                            </div>



          
                                       

         
          <div className="w-full flex justify-end gap-2">
            <Button disabled={isPending} className=' cursor-pointer' >
                {isPending && (
                    <Loader type={'loader'}/>
                )}
              Save
            </Button>
            <button onClick={() => prop.onClose?.() } type="button" className="ghost-btn cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
