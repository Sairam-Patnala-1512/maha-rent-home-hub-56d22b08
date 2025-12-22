import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ChatSupport } from "@/components/shared/ChatSupport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  FileText,
  Clock,
  CheckCircle2,
  Search,
  Bell,
  MessageSquare,
  ArrowRight,
  Calendar,
  MapPin,
  AlertCircle,
  ClipboardList,
  PlayCircle,
} from "lucide-react";

export default function TenantDashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [chatOpen, setChatOpen] = useState(false);

  const user = {
    name: "Rahul Sharma",
    verificationStatus: 85,
    kycStatus: "verified",
    policeVerification: "pending",
  };

  const applications = [
    {
      id: "APP001",
      property: "2 BHK in Andheri West",
      landlord: "Mr. Patel",
      status: "in-review",
      appliedDate: "Dec 10, 2024",
      rent: 25000,
    },
    {
      id: "APP002",
      property: "1 BHK in Bandra East",
      landlord: "Mrs. Desai",
      status: "approved",
      appliedDate: "Dec 5, 2024",
      rent: 18000,
    },
  ];

  const notifications = [
    { id: 1, message: "Your application for 2 BHK Andheri has been reviewed", time: "2 hours ago", unread: true },
    { id: 2, message: "Complete your police verification to proceed", time: "1 day ago", unread: true },
    { id: 3, message: "New properties available in your preferred area", time: "3 days ago", unread: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName={user.name}
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your rental journey
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Applications"
              value={applications.length}
              subtitle="Active applications"
              icon={FileText}
            />
            <StatsCard
              title="Saved Properties"
              value="12"
              subtitle="In your wishlist"
              icon={Home}
            />
            <StatsCard
              title="Profile Completion"
              value={`${user.verificationStatus}%`}
              subtitle="Complete for faster approval"
              icon={CheckCircle2}
              variant="primary"
            />
            <StatsCard
              title="Pending Actions"
              value="2"
              subtitle="Requires attention"
              icon={AlertCircle}
              variant="accent"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card variant="info">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Profile Verification</CardTitle>
                    <span className="text-sm font-medium text-info">{user.verificationStatus}% Complete</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={user.verificationStatus} className="h-2 mb-4" />
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">eKYC</p>
                        <StatusBadge status="verified" showIcon={false} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">DigiLocker</p>
                        <StatusBadge status="verified" showIcon={false} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center">
                        <Clock className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Police Verification</p>
                        <StatusBadge status="pending" showIcon={false} />
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="default" className="mt-4" size="sm">
                    Complete Verification
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">My Applications</CardTitle>
                      <CardDescription>Track your rental applications</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/applications")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/tenant/applications/${app.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Home className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{app.property}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Landlord: {app.landlord}</span>
                            <span>•</span>
                            <span>₹{app.rent.toLocaleString()}/mo</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={app.status} />
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied: {app.appliedDate}
                        </p>
                      </div>
                    </div>
                  ))}

                  {applications.length === 0 && (
                    <div className="text-center py-8">
                      <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No applications yet</p>
                      <Button variant="default" className="mt-4" onClick={() => navigate("/tenant/properties")}>
                        Browse Properties
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button
                    variant="govOutline"
                    className="h-auto py-4 flex-col gap-2 relative"
                    onClick={() => navigate("/tenant/properties")}
                  >
                    <Search className="h-5 w-5" />
                    <span className="text-xs">Search Properties</span>
                  </Button>
                  <Button
                    variant="govOutline"
                    className="h-auto py-4 flex-col gap-2 relative"
                    onClick={() => navigate("/tenant/applications")}
                  >
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">My Applications</span>
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 text-[10px] px-1.5" variant="default">
                      {applications.length}
                    </Badge>
                  </Button>
                  <Button
                    variant="govOutline"
                    className="h-auto py-4 flex-col gap-2 relative"
                    onClick={() => navigate("/tenant/agreements")}
                  >
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-xs">My Agreements</span>
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 text-[10px] px-1.5" variant="info">
                      1
                    </Badge>
                  </Button>
                  <Button
                    variant="govOutline"
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => navigate("/grievance")}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs">Raise Grievance</span>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg text-sm ${
                        notif.unread ? "bg-primary/5 border-l-2 border-primary" : "bg-muted/50"
                      }`}
                    >
                      <p className={notif.unread ? "font-medium" : "text-muted-foreground"}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card variant="accent">
                <CardContent className="pt-6">
                  <MessageSquare className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to assist you with any queries.
                  </p>
                  <Button variant="hero" size="sm" className="w-full" onClick={() => setChatOpen(true)}>
                    Chat with Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Chat Support Dialog */}
      <ChatSupport open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}