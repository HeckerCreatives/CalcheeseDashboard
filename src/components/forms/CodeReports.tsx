"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { CheckCircle, Clock, FileCheck, Package, Printer, ThumbsUp, X, Filter, BarChart3 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type CodeAnalyticsResponse, useApproveClaim, useCancelAnalytics, useGetCodesCountOverall } from "@/apis/codes"
import { useDeleteTicket } from "@/apis/tickets"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Loader from "../common/Loader"
import { Input } from "../ui/input"
import useAnalyticStatePopup from "@/hooks/codeanalytics"
import { getSocket } from "@/utils/socketClient"
import toast from "react-hot-toast"

interface Props {
  id: string
  status: string
  code: string
  name: string
}

interface ItemAnalytics {
  itemname: string
  itemtype: string
  itemrarity: string
  totalcodes: number
  claimed: number
  unclaimed: number
  approved: number
  rejected: number
}

interface CodeAnalyticsData {
  message: string
  manufacturer: string
  totalcodes: number
  itemsanalytics: ItemAnalytics[]
}

interface Socket {
  status: string
  manufacturer: string
  message: string
  totalcodes: number
  itemsanalytics: ItemAnalytics[]
  percentage: number
}

const manufacturers = [
  { name: "HBYX", type: "hbyx", index: 7562500, lte: "6855837ebdd1ec953592809f", gt: null },
  { name: "DYTH", type: "dyth", index: 13282500, lte: "68558c74bdd1ec9535e9d62a", gt: "6855837ebdd1ec953592809f" },
  { name: "HBYX 48g", type: "hbyx2", index: 30106030, lte: "6855a659bdd1ec9535eab284", gt: "68558c74bdd1ec9535e9d62a" },
  { name: "AMX 48g", type: "amx", index: 42341913, lte: "685ce0ac6808bd1490a2cf1f", gt: "6855a659bdd1ec9535eab284" },
]

const itemTypes = ["all", "chest", "robux", "ticket", "ingame", "exclusive"]
const rarityTypes = ["all", "common", "uncommon", "rare", "epic", "legendary"]

