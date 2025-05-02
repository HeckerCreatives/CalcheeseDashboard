import { LineChartDashboard } from "@/components/charts/line-chart"
import { SalesChart } from "@/components/charts/sales-charts"
import { TrendChart } from "@/components/charts/trend-charts"
import DashboardCard from "@/components/common/Card"
import { CustomerMap } from "@/components/common/costumer-map"
import { SupportTickets } from "@/components/common/support-tickets"
import { TransactionsList } from "@/components/common/transactions-list"
import Adminlayout from "@/components/layout/AdminLayout"
import { Card ,CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function page() {
  return (
    <Adminlayout>
        <div className="space-y-6 w-full">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Codes" value={0} bgColor="bg-orange-500" textColor="text-white" />
        <DashboardCard title="Total Used Codes" value={0} bgColor="bg-orange-500" textColor="text-white" />
        <DashboardCard title="Total Unused Codes" value={0} bgColor="bg-orange-500" textColor="text-white" />
        <DashboardCard title="Total Expired Codes" value={0} bgColor="bg-orange-500" textColor="text-white" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-orange-500">Redeemed Codes</CardTitle>
            <select className="bg-white border text-xs border-gray-200 rounded-md px-2 py-1">
              <option>This Day</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <TrendChart />
            </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-orange-500">Codes</CardTitle>
                <select className="bg-white border text-xs border-gray-200 rounded-md px-2 py-1">
                    <option>This Day</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className=" bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-500">Redeem History</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsList />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6">
      <Card className="lg:col-span-1 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-orange-500">Redeemed Codes</CardTitle>
            <select className="bg-white border text-xs border-gray-200 rounded-md px-2 py-1">
              <option>This Day</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <LineChartDashboard />
            </CardContent>
        </Card>
      </div>
    </div>
    </Adminlayout>
    
  )
}

interface KpiCardProps {
  title: string
  value: string
  bgColor: string
  textColor: string
}

function KpiCard({ title, value, bgColor, textColor }: KpiCardProps) {
  return (
    <div className={`rounded-lg p-6 ${bgColor} ${textColor}`}>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  )
}
