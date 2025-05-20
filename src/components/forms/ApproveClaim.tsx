'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Pen, Plus, Scan, SquarePlus, TicketCheck, Trash, X } from 'lucide-react'
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
import { useApproveClaim, useGetChests } from '@/apis/codes'
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

interface Props {
    id: string,
    status: string,
    code: string
    name: string
}

export default function ApproveClaimForm( prop: Props) {
    const {mutate: deleteTicket, isPending} = useDeleteTicket()
    const [open, setOpen] = useState(false)
    const {mutate: approveClaim} = useApproveClaim()




  const onSubmit = () => {
    approveClaim({id: prop.id, status: prop.status},{
        onSuccess: () => {
          toast.success(`Code claim successfully approved`);
          setOpen(false)
        },
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-2 text-xs bg-orange-600 text-white flex items-center gap-1 rounded-sm">
        <TicketCheck size={15}/>Approve
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[500px] bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Approve Claim
          </DialogTitle>
          {/* <DialogDescription>Are you sure you want to delete this ticket code?</DialogDescription> */}
        </DialogHeader>

        <p className=' mt-4'>Code: {prop.code}</p>
        <p>Username: {prop.name}</p>


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
