"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Database,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { useGetMaintenance, useUpdateMaintenance } from "@/apis/maintenance"
import toast from "react-hot-toast"

interface MaintenanceItem {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  enabled: boolean
  status: "active" | "inactive" | "warning"
  value: number
}

export default function MaintenanceCard() {
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([
    {
      id: "generate",
      name: "Generate",
      description: "Code generation",
      icon: RefreshCw,
      enabled: false,
      status: "inactive",
      value: 0,
    },
    {
      id: "export",
      name: "Export",
      description: "Exporting codes data",
      icon: Database,
      enabled: false,
      status: "inactive",
      value: 0,
    },
    {
      id: "delete",
      name: "Delete",
      description: "Delete codes operation",
      icon: AlertTriangle,
      enabled: false,
      status: "inactive",
      value: 0,
    },
    {
      id: "edit",
      name: "Edit",
      description: "Edit codes operation",
      icon: Settings,
      enabled: false,
      status: "inactive",
      value: 0,
    },
  ])

  const { data } = useGetMaintenance()
  const { mutate: updateMaintenance } = useUpdateMaintenance()

  useEffect(() => {
    if (data?.data) {
      setMaintenanceItems((prevItems) =>
        prevItems.map((item) => {
          const updated = data.data.find((d) => d.type === item.id)
          return updated
            ? {
                ...item,
                value: parseInt(updated.value),
                enabled: parseInt(updated.value) === 1,
                status: parseInt(updated.value) > 0 ? "active" : "inactive",
              }
            : item
        })
      )
    }
  }, [data])

  const handleToggle = (id: string, newValue: boolean) => {
    const numericValue = newValue ? 1 : 0

    setMaintenanceItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              enabled: newValue,
              status: newValue ? "active" : "inactive",
              value: numericValue,
            }
          : item
      )
    )

    updateMaintenance(
      { type: id, value: numericValue },
      {
        onSuccess: () => {
          toast.success(`${id} updated successfully`)
        },
        onError: () => {
          toast.error(`Failed to update ${id}`)
        },
      }
    )
  }

  const getStatusBadge = (status: MaintenanceItem["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Active
          </Badge>
        )
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "warning":
        return (
          <Badge
            variant="destructive"
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Warning
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const activeCount = maintenanceItems.filter((item) => item.enabled).length
  const totalCount = maintenanceItems.length

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <div>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Manage automated maintenance tasks and system monitoring
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="text-sm text-muted-foreground">
              {activeCount} of {totalCount} tasks disabled
            </div>
            <div className="flex-1 bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(activeCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {maintenanceItems.map((item) => {
              const IconComponent = item.icon
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-md ${
                        item.value
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.status === "warning" && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <Toggle
                      pressed={item.enabled}
                      onPressedChange={(state) => handleToggle(item.id, state)}
                      aria-label={`Toggle ${item.name}`}
                      className="data-[state=on]:bg-orange-400 data-[state=on]:text-primary-foreground bg-zinc-200"
                    >
                      {item.enabled ? "On" : "Off"}
                    </Toggle>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
