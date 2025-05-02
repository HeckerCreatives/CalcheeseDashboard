'use client'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

export default function Changepassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
      <div className='w-full max-w-[350px] h-fit flex flex-col gap-4 bg-yellow-50 shadow-sm p-6 rounded-md'>
            <h2 className='text-lg font-semibold text-orange-500'>Change password</h2>

            <form  className='flex flex-col gap-1'>
                <label htmlFor="" className='text-sm text-zinc-500'>New password</label>
                <div className="relative">
                    <Input
                        placeholder='New password'
                        className='bg-gray-100'
                        type={showPassword ? 'text' : 'password'}
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
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showConfirmPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
                    </button>
                </div>

                <button  className='primary-btn mt-4'>
                    Save password
                </button>
            </form>
        </div>
  )
}
