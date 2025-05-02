"use client"

import { useState } from "react"

interface Ticket {
  email: string
  issue: string
  status: "OPEN" | "PENDING" | "CLOSED"
}

const tickets: Ticket[] = [
  { email: "jessica.smith123@example.com", issue: "Login Issue", status: "OPEN" },
  { email: "david.jones456@gmaildummy.com", issue: "Billing Inquiry", status: "PENDING" },
  { email: "emily.wilson789@fictitiousmail.net", issue: "Product Malfunction", status: "CLOSED" },
  { email: "andrew.johnson22@phonyinbox.org", issue: "Feature Request", status: "OPEN" },
]

export function SupportTickets() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "OPEN" | "PENDING" | "CLOSED">("ALL")

  const filteredTickets = activeFilter === "ALL" ? tickets : tickets.filter((ticket) => ticket.status === activeFilter)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <FilterButton label="All" active={activeFilter === "ALL"} onClick={() => setActiveFilter("ALL")} />
        <FilterButton label="Open" active={activeFilter === "OPEN"} onClick={() => setActiveFilter("OPEN")} />
        <FilterButton label="Pending" active={activeFilter === "PENDING"} onClick={() => setActiveFilter("PENDING")} />
        <FilterButton label="Closed" active={activeFilter === "CLOSED"} onClick={() => setActiveFilter("CLOSED")} />
      </div>

      <div className="space-y-2">
        {filteredTickets.map((ticket, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                {ticket.email[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-600">{ticket.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{ticket.issue}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  ticket.status === "OPEN"
                    ? "bg-yellow-100 text-yellow-800"
                    : ticket.status === "PENDING"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FilterButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full text-sm ${
        active ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  )
}
