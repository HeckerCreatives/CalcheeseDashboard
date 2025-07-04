'use client'
import { useGetPromos } from '@/apis/promocodes'
import { useCheckCode, useRedeemCode } from '@/apis/redeemcode'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import TextRevealOnView from '@/components/animations/TextRevealOnView'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRedeemCodesStore from '@/hooks/player'
import { promocodeIcon } from '@/utils/reusables'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RedeemedCodesRewards from './RedeemedCodesRewards'
import useRedeemStatePopup from '@/hooks/redeempopup'


const rewardItem = [
  {title:'In-Game Rewards', description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit'},
  {title:'Ticket', description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit'},
  {title:'Robux', description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit'},
]

export default function Rewards() {
    const {data, isLoading} = useGetPromos()
    const {state, setState} = useRedeemStatePopup()

     const scrollRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;

      const handleMouseDown = (e: MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - container.offsetLeft;
        scrollLeft.current = container.scrollLeft;
        container.classList.add('cursor-grabbing');
      };

      const handleMouseLeave = () => {
        isDragging.current = false;
        container.classList.remove('cursor-grabbing');
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        container.classList.remove('cursor-grabbing');
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX.current) * 1.5; // speed factor
        container.scrollLeft = scrollLeft.current - walk;
      };

      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);

      return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);


 

    

  return (
    <div className=' w-full lg:h-[75%] z-30 flex flex-col items-center justify-center'>

  

                <>
                 <TextRevealOnView
                  text={data?.titledata?.description || ''}
                  className="text-center text-xs md:text-sm mt-6 font-semibold w-[90%] font-brevia"
                  delay={.6}
                />
                <RevealOnScroll delay={1} className=' w-full'>
                   <div
                     ref={scrollRef}
                    className={`custom-scrollbar w-full h-fit pt-4 lg:h-full flex flex-nowrap gap-2 mt-8 md:mt-6 overflow-x-auto overflow-y-hidden cursor-pointer `}
                  >
                    {data?.data.map((item, index) => (
                      <div
                        key={index}
                        className=' min-w-[160px] md:min-w-[220px] lg:min-h-[240px] bg-[#FFA30B] relative w-full h-[180px] lg:h-full flex items-center justify-center rounded-2xl mt-6 p-4'
                      >
                        {/* <img src={promocodeIcon(item.title)} alt="headphone" width={80} className=' w-[80px] md:w-[80px] z-10 -translate-y-6 md:-translate-y-8 absolute top-0' /> */}
                        {promocodeIcon(item.title)}
                        <div className='relative h-full flex items-center justify-center '>
                          {/* <img src="/assets/TAB.png" alt="" className='hidden lg:block' /> */}
                          <div className=' top-0 flex flex-col gap-2 w-full h-fit lg:h-full '>
                            <p className='text-sm md:text-xl text-amber-50 font-bold text-center uppercase'>
                              {item.title}
                            </p>
                            <p className='text-[.5rem] md:text-xs text-amber-100 font-bold text-center  px-2'>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </RevealOnScroll>

                 <RevealOnScroll delay={1.2} className=' w-full mt-4'>
                  <div className=' w-full flex items-center justify-center mt-8 md:mt-8'>
                      <button onClick={() => setState(true)}  className=' relative cursor-pointer flex items-center bg-[#FC6E00] justify-center px-12 py-3 rounded-full'>
                          <p className=' text-sm md:text-xl font-bold text-amber-50 font-bitbold pt-1'>Redeem Now</p>
                      </button>
                  </div>
                </RevealOnScroll>
              
              
{/* 
               <Dialog>
                <DialogTrigger>

                  <RevealOnScroll delay={1.2} className=' w-full mt-4'>
                  <div className=' w-full flex items-center justify-center mt-8 md:mt-8'>
                      <button  className=' relative cursor-pointer flex items-center justify-center'>
                          <img src="/assets/Play BUTTON.png" alt="" className=' w-[200px] md:w-full' />
                          <p className=' text-xl md:text-3xl font-bold absolute text-yellow-200'>Redeem Now</p>
                      </button>
                  </div>
                </RevealOnScroll>
                </DialogTrigger>
                
                <DialogContent className=' border-2 border-orange-300 p-0 w-[90%] lg:w-[900px] overflow-hidden max-h-[80%] overflow-y-auto'>
                  <RedeemedCodesRewards/>
                </DialogContent>
              </Dialog> */}
                </>
              {/* )} */}

        
       
    </div>
  )
}
