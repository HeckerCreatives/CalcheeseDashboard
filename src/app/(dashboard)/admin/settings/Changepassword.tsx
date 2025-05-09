'use client'
import { useChangepaswwordUser } from '@/apis/settings';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Changepassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {mutate: changepaswwordUser, isPending} = useChangepaswwordUser()
    const [newpw, setNewpw] = useState('')
    const [confirmnewpw, setConfirmNewpw] = useState('')

    const onSubmit = () => {
        if(newpw !== confirmnewpw){
            toast.error(`Password does not match.`);
        } else {
            changepaswwordUser({newpw: newpw},{
                onSuccess: () => {
                  toast.success(`Password changed successfully.`);
                  setNewpw('')
                  setConfirmNewpw('')
                },
        }) 
        }
        
    }


  return (
      <div className='w-full max-w-[350px] h-fit flex flex-col gap-4 bg-yellow-50 shadow-sm p-6 rounded-md'>
            <h2 className='text-lg font-semibold text-orange-500'>Change password</h2>

            <div  className='flex flex-col gap-1'>
                <label htmlFor="" className='text-sm text-zinc-500'>New password</label>
                <div className="relative">
                    <Input
                        placeholder='New password'
                        className='bg-gray-100'
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setNewpw(e.target.value)}
                        value={newpw}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
                    </button>
                </div>

                <label htmlFor="" className='text-sm text-zinc-500 mt-4'>Confirm password</label>
                <div className="relative">
                    <Input
                        placeholder='Confirm password'
                        className='bg-gray-100'
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={(e) => setConfirmNewpw(e.target.value)}
                        value={confirmnewpw}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showConfirmPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
                    </button>
                </div>

                <Button disabled={isPending} onClick={() => onSubmit()} className=' mt-4'>
                     {isPending && (
                    <Loader type={'loader'}/>
                    )}
                    Save Password
                </Button>

            
            </div>
        </div>
  )
}
