"use client"

import { Globe, Settings } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const regions = [
  { value: "auto", label: "Auto (Fastest)", flag: "🌐" },
  { value: "us-east", label: "US East", flag: "🇺🇸" },
  { value: "us-west", label: "US West", flag: "🇺🇸" },
  { value: "eu-west", label: "Europe West", flag: "🇪🇺" },
  { value: "eu-central", label: "Europe Central", flag: "🇪🇺" },
  { value: "asia-east", label: "Asia Pacific", flag: "🌏" },
  { value: "australia", label: "Australia", flag: "🇦🇺" },
]

interface RegionSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
  const selectedRegion = regions.find((r) => r.value === value)

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl",
      "glass",
      "max-w-xs mx-auto"
    )}>
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Server:</span>
      </div>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="flex-1 h-8 border-0 bg-muted/50 focus:ring-primary/50">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span>{selectedRegion?.flag}</span>
              <span className="text-sm">{selectedRegion?.label}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="glass-strong">
          {regions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              <span className="flex items-center gap-2">
                <span>{region.flag}</span>
                <span>{region.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
