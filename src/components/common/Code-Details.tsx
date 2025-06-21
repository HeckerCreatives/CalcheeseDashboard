import { Eye, Package, Calendar, CheckCircle, XCircle, Tag, Hash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Item {
  id: string;
  itemid: string;
  itemname: string;
  rarity: string
  quantity: string
}




interface CodeDetailsDialogProps {
    code: string
    type: string
    items: Item[]
    expiration: string
    isUsed: boolean
    status: string
}

export default function CodeDetailsDialog(prop: CodeDetailsDialogProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-sm bg-orange-500 p-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
          <Eye size={16} className="" />
        
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full bg-yellow-50">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Package size={20} />
            Code Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Code Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Code:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{prop.code}</code>
            </div>

            <div className="flex items-center gap-2">
              <Tag size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <Badge variant="secondary" className="uppercase text-xs">
                {prop.type}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Rarity:</span>
              <Badge
                variant="outline"
                className={`uppercase text-xs ${getRarityColor(prop.items[0]?.rarity || "common")}`}
              >
                {prop.items[0]?.rarity}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Package size={16} />
              Items ({prop.items.length})
            </h4>

            <div className=" bg-white p-3 border-[1px] border-zinc-200 rounded-lg">
              {prop.items.map((item, index) => (
                <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.itemname}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          Qty: {item.quantity}
                        </Badge>
                      </div>
                    </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Expiration:</span>
              <span className="text-sm text-gray-600">{prop.expiration}</span>
            </div>

            <div className="flex items-center gap-2">
            
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <Badge className="text-xs bg-orange-500 text-white uppercase">
               {prop.status}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
