'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Pen, Plus, Scan, SquarePlus, Trash, X } from 'lucide-react'
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
import { useCreateRobux, useDeleteRobux, useEditRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { on } from 'node:stream'
import { useDeleteTicket } from '@/apis/tickets'
import { Button } from '../ui/button'
import { useDeleteChest } from '@/apis/chests'

interface Props {
    id: string,
    name: string,
}

export default function DeleteChestForm( prop: Props) {
    const {mutate: deleteChest, isPending} = useDeleteChest()
    const [open, setOpen] = useState(false)




  const onSubmit = () => {
    deleteChest({id: prop.id},{
        onSuccess: () => {
          toast.success(`Chest deleted successfully`);
          setOpen(false)
        },
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-2 text-xs bg-red-600 text-white flex items-center gap-1 rounded-sm">
        <Trash size={12} />
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Delete Chest
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this chest?</DialogDescription>
        </DialogHeader>

        <p className=' text-xs'>Chest Name: <span className=' text-lg font-semibold text-red-600'>{prop.name}</span></p>

        <div className="w-full flex justify-end gap-2">
            <Button onClick={() => onSubmit()} disabled={isPending} >
                {isPending && (
                    <Loader type={'loader'}/>
                )}
              Continue
            </Button>
            <button onClick={() => setOpen(false)} type="button" className="ghost-btn">
              Cancel
            </button>
          </div>
      </DialogContent>
    </Dialog>
  )
}
