'use client'
import { useGetMinigameListRandomLp } from '@/apis/minigames'
import React from 'react'

export default function Description() {
  const {data, isLoading} = useGetMinigameListRandomLp()
  return (
    <div className=' absolute w-[80%] h-[65%] z-30 flex flex-col items-center'>
        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p>

        <div className=' w-full grid grid-cols-3 gap-4 mt-8'>
          {data?.data.map((item, index) => (
            <div key={item.id} className=' relative flex items-center justify-center w-full h-[200px] rounded-2xl bg-gray-300 border-white border-4 overflow-hidden'
              style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}')` , backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
              >
            </div>
          ))}

        </div>

        {data?.data.length === 0 && (
          <div className=' relative flex items-center justify-center w-full h-[200px]'
          >
            <p className=' text-xs text-amber-600 '>No mini game thumbnails yet.</p>
        </div>
        )}

        <div className=' w-full mt-8'>
            <button className=' relative cursor-pointer flex items-center justify-center'>
                <img src="/assets/Play BUTTON.png" alt="" />
                <p className=' text-3xl font-bold absolute text-yellow-200'>Play Now</p>
            </button>
        </div>

        

    </div>

  )
}
