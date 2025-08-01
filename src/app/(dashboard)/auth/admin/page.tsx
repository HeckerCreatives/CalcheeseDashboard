import { LoginForm } from "@/components/forms/login";
import Image from "next/image";
export default function Home() {
  return (
     <div className="grid min-h-svh lg:grid-cols-2 bg-[#fcf7eb] w-full"
    style={{backgroundImage: "url('/assets/floating/bg.png')" , backgroundSize:'cover'}}
     
     >
     <div className="flex flex-col gap-4 p-6 md:p-10">
       <div className="flex justify-center gap-2 md:justify-start">   
       </div>
       <div className="flex flex-1 items-center justify-center">
         <div className="w-full max-w-sm rounded-md bg-orange-100 p-12">
           <LoginForm />
         </div>
       </div>
     </div>
     <div className="relative hidden bg-gradient-to-br from-orange-500 to-orange-300 lg:flex items-center justify-center">
       
      <Image src="/assets/CalCheese World Logo.png" alt="logo" width={500} height={500} priority unoptimized loading='eager' className=' w-[70%]'/>
       
     </div>
   </div>
  );
}
