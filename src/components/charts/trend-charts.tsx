"use client"

import { useGetChests } from "@/apis/codes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function TrendChart() {
  const {data: chests, isLoading} = useGetChests()
  
  console.log(chests)

  return (
    <div className="h-[300px] w-full text-xs ">
      <ResponsiveContainer width="100%" height="100%" className={''}>
        <BarChart data={chests?.data}  margin={{ top: 0, right: 0, left: -35, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name"  padding={{ left: 0, right: 0 }}  />
          <YAxis tickFormatter={(value) => `${value}`} domain={[0, 10]} />
          <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `Chest: ${label}`} />
          <Legend />
          <Bar dataKey="totalused" name="Redeemed Codes" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="totalunused" name="Unredeemed Codes" fill="#facc15" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
