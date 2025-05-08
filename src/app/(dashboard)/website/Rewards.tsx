import React from 'react'

export default function Rewards() {
  return (
    <div className=' absolute w-[80%] h-[70%] z-30 flex flex-col items-center'>
        <p className='text-center w-[90%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p>

        <div className=' w-full h-full grid grid-cols-3 gap-4 mt-20'>

            <div className=' relative w-full h-full flex items-center justify-center rounded-2xl'>
                <img src="/assets/Neon Headphones ICON.png" alt="headphone" width={100} className=' z-10 -translate-y-16 absolute top-0' />
                <div className=' relative'>
                 <img src="/assets/tab.png" alt="" />
                 <div className=' absolute top-0 w-full h-full p-4'> 
                    <p className=' text-lg text-amber-200 font-bold text-center uppercase mt-7'>In-Game Rewards</p>
                    <p className=' text-sm text-amber-900 font-bold text-center mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsam .</p>
                 </div>

                </div>
            </div>

            <div className=' relative w-full h-full flex items-center justify-center rounded-2xl'>
                <img src="/assets/Robux ICON.png" alt="headphone" width={80} className=' z-10 -translate-y-16 absolute top-0' />
                <div className=' relative'>
                 <img src="/assets/tab.png" alt="" />
                 <div className=' absolute top-0 w-full h-full p-4'> 
                    <p className=' text-lg text-amber-200 font-bold text-center uppercase mt-7'>ROBUX</p>
                    <p className=' text-sm text-amber-900 font-bold text-center mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsam .</p>
                 </div>

                </div>
            </div>

            <div className=' relative w-full h-full flex items-center justify-center rounded-2xl'>
                <img src="/assets/Ticket ICON.png" alt="headphone" width={100} className=' z-10 -translate-y-16 absolute top-0' />
                <div className=' relative'>
                 <img src="/assets/tab.png" alt="" />
                 <div className=' absolute top-0 w-full h-full p-4'> 
                    <p className=' text-lg text-amber-200 font-bold text-center uppercase mt-7'>Ticket</p>
                    <p className=' text-sm text-amber-900 font-bold text-center mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsam .</p>
                 </div>

                </div>
            </div>

        </div>

        <div className=' w-full flex items-center justify-center mt-8'>
            <button className=' relative cursor-pointer flex items-center justify-center'>
                <img src="/assets/Play BUTTON.png" alt="" />
                <p className=' text-2xl font-bold absolute text-yellow-200 uppercase'>Redeem Now</p>
            </button>
        </div>

        

    </div>
  )
}
