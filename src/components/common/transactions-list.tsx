import { Button } from "@/components/ui/button"

interface Transaction {
  name: string
  tier: "ROBUX" | "Tickets" | "Codes" 
  amount: string
}

const transactions: Transaction[] = [
  { name: "test@gmail.com", tier: "ROBUX", amount: "+$49" },
  { name: "test@gmail.com", tier: "ROBUX", amount: "+$69" },
  { name: "test@gmail.com", tier: "ROBUX", amount: "+$19" },
  { name: "test@gmail.come", tier: "Tickets", amount: "+$19" },
  { name: "test@gmail.com", tier: "Codes", amount: "+$269" },
  { name: "test@gmail.com", tier: "Tickets", amount: "+$19" },
  { name: "test@gmail.com", tier: "Codes", amount: "+$49" },
]

export function TransactionsList() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <span className=" text-xs">{transaction.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  transaction.tier === "ROBUX"
                    ? " bg-orange-500 text-yellow-50"
                    : transaction.tier === "Tickets"
                      ? "bg-blue-600 text-white"
                      : transaction.tier === "Codes"
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
      <Button className="w-full bg-blue-600 hover:bg-blue-700">View history</Button>
    </div>
  )
}
