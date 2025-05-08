"use client"

import { useGetRedeemedCodesChartData } from "@/apis/dashboard"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface Props {
  timeframe : string
}
export function LineChartDashboard(prop: Props) {

  const {data: chartData} = useGetRedeemedCodesChartData(prop.timeframe)

  const formattedData = chartData?.data
  ? Object.entries(chartData.data).map(([hour, value]) => ({
      timeframe: hour,
      value,
    }))
  : []

  console.log(chartData)
  return (
    <div className="h-[300px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: -35, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timeframe" />
          <YAxis tickFormatter={(value) => `${value / 1000}`} domain={[0, 15000]} />
          <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
          <Legend />
          <Line dataKey="value" name="Redeemed Codes" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
