import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle, FileCheck, ShieldCheck, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = 
  | "pending" 
  | "verified" 
  | "completed" 
  | "rejected" 
  | "in-review" 
  | "draft" 
  | "live" 
  | "approved"
  | "occupied"
  | "vacant";

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  className?: string;
}

const statusConfig: Record<StatusType, { 
  label: string; 
  variant: "success" | "warning" | "error" | "info" | "pending" | "verified" | "secondary";
  icon: React.ComponentType<{ className?: string }>;
}> = {
  pending: { label: "Pending", variant: "pending", icon: Clock },
  verified: { label: "Verified", variant: "verified", icon: ShieldCheck },
  completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
  rejected: { label: "Rejected", variant: "error", icon: XCircle },
  "in-review": { label: "In Review", variant: "warning", icon: AlertCircle },
  draft: { label: "Draft", variant: "secondary", icon: FileCheck },
  live: { label: "Live", variant: "success", icon: CheckCircle2 },
  approved: { label: "Approved", variant: "success", icon: CheckCircle2 },
  occupied: { label: "Occupied", variant: "info", icon: Home },
  vacant: { label: "Vacant", variant: "success", icon: Home },
};

export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={cn("gap-1", className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
}
