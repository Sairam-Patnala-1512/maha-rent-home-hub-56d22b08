import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-gradient-hero text-primary-foreground",
  accent: "bg-gradient-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

const iconBgStyles = {
  default: "bg-primary/10 text-primary",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  accent: "bg-accent-foreground/20 text-accent-foreground",
  success: "bg-success-foreground/20 text-success-foreground",
  warning: "bg-warning-foreground/20 text-warning-foreground",
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  return (
    <Card
      variant={variant === "default" ? "elevated" : undefined}
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg",
        variantStyles[variant],
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "opacity-90"
            )}>
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className={cn(
                "text-xs",
                variant === "default" ? "text-muted-foreground" : "opacity-80"
              )}>
                {subtitle}
              </p>
            )}
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive",
                variant !== "default" && "opacity-90"
              )}>
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{Math.abs(trend.value)}% from last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconBgStyles[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
