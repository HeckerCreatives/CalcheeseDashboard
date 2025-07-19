'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { ArrowUp, Scan } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AssignCodes, assignCodesvalidations, createCodesvalidations } from '@/validations/schema'
import { useAssignCodes, useGenerateCodeslist, useGetCodesList } from '@/apis/codes'
import { useGetItemsList } from '@/apis/items'
import MultiSelect from '../common/Multiselect'
import { io } from 'socket.io-client'
import Loader from '../common/Loader'
import { Label } from '../ui/label'


interface Props {
  progress: number | null
  status: string | null
  setProgress: (val: number | null) => void
  setStatus: (val: string | null) => void
}



const manufacturers = [
    { name: 'HBYX', type: "hbyx", index: 7562500, lte: '6855837ebdd1ec953592809f', gt: null },
    { name: 'DYTH', type: "dyth", index: 13282500, lte: '68558c74bdd1ec9535e9d62a', gt: '6855837ebdd1ec953592809f' },
    { name: 'HBYX 48g', type: "hbyx2", index: 30106030, lte: '6855a659bdd1ec9535eab284', gt: '68558c74bdd1ec9535e9d62a' },
    { name: 'AMX 48g', type: "amx", index: 42341913, lte: '685ce0ac6808bd1490a2cf1f', gt: '6855a659bdd1ec9535eab284' }
];

export default function AssignCodesForm({
  progress,
  status,
  setProgress,
  setStatus,
}: Props) {
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AssignCodes>({
    resolver: zodResolver(assignCodesvalidations),
  })

  const selectedType = watch('type')
  const selectedRarity = watch('rarity')
  const [rarity, setRarity] = useState('')
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])
  const { data } = useGetItemsList(0, 100, selectedType, selectedRarity)
  const { mutate: assignCodes, isPending } = useAssignCodes()
  const [open, setOpen] = useState(false)
  const [socket, setSocket] = useState<any>(null)
  const [formattedValue, setFormattedValue] = useState('')
    const { refetch} = useGetCodesList(0, 10, '','', '', '','', '', false)
  

  const MAX_VALUE = 100_000_000

  useEffect(() => {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`)
      setSocket(newSocket)
  
      newSocket.on('generate-items-progress', (data) => {
        if (data.percentage !== undefined) setProgress(data.percentage)
        if (data.status) setStatus(data.status)

        if(data.percentage === 100) refetch()

         console.log(data)

      })
  
      return () => {
        newSocket.disconnect()
      }
    }, [setProgress, setStatus])


 const onSubmit = async (formData: AssignCodes) => {
  if (!socket) {
    toast.error('Socket not connected')
    return
  }

  const mutation = new Promise<void>((resolve, reject) => {
     assignCodes(
       {
         manufacturer: formData.manufacturer , type: formData.type, rarity: formData.rarity, itemid: formData.itemid, codesamount: formData.codesamount, socketid: socket.id
       },
       {
         onSuccess: () => {
           reset()
           setFormattedValue('')
           setOpen(false)
            setProgress(null)
            setStatus(null)
           resolve()
         },
         onError: () => {
           setOpen(false)
            setProgress(null)
            setStatus(null)
           reject()
         },
       }
     )
  })

  toast.promise(mutation, {
    loading: `Assigning codes...`,
    success: 'Generating codes...',
    error: 'Failed to assign codes',
  })
}


  useEffect(() => {
    if (!open) {
      reset()
      setFormattedValue('')
      setSelectedItemIds([])
      setRarity('')
    }
  }, [open])






  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer px-4 py-2 text-xs bg-orange-500 text-white flex items-center gap-1 rounded-sm">
        <ArrowUp size={15} />
        Assign
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Assign <span className="text-orange-500">Codes</span>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          

            <div className="flex flex-col gap-1 mt-4">
                <label className="text-xs text-zinc-400">Manufacturer</label>

                <Select onValueChange={(val) => setValue('manufacturer', val)}>
                <SelectTrigger className=' w-full'>
                    <SelectValue placeholder="Select Manufacturer" />
                </SelectTrigger>
                <SelectContent>
                    {manufacturers.map((item, index) => (
                    <SelectItem key={index} value={item.type}>{item.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {errors.manufacturer && <p className="form-error">{errors.manufacturer.message}</p>}

            </div>

             <div className="w-full flex flex-col gap-1">
                        <label className="text-xs text-zinc-400">Reward Type</label>
                        <Select onValueChange={(val) => setValue('type', val)}>
                          <SelectTrigger className=' w-full'>
                            <SelectValue placeholder="Select" className="text-xs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chest" className="text-xs">Chest</SelectItem>
                            <SelectItem value="ingame" className="text-xs">Ingame</SelectItem>
                            <SelectItem value="exclusive" className="text-xs">Exclusive Items</SelectItem>
                            <SelectItem value="robux" className="text-xs">Robux</SelectItem>
                            <SelectItem value="ticket" className="text-xs">Tickets</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.type && <p className="form-error">{errors.type.message}</p>}
                      </div>
            
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-400">Rarity</label>
                          <Select onValueChange={(val) => setValue('rarity', val)}>
                            <SelectTrigger className=' w-full'>
                              <SelectValue placeholder="Select" className="text-xs" />
                            </SelectTrigger>
                            <SelectContent>
                              {['common', 'uncommon', 'rare', 'epic', 'legendary'].map((r) => (
                                <SelectItem key={r} value={r} className="text-xs">
                                  {r.charAt(0).toUpperCase() + r.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-zinc-400">Item</label>
                          <Select onValueChange={(val) => setValue('itemid', val)}>
                            <SelectTrigger className=' w-full'>
                              <SelectValue placeholder="Select" className="text-xs" />
                            </SelectTrigger>
                            <SelectContent>
                              {data?.data.map((item, index) => (
                                <SelectItem key={index} value={item.id} className="text-xs">
                                  {item.itemname}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>


                <div className="w-full flex flex-col gap-1">
                    <label className="text-xs text-zinc-400">Code Quantity</label>
                    <Input type="text" {...register('codesamount',{valueAsNumber: true})} />
                    {errors.codesamount && <p className="form-error">{errors.codesamount.message}</p>}
                  </div>



            

            <Button disabled={isPending}>
                          {isPending && <Loader type="loader" />}
                          Generate
                        </Button>


              {progress !== null && (
                    <div className="mt-4">
                    <div className="text-xs text-amber-950 mb-1">{status}</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                        className="bg-orange-500 h-full transition-all duration-300"
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
