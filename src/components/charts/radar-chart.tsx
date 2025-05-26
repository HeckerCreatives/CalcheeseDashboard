"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
const chartData = [
  { month: "Luzon", desktop: 186 },
  { month: "Visayas", desktop: 305 },
  { month: "Mindanao", desktop: 237 },
  
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#facc15",
  },
} satisfies ChartConfig

export default function RadarChartComponent() {
  return (
     <ChartContainer
          config={chartConfig}
          className="mx-auto mt-12"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
  )
}
