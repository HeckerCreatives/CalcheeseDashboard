"use client"

import { Bar, BarChart, CartesianGrid, Legend, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetCodeRedemption } from "@/apis/dashboard"

export const description = "A multiple bar chart"

const chartConfig = {
  claimed: {
    label: "Claimed",
    color: "var(--chart-1)",
  },
  unclaimed: {
    label: "Unclaimed",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const typeLabelMap: Record<string, string> = {
  chest: "Chest",
  ingame: "Ingame",
  exclusive: "Exclusive",
  robux: "Robux",
  ticket: "Ticket",
}

export function ClaimingAnalytics() {
  const { data: response } = useGetCodeRedemption()

  const chartData =
    response?.data
      ? Object.entries(response.data).map(([type, counts]) => ({
          month: typeLabelMap[type] ?? type,
          claimed: counts.claimed ?? 0,
          unclaimed: counts.unclaimed ?? 0,
        }))
      : []

  return (
    <ChartContainer config={chartConfig} className="">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="claimed" name="Claimed" fill="var(--chart-1)" radius={4} />
        <Bar
          dataKey="unclaimed"
          name="Unclaimed"
          fill="var(--chart-3)"
          radius={4}
        />
        <Legend className="mt-6" />
      </BarChart>
    </ChartContainer>
  )
}
