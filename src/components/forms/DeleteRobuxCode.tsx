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
import { useCreateRobux, useDeleteRobux, useEditRobux } from '@/apis/robux'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { on } from 'node:stream'
import { Button } from '../ui/button'

interface Props {
    id: string,
    code: string,
}

export default function DeleteRobuxCodeForm( prop: Props) {
    const {mutate: deleteRobux, isPending} = useDeleteRobux()
    const [open, setOpen] = useState(false)




  const onSubmit = () => {
    deleteRobux({robuxcodeid: prop.id},{
        onSuccess: () => {
          toast.success(`Robux code deleted successfully`);
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
            Delete ROBUX <span className="text-orange-500">Code</span>
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this robux code?</DialogDescription>
        </DialogHeader>

        <p className=' text-xs'>Code: <span className=' text-lg font-semibold text-red-600'>{prop.code}</span></p>

        <div className="w-full flex justify-end gap-2">
            <Button onClick={() => onSubmit()} disabled={isPending}>
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
