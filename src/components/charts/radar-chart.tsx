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
  count: {
    label: "Claimed Codes",
    color: "#facc15", // Yellow-ish
  },
} satisfies ChartConfig

export default function RadarChartComponent() {
  const { data } = useGetRegionAnalytics()

  // Transform API data to chartData format
  const chartData = data?.data?.map((item: { area: string; count: number }) => ({
    region: item.area.trim(),
    count: item.count,
  })) || []

  return (
    <ChartContainer config={chartConfig} className="mx-auto mt-12">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="region" />
        <PolarGrid />
        <Radar
          dataKey="count"
          fill="#facc15"
          stroke="#facc15"
          fillOpacity={0.6}
          dot={{ r: 4, fillOpacity: 1 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
