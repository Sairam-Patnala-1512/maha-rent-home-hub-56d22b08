import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Shield,
  FileCheck,
  UserCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Generate a mock TRS score based on tenant data
const generateTRSData = (tenantId) => {
  // Mock scoring logic - in production this would come from backend
  const scores = {
    APP001: { score: 782, consentGiven: true },
    APP002: { score: 645, consentGiven: true },
    APP003: { score: 850, consentGiven: true },
    APP004: { score: 520, consentGiven: true },
    APP005: { score: 720, consentGiven: false },
  };
  
  return scores[tenantId] || { score: 650, consentGiven: true };
};

const getScoreBand = (score) => {
  if (score >= 750) return { label: "Excellent", color: "bg-emerald-500", textColor: "text-emerald-700", bgLight: "bg-emerald-50" };
  if (score >= 650) return { label: "Good", color: "bg-blue-500", textColor: "text-blue-700", bgLight: "bg-blue-50" };
  if (score >= 500) return { label: "Average", color: "bg-amber-500", textColor: "text-amber-700", bgLight: "bg-amber-50" };
  return { label: "Needs Review", color: "bg-red-500", textColor: "text-red-700", bgLight: "bg-red-50" };
};

const getVerificationData = (tenantId) => {
  // Mock verification data
  return {
    ekyc: true,
    digilocker: true,
    police: tenantId !== "APP002",
    rentalHistory: tenantId === "APP003" ? 4 : tenantId === "APP001" ? 2 : 1,
    paymentDiscipline: tenantId === "APP004" ? "delays" : "on-time",
    disputes: tenantId === "APP004" ? "resolved" : "none",
  };
};

// Compact badge version for list views
export function TRSBadge({ tenantId, className }) {
  const trsData = generateTRSData(tenantId);
  const band = getScoreBand(trsData.score);
  
  if (!trsData.consentGiven) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground cursor-help",
              className
            )}>
              <Shield className="h-3 w-3" />
              TRS Pending
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">Tenant consent pending for reliability score display.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold cursor-help",
            band.bgLight,
            band.textColor,
            className
          )}>
            <Shield className="h-3 w-3" />
            <span>{trsData.score}</span>
            <span className={cn("w-1.5 h-1.5 rounded-full", band.color)} />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium text-sm">Tenant Reliability Score: {trsData.score}</p>
            <p className="text-xs text-muted-foreground">
              Indicative score based on verified rental history and compliance.
            </p>
            <p className="text-xs font-medium" style={{ color: band.textColor.replace('text-', '') }}>
              Rating: {band.label}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Expanded card version for detail views
export function TRSCard({ tenantId, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const trsData = generateTRSData(tenantId);
  const band = getScoreBand(trsData.score);
  const verification = getVerificationData(tenantId);
  
  if (!trsData.consentGiven) {
    return (
      <div className={cn("p-4 rounded-lg border bg-muted/30", className)}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">Reliability Score Pending</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Awaiting tenant consent for score display.
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                band.color
              )}>
                {trsData.score}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tenant Reliability Score</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    band.bgLight,
                    band.textColor
                  )}>
                    {band.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Based on verified rental history and compliance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Details</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t pt-4 space-y-4">
            {/* Verification Status */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Verification Status</p>
              <div className="flex flex-wrap gap-2">
                <VerificationIcon
                  icon={UserCheck}
                  label="eKYC"
                  verified={verification.ekyc}
                />
                <VerificationIcon
                  icon={FileCheck}
                  label="DigiLocker"
                  verified={verification.digilocker}
                />
                <VerificationIcon
                  icon={Shield}
                  label="Police"
                  verified={verification.police}
                />
              </div>
            </div>
            
            {/* Rental History */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs text-muted-foreground">Completed Tenancies</p>
                <p className="font-semibold">{verification.rentalHistory}</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs text-muted-foreground">Payment Discipline</p>
                <p className={cn(
                  "font-semibold capitalize",
                  verification.paymentDiscipline === "on-time" ? "text-emerald-600" : "text-amber-600"
                )}>
                  {verification.paymentDiscipline === "on-time" ? "On-time" : "Some Delays"}
                </p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs text-muted-foreground">Disputes</p>
                <p className={cn(
                  "font-semibold capitalize",
                  verification.disputes === "none" ? "text-emerald-600" : 
                  verification.disputes === "resolved" ? "text-blue-600" : "text-red-600"
                )}>
                  {verification.disputes === "none" ? "None" : 
                   verification.disputes === "resolved" ? "Resolved" : "Open"}
                </p>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-2 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <Info className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                This score is informational and should not be the sole basis for acceptance or rejection.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function VerificationIcon({ icon: Icon, label, verified }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded text-xs",
            verified 
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" 
              : "bg-muted text-muted-foreground"
          )}>
            <Icon className="h-3 w-3" />
            {label}
            {verified ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {verified ? `${label} Verified` : `${label} Pending`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TRSBadge;
