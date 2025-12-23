import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Search,
  Building2,
  Users,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";

export default function PendingApprovals() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  const pendingApprovals = [
    { 
      id: "1", 
      type: "Property", 
      name: "2 BHK Bandra West", 
      submittedBy: "Amit Patel", 
      date: "Dec 12, 2024",
      details: "Premium apartment with sea view, 1200 sq ft",
      status: "pending"
    },
    { 
      id: "2", 
      type: "Landlord", 
      name: "Priya Enterprises", 
      submittedBy: "Priya Desai", 
      date: "Dec 11, 2024",
      details: "Commercial landlord with 5 properties",
      status: "pending"
    },
    { 
      id: "3", 
      type: "Property", 
      name: "1 RK Thane West", 
      submittedBy: "Vikram Singh", 
      date: "Dec 10, 2024",
      details: "Compact studio apartment, 350 sq ft",
      status: "pending"
    },
    { 
      id: "4", 
      type: "Tenant", 
      name: "Rahul Mehta", 
      submittedBy: "Rahul Mehta", 
      date: "Dec 9, 2024",
      details: "IT Professional seeking verification",
      status: "pending"
    },
    { 
      id: "5", 
      type: "Property", 
      name: "3 BHK Powai Lake View", 
      submittedBy: "Sneha Kulkarni", 
      date: "Dec 8, 2024",
      details: "Luxury apartment with amenities, 1800 sq ft",
      status: "pending"
    },
    { 
      id: "6", 
      type: "Landlord", 
      name: "Mumbai Housing Co.", 
      submittedBy: "Admin Team", 
      date: "Dec 7, 2024",
      details: "Institutional landlord with 20+ properties",
      status: "in-review"
    },
  ];

  const filteredApprovals = pendingApprovals.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredByType = (type) => {
    if (type === "all") return filteredApprovals;
    return filteredApprovals.filter((item) => item.type.toLowerCase() === type.toLowerCase());
  };

  const handleView = (item) => {
    toast({
      title: `Viewing ${item.type}`,
      description: `Opening details for ${item.name}`,
    });
    // Navigate based on type
    if (item.type === "Property") {
      navigate(`/admin/inventory`);
    } else if (item.type === "Landlord" || item.type === "Tenant") {
      navigate(`/admin/users`);
    }
  };

  const handleApprove = (item) => {
    toast({
      title: "Approved Successfully",
      description: `${item.name} has been approved.`,
    });
  };

  const handleReject = (item) => {
    toast({
      title: "Rejected",
      description: `${item.name} has been rejected.`,
      variant: "destructive",
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Property":
        return Building2;
      case "Landlord":
      case "Tenant":
        return Users;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Admin Officer"
        userRole="admin"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Pending Approvals
              </h1>
              <p className="text-muted-foreground mt-1">
                Review and approve submissions requiring verification
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredApprovals.length} items pending
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, submitter, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                All ({filteredApprovals.length})
              </TabsTrigger>
              <TabsTrigger value="property">
                Properties ({getFilteredByType("property").length})
              </TabsTrigger>
              <TabsTrigger value="landlord">
                Landlords ({getFilteredByType("landlord").length})
              </TabsTrigger>
              <TabsTrigger value="tenant">
                Tenants ({getFilteredByType("tenant").length})
              </TabsTrigger>
            </TabsList>

            {["all", "property", "landlord", "tenant"].map((type) => (
              <TabsContent key={type} value={type} className="mt-6">
                <div className="space-y-4">
                  {getFilteredByType(type).map((item) => {
                    const IconComponent = getTypeIcon(item.type);
                    return (
                      <Card
                        key={item.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                item.type === "Property" ? "bg-primary/10" : 
                                item.type === "Landlord" ? "bg-accent/10" : "bg-info/10"
                              }`}>
                                <IconComponent className={`h-6 w-6 ${
                                  item.type === "Property" ? "text-primary" : 
                                  item.type === "Landlord" ? "text-accent" : "text-info"
                                }`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                    {item.type}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {item.details}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Submitted by {item.submittedBy} • {item.date}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
                                <Clock className="h-3 w-3" />
                                {item.status === "in-review" ? "In Review" : "Pending"}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9"
                                onClick={() => handleView(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={() => handleApprove(item)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleReject(item)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {getFilteredByType(type).length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-success/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No pending approvals</p>
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
