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
import { Scan } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCodesvalidations, GenerateCodes } from '@/validations/schema'
import { useGenerateCodeslist } from '@/apis/codes'
import { useGetItemsList } from '@/apis/items'
import MultiSelect from '../common/Multiselect'
import { io } from 'socket.io-client'
import Loader from '../common/Loader'

interface GenerateCodesFormProps {
  progress: number | null
  status: string | null
  setProgress: (val: number | null) => void
  setStatus: (val: string | null) => void
}

export default function GenerateCodesForm({
  progress,
  status,
  setProgress,
  setStatus,
}: GenerateCodesFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<GenerateCodes>({
    resolver: zodResolver(createCodesvalidations),
  })

  const selectedType = watch('type')
  const [rarity, setRarity] = useState('')
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])
  const { data } = useGetItemsList(0, 100, selectedType, rarity)
  const { mutate: generateCodeslist, isPending } = useGenerateCodeslist()
  const [open, setOpen] = useState(false)
  const [socket, setSocket] = useState<any>(null)
  const [formattedValue, setFormattedValue] = useState('')

  const MAX_VALUE = 1_000_000

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`)
    setSocket(newSocket)

    newSocket.on('generate-progress', (data) => {
      if (data.percentage !== undefined) setProgress(data.percentage)
      if (data.status) setStatus(data.status)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [setProgress, setStatus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '')
    let numberValue = parseInt(rawValue, 10)

    if (!isNaN(numberValue)) {
      if (numberValue > MAX_VALUE) numberValue = MAX_VALUE
      setFormattedValue(numberValue.toLocaleString())
      setValue('codeamount', numberValue)
    } else {
      setFormattedValue('')
      setValue('codeamount', 0)
    }
  }

 const onSubmit = async (formData: GenerateCodes) => {
  if (!socket) {
    toast.error('Socket not connected')
    return
  }

  const mutation = new Promise<void>((resolve, reject) => {
    generateCodeslist(
      {
        chest: '',
        expiration: formData.expiration,
        codeamount: formData.codeamount,
        type: formData.type || '',
        items: selectedItemIds,
        socketid: socket.id,
        length: formData.nocharacters,
        rarity,
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
    loading: `Generating codes...`,
    success: 'Codes generated successfully!',
    error: 'Failed to generate codes',
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

  useEffect(() => {
    setSelectedItemIds([])
  }, [rarity])


  useEffect(() => {
  if (progress === 100) {
    const timer = setTimeout(() => {
      setProgress(null)
      setStatus(null)
    }, 1000) // Delay to let user see 100% briefly

    return () => clearTimeout(timer)
  }
}, [progress])

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
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">No. of Characters</label>
            <Select onValueChange={(val) => setValue('nocharacters', Number(val))}>
              <SelectTrigger className=' w-full'>
                <SelectValue placeholder="Select" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                {['7', '8', '9', '10', '11', '12'].map((num) => (
                  <SelectItem key={num} value={num} className="text-xs">
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.nocharacters && <p className="form-error">{errors.nocharacters.message}</p>}
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

          {selectedType && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Rarity</label>
              <Select value={rarity} onValueChange={setRarity}>
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
          )}

          {selectedType && rarity && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Items</label>
              <MultiSelect data={data?.data} onChange={setSelectedItemIds} selectedIds={selectedItemIds} />
            </div>
          )}

          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Expiration</label>
            <Input type="date" {...register('expiration')} />
            {errors.expiration && <p className="form-error">{errors.expiration.message}</p>}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Code Quantity</label>
            <Input type="text" value={formattedValue} onChange={handleInputChange} />
            {errors.codeamount && <p className="form-error">{errors.codeamount.message}</p>}
          </div>

          <div className="w-full flex justify-end gap-2 mt-4">
            <Button disabled={isPending}>
              {isPending && <Loader type="loader" />}
              Generate
            </Button>
            <button type="button" className="ghost-btn" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>


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
