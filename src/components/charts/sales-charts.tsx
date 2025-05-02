"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Expired Codes", value: 120, color: "#2563eb" },
  { name: "Redeemed Codes", value: 80, color: "#facc15" },
  { name: "Unredeemed Codes", value: 70, color: "#f97316" },
]

export function SalesChart() {
  return (
    <div className="h-[250px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-3xl font-bold">342</div>
        <div className="text-xs text-gray-500">Codes</div>
      </div>
    </div>
  )
}
