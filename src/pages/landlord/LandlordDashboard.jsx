import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  FileText,
  Users,
  IndianRupee,
  Plus,
  Eye,
  Edit,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const user = {
    name: "Amit Patel",
    totalProperties: 5,
    occupiedUnits: 3,
    pendingApplications: 4,
  };

  const properties = [
    {
      id: "1",
      title: "2 BHK Andheri West",
      status: "live",
      rent: 25000,
      applications: 3,
      tenantName: null,
      occupancy: "vacant",
    },
    {
      id: "2",
      title: "1 BHK Bandra East",
      status: "occupied",
      rent: 18000,
      applications: 0,
      tenantName: "Rahul Sharma",
      occupancy: "occupied",
    },
    {
      id: "3",
      title: "3 BHK Powai",
      status: "draft",
      rent: 55000,
      applications: 0,
      tenantName: null,
      occupancy: "draft",
    },
    {
      id: "4",
      title: "1 RK Thane",
      status: "in-review",
      rent: 8000,
      applications: 1,
      tenantName: null,
      occupancy: "in-review",
    },
  ];

  const recentApplications = [
    {
      id: "APP001",
      tenantName: "Priya Desai",
      property: "2 BHK Andheri West",
      appliedDate: "Dec 12, 2024",
      status: "pending",
      verificationStatus: "verified",
    },
    {
      id: "APP002",
      tenantName: "Vikram Singh",
      property: "2 BHK Andheri West",
      appliedDate: "Dec 10, 2024",
      status: "in-review",
      verificationStatus: "pending",
    },
    {
      id: "APP003",
      tenantName: "Sneha Kulkarni",
      property: "1 RK Thane",
      appliedDate: "Dec 8, 2024",
      status: "approved",
      verificationStatus: "verified",
    },
  ];

  const monthlyEarnings = 96000;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName={user.name}
        userRole="landlord"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your properties and tenant applications
              </p>
            </div>
            <Button onClick={() => navigate("/landlord/properties/add")} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Properties"
              value={user.totalProperties}
              subtitle="Listed on portal"
              icon={Building2}
            />
            <StatsCard
              title="Occupied Units"
              value={user.occupiedUnits}
              subtitle={`${Math.round((user.occupiedUnits / user.totalProperties) * 100)}% occupancy`}
              icon={Users}
              variant="primary"
            />
            <StatsCard
              title="Pending Applications"
              value={user.pendingApplications}
              subtitle="Awaiting review"
              icon={FileText}
              variant="accent"
            />
            <StatsCard
              title="Monthly Earnings"
              value={`₹${(monthlyEarnings / 1000).toFixed(0)}K`}
              subtitle="From occupied units"
              icon={IndianRupee}
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">My Properties</CardTitle>
                      <CardDescription>Manage your listed properties</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/landlord/properties")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">{property.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>₹{property.rent.toLocaleString()}/mo</span>
                              {property.tenantName && (
                                <>
                                  <span>•</span>
                                  <span>Tenant: {property.tenantName}</span>
                                </>
                              )}
                              {property.applications > 0 && (
                                <>
                                  <span>•</span>
                                  <span className="text-accent font-medium">
                                    {property.applications} applications
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={property.status} />
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => navigate(`/landlord/properties/${property.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => navigate(`/landlord/properties/${property.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Recent Applications</CardTitle>
                      <CardDescription>Tenant applications for your properties</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/landlord/applications")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/landlord/applications/${app.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {app.tenantName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{app.tenantName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {app.property} • Applied {app.appliedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {app.verificationStatus === "verified" ? (
                            <span className="flex items-center gap-1 text-xs text-success">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-warning">
                              <Clock className="h-3 w-3" />
                              Pending
                            </span>
                          )}
                          <StatusBadge status={app.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="govOutline"
                    className="w-full justify-start"
                    onClick={() => navigate("/landlord/properties/add")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Property
                  </Button>
                  <Button
                    variant="govOutline"
                    className="w-full justify-start"
                    onClick={() => navigate("/landlord/applications")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Review Applications
                  </Button>
                  <Button
                    variant="govOutline"
                    className="w-full justify-start"
                    onClick={() => navigate("/landlord/agreements")}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Manage Agreements
                  </Button>
                  <Button
                    variant="govOutline"
                    className="w-full justify-start"
                    onClick={() => navigate("/grievance")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Support & Grievance
                  </Button>
                </CardContent>
              </Card>

              <Card variant="accent">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8 text-accent" />
                    <span className="text-xs text-muted-foreground">This Month</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">₹{monthlyEarnings.toLocaleString()}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Total Rental Income</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collected</span>
                      <span className="font-medium text-success">₹71,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-warning">₹25,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="warning">
                <CardContent className="pt-6">
                  <AlertCircle className="h-8 w-8 text-warning mb-3" />
                  <h3 className="font-semibold mb-2">Complete Verification</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    1 property is pending verification. Complete the process to go live.
                  </p>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate("/landlord/verification")}
                  >
                    Complete Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}