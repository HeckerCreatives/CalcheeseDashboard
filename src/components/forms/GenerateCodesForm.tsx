'use client'

import React, { useState } from 'react'
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
import { useGetChests } from '@/apis/codes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GenerateCodesvalidation,
  generateCodesvalidations,
} from '@/validations/schema'

type ItemType = 'robux' | 'ticket'

interface Item {
  id: string
  itemtype?: ItemType
  quantity?: number
}

const allTypes: ItemType[] = ['robux', 'ticket']

export default function GenerateCodesForm() {
  const { data } = useGetChests()
  const [items, setItems] = useState<Item[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<GenerateCodesvalidation>({
    resolver: zodResolver(generateCodesvalidations),
    defaultValues: {
      items: [],
    },
  })

  const addItem = () => {
    const newItems = [
      ...items,
      { id: crypto.randomUUID(), type: undefined, quantity: undefined },
    ]
    setItems(newItems)
    syncItemsToForm(newItems)
  }

  const updateItem = (id: string, field: keyof Item, value: any) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
    setItems(updatedItems)
    syncItemsToForm(updatedItems)
  }

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
    syncItemsToForm(updatedItems)
  }

  const syncItemsToForm = (items: Item[]) => {
    const validItems = items
    //   .filter((i) => typeof i.type === 'string' && typeof i.quantity === 'number')
      .map((i) => ({
        itemtype: i.itemtype as string,
        quantity: i.quantity as number,
      }))
  
    setValue('items', validItems)
    trigger('items')
  }
  

  const selectedTypes = items.map((item) => item.itemtype).filter(Boolean)

  const onSubmit = (data: GenerateCodesvalidation) => {
    console.log('Submitted:', data)
  }

  return (
    <Dialog>
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
            <label className="text-xs text-zinc-400">Chest Type</label>
            <Select onValueChange={(val) => setValue('chesttype', val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chest Type" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                {data?.data.map((item) => (
                  <SelectItem key={item.id} value={item.id} className="text-xs">
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.chesttype && (
              <p className="form-error">{errors.chesttype.message}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Quantity</label>
              <Input
                placeholder="Quantity"
                type="number"
                {...register('quantity', { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="form-error">{errors.quantity.message}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Expiration</label>
              <Input placeholder="Expiration" type="date" {...register('expiration')} />
              {errors.expiration && (
                <p className="form-error">{errors.expiration.message}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-1 bg-yellow-100 p-2 rounded-sm">
            <div className="w-full flex items-center justify-between">
              <label className="text-xs text-zinc-400">Items</label>
              <p
                onClick={addItem}
                className="p-1 bg-orange-500 text-white rounded-sm cursor-pointer"
              >
                <Plus size={15} />
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full flex items-start gap-2 p-2 rounded-sm bg-yellow-50"
                >
                  <div className="flex flex-col items-start gap-1 w-full">
                    <label className="text-[.6rem] text-zinc-400">Type</label>
                    <Select
                      value={item.itemtype}
                      onValueChange={(val) => updateItem(item.id, 'itemtype', val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" className="text-xs" />
                      </SelectTrigger>
                      <SelectContent>
                        {allTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            disabled={
                              selectedTypes.includes(type) && item.itemtype !== type
                            }
                            className="text-xs"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.items?.[index]?.itemtype && (
                    <p className="form-error">{errors.items[index]?.itemtype.message}</p>
                    )}
                   
                  </div>

                  <div className="flex flex-col items-start gap-1 w-full">
                    <label className="text-[.6rem] text-zinc-400">Quantity</label>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity ?? ''}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          'quantity',
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                     {errors.items?.[index]?.quantity && (
                    <p className="form-error">{errors.items[index]?.quantity?.message}</p>
                    )}
                  </div>

                  <p
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <X size={14} />
                  </p>
                </div>
              ))}
            </div>
            {errors.items && (
              <p className="form-error">{errors.items.message}</p>
            )}
          </div>

          <div className="w-full flex justify-end gap-2">
            <button type="submit" className="primary-btn">
              Save
            </button>
            <button type="button" className="ghost-btn">
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
