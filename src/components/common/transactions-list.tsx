import { useGetCodesList } from "@/apis/codes"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Transaction {
  name: string
  tier: "Common Box" | "Elite Box" | "Rare Box" | "Epic Box" 
  amount: string
}

const transactions: Transaction[] = [
  { name: "test@gmail.com", tier: "Common Box", amount: "+$49" },
  { name: "test@gmail.com", tier: "Common Box", amount: "+$69" },
  { name: "test@gmail.com", tier: "Rare Box", amount: "+$19" },
  { name: "test@gmail.come", tier: "Epic Box", amount: "+$19" },
  { name: "test@gmail.com", tier: "Elite Box", amount: "+$269" },
  { name: "test@gmail.com", tier: "Elite Box", amount: "+$19" },
  // { name: "test@gmail.com", tier: "Common Box", amount: "+$49" },
]

export function TransactionsList() {
  const [tab, setTab] = useState('chest')
  const {data, isLoading} = useGetCodesList(0, 6, tab, '', '', 'claimed','', false)
  
  // const {data, isLoading} = useGetCodesList(0, 6, 'claimed', tab, '', '','')
  const router = useRouter()


  const viewHistory = () => {
    if(tab === 'ingame'){
      router.push('/admin/claiming/ingame')
    }else if (tab === 'chest'){
      router.push('/admin/claiming/chest')
    } else if (tab === 'exclusive'){
      router.push('/admin/claiming/exclusiveitem')
    }else if (tab === 'robux'){
      router.push('/admin/claiming/robux/claiming')
    } else {
      router.push('/admin/claiming/ticket/claiming')

    }
  }


  return (
    <div className=" h-full flex flex-col gap-2">
      <div className=" flex items-center gap-1 p-1 bg-white w-fit rounded-full">
        <button onClick={() => setTab("chest")} className={` cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'chest' && 'bg-orange-500 text-white border-2  border-orange-500 rounded-full'}`}>Chest</button>
        <button onClick={() => setTab("ingame")} className={` cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'ingame' && 'bg-orange-500 text-white border-2  border-orange-500 rounded-full'}`}>In-Game</button>
        <button onClick={() => setTab("exclusive")} className={` cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'exclusive' && 'bg-orange-500 text-white border-2  border-orange-500 rounded-full'}`}>Exclusive</button>
        <button onClick={() => setTab("robux")} className={`  cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'robux' && 'bg-orange-500 text-white border-2 border-orange-500 rounded-full'}`}>ROBUX</button>
        <button onClick={() => setTab("ticket")} className={` cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'ticket' && 'bg-orange-500 text-white border-2  border-orange-500 rounded-full'}`}>Tickets</button>

      </div>
      <div className=" h-full flex flex-col justify-between">
      <div className=" h-full flex flex-col items-center  w-full ">
        {data?.data.length !== 0 ? (
          <>
           {data?.data.map((transaction, index) => (
              <div key={index} className=" w-full flex items-center justify-between py-1 bg-yellow-100 p-2 rounded-sm">
                <div className="flex flex-col gap-1">
                  <span className=" text-xs">{transaction.code}</span>
                  <p className=" text-[.5rem] text-zinc-400 flex gap-[3px]"><Clock size={10}/>{new Date(transaction.claimdate).toDateString()}</p>

                </div>
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`text-[.5rem] px-2 py-0.5 rounded ${
                      transaction.chest.chestname === "Common Chest"
                        ? " bg-blue-500 text-yellow-50"
                        :  transaction.chest.chestname === "Uncommon Chest"
                          ? "bg-green-600 text-white"
                          :  transaction.chest.chestname === "Rare Chest"
                            ? "bg-pink-600 text-white"
                            : "bg-purple-600 text-white"
                    }`}
                  >
                    {transaction.chest.chestname}
                  </span>

                  {/* <span className="font-medium">{transaction.amount}</span> */}
                </div>
              </div>
            ))}
          </>
        ): (
          <div className=" w-full h-full flex items-center justify-center">
            <p className=" text-zinc-400 text-[.6rem]">No data</p>
          </div>
        )}
       
      </div>
      <Button onClick={viewHistory} className="w-full mt-4 cursor-pointer">View history</Button>
      </div>
    </div>
   
  )
}
