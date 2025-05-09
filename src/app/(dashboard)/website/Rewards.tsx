import { useGetPromos } from '@/apis/promocodes'
import { promocodeIcon } from '@/utils/reusables'
import React from 'react'

export default function Rewards() {
    const {data, isLoading} = useGetPromos()


    

  return (
    <div className=' absolute w-[90%] md:w-[80%] h-[75%] z-30 flex flex-col items-center'>
        <p className='text-center w-[90%] md:text-sm text-xs'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p>

        <div className=' w-full h-fit lg:h-full flex md:grid  md:grid-cols-3 gap-4 mt-8 md:mt-20 '>
            {data?.data.map((item, index) => (
                <div key={item.id} className=' relative w-full h-[210px] bg-orange-500 lg:bg-transparent lg:h-full flex items-center justify-center rounded-2xl'>
                    <img src={promocodeIcon(item.title)} alt="headphone" width={100} className=' w-[80px] md:w-[100px] z-10 -translate-y-6 md:-translate-y-16 absolute top-0' />
                    <div className=' relative'>
                    <img src="/assets/tab.png" alt="" className=' hidden lg:block'/>
                    <div className=' lg:absolute top-0 w-full h-fit lg:h-full p-4'> 
                        <p className=' text-sm md:text-lg text-amber-200 font-bold text-center uppercase mt-7'>{item.title}</p>
                        <p className='  text-[.5rem] md:text-xs text-amber-900 font-bold text-center mt-2 md:mt-6'>{item.description}</p>
                    </div>

                    </div>
                </div>
            ))}

            {/* <div className=' relative w-full h-[210px] bg-orange-500 lg:bg-transparent lg:h-full flex items-center justify-center rounded-2xl'>
                <img src="/assets/Neon Headphones ICON.png" alt="headphone" width={100} className=' w-[80px] md:w-[100px] z-10 -translate-y-6 md:-translate-y-16 absolute top-0' />
                <div className=' relative'>
                 <img src="/assets/tab.png" alt="" className=' hidden lg:block'/>
                 <div className=' lg:absolute top-0 w-full h-fit lg:h-full p-4'> 
                    <p className=' text-sm md:text-lg text-amber-200 font-bold text-center uppercase mt-7'>In-Game Rewards</p>
                    <p className='  text-[.5rem] md:text-xs text-amber-900 font-bold text-center mt-2 md:mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsam .</p>
                 </div>

                </div>
            </div>

            <div className=' relative w-full h-[210px] bg-orange-500 lg:bg-transparent lg:h-full flex items-center justify-center rounded-2xl'>
                <img src="/assets/ROBUX ICON.png" alt="headphone" width={80} className=' w-[60px] md:w-[80px] z-10 -translate-y-6 md:-translate-y-16 absolute top-0' />
                <div className=' relative'>
                 <img src="/assets/tab.png" alt="" className=' hidden lg:block'/>
                 <div className=' lg:absolute top-0 w-full h-fit lg:h-full p-4'> 
                    <p className=' text-sm md:text-lg text-amber-200 font-bold text-center uppercase mt-7'>ROBUX</p>
                    <p className='  text-[.5rem] md:text-xs text-amber-900 font-bold text-center mt-2 md:mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsam .</p>
                 </div>

                </div>
            </div>

            <div className=' relative w-full h-[210px] bg-orange-500 lg:bg-transparent lg:h-full flex items-center justify-center rounded-2xl'>
                <img src="/assets/Ticket ICON.png" alt="headphone" width={100} className=' w-[80px] md:w-[100px] z-10 -translate-y-6 md:-translate-y-16 absolute top-0' />
                <div className=' relative'>
                 <img src="/assets/tab.png" alt="" className=' hidden lg:block'/>
                 <div className=' lg:absolute top-0 w-full h-fit lg:h-full p-4'> 
                    <p className=' text-sm md:text-lg text-amber-200 font-bold text-center uppercase mt-7'>Ticket</p>
                    <p className='  text-[.5rem] md:text-xs text-amber-900 font-bold text-center mt-2 md:mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsam .</p>
                 </div>

                </div>
            </div> */}

         


        </div>

        <div className=' w-full flex items-center justify-center mt-4 md:mt-8'>
            <button className=' relative cursor-pointer flex items-center justify-center'>
                <img src="/assets/Play BUTTON.png" alt="" className=' w-[200px] md:w-full' />
                <p className=' text-xl md:text-3xl font-bold absolute text-yellow-200'>Redeem Now</p>
            </button>
        </div>

        

    </div>
  )
}
