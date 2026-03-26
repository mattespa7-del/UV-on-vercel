"use client"

import { cn } from "@/lib/utils"

const quickAccessSites = [
  { name: "Google", url: "google.com", icon: "G" },
  { name: "YouTube", url: "youtube.com", icon: "Y" },
  { name: "GitHub", url: "github.com", icon: "GH" },
  { name: "Reddit", url: "reddit.com", icon: "R" },
  { name: "Twitter", url: "x.com", icon: "X" },
  { name: "Wikipedia", url: "wikipedia.org", icon: "W" },
]

interface QuickAccessProps {
  onSelect: (url: string) => void
}

export function QuickAccess({ onSelect }: QuickAccessProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-sm text-muted-foreground mb-4 text-center">Quick Access</p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {quickAccessSites.map((site) => (
          <button
            key={site.name}
            onClick={() => onSelect(site.url)}
            className={cn(
              "group flex flex-col items-center gap-2 p-4 rounded-xl",
              "glass hover:bg-card/80",
              "transition-all duration-200",
              "hover:scale-105 hover:shadow-lg hover:shadow-primary/5"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-muted text-muted-foreground",
              "group-hover:bg-primary group-hover:text-primary-foreground",
              "transition-colors duration-200",
              "font-mono font-bold text-sm"
            )}>
              {site.icon}
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {site.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
