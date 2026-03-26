"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProxySearchBar } from "@/components/proxy-search-bar"
import { QuickAccess } from "@/components/quick-access"
import { RegionSelector } from "@/components/region-selector"
import { FeatureCards } from "@/components/feature-cards"
import { cn } from "@/lib/utils"

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState("auto")

  const handleQuickAccess = (url: string) => {
    console.log("Quick access to:", url)
    // In a real app, this would populate the search bar or navigate
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-1/4 left-1/4 w-96 h-96 rounded-full",
          "bg-primary/5 blur-3xl"
        )} />
        <div className={cn(
          "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full",
          "bg-primary/3 blur-3xl"
        )} />
        <div className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]",
          "from-transparent via-transparent to-background"
        )} />
      </div>

      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6",
                "glass text-sm text-muted-foreground"
              )}>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>All servers operational</span>
              </div>
              
              <h1 className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-bold",
                "text-foreground mb-6",
                "tracking-tight text-balance"
              )}>
                Browse the web
                <br />
                <span className="text-primary">privately & fast</span>
              </h1>
              
              <p className={cn(
                "text-lg md:text-xl text-muted-foreground",
                "max-w-2xl mx-auto mb-8",
                "leading-relaxed text-pretty"
              )}>
                Access any website securely with military-grade encryption.
                Zero logs, lightning speed, complete privacy.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <ProxySearchBar />
            </div>

            {/* Region Selector */}
            <div className="mb-12">
              <RegionSelector value={selectedRegion} onChange={setSelectedRegion} />
            </div>

            {/* Quick Access */}
            <div className="mb-20">
              <QuickAccess onSelect={handleQuickAccess} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Why developers choose FluxProxy
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
                Built for speed, designed for privacy. The proxy that respects you.
              </p>
            </div>
            
            <FeatureCards />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 border-t border-border/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { stat: "10M+", label: "Requests Daily" },
                { stat: "99.9%", label: "Uptime SLA" },
                { stat: "<50ms", label: "Global Latency" },
                { stat: "150+", label: "Edge Locations" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary font-mono mb-2">
                    {item.stat}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border/50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                FluxProxy. Fast, private, reliable.
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Status
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
