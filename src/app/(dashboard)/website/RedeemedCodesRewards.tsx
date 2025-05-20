'use client'
import { useCheckCode, useRedeemCode } from '@/apis/redeemcode'
import RevealOnScroll from '@/components/animations/RevealOnScroll'
import TextRevealOnView from '@/components/animations/TextRevealOnView'
import Loader from '@/components/common/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRedeemCodesStore from '@/hooks/player'
import { ArrowLeft, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { string } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface RewardData {
  message: string;
  data: {
    _id: string;
    chest: Chests
    expiration: string; 
    items: Items[]; 
    type: 'ingame' | string;
    status: 'to-claim' | 'claimed' | string;
    isUsed: boolean;
    code: string;
    __v: number;
    createdAt: string; 
    updatedAt: string;
  };
}

interface Chests {
  _id: string
  chestname: string
  chestid: string
  itemid: Items[]
            
}

interface Items {
  _id: string
  itemid: string
  itemname: string
  createdAt: string
}




export default function RedeemedCodesRewards() {
        const [redeem, setRedeem] = useState(false)
        const [code, setCode] = useState('')
        const [type, setType] = useState('')
        const [checked, setChecked] = useState('invalid')
        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const {mutate: checkCode} = useCheckCode()
        const {mutate: redeemCode, isPending} = useRedeemCode()
        const {redeemcodes,setRedeemcodes, clearRedeemcodes} = useRedeemCodesStore()
        const [rewarddata, setRewarddata] = useState<RewardData>()
        const [isclaimed, setIsclaimed] = useState(false)
        const [chest, setChest] = useState(false)
    

        const validateCode = (value: string) => {
          if (value.length !== 13) return;
          checkCode(
            { code: value },
            {
              onSuccess: (response) => {
                setRewarddata(response);
                setChecked('valid');
              },
              onError: () => {
                setChecked('invalid');
              }
            }
          );
        };
    
        const redeemCodeRewards = () => {
            redeemCode({code: code, email: email, name: username, picture: null},{
                onSuccess: (response) => {
                  toast.success(`Code redeemed successfully`);
                  setType(response.data.codetype)
                  setUsername('')
                  setCode('')
                  setIsclaimed(true)
                },
                onError: () => {
                  setIsclaimed(false)

                }
              })
        }

        const chestImageMap = {
          "Uncommon Box": "/rewards/uncommonchest.png",
          "Common Box": "/rewards/commonchest.png",
          "Rare Chest": "/rewards/rarechest.png",
          "Epic Box": "/rewards/epicchest.png",
          "Legendary Box": "/rewards/legendarychest.png",
        } as const;

        const chestName = rewarddata?.data?.chest?.chestname as keyof typeof chestImageMap;


  return (

         <div className=' flex flex-col items-center justify-center gap-8 w-full h-full  bg-orange-500'
            // style={{backgroundImage: "url('/rewards/bg.png')" , backgroundPosition:'bottom', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
             >
              {/* <button onClick={() => {setRedeemcodes('close'), setIsclaimed(false), setChecked('invalid'), setCode('')}} className=' cursor-pointer absolute top-4 left-4 text-yellow-100'><X size={20}/></button> */}
              
              {!isclaimed ? (
                 <div className=' w-full h-full grid grid-cols-2 min-h-[300px]'>

                 <div className=' h-full flex flex-col items-center justify-center gap-4 p-12 '>
                  <h2 className=' text-3xl font-bold text-yellow-100 font-spenbeb'>Redeem Code</h2>
                   

                  <div className=' w-full flex flex-col gap-4'>
                    <div className="w-full flex flex-col gap-1">
                          <label className="text-xs text-amber-50">Code</label>
                                <Input
                                    value={code}
                                    onChange={(e) => {
                                      const newCode = e.target.value;
                                      setCode(newCode);
                                      validateCode(newCode);
                                    }}
                                    placeholder="Code"
                                    type="text"
                                  />
                      </div>

                      {(rewarddata?.data.type === 'ingame' && checked === 'valid') && (
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-xs text-amber-50">Roblox Username</label>
                            <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                              placeholder="Username"
                              type="text"
                            />
                        </div>
                      )}

                      {(rewarddata?.data.type === 'robux' && checked === 'valid') && (
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-xs text-amber-50">Roblox Username</label>
                            <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                              placeholder="Username"
                              type="text"
                            />

                             <label className="text-xs text-amber-50">Email</label>
                            <Input
                            value={username}
                            onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email"
                              type="text"
                            />
                        </div>
                      )}

                      {(type === 'robux' && checked === 'valid') && (
                        <>
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-xs text-amber-900">Username</label>
                            <Input
                            value={code}
                            onChange={(e) => {
                              const newCode = e.target.value;
                              setCode(newCode);
                              if (newCode.trim().length === 13) {
                                validateCode(newCode);
                              }
                            }}
                            placeholder="Code"
                            type="text"
                          />
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <label className="text-xs text-amber-900">Email</label>
                            <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email"
                              type="email"
                            />
                        </div>
                        </>
                        
                      )}

                      {(checked === 'valid') ? (
                        <>
                        <p className='text-yellow-50 text-[.6rem]'>Code is valid, Please fill the aditional information.</p>

                        <button disabled={isPending} onClick={redeemCodeRewards}  className=' relative cursor-pointer flex items-center justify-center'>
                            <img src="/assets/Play BUTTON.png" alt="" className=' w-[200px] md:w-[80%]' />

                            <div className='absolute flex items-center justify-center gap-2'>
                              {isPending && <Loader type={'loader'}/>}
                            <p className=' text-lg md:text-lg font-bold  text-yellow-200'>Redeem now</p>

                            </div>
                        </button>

                        </>
                      ) : (
                        <>
                        {code.trim().length >= 13 && (
                        <p className='text-yellow-50 text-[.6rem]'>Code is invalid.</p>

                        )}
                        </>

                      )}

                      
                  
                  </div>

            
                  </div>

                  <div className='w-full h-full  flex  items-center justify-center bg-orange-400 p-10'>

                    <div className='w-full h-full  flex flex-col gap-8 items-center justify-center'>
                      <img src="/assets/CalCheese World Logo.png" alt="logo" width={200} height={200} loading='eager' className=''/>
                    
                        <div className=' w-full h-fit flex items-center justify-center bg-orange-400'>
                          <img src='/assets/Neon Headphones ICON.png' alt="headphone" width={200} height={200} className=' h-[70px] w-[60px] translate-x-6' />
                          <img src='/assets/Robux ICON.png' alt="robux" width={200} height={200} className=' h-auto relative z-10 w-[80px] ' />
                          <img src='/assets/Ticket ICON.png' alt="ticket" width={200} height={200} className=' h-[80px] w-[60px] -translate-x-6' />
                        </div>

                      <h2 className=' text-xs font-bold text-yellow-100 '>Enjoy with amazing rewards.</h2>
                    </div>
                      

                  </div>
               
                 
               
                </div>
              ) : (
                <div className=' w-full h-full flex flex-col items-center justify-center gap-8 p-10'>
                  <h2 className=' text-4xl font-bold text-yellow-100 font-spenbeb'>Congratulations!</h2>
                    <h2 className=' text-sm font-bold text-yellow-100'>You recieved</h2>
        
                    <div className=' flex items-center justify-center flex-wrap gap-6'>
                       {rewarddata?.data?.chest && (
                        <div className="flex flex-col items-center">

                          {!chest ? (
                             <div onClick={() => setChest(true)} className=' relative flex items-center justify-center'>
                              <img
                              src={chestImageMap[chestName]}
                              alt={rewarddata.data.chest.chestname}
                              width={150}
                              height={150}
                            />

                            <p className=' animate-pulse text-yellow-100 absolute'>Click to open</p>
                          </div>
                          ) : (
                            <div className=" w-full flex items-center justify-center flex-wrap gap-4">
                              {[...(rewarddata?.data?.chest?.itemid || [])].map((item) => {
                                const itemName = item.itemname || '';
                                const hasCoins = itemName.toLowerCase().includes('coin');
                                const hasGems = itemName.toLowerCase().includes('gem');
                                const hasRobux = itemName.toLowerCase().includes('robux');
                                const hasDisneyLand = itemName.toLowerCase().includes('disneyland');
                                 const numbers = itemName.match(/\d+/g); // Match all numbers
                                const multiplier = numbers ? numbers[numbers.length - 1] : '1';


                                return (
                                  <div key={item._id} className="relative w-fit h-fit">
                                    {hasCoins && (
                                      <div key={item._id} className="relative w-fit h-fit">
                                        <img src="/rewards/coins.png" alt="Coins" width={100} height={100} />
                                        <p className="absolute text-xl font-bold text-yellow-100 top-0 right-0">
                                          x{multiplier}
                                        </p>
                                       </div>

                                    )}
                                    {hasGems && (
                                      <div key={item._id} className="relative w-fit h-fit">
                                        <img src="/rewards/gems.png" alt="Gems" width={100} height={100} />
                                        <p className="absolute text-xl font-bold text-yellow-100 top-0 right-0">
                                          x{multiplier}
                                        </p>
                                       </div>
                                    )}

                                    {hasRobux && (
                                      <div className=' relative'>
                                        <img src="/rewards/robloxgiftcards.png" alt="Gems" width={130} height={130} />
                                        <p className='text-sm text-white absolute top-2 right-2'>${multiplier}</p>
                                      </div>

                                    )}

                                    {hasDisneyLand && (
                                      <div className=' w-[145px] aspect-video relative rounded-sm'
                                        style={{backgroundImage: "url('/rewards/disneyland.jpg')" , backgroundPosition:'top right', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
                                      >
                                        
                                        <p className='text-sm text-white absolute top-2 right-2'>Disneyland</p>
                                      </div>

                                    )}
                                   
                                  </div>
                                );
                              })}

                             
                            </div>
                          ) }


    
                         
                        </div>
                      )}

                      
                          {[...(rewarddata?.data?.items || [])].map((item) => {
                                const itemName = item.itemname || '';
                                const hasCoins = itemName.toLowerCase().includes('coin');
                                const hasGems = itemName.toLowerCase().includes('gem');
                                const hasRobux = itemName.toLowerCase().includes('robux');
                                const hasDisneyLand = itemName.toLowerCase().includes('disneyland');
                                 const numbers = itemName.match(/\d+/g); // Match all numbers
                                const multiplier = numbers ? numbers[numbers.length - 1] : '1';


                                return (
                                  <div key={item._id} className="relative w-fit h-fit">
                                    {hasCoins && (
                                      <div key={item._id} className="relative w-fit h-fit">
                                        <img src="/rewards/coins.png" alt="Coins" width={100} height={100} />
                                        <p className="absolute text-xl font-bold text-yellow-100 top-0 right-0">
                                          x{multiplier}
                                        </p>
                                       </div>

                                    )}
                                    {hasGems && (
                                      <div key={item._id} className="relative w-fit h-fit">
                                        <img src="/rewards/gems.png" alt="Gems" width={100} height={100} />
                                        <p className="absolute text-xl font-bold text-yellow-100 top-0 right-0">
                                          x{multiplier}
                                        </p>
                                       </div>
                                    )}

                                    {hasRobux && (
                                      <div className=' relative'>
                                        <img src="/rewards/robloxgiftcards.png" alt="Gems" width={130} height={130} />
                                        <p className='text-sm text-white absolute top-2 right-2'>${multiplier}</p>
                                      </div>

                                    )}

                                    {hasDisneyLand && (
                                      <div className=' w-[145px] aspect-video relative rounded-sm'
                                        style={{backgroundImage: "url('/rewards/disneyland.jpg')" , backgroundPosition:'top right', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
                                      >
                                        
                                        <p className='text-sm text-white absolute top-2 right-2'>Disneyland</p>
                                      </div>

                                    )}
                                   
                                  </div>
                                );
                              })}

                    

                      {/* <div className=' flex'>
                         {rewarddata?.data.items.map((item) => {
                                const itemName = item.itemname || '';
                                const hasCoins = itemName.toLowerCase().includes('coin');
                                const hasGems = itemName.toLowerCase().includes('gem');
                                const hasRobux = itemName.toLowerCase().includes('robux');
                                const hasDisneyLand = itemName.toLowerCase().includes('disneyland');
                                 const numbers = itemName.match(/\d+/g); // Match all numbers
                                const multiplier = numbers ? numbers[numbers.length - 1] : '1';


                                return (
                                  <div key={item._id} className="relative w-fit h-fit">
                                    {hasCoins && (
                                      <div key={item._id} className="relative w-fit h-fit">
                                        <img src="/rewards/coins.png" alt="Coins" width={100} height={100} />
                                        <p className="absolute text-xl font-bold text-yellow-100 top-0 right-0">
                                          x{multiplier}
                                        </p>
                                       </div>

                                    )}
                                    {hasGems && (
                                      <div key={item._id} className="relative w-fit h-fit">
                                        <img src="/rewards/gems.png" alt="Gems" width={100} height={100} />
                                        <p className="absolute text-xl font-bold text-yellow-100 top-0 right-0">
                                          x{multiplier}
                                        </p>
                                       </div>
                                    )}

                                    {hasRobux && (
                                      <div className=' relative'>
                                        <img src="/rewards/robloxgiftcards.png" alt="Gems" width={130} height={130} />
                                        <p className='text-sm text-white absolute top-2 right-2'>${multiplier}</p>
                                      </div>

                                    )}

                                    {hasDisneyLand && (
                                      <div className=' w-[145px] aspect-video relative rounded-sm'
                                        style={{backgroundImage: "url('/rewards/disneyland.jpg')" , backgroundPosition:'top right', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
                                      >
                                        
                                        <p className='text-sm text-white absolute top-2 right-2'>Disneyland</p>
                                      </div>

                                    )}
                                   
                                  </div>
                                );
                        })}
                      </div> */}

                      


        
                    </div>
                </div>
              )}

          
        </div>
     
  )
}
