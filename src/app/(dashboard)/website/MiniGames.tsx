'use client'
import { useGetMinigameListLp } from '@/apis/minigames';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import TextRevealOnView from '@/components/animations/TextRevealOnView';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Marquee from "react-fast-marquee";

export default function MiniGames() {
  const {data, isLoading} = useGetMinigameListLp()
   const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMarquee(true);
    }, 2200); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=' absolute w-[80%] h-[75%] z-30 flex flex-col items-center'>
       <TextRevealOnView
              text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut."
              className="text-center text-xs md:text-lg mt-4 font-semibold"
              delay={.6}
            />

         {showMarquee && (
          <RevealOnScroll delay={.8} className=' w-full'>
            <Marquee direction='right' className=' w-full mt-4 overflow-hidden'>
              {data?.data.map((item) => (
                <div key={item.id} className=' w-[300px] h-[120px] md:h-[180px] rounded-2xl  mx-4'
                  style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}uploads/${item.image}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}>
                </div>
              ))}
            </Marquee>

            <Marquee direction='left' className=' w-full mt-4 overflow-hidden'>
              {data?.data.map((item) => (
                <div key={item.id} className=' w-[300px] h-[120px] md:h-[180px] rounded-2xl  mx-4'
                  style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}uploads/${item.image}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}>
                </div>
              ))}
            </Marquee>
          </RevealOnScroll>
        )}


        

        {isLoading ? (
          <div className=' p-16'>
            <Loader type={'loader-secondary'}/>
          </div>
        ) : (
          <>
            {data?.data.length === 0 && (
              <div className=' relative flex items-center justify-center w-full h-[300px]'
              >
                <p className=' text-xs text-amber-600 '>No mini game thumbnails yet.</p>
            </div>
            )}

          </>
        )}

      
        

    </div>
  )
}
