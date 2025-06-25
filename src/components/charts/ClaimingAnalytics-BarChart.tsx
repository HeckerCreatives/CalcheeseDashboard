"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

// Optional: Pretty labels for your types
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
    response?.data?.map(({ type, claimed, unclaimed }) => ({
      month: typeLabelMap[type] ?? type, // Display-friendly name
      claimed: claimed ?? 0,
      unclaimed: unclaimed ?? 0,
    })) ?? []

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
        <Bar dataKey="unclaimed" name="Unclaimed" fill="var(--chart-3)" radius={4} />
        <Legend className="mt-6" />
      </BarChart>
    </ChartContainer>
  )
}
