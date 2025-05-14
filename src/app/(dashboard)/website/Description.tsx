'use client'
import { useGetMinigameList, useGetMinigameListRandomLp } from '@/apis/minigames'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import TextRevealOnView from '@/components/animations/TextRevealOnView'
import Loader from '@/components/common/Loader'
import React from 'react'

export default function Description() {
  const {data, isLoading} = useGetMinigameList('welcome', 3)
  return (
    <div className=' absolute w-[80%] h-[80%] md:h-[75%] z-30 flex flex-col items-center'>
      <TextRevealOnView
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut."
        className="text-center text-xs md:text-lg mt-6 font-semibold"
        delay={.6}
      />
        {/* <p className='text-center text-xs md:text-sm mt-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p> */}
        <RevealOnScroll delay={1} className=' w-full'>
           <div className=' w-full grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
            {data?.data.map((item, index) => (
              <div key={item.id} className=' relative flex items-center justify-center w-full h-[100px] md:h-[200px] rounded-2xl bg-gray-300 border-white border-4 overflow-hidden'
                style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}uploads/${item.image}')` , backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
                >
              </div>
            ))}

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
              <p className=' text-xs text-amber-600 '>No mini game thumbnails yet.</p>
          </div>
          )}

          <RevealOnScroll delay={1.2} className=' w-full'>
            <div className=' w-full flex items-center justify-center mt-4 md:mt-8'>
              <a href="
                  https://www.roblox.com/share?code=e748dd8533ab29459340d16a5d2f626c&type=ExperienceDetails&stamp=1746761630909" target='_blank'>
                    <button className=' relative cursor-pointer flex items-center justify-center hover:scale-105 transition-all duration-300'>
                  <img src="/assets/Play BUTTON.png" alt="" className=' w-[200px] md:w-full' />
                  <p className=' text-xl md:text-3xl font-bold absolute text-yellow-200'>Play Now</p>
              </button>
              </a>
              
            </div>
          </RevealOnScroll>

  
          </>
        )}

        
       
        

    </div>

  )
}
