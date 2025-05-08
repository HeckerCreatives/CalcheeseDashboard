'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ChevronDown, Copy, LogIn, Menu } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { admin } from '@/routes/routes'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



export default function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const path = usePathname()
    const params = useSearchParams()
    const router = useRouter()
    const [avatar, setAvatar] = useState('')
    const [referral, setReferral] = useState('')

  const logout = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.message === 'success') {
        toast.success('Logging out...')
        router.push('/')
      } 

    } catch (error) {

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, data: string }>
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`)
          router.push('/')
        }

      }
    }
  }

  // useEffect(() => {
  //   const logout = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       )
  
  //     } catch (error) {
  
  //       if (axios.isAxiosError(error)) {
  //         const axiosError = error as AxiosError<{ message: string, data: string }>
  //         if (axiosError.response && axiosError.response.status === 401) {
  //           toast.error(`${axiosError.response.data.data}`)
  //           router.push('/')
  //         }
  
  //       }
  //     }
  //   }
  //   logout()
  // },[])

  console.log(path)

    
  return (
    <div className=' w-full flex flex-col items-center h-screen'>

      <div className=' relative z-40 w-full flex items-center justify-center  border-b-2 border-orange-100'
      >
        <nav className=' px-4 w-full max-w-[1920px] h-[70px] md:h-[100px] flex items-center justify-between bg-[#fcf7eb] relative'
        
      style={{backgroundImage: "url(/navbg.png)", backgroundSize:'cover', backgroundRepeat:'no-repeat'}}
      >
            <div>
                <h2 className=' text-lg font-bold'>
                 <img src="/logo.png" alt="" width={90} className='md:w-[90px] w-[70px]' />
                  
                </h2>
            </div>

            <div className=' hidden  lg:flex items-center rounded-md shadow-sm p-1 bg-orange-100'>
                {admin.map((item, index) => (
                  <div key={index}>
                  {item.subpath.length === 0 ? (
                    <a key={index} href={item.path} className={` flex items-center gap-1 px-4 py-3 text-[.8rem] rounded-md font-medium ${path.includes(item.path) ? 'bg-gradient text-white' : 'text-black'}`}>{item.icon}{item.name}</a>
                  ) : (
                    <NavigationMenu key={index} className=' w-full'>
                    <NavigationMenuList className=' w-fit'>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={` text-[.8rem] flex gap-2 cursor-pointer ${path.includes(item.path) ? 'bg-gradient text-white' : 'text-black'}`}>{item.icon}{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent className=' w-[400px]'>
                          {item.subpath.map((sub, index) => (
                          <NavigationMenuLink className={`text-xs flex items-center  ${path.includes(sub.path) ? 'bg-gradient text-white' : 'text-black hover:bg-zinc-100 gap-2'}`} href={sub.path}>
                            <p className=' '>{sub.icon}</p>
                            {sub.name}</NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  )}
                  </div>
                ))}

               


            </div>

            <div className=' flex items-center gap-2'>
              <DropdownMenu>
                  <DropdownMenuTrigger className=' focus:ring-0'>
                      <div className=" flex items-center  gap-3 text-xs text-zinc-400 bg-orange-100 p-1 rounded-full shadow-sm focus:ring-0">
                          
                          <div className=" w-7 aspect-square rounded-full bg-white flex items-center justify-center">
                            
                            <img src='/calchesee.jpg' width={120} height={120} />
                         
                          </div>
                          <div className=" flex flex-col">
                            <ChevronDown size={15}/>
                          </div>
                      </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=' bg-white'>
                      <DropdownMenuLabel className=' text-xs'>Admin</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className=' text-xs flex items-center gap-2'><button onClick={logout} className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem>
                  
                  
                  </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
            <SheetTrigger asChild className=' lg:hidden block'>
            <button className=' p-1 bg-orange-500 rounded-sm text-white'><Menu size={15}/></button>
            </SheetTrigger>
            <SheetContent side="left" className=" flex flex-col bg-yellow-50 border-none"
            //  style={{backgroundImage: "url(/assets/BG.png)"}}
            >
              
              <div className=' relative z-10 w-full flex items-center justify-center h-[74px] gap-2 text-white p-4 mt-8'>
                <img src="/logo.png" alt="logo" loading="lazy" width={90} height={90} className=" w-[120px] "/>
              
              </div>
              <nav className=" flex flex-col gap-2 px-2 text-sm font-medium lg:px-4">

              {admin.map((item, index) => (
                  <>
                  {item.subpath.length === 0 ? (
                    <a key={index} href={item.path} className={` flex items-center gap-1 px-4 py-3 text-[.8rem] rounded-md font-medium ${path.includes(item.path) ? 'bg-gradient text-white' : 'text-black'}`}>{item.icon}{item.name}</a>
                  ) : (
                    <Accordion key={index} type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className={` px-4 text-[.8rem] flex gap-2 cursor-pointer ${path.includes(item.path) ? 'bg-gradient text-white' : 'text-black'}`}><p className=' flex items-center gap-2'>{item.icon}{item.name}</p></AccordionTrigger>
                      <AccordionContent className=' px-6 py-2 flex flex-col gap-4'>
                        {item.subpath.map((sub, index) => (
                          <Link key={index} className={`text-xs flex items-center  ${path.includes(sub.path) ? 'text-orange-500' : 'text-black hover:bg-zinc-100 gap-2'}`} href={sub.path}>
                            <p className=' '>{sub.icon}</p>
                            {sub.name}</Link>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                 
                  )}
                  </>
                ))}

          
              
              </nav>
            
            </SheetContent>
          </Sheet>
            </div>

        </nav>
      </div>        

        <div className=" w-full relative h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden"
        >

          <div className=' w-full h-screen bg-[#faf5e8] fixed top-0 '>

          </div>
        
          <main className=" px-4 w-full max-w-[1920px]  relative flex flex-1 flex-col items-center gap-4  p-6">
              {children}
          </main>
        </div>

    </div>
  )
}
