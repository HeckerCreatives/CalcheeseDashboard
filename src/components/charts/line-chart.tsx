"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", new: 9000, renewals: 5000 },
  { month: "Feb", new: 12000, renewals: 7000 },
  { month: "Mar", new: 11000, renewals: 8000 },
  { month: "Apr", new: 6000, renewals: 4000 },
  { month: "May", new: 11500, renewals: 9000 },
  { month: "Jun", new: 13000, renewals: 9000 },
  { month: "Jul", new: 12500, renewals: 10000 },
]

export function LineChartDashboard() {
  return (
    <div className="h-[300px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: -35, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value / 1000}`} domain={[0, 15000]} />
          <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
          <Legend />
          <Line dataKey="new" name="Codes" fill="#f97316" strokeWidth={2} />
          {/* <Line dataKey="renewals" name="RENEWALS" fill="#ebbd34"  /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
