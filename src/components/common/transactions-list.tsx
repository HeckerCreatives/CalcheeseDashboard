import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
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
  const [tab, setTab] = useState('robux')

  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex items-center gap-1 p-1 bg-white w-fit rounded-full">
        <button onClick={() => setTab("robux")} className={`  cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'robux' && 'bg-orange-500 text-white border-2 border-orange-500 rounded-full'}`}>ROBUX</button>
        <button onClick={() => setTab("ticket")} className={` cursor-pointer px-4 py-1  text-[.6rem] ${tab === 'ticket' && 'bg-orange-500 text-white border-2  border-orange-500 rounded-full'}`}>Tickets</button>

      </div>
      <div className="space-y-1">
      <div className="space-y-1">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-1 bg-yellow-100 p-2 rounded-sm">
            <div className="flex flex-col gap-1">
              <span className=" text-xs">{transaction.name}</span>
              <p className=" text-[.5rem] text-zinc-400 flex gap-[3px]"><Clock size={10}/>March 30 2025</p>

            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`text-[.5rem] px-2 py-0.5 rounded ${
                  transaction.tier === "Common Box"
                    ? " bg-orange-500 text-yellow-50"
                    : transaction.tier === "Elite Box"
                      ? "bg-blue-600 text-white"
                      : transaction.tier === "Epic Box"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-800 text-white"
                }`}
              >
                {transaction.tier}
              </span>

              {/* <span className="font-medium">{transaction.amount}</span> */}
            </div>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4">View history</Button>
      </div>
    </div>
   
  )
}
