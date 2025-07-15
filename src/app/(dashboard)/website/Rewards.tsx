'use client'
import { useGetPromos } from '@/apis/promocodes'
import { useCheckCode, useRedeemCode } from '@/apis/redeemcode'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import TextRevealOnView from '@/components/animations/TextRevealOnView'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRedeemCodesStore from '@/hooks/player'
import { promocodeIcon } from '@/utils/reusables'
import { ArrowLeft, Gift } from 'lucide-react'
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

    const instructions = (name: string) => {
      console.log(name)
      if(name.toLowerCase() === 'in-game rewards'){
        return (
          <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white rounded-md text-[.6rem] md:text-sm px-6 py-2 w-fit uppercase font-semibold mt-2 hover:bg-blue-700 transition-colors">
              Claim Loot Now
            </Button>
          </DialogTrigger>
          <DialogContent className=" w-[90%] md:w-full max-w-lg p-4 md:p-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold mb-2">In-Game Rewards</DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Follow these simple steps to claim your rewards!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  1.                </span>
                <p className="text-base flex items-center gap-2">
                  Open
                  <span className="inline-flex items-center gap-1 font-medium text-orange-600">
                    <img
                      src="/assets/CalCheese World Logo.png"
                      alt="CalCheese World Logo"
                      width={70}
                      height={70}
                      className="inline-block"
                    />
                    CalCheese World
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  2.
                </span>
                <p className="text-base">
                  Tap the <Gift className="inline-block h-5 w-5 text-orange-600" /> redeem now ,and enter your code
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  3.
                </span>
                <p className="text-base">Check your inventory—your reward is waiting!</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        )
      } else if (name.toLowerCase() === 'robux'){
         return (
          <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white rounded-md text-[.6rem] md:text-sm px-6 py-2 w-fit uppercase font-semibold mt-2 hover:bg-blue-700 transition-colors">
              Tap To Read Guide
            </Button>
          </DialogTrigger>
          <DialogContent className=" w-[90%] md:w-full max-w-lg p-4 md:p-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold mb-2">Robux Guide: </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Follow these simple steps to claim your rewards!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  1.
                </span>
                <p className="text-base flex items-center gap-2">
                  Open
                  <span className="inline-flex items-center gap-1 font-medium text-orange-600">
                    <img
                      src="/assets/CalCheese World Logo.png"
                      alt="CalCheese World Logo"
                      width={70}
                      height={70}
                      className="inline-block"
                    />
                    CalCheese World
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  2.
                </span>
                <p className="text-base">
                  Tap the <Gift className="inline-block h-5 w-5 text-orange-600" /> redeem now ,and enter your code
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  3.
                </span>
                <p className="text-base">Got a Robux? Check your inventory</p>
              </div>
                <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  4.
                </span>
                <p className="text-base">Tap the item for the next steps</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  5.
                </span>
                <p className="text-base flex flex-col">Type your details in this site, then 

                  <span>click the “Redeem Now”</span>
                </p>
                
              </div>
            </div>
          </DialogContent>
        </Dialog>
        )
      } else if (name.toLowerCase() === 'ticket'){
         return (
            <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white rounded-md text-[.6rem] md:text-sm px-6 py-2 w-fit uppercase font-semibold mt-2 hover:bg-blue-700 transition-colors">
              Deets Here
            </Button>
          </DialogTrigger>
          <DialogContent className=" w-[90%] md:w-full max-w-lg p-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold mb-2">Ticket Deets: </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Follow these simple steps to claim your rewards!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  1.
                </span>
                <p className="text-base flex items-center gap-2">
                  Open
                  <span className="inline-flex items-center gap-1 font-medium text-orange-600">
                    <img
                      src="/assets/CalCheese World Logo.png"
                      alt="CalCheese World Logo"
                      width={70}
                      height={70}
                      className="inline-block"
                    />
                    CalCheese World
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  2.
                </span>
                <p className="text-base">
                  Tap the <Gift className="inline-block h-5 w-5 text-orange-600" /> redeem now ,and enter your code
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  3.
                </span>
                <p className="text-base">Got a ticket reward? Check your inventory</p>
              </div>
                <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  4.
                </span>
                <p className="text-base">Tap the item for the next steps</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full 0 text-orange-600 font-bold text-sm">
                  5.
                </span>
                <p className="text-base flex flex-col">Type your details in this site, then 

                  <span>click the “Redeem Now”</span>
                </p>
                
              </div>

               <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full  text-orange-600 font-bold text-sm">
                  6.
                </span>
                <p className="text-base flex flex-col">Check a message in your email.

                  <span>That’s where you’ll find out if your</span>
                  <span>ticket reward is ready! 🎫📬</span>
                </p>
                
              </div>
            </div>
          </DialogContent>
        </Dialog>
         )
      }
    }

   const promocodeIcons = (data: string) => {
    console.log(data)
    if(data === 'In-Game Rewards'){
        return <img src='/assets/Neon Headphones ICON.png' alt="" className="  w-[70px] md:w-[90px] z-10 -translate-y-6 md:-translate-y-10" />
    } else if (data === 'Ticket'){
        return <img src='/assets/Ticket ICON.png' alt="" className="  w-[70px] md:w-[90px] z-10 -translate-y-6 md:-translate-y-10 " />
    } else {
        return <img src='/assets/Robux ICON.png' alt="" className="  w-[70px] md:w-[75px] z-10 -translate-y-6 md:-translate-y-10" /> 
    }
}


 

    

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
                        className=' min-w-[160px] md:min-w-[220px] lg:min-h-[265px] bg-[#FFA30B] relative w-full h-[210px] lg:h-full flex flex-col items-center justify-center rounded-2xl mt-6 p-4'
                      >
                        {/* <img src={promocodeIcon(item.title)} alt="headphone" width={80} className=' w-[80px] md:w-[80px] z-10 -translate-y-6 md:-translate-y-8 absolute top-0' /> */}
                        {promocodeIcons(item.title)}
                        <div className='relative h-full flex items-center justify-center  -translate-y-4 '>
                          {/* <img src="/assets/TAB.png" alt="" className='hidden lg:block' /> */}
                          <div className=' top-0 flex flex-col items-center justify-center gap-2 w-full h-fit lg:h-full '>
                            <p className='text-sm md:text-xl text-amber-50 font-bold text-center uppercase'>
                              {item.title}
                            </p>
                            <p className='text-[.5rem] md:text-xs text-amber-100 font-bold text-center  px-2'>
                              {item.description}
                            </p>

                            {instructions(item.title)}

                            
                          </div>

                          
                        </div>
                      </div>
                    ))}
                  </div>

                </RevealOnScroll>

                 <RevealOnScroll delay={1.2} className=' w-full mt-4'>
                  <div className=' w-full flex items-center justify-center mt-8 md:mt-8'>
                      <button onClick={() => setState(true)}  className=' relative cursor-pointer flex items-center gap-2 bg-[#FC6E00] justify-center px-12 py-3 rounded-full'>
                          <Gift className="inline-block h-8 w-8 text-amber-50" />
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
