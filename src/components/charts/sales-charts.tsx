"use client"

import { useGetDashboardCount } from "@/apis/dashboard"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function SalesChart() {
  const { data: count } = useGetDashboardCount()

  const stats = count?.data

  const chartData = stats
    ? [
        { name: "Expired Codes", value: stats.totalexpiredcodes, color: "#2563eb" },
        { name: "Redeemed Codes", value: stats.totalusedcodes, color: "#facc15" },
        { name: "Unredeemed Codes", value: stats.totalunusedcodes, color: "#f97316" },
      ]
    : []

    console.log(count)

  return (
    <div className="h-[290px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip wrapperClassName=" text-xs opacity-100 relative z-50"/>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-3xl font-bold">{stats?.totalcodes ?? "-"}</div>
        <div className="text-xs text-gray-500">Total Codes</div>
      </div>
    </div>
  )
}
