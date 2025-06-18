"use client"

import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetRegionAnalytics } from "@/apis/dashboard"
import { ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Reports",
    color: "#facc15",
  },
} satisfies ChartConfig

export default function RadarChartComponent() {
  const { data } = useGetRegionAnalytics()

  // Transform API data into chartData format
  const chartData = data?.data?.map((item: { region: string; count: number }) => ({
    month: item?.region?.trim(),   // Remove leading spaces
    desktop: item.count,
  })) || []

  return (
    <ChartContainer config={chartConfig} className="mx-auto mt-12">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="month" />
        <PolarGrid />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
          dot={{ r: 4, fillOpacity: 1 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
