import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  User,
  Building2,
  Calendar,
  Shield,
} from "lucide-react";
import { TRSBadge } from "@/components/shared/TenantReliabilityScore";

export default function ApplicationsList() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  const applications = [
    {
      id: "APP001",
      tenantName: "Priya Desai",
      tenantPhone: "9876543210",
      property: "2 BHK Andheri West",
      propertyId: "1",
      appliedDate: "Dec 12, 2024",
      status: "pending",
      verificationStatus: "verified",
      occupation: "IT Professional",
      monthlyIncome: "₹75,000",
    },
    {
      id: "APP002",
      tenantName: "Vikram Singh",
      tenantPhone: "9123456780",
      property: "2 BHK Andheri West",
      propertyId: "1",
      appliedDate: "Dec 10, 2024",
      status: "in-review",
      verificationStatus: "pending",
      occupation: "Business Owner",
      monthlyIncome: "₹1,20,000",
    },
    {
      id: "APP003",
      tenantName: "Sneha Kulkarni",
      tenantPhone: "9988776655",
      property: "1 RK Thane",
      propertyId: "4",
      appliedDate: "Dec 8, 2024",
      status: "approved",
      verificationStatus: "verified",
      occupation: "Teacher",
      monthlyIncome: "₹45,000",
    },
    {
      id: "APP004",
      tenantName: "Rahul Mehta",
      tenantPhone: "9112233445",
      property: "3 BHK Powai",
      propertyId: "3",
      appliedDate: "Dec 5, 2024",
      status: "rejected",
      verificationStatus: "verified",
      occupation: "Freelancer",
      monthlyIncome: "₹60,000",
    },
    {
      id: "APP005",
      tenantName: "Anita Sharma",
      tenantPhone: "9556677889",
      property: "2 BHK Andheri West",
      propertyId: "1",
      appliedDate: "Dec 15, 2024",
      status: "pending",
      verificationStatus: "verified",
      occupation: "Doctor",
      monthlyIncome: "₹1,50,000",
    },
  ];

  const filteredApplications = applications.filter((app) =>
    app.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredByStatus = (status) => {
    if (status === "all") return filteredApplications;
    return filteredApplications.filter((app) => app.status === status);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Amit Patel"
        userRole="landlord"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/landlord/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Tenant Applications
              </h1>
              <p className="text-muted-foreground mt-1">
                Review and manage tenant applications for your properties
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, property, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({filteredApplications.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({getFilteredByStatus("pending").length})</TabsTrigger>
              <TabsTrigger value="in-review">In Review ({getFilteredByStatus("in-review").length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({getFilteredByStatus("approved").length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({getFilteredByStatus("rejected").length})</TabsTrigger>
            </TabsList>

            {["all", "pending", "in-review", "approved", "rejected"].map((status) => (
              <TabsContent key={status} value={status} className="mt-6">
                <div className="space-y-4">
                  {getFilteredByStatus(status).map((app) => (
                    <Card
                      key={app.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/landlord/applications/${app.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-lg font-semibold text-primary">
                                {app.tenantName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{app.tenantName}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Building2 className="h-3 w-3" />
                                <span>{app.property}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4">
                            <TRSBadge tenantId={app.id} />
                            <div className="text-sm">
                              <p className="text-muted-foreground">Applied</p>
                              <p className="font-medium">{app.appliedDate}</p>
                            </div>
                            <div className="text-sm">
                              <p className="text-muted-foreground">Income</p>
                              <p className="font-medium">{app.monthlyIncome}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {app.verificationStatus === "verified" ? (
                                <span className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                                  <Shield className="h-3 w-3" />
                                  Verified
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
                                  <Clock className="h-3 w-3" />
                                  Pending
                                </span>
                              )}
                              <StatusBadge status={app.status} />
                            </div>
                          </div>
                        </div>

                        {app.status === "pending" && (
                          <div className="flex gap-2 mt-4 pt-4 border-t">
                            <Button size="sm" variant="success" onClick={(e) => e.stopPropagation()}>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={(e) => e.stopPropagation()}>
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {getFilteredByStatus(status).length === 0 && (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No applications found</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
