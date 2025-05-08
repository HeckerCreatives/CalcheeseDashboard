import { useGetMinigameListLp } from '@/apis/minigames';
import React from 'react'
import Marquee from "react-fast-marquee";

export default function MiniGames() {
  const {data} = useGetMinigameListLp()

  return (
    <div className=' absolute w-[80%] h-[65%] z-30 flex flex-col items-center'>
        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p>

        <Marquee direction='right' className=' w-full mt-4 overflow-hidden'>
          {data?.data.map((item, index) => (
            <div key={item.id} className=' w-[300px] h-[180px] rounded-2xl bg-gray-300 border-white border-4 mx-4'
            style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}')` , backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
            >

            </div>
          ))}
        
        </Marquee>

        <Marquee direction='left' className=' w-full mt-4 overflow-hidden'>
            
        {data?.data.map((item, index) => (
            <div key={item.id} className=' w-[300px] h-[180px] rounded-2xl bg-gray-300 border-white border-4 mx-4'
            style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}')` , backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
            >
            </div>
          ))}
            
        </Marquee>

        {data?.data.length === 0 && (
          <div className=' relative flex items-center justify-center w-full h-[300px]'
          >
            <p className=' text-xs text-amber-600 '>No mini game thumbnails yet.</p>
        </div>
        )}
        

    </div>
  )
}
