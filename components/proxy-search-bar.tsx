"use client"

import { useState } from "react"
import { ArrowRight, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ProxySearchBar() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    
    setIsLoading(true)
    // Simulate proxy navigation
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would redirect through the proxy
      console.log("Proxying to:", url)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className={cn(
        "relative flex items-center gap-2 p-2 rounded-2xl",
        "glass-strong",
        "shadow-lg shadow-primary/5",
        "transition-all duration-300",
        "focus-within:shadow-xl focus-within:shadow-primary/10",
        "focus-within:border-primary/30"
      )}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50">
          <Globe className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to browse securely..."
          className={cn(
            "flex-1 h-12 px-2 bg-transparent",
            "text-base md:text-lg font-mono",
            "placeholder:text-muted-foreground/60",
            "focus:outline-none",
            "text-foreground"
          )}
        />
        
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !url.trim()}
          className={cn(
            "h-12 px-6 rounded-xl font-semibold",
            "bg-primary hover:bg-primary/90",
            "text-primary-foreground",
            "transition-all duration-200",
            "disabled:opacity-50"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Go</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
