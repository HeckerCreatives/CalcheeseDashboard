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
import { AnimatePresence, motion } from "framer-motion";



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
    
      <div className=' absolute z-[9999999] w-full h-full overflow-y-hidden flex items-center justify-center bg-orange-100'>
        <div className=' relative gap-8 w-[90%] h-full grid grid-cols-1 lg:grid-cols-2  bg-orange-100 z-[9999] overflow-y-hidden place-items-center place-content-center'
             >

                <button onClick={() => setState(false)} className=' absolute right-4 top-4 text-orange-600 cursor-pointer'><X size={40}/></button>

                <RevealOnScroll className=' w-full relative z-10' delay={.4}>
                   <div className=' lg:block hidden w-full h-screen relative z-10 '>
                    <Image src="/assets/Calvin.png" alt="tab"  width={700} height={700} priority unoptimized loading='eager' className=' w-[70%] translate-y-12 absolute right-0 translate-x-16' />

                  </div>
                </RevealOnScroll>

             

              <RevealOnScroll className=' w-full relative z-0' delay={.8}>
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

                                                     <div className=' flex items-center gap-4'>
                                                        <label className="text-xs text-amber-50 text-nowrap  w-[150px]">Address</label>
                                                            <Input
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                              placeholder="Address"
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
              </RevealOnScroll>
              


            
        </div>
      </div>
    

         
     
  )
}
