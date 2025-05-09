'use client'
import React, { useState } from 'react'
import Description from './Description'
import WhatsNews from './WhatsNews'
import MiniGames from './MiniGames'
import Rewards from './Rewards'
import Followus from './Followus'

const tabs = [
    {icon:"/assets/Description BUTTON.png", value: "description",title: 'Welcome To CalCheese World'},
    {icon:"/assets/What's New BUTTON.png", value: "whatsnew",title: 'Whats New?'},
    {icon:"/assets/Min Game BUTTON.png", value: "minigames",title: 'Mini Games'},
    {icon:"/assets/Rewards BUTTON.png", value: "rewards", title: 'Promo Codes'},
    {icon:"/assets/Follow Us on BUTTON.png", value: "socials",title: 'Follow us on'},
]

export default function LandingPage() {
    const [tab, setTab] = useState('description')
    const [title, setTitle] = useState('Welcome To CalCheese World')

  return (
    <main className=' relative w-full max-w-[1920px] h-auto bg-white overflow-x-hidden overflow-y-hidden font-spenbeb text-amber-900'
    // style={{backgroundImage: "url('/assets/BG.png')" , backgroundPosition:'top right', backgroundRepeat:'no-repeat', backgroundSize:'contain'}}
    >
            <img src="/assets/BG.png" alt="tab" className=' h-[40%] lg:h-full w-[80%] object-cover absolute sm:top-0 right-0 translate-y-10' />

        <div className=' relative w-full'>
            <img src="/assets/Top TAB.png" alt="tab" className='  w-full absolute' />
            <img src="/assets/CalCheese World Logo.png" alt="logo" width={300} className=' w-[150px] lg:w-[300px] relative z-50 top-4 md:top-10 left-10'/>

        </div>

        <div className=' w-full xl:h-[105vh] lg:h-[120vh] h-screen grid grid-cols-1 lg:grid-cols-[1fr_35%] p-1 md:p-4 xl:mt-0 lg:mt-24'>

        <div className=' w-full h-full  '>
            <div className=' w-full h-full relative flex items-center justify-center'>

                <div className=' relative flex flex-col items-center justify-center'>
                    <div className=' absolute z-30 top-0 -translate-y-4 md:-translate-y-12 flex items-center justify-center'>
                        <img src="/assets/Title HOLDER.png" alt="title-holder" className=' w-[clamp(200px,80vw,800px)] ' loading='lazy' />
                        <h1 className=' absolute text-[clamp(1rem,4vw,2rem)] font-bold uppercase text-white outlined-text'>{title}</h1>
                    </div>
                    <img src="/assets/Big TAB.png" alt="big-holder" className=' relative z-20 h-[600px] md:h-[800px] xl:h-[700px]' loading='lazy'/>

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
                        <button key={item.value} onClick={() => {setTab(item.value), setTitle(item.title)}}>
                            <img src={item.icon} alt="tab" className={`rounded-3xl w-[40px] md:w-[50px] lg:w-[60px] cursor-pointer hover:scale-110 transition-all duration-300 ${tab === item.value && 'border-6 border-blue-500'} `} />
                        </button>

                        ))}

                    </div>

                    <div className="lg:hidden absolute z-30 bottom-0 mb-10 flex items-center justify-center gap-4 lg:gap-6 translate-y-24">
                        {tabs.map((item, index) => {
                            const yOffsets = ['-translate-y-6', '-translate-y-2', 'translate-y-0', '-translate-y-2', '-translate-y-6']; // Arc pattern
                            return (
                            <button
                                key={item.value}
                                onClick={() => {
                                setTab(item.value);
                                setTitle(item.title);
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
                            <img src="/assets/Floating Triangle BOT/Triangle A.png" alt="triangles" width={80} className=' absolute top-0 left-0 item1' />
                            <img src="/assets/Floating Triangle BOT/Triangle B.png" alt="triangles" width={50} className=' absolute top-20 right-2 item2' />
                            <img src="/assets/Floating Triangle BOT/Triangle C.png" alt="triangles" width={50} className=' absolute top-20 left-2 item3' />
                            <img src="/assets/Floating Triangle BOT/Triangle D.png" alt="triangles" width={60} className=' absolute right-12 top-4 item4' />
                            <img src="/assets/Floating Triangle BOT/Triangle E.png" alt="triangles" width={70} className=' absolute top-16 left-16 item5' />
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div className=' relative lg:block hidden w-full '>
            <img src="/assets/Calvin.png" alt="tab" width={500} className=' z-40 absolute right-0 top-32 item6' />
            <div className=' relative w-full h-full container'>
                <img src="/assets/Wafer.png" alt="tab" width={500} className=' z-10 absolute bottom-32 left-0 -translate-x-24 item6' />
                <img src="/assets/Floating Triangle Top/Triangle B.png" alt="tab" width={80} className=' z-10 absolute top-[12%] right-[40%] transition-all item1' />
                <img src="/assets/Floating Triangle Top/Triangle E.png" alt="tab" width={50} className=' z-10 absolute top-[17%] right-[10%] transition-all item2' />
                <img src="/assets/Floating Triangle Top/Triangle A.png" alt="tab" width={50} className=' z-10 absolute top-[25%] left-[25%] transition-all item3' />
                <img src="/assets/Floating Triangle Top/Triangle D.png" alt="tab" width={100} className=' z-10 absolute top-[40%] left-[10%] transition-all item4' />
                <img src="/assets/Floating Triangle Top/Triangle F.png" alt="tab" width={80} className=' z-10 absolute bottom-[30%] right-[2%] transition-all item5' />
                <img src="/assets/Floating Triangle Top/Triangle C.png" alt="tab" width={110} className=' z-10 absolute bottom-[17%] right-[12%] transition-all item1' />

            </div>

        </div>

        </div>
    </main>
  )
}
