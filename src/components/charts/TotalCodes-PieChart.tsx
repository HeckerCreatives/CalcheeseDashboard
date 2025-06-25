"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetCodeDistribution } from "@/apis/dashboard"

export const description = "A pie chart with a legend"

const chartConfig = {
  chest: {
    label: "Chest",
    color: "var(--chart-1)",
  },
  ingame: {
    label: "Ingame",
    color: "var(--chart-2)",
  },
  exclusive: {
    label: "Exclusive",
    color: "var(--chart-3)",
  },
  robux: {
    label: "Robux",
    color: "var(--chart-4)",
  },
  ticket: {
    label: "Ticket",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


const dummyData = [
  { type: "chest", value: 30000, fill: "var(--chart-1)" },
  { type: "ingame", value: 10000, fill: "var(--chart-2)" },
  { type: "exclusive", value: 5000, fill: "var(--chart-3)" },
  { type: "robux", value: 20000, fill: "var(--chart-4)" },
  { type: "ticket", value: 8000, fill: "var(--chart-5)" },
]


export function TotalCodesPieChart() {
  const { data: responseData } = useGetCodeDistribution()

   const chartData = responseData?.data
     ? Object.entries(responseData.data).map(([type, value]) => ({
         type: chartConfig[type as keyof typeof chartConfig]?.label.toLocaleLowerCase(),
         value: value.total,
         fill: chartConfig[type as keyof typeof chartConfig]?.color ?? "gray",
       }))
     : []

    console.log(chartData)

  return (
    <ChartContainer
      config={chartConfig}
       className=" mx-auto aspect-square max-h-[320px] pb-0"
    >
      <PieChart>
         <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
        <Pie data={chartData} dataKey="value" nameKey="type" />
        <ChartLegend
            content={<ChartLegendContent nameKey="type" />}
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
        </PieChart>
    </ChartContainer>
  )
}
