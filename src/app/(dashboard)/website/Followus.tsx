import { useGetSocials } from '@/apis/socials'
import { socialsIcon } from '@/utils/reusables'
import { Loader } from 'lucide-react'
import React from 'react'

export default function Followus() {
  const {data, isLoading} = useGetSocials()

   return (
    <div className=' absolute w-[80%] h-[65%] z-30 flex flex-col items-center'>
        <p className='text-center text-xs md:text-sm '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p>

        <div className=' w-full h-[40%] md:h-full flex items-center justify-center gap-8 '>
          {data?.data.map((item, index) => (
            <a href={item.link} target='_blank'>
            <img src={socialsIcon(item.title)} width={160} alt="icon" />
            </a>
          ))}
           
        </div>

        
                {isLoading ? (
                  <div className=' p-16'>
                    <Loader type={'loader-secondary'}/>
                  </div>
                ) : (
                  <>
                  {data?.data.length === 0 && (
                    <div className=' relative flex items-center justify-center w-full h-[200px]'
                    >
                      <p className=' text-xs text-amber-600 '>No social medias yet.</p>
                  </div>
                  )}
        
                  </>
                )}

      

        

    </div>
  )
}
