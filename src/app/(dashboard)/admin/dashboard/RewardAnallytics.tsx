"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetDashboardAnalytics } from "@/apis/dashboard"

type ClaimType = "Ingame" | "Robux" | "Exclusive" | "Tickets" | "Chests"
type RawClaimKey = "ingame" | "robux" | "exclusive" | "ticket" | "chest"
type StatusType = "claimed" | "pending" | "rejected" | "total"

interface RawStatus {
  claimed: number
  pending: number
  rejected: number
  total: number
}

interface RawRewardData {
  ingame: RawStatus
  robux: RawStatus
  exclusive: RawStatus
  ticket: RawStatus
  chest: RawStatus
}

const chartConfig = {
  Ingame: {
    label: "Ingame",
    color: "hsl(var(--chart-1))",
  },
  Robux: {
    label: "Robux",
    color: "hsl(var(--chart-2))",
  },
  Exclusive: {
    label: "Exclusive",
    color: "hsl(var(--chart-3))",
  },
  Tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-4))",
  },
  Chests: {
    label: "Chests",
    color: "hsl(var(--chart-5))",
  },
}

const labelMap: Record<RawClaimKey, ClaimType> = {
  ingame: "Ingame",
  robux: "Robux",
  exclusive: "Exclusive",
  ticket: "Tickets",
  chest: "Chests",
}

export const RewardAnalyticsChart = () => {
  const [view, setView] = useState("daily")
  const [statusFilter, setStatusFilter] = useState<StatusType>("claimed")
  const { data: analytics } = useGetDashboardAnalytics(view)

//   const transformToChartData = (): { name: string; value: number; fill: string }[] => {
//     const chartData: { name: string; value: number; fill: string }[] = []

//     const defaultData: RawRewardData = {
//       ingame: { claimed: 0, pending: 0, rejected: 0, total: 0 },
//       robux: { claimed: 0, pending: 0, rejected: 0, total: 0 },
//       exclusive: { claimed: 0, pending: 0, rejected: 0, total: 0 },
//       ticket: { claimed: 0, pending: 0, rejected: 0, total: 0 },
//       chest: { claimed: 0, pending: 0, rejected: 0, total: 0 },
//     }

//     const source = analytics?.data ?? defaultData

//     for (const key in defaultData) {
//       const k = key as RawClaimKey
//       const type = labelMap[k]
//       const value = source?.[k]?.[statusFilter] ?? 0
//       chartData.push({
//         name: type,
//         value,
//         fill: chartConfig[type].color,
//       })
//     }

//     return chartData
//   }

  const chartData =
    analytics?.data
      ? Object.entries(analytics.data).map(([key, value]) => {
          const k = key as RawClaimKey
          const type = labelMap[k]
          return {
            name: type,
            value: value[statusFilter],
            fill: chartConfig[type].color,
          }
        })
      : []

  const getStatusLabel = (status: StatusType) => {
    switch (status) {
      case "claimed":
        return "Claimed"
      case "pending":
        return "Pending"
      case "rejected":
        return "Rejected"
      case "total":
        return "Total"
      default:
        return status
    }
  }

  console.log(chartData)

  return (
    <Card className="w-full bg-yellow-50">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <CardTitle className="text-orange-500 font-bold text-lg">
          Code Redemption Overview
        </CardTitle>
        <div className="flex gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-fit text-xs">
              <SelectValue placeholder="Select View" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="overall" className="text-xs">Overall</SelectItem> */}
              <SelectItem value="daily" className="text-xs">Daily</SelectItem>
              <SelectItem value="weekly" className="text-xs">Weekly</SelectItem>
              <SelectItem value="monthly" className="text-xs">Monthly</SelectItem>
              <SelectItem value="yearly" className="text-xs">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as StatusType)}
          >
            <SelectTrigger className="w-fit text-xs">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claimed" className="text-xs">Claimed</SelectItem>
              <SelectItem value="pending" className="text-xs">Pending</SelectItem>
              <SelectItem value="rejected" className="text-xs">Rejected</SelectItem>
              <SelectItem value="total" className="text-xs">Total</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                className="text-xs"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs"
                domain={[0, "dataMax + 10"]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                label={{
                  position: "top",
                  fontSize: 12,
                  fill: "#666",
                  formatter: (value: number) => value.toString(),
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