const getRarityColor = (rarity: string) => {
  const colors = {
    common: "bg-gray-100 text-gray-800 border-gray-200",
    uncommon: "bg-green-100 text-green-800 border-green-200",
    rare: "bg-blue-100 text-blue-800 border-blue-200",
    epic: "bg-purple-100 text-purple-800 border-purple-200",
    legendary: "bg-yellow-100 text-yellow-800 border-yellow-200",
  }
  return colors[rarity as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
}

const getTypeColor = (type: string) => {
  const colors = {
    chest: "bg-orange-100 text-orange-800",
    robux: "bg-green-100 text-green-800",
    ticket: "bg-blue-100 text-blue-800",
    ingame: "bg-purple-100 text-purple-800",
    exclusive: "bg-red-100 text-red-800",
  }
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

export default function CodeReports(prop: Props) {
  const { mutate: deleteTicket, isPending } = useDeleteTicket()
  const [open, setOpen] = useState(false)
  const { mutate: approveClaim } = useApproveClaim()
  const [manufacturer, setManufacturer] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [rarityFilter, setRarityFilter] = useState("all")
  const [search, setSearch] = useState("")
  const socketRef = useRef<any>(null)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [countLoading, setCountloading] = useState(false)
  const [codeAnalytics, setCodeAnalytics] = useState<CodeAnalyticsResponse>()
  const { state, setState, clearState } = useAnalyticStatePopup()
  const isInitialized = useRef(false)

  useEffect(() => {
    if (open && !isInitialized.current) {
      const socket = getSocket()
      socketRef.current = socket
      isInitialized.current = true

      socket.off("code-analytics-progress")

      socket.on("code-analytics-progress", (data: Socket) => {
        console.log("Socket data received:", data)

        if (data.status) setStatus(data.status)
        if (data.status) setCountloading(data.status === "starting")
        if (data.percentage === 100) {
          setCountloading(false)
          setState(false)
        }
        if (data.message) setMessage(data.message)
        if (data.manufacturer) setCodeAnalytics(data)
      })
    }

    if (!open && isInitialized.current) {
      if (socketRef.current) {
        socketRef.current.off("code-analytics-progress")
      }
      // Reset state when dialog closes
      setManufacturer("")
      setTypeFilter("all")
      setRarityFilter("all")
      setSearch("")
      setStatus("")
      setMessage("")
      setCountloading(false)
      setCodeAnalytics(undefined)
      isInitialized.current = false
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("code-analytics-progress")
      }
    }
  }, [open, setState])

  const { data: temp, refetch } = useGetCodesCountOverall(manufacturer, socketRef.current?.id)
  const {mutate: cancelAnalytics, isPending: cancelLoad} = useCancelAnalytics()

  useEffect(() => {
    setCountloading(temp?.message === 'success')
  },[temp])

  console.log(countLoading, socketRef.current?.id)

  const filteredData = useMemo(() => {
    if (!codeAnalytics?.itemsanalytics) return []
    return codeAnalytics.itemsanalytics.filter((item: ItemAnalytics) => {
      const typeMatch = typeFilter === "all" || item.itemtype === typeFilter
      const rarityMatch = rarityFilter === "all" || item.itemrarity === rarityFilter
      const searchMatch = !search || item.itemname.toLowerCase().includes(search.toLowerCase())
      return typeMatch && rarityMatch && searchMatch
    })
  }, [codeAnalytics, typeFilter, rarityFilter, search])

  // Calculate totals from filtered data
  const totals = useMemo(() => {
    if (!filteredData.length) {
      return {
        totalcodes: 0,
        claimed: 0,
        unclaimed: 0,
        approved: 0,
        rejected: 0,
      }
    }
    return filteredData.reduce(
      (acc, item) => ({
        totalcodes: acc.totalcodes + item.totalcodes,
        claimed: acc.claimed + item.claimed,
        unclaimed: acc.unclaimed + item.unclaimed,
        approved: acc.approved + item.approved,
        rejected: acc.rejected + item.rejected,
      }),
      {
        totalcodes: 0,
        claimed: 0,
        unclaimed: 0,
        approved: 0,
        rejected: 0,
      },
    )
  }, [filteredData])

  // Calculate totals by type and rarity
  const totalsByType = useMemo(() => {
    const typeGroups: Record<string, any> = {}
    filteredData.forEach((item) => {
      if (!typeGroups[item.itemtype]) {
        typeGroups[item.itemtype] = {
          totalcodes: 0,
          claimed: 0,
          unclaimed: 0,
          approved: 0,
          rejected: 0,
        }
      }
      typeGroups[item.itemtype].totalcodes += item.totalcodes
      typeGroups[item.itemtype].claimed += item.claimed
      typeGroups[item.itemtype].unclaimed += item.unclaimed
      typeGroups[item.itemtype].approved += item.approved
      typeGroups[item.itemtype].rejected += item.rejected
    })
    return typeGroups
  }, [filteredData])

  const totalsByRarity = useMemo(() => {
    const rarityGroups: Record<string, any> = {}
    filteredData.forEach((item) => {
      if (!rarityGroups[item.itemrarity]) {
        rarityGroups[item.itemrarity] = {
          totalcodes: 0,
          claimed: 0,
          unclaimed: 0,
          approved: 0,
          rejected: 0,
        }
      }
      rarityGroups[item.itemrarity].totalcodes += item.totalcodes
      rarityGroups[item.itemrarity].claimed += item.claimed
      rarityGroups[item.itemrarity].unclaimed += item.unclaimed
      rarityGroups[item.itemrarity].approved += item.approved
      rarityGroups[item.itemrarity].rejected += item.rejected
    })
    return rarityGroups
  }, [filteredData])

  const statisticsData = [
    {
      title: "Total Codes",
      value: totals.totalcodes.toLocaleString(),
      icon: Package,
      description: "All available codes",
      color: "bg-blue-500",
    },
    {
      title: "Claimed",
      value: totals.claimed.toLocaleString(),
      icon: CheckCircle,
      description: "Successfully claimed items",
      color: "bg-green-500",
    },
    {
      title: "Unclaimed",
      value: totals.unclaimed.toLocaleString(),
      icon: Clock,
      description: "Pending claims",
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: totals.approved.toLocaleString(),
      icon: ThumbsUp,
      description: "Verified and approved",
      color: "bg-emerald-500",
    },
    {
      title: "Rejected",
      value: totals.rejected.toLocaleString(),
      icon: X,
      description: "Rejected claims",
      color: "bg-red-500",
    },
  ]

  const handleCancel = () => {
    cancelAnalytics(
       {
         socketid: socketRef.current?.id
       },
       {
         onSuccess: () => {
          toast.error('Operation cancelled.')
         setManufacturer('')
         },
         
       }
     )
  }

  const handleManualFetch = async () => {
   if (socketRef.current) {
      const socket = getSocket()
      socketRef.current = socket
      refetch()
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer p-2 text-sm bg-orange-500 text-white flex items-center gap-1 rounded-sm hover:bg-orange-600 transition-colors">
        <Printer size={15} />
        Reports
      </DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[900px] max-h-[90vh] overflow-y-auto bg-yellow-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            Code Analytics
          </DialogTitle>
          <DialogDescription>Comprehensive analytics and reporting for codes</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-2">
          {/* Filters Section */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-4 w-4 text-orange-600" />
                Filters & Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end flex-wrap gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Manufacturer</label>
                  <Select disabled={countLoading} value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map((item, index) => (
                        <SelectItem key={index} value={item.type}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Item Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter} disabled={!manufacturer || countLoading}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rarity</label>
                  <Select value={rarityFilter} onValueChange={setRarityFilter} disabled={!manufacturer || countLoading}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Filter by Rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {rarityTypes.map((rarity) => (
                        <SelectItem key={rarity} value={rarity}>
                          {rarity === "all" ? "All Rarities" : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setTypeFilter("all")
                      setRarityFilter("all")
                    }}
                    variant="outline"
                    className="w-full"
                    disabled={!manufacturer || countLoading}
                  >
                    Clear Filters
                  </Button>
                </div>
                {/* <div className="flex items-end">
                  <Button onClick={handleManualFetch} className="w-full bg-orange-500 text-white">
                    Go
                  </Button>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleCancel} className="w-full bg-red-600 text-white">
                    Cancel
                  </Button>
                </div> */}
              </div>
              {manufacturer && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Selected:</span>
                  <Badge variant="secondary" className="px-3 py-1">
                    {manufacturers.find((item) => item.type === manufacturer)?.name}
                  </Badge>
                  {codeAnalytics && !countLoading && (
                    <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
                      {codeAnalytics.totalcodes?.toLocaleString()} Total Codes
                    </Badge>
                  )}
                  {countLoading && (
                    <Badge variant="outline" className="px-3 py-1">
                      Loading...
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loading State for Data */}
          {manufacturer && countLoading && (
            <Card className="bg-white shadow-sm border-0">
              <CardContent className="py-12 text-center">
                <Loader type={"loader"} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Loading Analytics</h3>
                <p className="text-gray-500">
                  Fetching data for {manufacturers.find((item) => item.type === manufacturer)?.name}...
                </p>

                <div className=" mt-4">
                  <Button onClick={handleCancel} className=" bg-red-600 text-white w-fit">
                    {cancelLoad && <Loader type="loader" />}
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics Overview */}
          {manufacturer && codeAnalytics && !countLoading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {statisticsData.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <Card
                      key={index}
                      className="bg-white hover:shadow-md transition-shadow duration-200 border-0 shadow-sm"
                    >
                      <CardContent className="">
                        <div className="flex items-center justify-between mb-3">
                          <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                          <div className="p-2 rounded-lg bg-orange-100">
                            <IconComponent className="h-4 w-4 text-orange-600" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Totals by Type and Rarity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-4 w-4 text-orange-600" />
                      Totals by Item Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(totalsByType).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(totalsByType).map(([type, data]) => (
                          <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge className={getTypeColor(type)}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{data.totalcodes.toLocaleString()} codes</div>
                              <div className="text-xs text-gray-500">
                                {data.claimed} claimed • {data.unclaimed} unclaimed
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p>No data available for current filters</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-orange-600" />
                      Totals by Rarity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(totalsByRarity).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(totalsByRarity).map(([rarity, data]) => (
                          <div key={rarity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge className={getRarityColor(rarity)}>
                                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{data.totalcodes.toLocaleString()} codes</div>
                              <div className="text-xs text-gray-500">
                                {data.claimed} claimed • {data.unclaimed} unclaimed
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileCheck className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p>No data available for current filters</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Items Table */}
              <Card className="bg-white shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-4 w-4 text-orange-600" />
                    Item Details
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Showing {filteredData.length} items
                    {(typeFilter !== "all" || rarityFilter !== "all") && " (filtered)"}
                  </div>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="max-w-[250px]"
                  />
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto max-h-[300px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Rarity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-right">Claimed</TableHead>
                          <TableHead className="text-right">Unclaimed</TableHead>
                          <TableHead className="text-right">Approved</TableHead>
                          <TableHead className="text-right">Rejected</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.length > 0 ? (
                          filteredData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium max-w-[200px] truncate" title={item.itemname}>
                                {item.itemname}
                              </TableCell>
                              <TableCell>
                                <Badge className={getTypeColor(item.itemtype)}>{item.itemtype}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getRarityColor(item.itemrarity)}>{item.itemrarity}</Badge>
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                {item.totalcodes.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">{item.claimed.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{item.unclaimed.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{item.approved.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{item.rejected.toLocaleString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                              No items found with current filters
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Empty State - No Manufacturer Selected */}
          {!manufacturer && (
            <Card className="bg-white shadow-sm border-0">
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Manufacturer</h3>
                <p className="text-gray-500">
                  Choose a manufacturer from the dropdown above to view detailed analytics and reports.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Error State - No Data Available */}
          {manufacturer && !countLoading && !codeAnalytics && (
            <Card className="bg-white shadow-sm border-0">
              <CardContent className="py-12 text-center">
                <X className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
                <p className="text-gray-500">
                  Unable to load analytics data for {manufacturers.find((item) => item.type === manufacturer)?.name}.
                  Please try selecting a different manufacturer or refresh the page.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
