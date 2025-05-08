'use client'
import { Ticket, Wallet } from 'lucide-react'
import React from 'react'

type Props = {
    name: string
    amount: number
    color: string
    subcolor: string
}

interface CardProps {
    title: string
    value: number
    bgColor: string
    textColor: string
    isLoading: boolean
  }
export default function DashboardCard( prop: CardProps) {


  return (
    <div className={`rounded-lg p-6 ${prop.bgColor} ${prop.textColor} flex items-center justify-between`}>
        <div className=' flex flex-col gap-2'>
            <h3 className="font-medium text-sm mb-2">{prop.title}</h3>
            {prop.isLoading ? (
            <p className="text-4xl font-bold">---</p>
            ) : (
            <p className="text-4xl font-bold">{prop.value.toLocaleString()}</p>
            )}
        </div>

        <div>
            <Ticket size={40}/>
        </div>
       
    </div>
  )
}
