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
      value: Number(value),
    }))
  : []

  const maxValue = Math.max(...formattedData.map(d => d.value), 0)
  const yAxisMax = maxValue === 0 ? 10 : Math.ceil(maxValue * 1.2) // Add 20% headroom or show at least 10

  console.log(formattedData)

  return (
    <div className="h-[300px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: -35, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timeframe" />
          <YAxis
              tickFormatter={(value) => `${value}`}
              domain={[0, yAxisMax]}
            />

          <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
          <Legend />
          <Line dataKey="value" name="Redeemed Codes" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
