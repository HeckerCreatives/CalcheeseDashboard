'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginUser } from "@/apis/auth"
import toast from "react-hot-toast"
import { useState } from "react"
import { Eye, EyeClosed, EyeOff } from "lucide-react"
import Loader from "../common/Loader"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const {mutate: loginUser, isPending} = useLoginUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  

  const onSubmit = async () => {
    loginUser({username: username, password: password}, {
     onSuccess: () => {
         toast.success("Success, Welcome to CalCheese dashboard.");
         router.push('/admin/dashboard')
       },
    })
  };

  return (
    <div className={cn("flex flex-col gap-6 font-brevia", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold font-bitbold text-orange-600">Login to your account</h1>
        <p className="text-balance text-xs text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} id="email" type="text" placeholder="m@example.com" className=" text-xs"/>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label  htmlFor="password">Password</Label>
           
          </div>
          <div className="relative">
              <Input
              onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  className=' text-xs'
                  type={showPassword ? 'text' : 'password'}
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                  {showPassword ? <Eye size={15}/> : <EyeClosed size={15}/>}
              </button>
          </div>
        </div>

        <Button onClick={onSubmit} disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader type={"loader"}/>}
          Login
        </Button>

        
    
      </div>
    
    </div>
  )
}
