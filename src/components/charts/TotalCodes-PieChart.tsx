import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export function TotalCodesPieChart() {
 const { data: responseData } = useGetCodeDistribution()
    const chartData = (responseData?.data ?? []).map(({ type, total }) => ({
    browser: type,
    visitors: total,
    fill: chartConfig[type as keyof typeof chartConfig]?.color ?? "gray",
    }))


  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[320px] pb-0"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
        <ChartLegend
          content={<ChartLegendContent nameKey="browser" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
