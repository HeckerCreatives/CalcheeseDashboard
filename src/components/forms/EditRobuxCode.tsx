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
import { useGetChests } from '@/apis/codes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    CreateRobuxCode,
  createRobuxvalidations,
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'
import { useCreateRobux, useEditRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'

interface Props {
    id: string,
    code: string,
    amount: number
}

export default function EditRobuxCodeForm( prop: Props) {
    const {mutate: editRobux, isPending} = useEditRobux()
    const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateRobuxCode>({
    resolver: zodResolver(createRobuxvalidations),
    defaultValues: {
      amount: prop.amount,
      code: prop.code
    },
  })


  const onSubmit = (data: CreateRobuxCode) => {
    editRobux({robuxcodeid: prop.id, robuxcode: data.code, amount: data.amount},{
        onSuccess: () => {
          toast.success(`Robux code updated successfully`);
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
            Edit ROBUX <span className="text-orange-500">Code</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Code</label>
            <Input
                placeholder="Code"
                type="text"
                {...register('code')}
              />
              {errors.code && (
                <p className="form-error">{errors.code.message}</p>
              )}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Amount</label>
              <Input
                placeholder="Amount"
                type="number"
                {...register('amount', { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="form-error">{errors.amount.message}</p>
              )}
            </div>
          
          </div>

   

          <div className="w-full flex justify-end gap-2">
            <button disabled={isPending} type="submit" className="primary-btn">
                {isPending && (
                    <Loader type={'loader'}/>
                )}
              Save
            </button>
            <button onClick={() => setOpen(false)} type="button" className="ghost-btn">
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
