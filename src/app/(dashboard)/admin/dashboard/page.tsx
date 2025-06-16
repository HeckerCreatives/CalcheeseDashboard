'use client'
import { useGetDashboardCount } from "@/apis/dashboard"
import { LineChartDashboard } from "@/components/charts/line-chart"
import { SalesChart } from "@/components/charts/sales-charts"
import { TrendChart } from "@/components/charts/trend-charts"
import DashboardCard from "@/components/common/Card"
import { TransactionsList } from "@/components/common/transactions-list"
import Adminlayout from "@/components/layout/AdminLayout"
import { Card ,CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import RadarChartComponent from "@/components/charts/radar-chart"


export default function page() {
  const {data, isLoading} = useGetDashboardCount()
  const [chartTimeframe , setChartTimeframe] = useState('daily')
  

  return (
    <Adminlayout>
        <div className="space-y-6 w-full">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Codes" value={data?.data.totalcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
        <DashboardCard title="Total Claimed Codes" value={data?.data.totalusedcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
        <DashboardCard title="Total Unclaimed Codes" value={data?.data.totalunusedcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
        <DashboardCard title="Total Expired Codes" value={data?.data.totalexpiredcodes ?? 0} bgColor="bg-orange-500" textColor="text-white" isLoading={isLoading} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-orange-500 font-bitbold">Chests</CardTitle>
            {/* <select className="bg-white border text-xs border-gray-200 rounded-md px-2 py-1">
              <option>This Day</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select> */}
          </CardHeader>
          <CardContent>
            <TrendChart />
            </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-orange-500 font-bitbold">Codes</CardTitle>
                
          </CardHeader>
          <CardContent className=" bg-transparent">
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-orange-500 font-bitbold"> Geographic</CardTitle>
            {/* <select className="bg-white border text-xs border-gray-200 rounded-md px-2 py-1">
              <option>This Day</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select> */}
          </CardHeader>
          <CardContent className=" ">
            <RadarChartComponent/>
            </CardContent>
        </Card>

        <Card className=" bg-yellow-50 h-full">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-orange-500 font-bitbold">Approved History</CardTitle>
          </CardHeader>
          <CardContent className=" h-full">
            <TransactionsList />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6">
      <Card className="lg:col-span-1 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-orange-500 font-bitbold">Redeemed Codes</CardTitle>
            <Select value={chartTimeframe} onValueChange={setChartTimeframe}>
            <SelectTrigger className=" w-fit">
                <SelectValue placeholder="Select" className=' text-xs'/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={'daily'} className=' text-xs'>Daily</SelectItem>
                <SelectItem value={'weekly'} className=' text-xs'>Weekly</SelectItem>
                <SelectItem value={'monthly'} className=' text-xs'>Monthly</SelectItem>
                <SelectItem value={'yearly'} className=' text-xs'>yearly</SelectItem>
            </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <LineChartDashboard timeframe={chartTimeframe} />
            </CardContent>
        </Card>
      </div>
    </div>
    </Adminlayout>
    
  )
}
