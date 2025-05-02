"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", new: 9000, renewals: 5000 },
  { month: "Feb", new: 12000, renewals: 7000 },
  { month: "Mar", new: 11000, renewals: 8000 },
  { month: "Apr", new: 6000, renewals: 4000 },
  { month: "May", new: 11500, renewals: 9000 },
  { month: "Jun", new: 13000, renewals: 9000 },
  { month: "Jul", new: 12500, renewals: 10000 },
]

export function TrendChart() {
  return (
    <div className="h-[300px] w-full text-xs ">
      <ResponsiveContainer width="100%" height="100%" className={''}>
        <BarChart data={data}  margin={{ top: 0, right: 0, left: -35, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month"  padding={{ left: 0, right: 0 }}  />
          <YAxis tickFormatter={(value) => `${value / 1000}`} domain={[0, 15000]} />
          <Tooltip formatter={(value) => [`$${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
          <Legend />
          <Bar dataKey="new" name="Codes" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="renewals" name="Codes" fill="#facc15" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
