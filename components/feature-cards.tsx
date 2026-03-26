import { Zap, Shield, Globe, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized edge network delivers content with sub-50ms latency worldwide.",
    stat: "50ms",
    statLabel: "avg latency",
  },
  {
    icon: Shield,
    title: "Zero Logs",
    description: "We never store your browsing history. Complete privacy, guaranteed.",
    stat: "0",
    statLabel: "logs stored",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "100+ server locations across 6 continents for optimal routing.",
    stat: "100+",
    statLabel: "locations",
  },
  {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "Military-grade AES-256 encryption protects all your traffic.",
    stat: "256",
    statLabel: "bit encryption",
  },
]

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
      {features.map((feature) => (
        <div
          key={feature.title}
          className={cn(
            "group relative p-6 rounded-xl",
            "glass hover:bg-card/70",
            "transition-all duration-300",
            "hover:shadow-lg hover:shadow-primary/5",
            "border border-border/50 hover:border-primary/20"
          )}
        >
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
            "bg-primary/10 text-primary",
            "group-hover:bg-primary group-hover:text-primary-foreground",
            "transition-colors duration-300"
          )}>
            <feature.icon className="w-5 h-5" />
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {feature.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {feature.description}
          </p>
          
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary font-mono">
              {feature.stat}
            </span>
            <span className="text-xs text-muted-foreground">
              {feature.statLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
