'use client'
import React, { useState, useEffect } from 'react'
import Description from './Description'
import WhatsNews from './WhatsNews'
import MiniGames from './MiniGames'
import Rewards from './Rewards'
import Followus from './Followus'
import CursorFollower from '@/components/animations/CursorFollower'
import TextReveal from '@/components/animations/TextReveal'
import { AnimatePresence } from "framer-motion";
import FloatImage from '@/components/animations/FloatImage'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import TrackedImage from '@/components/animations/TrackedImage'
import Preloadmain from './Preload'
import Image from 'next/image'
import RedeemedCodesRewards from './RedeemedCodesRewards'
import useRedeemCodesStore from '@/hooks/player'

const tabs = [
  { icon: "/assets/Description BUTTON.png", value: "description", title: 'Welcome To CalCheese World' },
  { icon: "/assets/What's New BUTTON.png", value: "whatsnew", title: 'Whats New?' },
  { icon: "/assets/Min Game BUTTON.png", value: "minigames", title: 'Mini Games' },
  { icon: "/assets/Rewards BUTTON.png", value: "rewards", title: 'Promo Codes' },
  { icon: "/assets/Follow Us on BUTTON.png", value: "socials", title: 'Follow us on' },
]

export default function LandingPage() {
  const [tab, setTab] = useState('description')
  const [title, setTitle] = useState('Welcome To CalCheese World')
  const [tabNumber, setTabNumber] = useState<number>(0)
  const [enter, setEnter] = useState(false)
  const {setRedeemcodes} = useRedeemCodesStore()


  return (
    <>
     <main className=' hidden lg:flex lg:relative w-screen max-w-[1920px] h-auto bg-amber-100 overflow-x-hidden overflow-y-hidden flex-col  items-center justify-center  text-amber-900'
    // style={{backgroundImage: "url('/assets/BG.png')" , backgroundPosition:'top right', backgroundRepeat:'no-repeat', backgroundSize:'contain'}}
    >


        <Image src="/assets/background.png" alt="tab" width={500} height={500} priority unoptimized loading='eager' className=' h-[40%] lg:h-full w-[80%] object-cover absolute sm:top-0 right-0 translate-y-10' />

        <div className=' relative w-full'>
            <Image src="/assets/Top TAB.png" alt="tab" width={500} height={500} className='  w-full absolute' priority unoptimized loading='eager' />
            <RevealOnScroll delay={.2}>
                <a href="/">
                <Image src="/assets/CalCheese World Logo.png" alt="logo" width={500} height={500} priority unoptimized loading='eager' className=' hover:scale-105 duration-300 transition-all w-[150px] lg:w-[300px] relative z-50 top-4 md:top-10 left-4  md:left-10 '/>
                </a>
            </RevealOnScroll>
            

        </div>

        <div className=' w-full xl:h-[105vh] lg:h-[120vh] h-[102vh] grid grid-cols-1 lg:grid-cols-[1fr_35%] p-1 md:p-4 xl:mt-0 lg:mt-24 pb-10'>

            <RevealOnScroll className=' w-full' delay={.6}>
                <div className=' w-full h-full  '>
                <div className=' w-full h-full relative flex items-center justify-center'>

                            <div className=' relative flex flex-col items-center justify-center'>
                                <div className=' absolute z-30 top-0 -translate-y-4 md:-translate-y-12 flex items-center justify-center'>
                                    <Image src="/assets/Title HOLDER.png" alt="title-holder" priority unoptimized loading='eager' width={500} height={500} className=' w-[clamp(200px,80vw,800px)] ' />
                                    {/* <TextReveal text={title} className='absolute text-[clamp(1rem,4vw,2rem)] font-spenbeb font-bold uppercase text-white outlined-text'/> */}
                                    <AnimatePresence mode="wait">
                                    <TextReveal
                                        // key={tabs[tabNumber].title} 
                                        text={title}
                                        className="absolute text-[clamp(1rem,4vw,2.5rem)] font-extrabold uppercase text-white outlined-text font-spenbeb"
                                    />
                                    </AnimatePresence>
                                    {/* <h1 className=' absolute text-[clamp(1rem,4vw,2rem)] font-bold uppercase text-white outlined-text'>{title}</h1> */}
                                </div>
                                <Image src="/assets/Big TAB.png"  alt="big-holder" width={1000} height={1000} priority unoptimized loading='eager' className=' relative z-20 h-[600px] md:h-[800px] xl:h-[700px]' />

                                {tab === 'description' && (
                                    <Description/>
                                )}

                                {tab === 'whatsnew' && (
                                    <WhatsNews/>
                                )}

                                {tab === 'minigames' && (
                                    <MiniGames/>
                                )}

                                {tab === 'rewards' && (
                                    <Rewards/>
                                )}

                                {tab === 'socials' && (
                                    <Followus/>
                                )}
                            
                                <div className=' hidden absolute z-30 left-0 mb-10 lg:flex flex-col items-center justify-center gap-4 lg:gap-6'>
                                    {tabs.map((item, index) => (
                                        <CursorFollower key={index}>
                                            <button key={item.value} onClick={() => {setTab(item.value), setTitle(item.title), setTabNumber(index)}}>
                                                <img src={item.icon} alt="tab" className={`rounded-3xl w-[40px] md:w-[50px] lg:w-[60px] cursor-pointer hover:scale-110 transition-all duration-300 ${tab === item.value && 'border-6 border-blue-500'} `} />
                                            </button>
                                        </CursorFollower>
                                        
                                    ))}

                                
                                    
                                </div>

                                <div className="lg:hidden absolute z-30 bottom-0 mb-10 flex items-center justify-center gap-4 lg:gap-6 translate-y-8">
                                    {tabs.map((item, index) => {
                                        const yOffsets = ['-translate-y-6', '-translate-y-2', 'translate-y-0', '-translate-y-2', '-translate-y-6']; // Arc pattern
                                        return (
                                                <button
                                                    key={item.value}
                                                    onClick={() => {
                                                    setTab(item.value);
                                                    setTitle(item.title);
                                                    setTabNumber(index)
                                                    }}
                                                    className={`${yOffsets[index]} transition-transform duration-300`}
                                                >
                                                    <img
                                                    src={item.icon}
                                                    alt="tab"
                                                    className={`rounded-3xl w-[50px] md:w-[50px] lg:w-[60px] cursor-pointer hover:scale-110 transition-all duration-300 ${
                                                        tab === item.value ? 'border-6 border-blue-500' : ''
                                                    }`}
                                                    />
                                                </button>
                                    
                                        );
                                    })}

                                    
                                </div>


                                <div className=' absolute z-10 left-0 bottom-0 translate-y-6'>
                                    <div className=' relative w-[250px] h-[150px] flex items-center justify-center'>
                                        <FloatImage className=' absolute top-0 left-0' hoverRange={15} floatRange={15} duration={7}>
                                            <img src="/assets/Floating Triangle BOT/Triangle A.png" alt="triangles" width={80} />
                                        </FloatImage>

                                        <FloatImage className=' absolute top-20 right-2' duration={8}>
                                            <img src="/assets/Floating Triangle BOT/Triangle B.png" alt="triangles" width={50}/>
                                        </FloatImage>

                                        <FloatImage className=' absolute top-20 left-2' duration={9} >
                                        <img src="/assets/Floating Triangle BOT/Triangle C.png" alt="triangles" width={50}/>
                                        </FloatImage>

                                        <FloatImage className=' absolute right-12 top-4' duration={7}>
                                            <img src="/assets/Floating Triangle BOT/Triangle D.png" alt="triangles" width={60}/>
                                        </FloatImage>

                                        <FloatImage className=' absolute top-16 left-16' duration={10}>
                                            <img src="/assets/Floating Triangle BOT/Triangle E.png" alt="triangles" width={70} />
                                        </FloatImage>
                                    </div>
                                </div>

                            </div>
                </div>

                </div>
            </RevealOnScroll>
            
            <RevealOnScroll className='' delay={1}>
                <div className=' relative lg:block hidden w-full '>

                    <RevealOnScroll delay={.2}>
                        <FloatImage className=' z-40 absolute right-0 top-32 ' hoverRange={15} floatRange={15} duration={5} >
                            <Image src="/assets/Calvin.png" alt="tab"  width={500} height={500} priority unoptimized loading='eager' className='' />
                        </FloatImage>
                    </RevealOnScroll>
                    
              
                
                <div className=' relative w-full h-screen container '>
                        <FloatImage className=' z-10 absolute bottom-32 left-0 -translate-x-24 item6'>
                            <Image src="/assets/Wafer.png" alt="tab"  width={500} height={500} priority unoptimized loading='eager' className=' '/>
                        </FloatImage>
                       

                        <FloatImage className=' z-10 absolute top-[12%] right-[40%] transition-all ' duration={7}>
                            <Image src="/assets/Floating Triangle TOP/Triangle B.png"  alt="tab"  width={80} height={80} priority unoptimized loading='eager' />
                        </FloatImage>

                        <FloatImage className=' z-10 absolute top-[17%] right-[10%] transition-all ' duration={8}>
                            <Image src="/assets/Floating Triangle TOP/Triangle E.png" alt="tab" width={50} height={50} priority unoptimized loading='eager'/>
                        </FloatImage>

                        <FloatImage className=' z-10 absolute top-[25%] left-[25%] transition-all ' duration={6}>
                        <Image src="/assets/Floating Triangle TOP/Triangle A.png" alt="tab" width={50} height={50} priority unoptimized loading='eager' />
                        </FloatImage>

                        <FloatImage className=' z-10 absolute top-[40%] left-[10%] transition-all ' duration={9}>
                        <Image src="/assets/Floating Triangle TOP/Triangle D.png" alt="tab" width={100} height={100} priority unoptimized loading='eager' />
                        </FloatImage>

                        <FloatImage className=' z-10 absolute bottom-[30%] right-[2%] transition-all ' duration={6} >
                            <Image src="/assets/Floating Triangle TOP/Triangle F.png" alt="tab" width={80} height={80} priority unoptimized loading='eager'/>
                        </FloatImage>

                        <FloatImage className=' z-10 absolute bottom-[17%] right-[12%] transition-all' duration={7}>
                        <Image src="/assets/Floating Triangle TOP/Triangle C.png" alt="tab" width={110} height={110} priority unoptimized loading='eager'/>

                        </FloatImage>

                </div>
                </div>
            </RevealOnScroll>
       
        </div>
    </main>

    <main className=' block lg:hidden relative w-full max-w-[1920px] h-auto bg-amber-100 overflow-x-hidden overflow-y-hidden  text-amber-900'
    // style={{backgroundImage: "url('/assets/BG.png')" , backgroundPosition:'top right', backgroundRepeat:'no-repeat', backgroundSize:'contain'}}
    >
        {/* <Image src="/assets/BG.png" alt="tab" width={500} height={500} priority unoptimized loading='eager' className=' h-[40%] lg:h-full w-[80%] object-cover absolute sm:top-0 right-0 translate-y-10' /> */}

        <div className=' relative w-full'>
            <Image src="/assets/Top TAB.png" alt="tab" width={500} height={500} className=' h-[100px]  w-full absolute' priority unoptimized loading='eager' />
            <RevealOnScroll delay={.2}>
                <a href="/">
                <Image src="/assets/CalCheese World Logo.png" alt="logo" width={500} height={500} priority unoptimized loading='eager' className=' hover:scale-105 duration-300 transition-all w-[150px] lg:w-[300px] relative z-50 top-2 md:top-10 left-2  md:left-10 '/>
                </a>
            </RevealOnScroll>
            

        </div>

        <div className=' w-full  grid grid-cols-1 p-1 pb-10'>
             <RevealOnScroll className=' flex item-center justify-center' delay={.6}>
                <div className=' relative w-full max-w-[500px] h-[200px] flex items-center justify-center  mt-4 '>

                    <RevealOnScroll delay={.2}>
                        <FloatImage className=' z-40 absolute top-0 w-full flex items-center justify-center' hoverRange={15} floatRange={15} duration={5} >
                            <Image src="/assets/Calvin.png" alt="tab"  width={200} height={200} priority unoptimized loading='eager' className=' w-[180px]' />
                        </FloatImage>
                    </RevealOnScroll>
                    
              
                
                <div className=' relative w-full h-full  container '>
                        <FloatImage className=' z-30 left-8 absolute bottom-0'>
                            <Image src="/assets/Wafer.png" alt="tab"  width={200} height={200} priority unoptimized loading='eager' className=' w-[180px] '/>
                        </FloatImage>
                       

                        <FloatImage className=' z-10 absolute top-[12%] right-[40%] transition-all ' duration={7}>
                            <Image src="/assets/Floating Triangle TOP/Triangle B.png"  alt="tab"  width={60} height={60} priority unoptimized loading='eager' />
                        </FloatImage>

                        <FloatImage className=' z-10 absolute top-[15%] right-[20%] transition-all ' duration={8}>
                            <Image src="/assets/Floating Triangle TOP/Triangle E.png" alt="tab" width={40} height={40} priority unoptimized loading='eager'/>
                        </FloatImage>

                        <FloatImage className=' z-10 absolute top-[18%] left-[25%] transition-all ' duration={6}>
                        <Image src="/assets/Floating Triangle TOP/Triangle A.png" alt="tab" width={40} height={40} priority unoptimized loading='eager' />
                        </FloatImage>

                        <FloatImage className=' z-10 absolute top-[40%] left-[10%] transition-all ' duration={9}>
                        <Image src="/assets/Floating Triangle TOP/Triangle D.png" alt="tab" width={80} height={80} priority unoptimized loading='eager' />
                        </FloatImage>

                        <FloatImage className=' z-10 absolute bottom-[30%] right-[10%] transition-all ' duration={6} >
                            <Image src="/assets/Floating Triangle TOP/Triangle F.png" alt="tab" width={60} height={60} priority unoptimized loading='eager'/>
                        </FloatImage>

                        <FloatImage className=' z-10 absolute bottom-0 right-[20%] transition-all' duration={7}>
                        <Image src="/assets/Floating Triangle TOP/Triangle C.png" alt="tab" width={80} height={80} priority unoptimized loading='eager'/>

                        </FloatImage>

                </div>
                </div>
            </RevealOnScroll>


            <RevealOnScroll className=' relative z-50 w-full' delay={.4}>
                <div className=' w-full h-full  '>
                <div className=' w-full h-full relative flex items-center justify-center'>

                            <div className=' relative flex flex-col items-center justify-center'>
                                <div className=' absolute z-30 top-0 -translate-y-4 md:-translate-y-12 flex items-center justify-center'>
                                    <Image src="/assets/Title HOLDER.png" alt="title-holder" priority unoptimized loading='eager' width={500} height={500} className=' w-[85%] ' />
                                    {/* <TextReveal text={title} className='absolute text-[clamp(1rem,4vw,2rem)] font-spenbeb font-bold uppercase text-white outlined-text'/> */}
                                    <AnimatePresence mode="wait">
                                    <TextReveal
                                        // key={tabs[tabNumber].title} 
                                        text={title}
                                        className="absolute text-[clamp(1rem,4vw,2.5rem)] font-extrabold uppercase text-white outlined-text font-spenbeb"
                                    />
                                    </AnimatePresence>
                                    {/* <h1 className=' absolute text-[clamp(1rem,4vw,2rem)] font-bold uppercase text-white outlined-text'>{title}</h1> */}
                                </div>
                                <Image src="/assets/Big TAB.png"  alt="big-holder" width={1000} height={1000} priority unoptimized loading='eager' className=' relative z-20 h-[600px] md:h-[800px] xl:h-[700px]' />

                                {tab === 'description' && (
                                    <Description/>
                                )}

                                {tab === 'whatsnew' && (
                                    <WhatsNews/>
                                )}

                                {tab === 'minigames' && (
                                    <MiniGames/>
                                )}

                                {tab === 'rewards' && (
                                    <Rewards/>
                                )}

                                {tab === 'socials' && (
                                    <Followus/>
                                )}
                            
                                <div className=' hidden absolute z-30 left-0 mb-10 lg:flex flex-col items-center justify-center gap-4 lg:gap-6'>
                                    {tabs.map((item, index) => (
                                        <CursorFollower key={index}>
                                            <button key={item.value} onClick={() => {setTab(item.value), setTitle(item.title), setTabNumber(index)}}>
                                                <img src={item.icon} alt="tab" className={`rounded-3xl w-[40px] md:w-[50px] lg:w-[60px] cursor-pointer hover:scale-110 transition-all duration-300 ${tab === item.value && 'border-6 border-blue-500'} `} />
                                            </button>
                                        </CursorFollower>
                                        
                                    ))}

                                
                                    
                                </div>

                                <div className="lg:hidden absolute z-30 bottom-0 mb-10 flex items-center justify-center gap-4 lg:gap-6 translate-y-8">
                                    {tabs.map((item, index) => {
                                        const yOffsets = ['-translate-y-6', '-translate-y-2', 'translate-y-0', '-translate-y-2', '-translate-y-6']; // Arc pattern
                                        return (
                                                <button
                                                    key={item.value}
                                                    onClick={() => {
                                                    setTab(item.value);
                                                    setTitle(item.title);
                                                    setTabNumber(index)
                                                    }}
                                                    className={`${yOffsets[index]} transition-transform duration-300`}
                                                >
                                                    <img
                                                    src={item.icon}
                                                    alt="tab"
                                                    className={`rounded-3xl w-[50px] md:w-[50px] lg:w-[60px] cursor-pointer hover:scale-110 transition-all duration-300 ${
                                                        tab === item.value ? 'border-6 border-blue-500' : ''
                                                    }`}
                                                    />
                                                </button>
                                    
                                        );
                                    })}

                                    
                                </div>


                                <div className=' absolute z-10 left-0 bottom-0 translate-y-16'>
                                    <div className=' relative w-[250px] h-[150px] flex items-center justify-center'>
                                        <FloatImage className=' absolute top-0 left-0' hoverRange={15} floatRange={15} duration={7}>
                                            <img src="/assets/Floating Triangle BOT/Triangle A.png" alt="triangles" width={60} />
                                        </FloatImage>

                                        <FloatImage className=' absolute top-20 right-2' duration={8}>
                                            <img src="/assets/Floating Triangle BOT/Triangle B.png" alt="triangles" width={40}/>
                                        </FloatImage>

                                        <FloatImage className=' absolute top-20 left-2' duration={9} >
                                        <img src="/assets/Floating Triangle BOT/Triangle C.png" alt="triangles" width={30}/>
                                        </FloatImage>

                                        <FloatImage className=' absolute right-12 top-4' duration={7}>
                                            <img src="/assets/Floating Triangle BOT/Triangle D.png" alt="triangles" width={40}/>
                                        </FloatImage>

                                        <FloatImage className=' absolute top-16 left-16' duration={10}>
                                            <img src="/assets/Floating Triangle BOT/Triangle E.png" alt="triangles" width={50} />
                                        </FloatImage>
                                    </div>
                                </div>

                            </div>
                </div>

                </div>
            </RevealOnScroll>

            
       

         
            
           
       
        </div>
    </main>
    </>
   
  )
}
