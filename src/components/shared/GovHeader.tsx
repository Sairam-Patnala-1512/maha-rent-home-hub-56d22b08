import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, User, LogOut, Settings, Bell, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GovHeaderProps {
  showAuth?: boolean;
  userName?: string;
  userRole?: "tenant" | "landlord" | "admin";
  onLanguageChange?: (lang: "en" | "mr") => void;
  currentLanguage?: "en" | "mr";
}

export function GovHeader({ 
  showAuth = true, 
  userName,
  userRole,
  onLanguageChange,
  currentLanguage = "en"
}: GovHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const roleLabels = {
    tenant: "Tenant",
    landlord: "Landlord",
    admin: "Administrator"
  };

  const roleDashboards = {
    tenant: "/tenant/dashboard",
    landlord: "/landlord/dashboard",
    admin: "/admin/dashboard"
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top strip - Government branding */}
      <div className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-8 items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Government of Maharashtra</span>
              <span className="sm:hidden">GoM</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onLanguageChange?.(currentLanguage === "en" ? "mr" : "en")}
                className="flex items-center gap-1 hover:text-accent-light transition-colors"
              >
                <Globe className="h-3 w-3" />
                <span>{currentLanguage === "en" ? "मराठी" : "English"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Portal Name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero shadow-md">
              <span className="text-lg font-bold text-primary-foreground">म</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold leading-tight text-foreground">
                Maharashtra Rental Housing
              </h1>
              <p className="text-xs text-muted-foreground">MHADA PoC Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {userName && userRole && (
              <>
                <Link 
                  to={roleDashboards[userRole]}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                {userRole === "tenant" && (
                  <Link 
                    to="/tenant/properties"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Properties
                  </Link>
                )}
                {userRole === "landlord" && (
                  <Link 
                    to="/landlord/properties"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    My Properties
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {userName ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">{roleLabels[userRole!]}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate(`/${userRole}/profile`)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/${userRole}/settings`)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/login")} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : showAuth ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="default" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </div>
            ) : null}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t overflow-hidden transition-all duration-200",
          mobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {userName && userRole && (
            <>
              <Link
                to={roleDashboards[userRole]}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              {userRole === "tenant" && (
                <Link
                  to="/tenant/properties"
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Properties
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
