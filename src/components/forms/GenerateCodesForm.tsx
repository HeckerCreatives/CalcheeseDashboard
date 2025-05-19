'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Plus, Scan, X } from 'lucide-react'
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
import { useGenerateCodeslist, useGetChests } from '@/apis/codes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCodesvalidations, GenerateCodes } from '@/validations/schema'
import { useGetChestList } from '@/apis/chests'
import MultiSelect from '../common/Multiselect'
import { useGetItemsList } from '@/apis/items'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { io } from 'socket.io-client'



type ItemType = 'robux' | 'ticket'

interface Item {
  id: string
  itemtype?: ItemType
  quantity?: number
}

const allTypes: ItemType[] = ['robux', 'ticket']

export default function GenerateCodesForm() {
  // const { data } = useGetChests()
  const [items, setItems] = useState<Item[]>([])
  const {data: chest} = useGetChestList()
  const {data} = useGetItemsList()
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const {mutate: generateCodeslist, isPending} = useGenerateCodeslist()
  const [open, setOpen] = useState(false)
  const [socket, setSocket] = useState<any>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [progressStatus, setProgressStatus] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    setSocket(newSocket);

    newSocket.on('generate-progress', (data) => {
      if (data.percentage !== undefined) setProgress(data.percentage);
      if (data.status) setProgressStatus(data.status);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);


  

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<GenerateCodes>({
    resolver: zodResolver(createCodesvalidations),
    defaultValues: {
      
    },
  })

   const onSubmit = (data: GenerateCodes) => {
  if (!socket) {
    console.log("Socket connection not established");
    return;
  }

  generateCodeslist({
    chest: data.chest,
    expiration: data.expiration,
    codeamount: data.codeamount,
    type: data.type || '',
    items: selectedItemIds,
    socketid: socket.id // pass the socket ID to backend
  }, {
    onSuccess: () => {
      toast.success(`Codes generated successfully`);
      setOpen(false);
      setProgress(null);
      setProgressStatus(null);
    },
    onError: () => {
      reset();
      setOpen(false);
      setProgress(null);
      setProgressStatus(null);
    }
  });
}




  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer px-4 py-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <Scan size={15} />
        Generate
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Generate <span className="text-orange-500">Codes</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Chest</label>
            <Select onValueChange={(val) => setValue('chest', val)}>
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
            {errors.chest && (
              <p className="form-error">{errors.chest.message}</p>
            )}
          </div>

           <div className="w-full flex flex-col gap-1">
                      <label className="text-xs text-zinc-400">Expiration</label>
                      <Input
                          placeholder="Expiration"
                          type="date"
                          {...register('expiration')}
                        />
                        {errors.expiration && (
                          <p className="form-error">{errors.expiration.message}</p>
                        )}
                </div>

                 <div className="w-full flex flex-col gap-1">
                      <label className="text-xs text-zinc-400">Code Quantity</label>
                      <Input
                          placeholder="Quantity"
                          type="number"
                          {...register('codeamount',{valueAsNumber: true})}
                        />
                        {errors.codeamount && (
                          <p className="form-error">{errors.codeamount.message}</p>
                        )}
                </div>

                 <div className="w-full flex flex-col gap-1">
                    <label className="text-xs text-zinc-400">Type</label>
                    <Select onValueChange={(val) => setValue('type', val)}>
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

           <div className="w-full flex flex-col gap-1">
                <label className="text-xs text-zinc-400">Items</label>
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


                    {progress !== null && (
                      <div className="mt-4">
                        <div className="text-xs text-amber-950 mb-1">{progressStatus}</div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-orange-500 h-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

        </form>
      </DialogContent>
    </Dialog>
  )
}
