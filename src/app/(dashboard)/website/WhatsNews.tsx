'use client'
import { usegetNewtab } from '@/apis/whatsnew'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import TextReveal from '@/components/animations/TextReveal'
import TextRevealOnView from '@/components/animations/TextRevealOnView'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";

const tabs = [
    {name:'New Worlds', value: 'worlds'},
    {name:'New Items', value: 'items'},
    {name:'Calcitezen', value: 'calcitezen'},
]
export default function WhatsNews() {
    const [tab, setTab] = useState('worlds')

    const {data, isLoading} = usegetNewtab()

    useEffect(() => {
        setTab(data?.data[0].tab || '')
    },[data])

    const findConetent = data?.data.find((data) => data.tab === tab)

  return (
    <div className=' absolute w-[80%] h-[75%] z-30 flex flex-col items-center'>
        <TextRevealOnView
               text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut."
               className="text-center text-xs md:text-lg mt-4 font-semibold"
               delay={.6}
             />

            <RevealOnScroll delay={1} className='w-full  h-[85%] flex md:flex-row flex-col mt-4 md:mt-8 gap-4'>
                  <div className=' w-full  h-[85%] flex md:flex-row flex-col mt-4 md:mt-8 gap-4'>
            
            <div className="w-full md:w-fit h-[65px] md:h-fit overflow-x-auto">
            <div className="w-max md:w-fit h-fit md:h-full max-h-[350px] flex flex-row md:flex-col gap-4 md:overflow-y-auto">
                {data?.data.map((item, index) => (
                <button key={item.id} onClick={() => setTab(item.tab)} className=" w-fit md:w-full flex justify-center items-center relative">
                    {tab === item.tab && (
                            <img src="/assets/BUTTON.png" alt="button" className=' z-10 absolute w-[80px] md:w-[90%]' />
                        )}
                        <img src="/assets/BUTTON Holder.png" alt="button-active" className=' w-[90px]  md:w-full' />
                        <p className={`z-20 text-[.6rem] md:text-xl md:font-bold absolute whitespace-nowrap ${tab === item.tab ? 'text-white' : 'text-amber-900'}`}>{item.tab}</p>
                </button>
                ))}
            </div>
            </div>
           <div className=' w-full flex flex-col gap-4'>
            <AnimatePresence mode="wait">
                <motion.div
                key={tab} // re-triggers animation when tab changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className='flex flex-col items-end justify-end w-full rounded-2xl bg-gray-300 border-white border-4 overflow-hidden'
                >
                <div className='w-full h-[120px] md:h-full max-h-[250px] overflow-hidden'>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}uploads/${findConetent?.image}`} alt="" />
                </div>

                <div className='w-full h-[100px] bg-amber-100 p-4'>
                    <TextRevealOnView text={findConetent?.description || ''} delay={.2} className='text-xs md:text-sm font-bold text-amber-900 line-clamp-3 text-ellipsis'/>
                    {/* <p className='text-xs md:text-sm font-bold text-amber-900 line-clamp-3 text-ellipsis'>
                    {findConetent?.description}
                    </p> */}
                </div>
                </motion.div>
            </AnimatePresence>
            </div>
                </div>
            </RevealOnScroll>
      

        {isLoading ? (
                  <div className=' p-16'>
                    <Loader type={'loader-secondary'}/>
                  </div>
                ) : (
                  <>
                  {data?.data.length === 0 && (
                    <div className=' relative flex items-center justify-center w-full h-[200px]'
                    >
                      <p className=' text-xs text-amber-600 '>No news yet.</p>
                  </div>
                  )}
        
                  </>
                )}

    </div>
  )
}
