"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useGetRedeemedCodesChartData } from "@/apis/dashboard"

interface Props {
  timeframe: string
}

export function TimeframeClaimChart({ timeframe }: Props) {
  const { data: chartData } = useGetRedeemedCodesChartData(timeframe)

  const formattedData = chartData?.data
    ? Object.entries(chartData.data).map(([timeframe, value]) => ({
        timeframe,
        value: Number(value),
      }))
    : []

  const maxValue = Math.max(...formattedData.map((d) => d.value), 0)
  const yAxisMax = maxValue === 0 ? 10 : Math.ceil(maxValue * 1.2)

  return (
    <div className="h-[300px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="timeframe" />
          <YAxis domain={[0, yAxisMax]} />
          <Tooltip
            formatter={(value: number) => [`${value}`, "Claimed"]}
            labelFormatter={(label) => `${timeframe}: ${label}`}
          />
          <Bar dataKey="value" name="Redeemed Codes" fill="var(--chart-1)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
