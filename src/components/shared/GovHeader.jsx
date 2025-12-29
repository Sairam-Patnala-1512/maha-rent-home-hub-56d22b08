import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Globe, Menu, User, LogOut, Settings, Bell, X, ChevronDown, Phone, Search, Mic,
  LayoutDashboard, Building2, ClipboardCheck, BarChart3, Users, FileText, AlertTriangle, Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import mhadaLogo from '@/assets/mhada-logo.png';
import indianEmblem from '@/assets/indian-emblem.jpg';
import maharashtraEmblem from '@/assets/maharashtra-emblem.png';

export function GovHeader({ 
  showAuth = true, 
  userName,
  userRole,
  onLanguageChange,
  currentLanguage = 'en'
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const navigate = useNavigate();

  const roleLabels = {
    tenant: 'Tenant',
    landlord: 'Landlord',
    admin: 'MHADA Admin'
  };

  const roleDashboards = {
    tenant: '/tenant/dashboard',
    landlord: '/landlord/dashboard',
    admin: '/admin/dashboard'
  };

  const adminNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Inventory', icon: Building2, path: '/admin/inventory' },
    { label: 'Pending Approvals', icon: ClipboardCheck, path: '/admin/approvals' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { label: 'User Directory', icon: Users, path: '/admin/users' },
    { label: 'Agreements', icon: FileText, path: '/admin/agreements' },
    { label: 'Grievances', icon: AlertTriangle, path: '/admin/grievances' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top strip - Government branding matching MHADA style */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-xs">
            {/* Left side - Authority name */}
            <div className="flex items-center gap-2">
              <span className="font-semibold hidden sm:inline">MAHARASHTRA HOUSING AND AREA DEVELOPMENT AUTHORITY</span>
              <span className="font-semibold sm:hidden">MHADA</span>
            </div>
            
            {/* Right side - Helpline & Language */}
            <div className="flex items-center gap-4 text-xs">
              {/* Emergency Numbers */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-primary-foreground/10 px-2 py-1 rounded">
                  <Phone className="h-3 w-3" />
                  <span className="font-medium">Emergency: 022-23536945</span>
                </div>
                <div className="flex items-center gap-1.5 bg-primary-foreground/10 px-2 py-1 rounded">
                  <Phone className="h-3 w-3" />
                  <span className="font-medium">Helpline: 022-66405000</span>
                </div>
              </div>
              
              {/* Font size controls (visual only) */}
              <div className="hidden sm:flex items-center gap-1 border-l border-primary-foreground/20 pl-3">
                <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-primary-foreground/10 text-xs">A-</button>
                <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-primary-foreground/10 text-sm font-medium">A</button>
                <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-primary-foreground/10 text-base">A+</button>
              </div>

              {/* Language Toggle */}
              <button
                onClick={() => onLanguageChange?.(currentLanguage === 'en' ? 'mr' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1 rounded font-medium bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
              >
                <Globe className="h-3 w-3" />
                <span>{currentLanguage === 'en' ? 'मराठी' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Portal Name */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            {/* MHADA Official Logo */}
            <img 
              src={mhadaLogo} 
              alt="MHADA - Maharashtra Housing and Area Development Authority" 
              className="h-12 object-contain"
            />
          </Link>

          {/* Center - Search Bar (MHADA style) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={currentLanguage === 'en' ? 'Search...' : 'शोधा...'}
                  className="w-full h-9 pl-4 pr-10 text-sm border border-border rounded-l-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
              </div>
              <Button size="sm" className="rounded-l-none h-9 px-4">
                <Search className="h-4 w-4" />
                <span className="ml-1.5 hidden xl:inline">Search</span>
              </Button>
            </div>
          </div>

          {/* Right side - Government emblems */}
          <div className="hidden md:flex items-center gap-4">
            <img 
              src={indianEmblem} 
              alt="Indian National Emblem" 
              className="h-12 object-contain"
            />
            <img 
              src={maharashtraEmblem} 
              alt="Maharashtra State Emblem" 
              className="h-12 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {userName && userRole && (
              <>
                {userRole === 'admin' ? (
                  /* Admin Navigation - Hamburger Menu */
                  <Sheet open={adminMenuOpen} onOpenChange={setAdminMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Menu className="h-4 w-4" />
                        <span className="hidden lg:inline">Navigation</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent 
                      side="left" 
                      className="w-[280px] sm:w-[320px] p-0 flex flex-col"
                    >
                      {/* Header */}
                      <div className="p-6 pb-4 border-b bg-muted/30">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-3 text-left">
                            <img src={mhadaLogo} alt="MHADA" className="h-10" />
                            <div>
                              <span className="block text-base font-semibold">Admin Portal</span>
                              <span className="block text-xs text-muted-foreground">MHADA Navigation</span>
                            </div>
                          </SheetTitle>
                        </SheetHeader>
                      </div>
                      
                      {/* Navigation Items */}
                      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {adminNavItems.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setAdminMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </nav>
                      
                      {/* Footer Disclaimer */}
                      <div className="p-4 border-t bg-muted/20">
                        <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">PoC Disclaimer</p>
                          <p>This is a demonstration environment. No real data is processed.</p>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <>
                    <Link 
                      to={roleDashboards[userRole]}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Dashboard
                    </Link>
                    {userRole === 'tenant' && (
                      <Link 
                        to="/tenant/properties"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Properties
                      </Link>
                    )}
                    {userRole === 'landlord' && (
                      <Link 
                        to="/landlord/properties"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        My Properties
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {userName ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground text-sm font-semibold">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">{roleLabels[userRole]}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover">
                    <DropdownMenuItem onClick={() => navigate(`/${userRole}/profile`)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/${userRole}/settings`)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Logout Confirmation Dialog */}
                <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be redirected to the landing page. Any unsaved changes may be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => navigate('/')}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : showAuth ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')} size="sm">
                  Sign In
                </Button>
                <Button variant="default" onClick={() => navigate('/register')} size="sm">
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
          'md:hidden border-t overflow-hidden transition-all duration-200 bg-card',
          mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          {/* Mobile Search */}
          <div className="flex">
            <input
              type="text"
              placeholder={currentLanguage === 'en' ? 'Search...' : 'शोधा...'}
              className="flex-1 h-9 pl-4 pr-4 text-sm border border-border rounded-l-lg bg-background focus:outline-none"
            />
            <Button size="sm" className="rounded-l-none h-9">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Helpline */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>Helpline: 022-66405000</span>
          </div>

          <nav className="space-y-1">
            {userName && userRole && (
              <>
                {userRole === 'admin' ? (
                  /* Admin Mobile Navigation */
                  adminNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))
                ) : (
                  <>
                    <Link
                      to={roleDashboards[userRole]}
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {userRole === 'tenant' && (
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
              </>
            )}
          </nav>

          {/* PoC Disclaimer for Admin Mobile */}
          {userRole === 'admin' && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">PoC Disclaimer</p>
              <p>This is a demonstration environment. No real data is processed.</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}