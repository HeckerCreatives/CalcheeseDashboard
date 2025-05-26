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
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useRedeemStatePopup from '@/hooks/redeempopup'


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
        const [address, setAddress] = useState('')
        const [contact, setContact] = useState('')
        const [gurdian, setGurdian] = useState('')
        const {mutate: checkCode} = useCheckCode()
        const {mutate: redeemCode, isPending} = useRedeemCode()
        const {redeemcodes,setRedeemcodes, clearRedeemcodes} = useRedeemCodesStore()
        const [rewarddata, setRewarddata] = useState<RewardData>()
        const [isclaimed, setIsclaimed] = useState(false)
        const [chest, setChest] = useState(false)
        const [image, setImage] = useState<File | null>(null);
        const [preview, setPreview] = useState<string | null>(null);
        const {state, setState} = useRedeemStatePopup()

    

        const validateCode = (value: string) => {
          if (value.length <= 13) return;
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
            redeemCode({code: code, email: email, name: username, picture: image, guardian: gurdian, contact: Number(contact), address: address},{
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
          "Rare Box": "/rewards/rarechest.png",
          "Epic Box": "/rewards/epicchest.png",
          "Legendary Chest": "/rewards/legendarychest.png",
        } as const;

        const chestName = rewarddata?.data?.chest?.chestname as keyof typeof chestImageMap;


  return (
    <div className=' absolute z-[9999] w-full h-full overflow-y-hidden flex items-center justify-center bg-orange-100'>
        <div className=' relative gap-8 w-[90%] h-full grid grid-cols-1 lg:grid-cols-2  bg-orange-100 z-[9999] overflow-y-hidden place-items-center place-content-center'
            // style={{backgroundImage: "url('/rewards/bg.png')" , backgroundPosition:'bottom', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
             >
              {/* <button onClick={() => {setRedeemcodes('close'), setIsclaimed(false), setChecked('invalid'), setCode('')}} className=' cursor-pointer absolute top-4 left-4 text-yellow-100'><X size={20}/></button> */}

                <button onClick={() => setState(false)} className=' absolute right-4 top-4 text-orange-600 cursor-pointer'><X size={40}/></button>

              <div className=' lg:block hidden w-full h-screen relative z-10 '>
                <Image src="/assets/Calvin.png" alt="tab"  width={700} height={700} priority unoptimized loading='eager' className=' w-[70%] translate-y-12 absolute right-0 translate-x-16' />

              </div>
              <div className=' w-full h-full  flex items-center'>

                <div className=' w-full xl:w-[70%] h-auto bg-orange-500  rounded-2xl border-4 border-white p-6 lg:p-8 flex flex-col items-center'>
                  <h2 className=' text-white uppercase text-2xl lg:text-4xl font-bold italic'>Claim Your Rewards!</h2>


                  <Tabs defaultValue="robux" className="w-full mt-8">
                    <TabsList>
                      <TabsTrigger value="robux">Robux</TabsTrigger>
                      <TabsTrigger value="ticket">Ticket</TabsTrigger>
                    </TabsList>
                    <TabsContent value="robux">
                    
                         <div className="w-full flex flex-col gap-3 mt-2">
                            <div className=' flex items-center gap-4 mt-8'>
                              <label className=" text-xs text-amber-50  w-[150px]">CalCheese Code:</label>
                              <Input
                                  value={code}
                                  onChange={(e) => {
                                    const newCode = e.target.value;
                                    setCode(newCode);
                                    validateCode(newCode);
                                  }}
                                  placeholder="Enter calcheese code"
                                  type="text"
                                />
                            </div>
                                               <div className=' w-full flex items-center gap-4'>
                                                   <label className="text-xs text-amber-50 w-[150px]">Roblox Id</label>
                                                    <Input
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                      placeholder="Username"
                                                      type="text"
                                                    />
                                                </div>

                                                <div className=' flex items-center gap-4'>
                                                    <label className="text-xs text-amber-50 text-nowrap  w-[150px]">Email</label>
                                                    <Input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                      placeholder="Email"
                                                      type="text"
                                                    />
                                                </div>
                                              
                    
                                                
                          </div>
                    </TabsContent>
                    <TabsContent value="ticket">
                       <div className="w-full flex flex-col gap-3 mt-2">
                      <div className=' flex items-center gap-4 mt-8'>
                              <label className=" text-xs text-amber-50  w-[150px]">CalCheese Code:</label>
                              <Input
                                  value={code}
                                  onChange={(e) => {
                                    const newCode = e.target.value;
                                    setCode(newCode);
                                    validateCode(newCode);
                                  }}
                                  placeholder="Enter calcheese code"
                                  type="text"
                                />
                            </div>
                                               <div className=' w-full flex items-center gap-4'>
                                                   <label className="text-xs text-amber-50 w-[150px]">Roblox Id</label>
                                                    <Input
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                      placeholder="Roblox Id"
                                                      type="text"
                                                    />
                                                </div>

                                                <div className=' flex items-center gap-4'>
                                                    <label className="text-xs text-amber-50 text-nowrap  w-[150px]">Email</label>
                                                    <Input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                      placeholder="Email"
                                                      type="text"
                                                    />
                                                </div>

                                                <div className=' flex items-center gap-4'>
                                                        <label className="text-xs text-amber-50 text-nowrap  w-[150px]">Address</label>
                                                            <Input
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                              placeholder="Address"
                                                              type="text"
                                                            />
                                                    </div>

                                                    <div className=' flex items-center gap-4'>
                                                        <label className="text-xs text-amber-50 text-nowrap  w-[150px]">Guardian</label>
                                                          <Input
                                                      value={gurdian}
                                                      onChange={(e) => setGurdian(e.target.value)}
                                                        placeholder="Guardian Name"
                                                        type="text"
                                                      />
                                                    </div>

                                                    <div className=' flex items-center gap-4'>
                                                        <label className="text-xs text-amber-50 text-nowrap  w-[150px]">Picture</label>
                                                         <Input
                                                          type="file"
                                                          accept="image/*"
                                                          onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                              setImage(file);
                                                              setPreview(URL.createObjectURL(file));
                                                            }
                                                          }}
                                                          className="text-sm text-black"
                                                        />
                                                    </div>
                                                 
                                            </div>
                    </TabsContent>
                    
                  </Tabs>

              
                      <button disabled={isPending} onClick={redeemCodeRewards}  className=' relative cursor-pointer flex items-center justify-center mt-8'>
                          <img src="/assets/Play BUTTON.png" alt="" className=' w-full max-w-[200px] ' />
                          <div className='absolute flex items-center justify-center gap-2'>
                            {isPending && <Loader type={'loader'}/>}
                          <p className=' text-lg md:text-lg font-bold  text-yellow-200'>Redeem now</p>
                          </div>
                      </button>
                      
                   


               


                 
                </div>
                
           


              </div>
{/* 
              {isclaimed && (
                <div className=' absolute z-[9999999] w-[40%] h-fit flex flex-col items-center justify-center gap-8 p-10 bg-orange-500'>
                  <button onClick={() => {setIsclaimed(false), setChecked('')}} className=' absolute right-4 top-4 text-white cursor-pointer'><X size={20}/></button>
                  <h2 className=' md:text-2xl text-xl lg:text-4xl font-bold text-yellow-100 font-spenbeb'>Congratulations!</h2>
                    <h2 className=' text-sm font-bold text-yellow-100'>You recieved</h2>
        
                    <div className=' flex items-center justify-center flex-wrap gap-6'>
                       {rewarddata?.data?.chest && (
                        <div className="flex flex-col items-center">

                          {!chest ? (
                             <div onClick={() => setChest(true)} className=' cursor-pointer relative flex items-center justify-center'>
                              <img
                              src={chestImageMap[chestName]}
                              alt={rewarddata.data.chest.chestname}
                              width={200}
                              height={200}
                              className=' cursor-pointer'
                            />

                            <p className=' animate-pulse text-yellow-100 absolute cursor-pointer'>Click to open</p>
                          </div>
                          ) : (
                            <div className=" w-full flex items-center justify-center flex-wrap gap-4">
                              {[...(rewarddata?.data?.chest?.itemid || [])].map((item) => {
                                const itemName = item.itemname || '';
                                const hasCoins = itemName.toLowerCase().includes('coin');
                                const hasGems = itemName.toLowerCase().includes('gem');
                                const hasRobux = itemName.toLowerCase().includes('robux');
                                const hasDisneyLand = itemName.toLowerCase().includes('disneyland');
                                const hasOceanpark = itemName.toLowerCase().includes('ocean park');
                                const hasEnchantedkingdom = itemName.toLowerCase().includes('enchanted kingdom');
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
                                      <div className=' w-[145px] aspect-video relative flex items-center justify-center p-2 rounded-sm bg-white'
                                      >
                                        <img src="https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-standard-assets/parks/logo/disneyland/dlr-70th-logo.svg?2025-04-02T16:55:45+00:00" alt="enchanted kingdom" className=' w-full'/>
                                        
                                      
                                      </div>

                                    )}

                                    {hasEnchantedkingdom && (
                                      <div className=' w-[145px] aspect-video relative flex items-center justify-center p-2 rounded-sm bg-white'
                                      >
                                        <img src="/rewards/enchantedkingdom.png" alt="enchanted kingdom" className=' w-full'/>
                                        
                                      </div>

                                    )}

                                     {hasOceanpark && (
                                      <div className=' w-[145px] aspect-video relative flex items-center justify-center p-2 rounded-sm bg-white'
                                      >
                                        <img src="/rewards/oceanpark.png" alt="enchanted kingdom" className=' w-full'/>
                                        
                                      </div>

                                    )}

                                    

                                   
                                  </div>
                                );
                              })}

                             
                            </div>
                          ) }


    
                         
                        </div>
                      )}

                      

                  
                    </div>
                </div>
              )} */}
              
             
              

            
        </div>
    </div>
         
     
  )
}
