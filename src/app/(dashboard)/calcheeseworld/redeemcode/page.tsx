'use client'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div className=' relative flex flex-col w-full h-screen bg-amber-50'>
        <div className=' relative w-full'>
            <Image src="/assets/Top TAB.png" alt="tab" width={500} height={500} className='  w-full absolute' priority unoptimized loading='eager' />
            <RevealOnScroll delay={.2}>
                <a href="/">
                <Image src="/assets/CalCheese World Logo.png" alt="logo" width={500} height={500} priority unoptimized loading='eager' className=' hover:scale-105 duration-300 transition-all w-[150px] lg:w-[300px] relative z-50 top-4 md:top-10 left-4  md:left-10 '/>
                </a>
            </RevealOnScroll>
        </div>

        <div className=' w-full h-full flex items-center justify-center'>
            <div className=' w-[60%] h-[500px] bg-amber-100'>

            </div>
        </div>

        
    </div>
  )
}
