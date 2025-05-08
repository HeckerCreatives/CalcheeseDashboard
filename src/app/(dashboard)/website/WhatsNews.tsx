import React, { useState } from 'react'

const tabs = [
    {name:'New Worlds', value: 'worlds'},
    {name:'New Items', value: 'items'},
    {name:'Calcitezen', value: 'calcitezen'},
]
export default function WhatsNews() {
    const [tab, setTab] = useState('worlds')
  return (
    <div className=' absolute w-[80%] h-[65%] z-30 flex flex-col items-center'>
        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, deserunt sit voluptas voluptatum consectetur officiis suscipit laudantium eos dolores excepturi commodi neque aspernatur illo, adipisci, natus fugit possimus. Dolorem, ut.</p>

        <div className=' w-full h-full flex mt-8 gap-4'>
            <div className=' flex flex-col gap-4'>
                {tabs.map((item, index) => (
                     <button key={item.value} onClick={() => setTab(item.value)} className=' relative cursor-pointer flex items-center justify-center'>
                        {tab === item.value && (
                            <img src="/assets/BUTTON.png" alt="button" className=' z-10 absolute w-[90%]' />
                        )}
                        <img src="/assets/BUTTON Holder.png" alt="button-active" className=' w-full' />
                        <p className={`z-20 text-2xl font-bold absolute ${tab === item.value ? 'text-white' : 'text-amber-900'}`}>{item.name}</p>
                    </button>
                ))}
               
            </div>
            <div className=' w-full flex flex-col gap-4'>

                <div className='flex items-end justify-end w-full h-full rounded-2xl bg-gray-300 border-white border-4'>
                    <div className=' w-full h-[100px] bg-amber-100 p-4'>
                        <p className=' text-lg font-bold text-amber-900 line-clamp-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem molestiae quo debitis illo pariatur asperiores esse ipsam explicabo.</p>

                    </div>
                </div>

               
            </div>
        </div>

    </div>
  )
}
