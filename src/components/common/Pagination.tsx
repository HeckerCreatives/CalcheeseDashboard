'use client'
import { ChevronLeft, ChevronRight} from 'lucide-react'
import React, { useState } from 'react'

type PaginationProps = {
  currentPage: number
  total: number
  onPageChange: (page: number) => void
}

export default function PaginitionComponent({ currentPage, total, onPageChange }: PaginationProps) {
  const next = () => {
    if (currentPage <= total) {
      onPageChange(currentPage + 1)
    }
  }

  const prev = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <div className="flex items-center justify-center w-full mt-6">

        <div className=' flex items-center gap-2 text-xs p-2 rounded-full'>
            <button onClick={prev}  disabled={currentPage === 0} className=' bg-orange-500 py-2 px-2 flex items-center justify-center gap-2 rounded-sm text-white'><ChevronLeft size={15}/></button>
            <p className=' flex items-center justify-center gap-6 text-xs py-2 px-4 rounded-full'>{currentPage + 1} / {total}</p>
            <button onClick={next} disabled={currentPage + 1 === total} className='bg-orange-500 py-2 px-2 flex items-center justify-center gap-2 rounded-sm text-white'><ChevronRight size={15}/></button>
        </div>
        
     
    </div>
  )
}
