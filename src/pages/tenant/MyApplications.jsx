import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Home,
  Calendar,
  FileText,
  Clock,
  Filter,
  SortAsc,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockApplications = [
  {
    id: "APP001",
    property: {
      title: "Spacious 2 BHK with Balcony",
      address: "Near Western Express Highway, Andheri West",
      rent: 25000,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
    },
    landlord: "Mr. Rajesh Patel",
    status: "in-review",
    appliedDate: "Dec 18, 2024",
    lastUpdate: "Dec 18, 2024 - 03:00 PM",
  },
  {
    id: "APP002",
    property: {
      title: "1 BHK in Bandra East",
      address: "Near Bandra Station, Bandra East",
      rent: 18000,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    },
    landlord: "Mrs. Sunita Desai",
    status: "approved",
    appliedDate: "Dec 5, 2024",
    lastUpdate: "Dec 15, 2024 - 11:30 AM",
    agreementStatus: "pending-signature",
  },
  {
    id: "APP003",
    property: {
      title: "Studio Apartment in Powai",
      address: "Hiranandani Gardens, Powai",
      rent: 22000,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
    },
    landlord: "Mr. Vikram Shah",
    status: "rejected",
    appliedDate: "Nov 28, 2024",
    lastUpdate: "Dec 2, 2024 - 04:15 PM",
    rejectionReason: "Income verification failed",
  },
  {
    id: "APP004",
    property: {
      title: "2 BHK in Thane West",
      address: "Ghodbunder Road, Thane West",
      rent: 20000,
      imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80",
    },
    landlord: "Mr. Anil Kumar",
    status: "submitted",
    appliedDate: "Dec 20, 2024",
    lastUpdate: "Dec 20, 2024 - 09:45 AM",
  },
];

export default function MyApplications() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status) => {
    if (status === "all") return mockApplications.length;
    return mockApplications.filter((app) => app.status === status).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/dashboard")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  My Applications
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage all your rental applications
                </p>
              </div>
              <Button onClick={() => navigate("/tenant/properties")}>
                <Search className="h-4 w-4 mr-2" />
                Browse Properties
              </Button>
            </div>
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { key: "all", label: "All", color: "bg-muted" },
              { key: "submitted", label: "Submitted", color: "bg-info/10 border-info/20" },
              { key: "in-review", label: "In Review", color: "bg-warning/10 border-warning/20" },
              { key: "approved", label: "Approved", color: "bg-success/10 border-success/20" },
              { key: "rejected", label: "Rejected", color: "bg-destructive/10 border-destructive/20" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setStatusFilter(item.key)}
                className={cn(
                  "p-3 rounded-lg border text-center transition-all",
                  statusFilter === item.key
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:bg-muted/50",
                  item.color
                )}
              >
                <p className="text-2xl font-bold">{getStatusCount(item.key)}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by property name or application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No Applications Found</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your filters"
                      : "Start browsing properties to submit your first application"}
                  </p>
                  <Button onClick={() => navigate("/tenant/properties")}>
                    Browse Properties
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card
                  key={application.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/tenant/applications/${application.id}/status`)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={application.property.imageUrl}
                        alt={application.property.title}
                        className="w-full sm:w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-base">
                              {application.property.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {application.property.address}
                            </p>
                          </div>
                          <StatusBadge status={application.status} />
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                            {application.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Home className="h-3.5 w-3.5" />
                            {application.landlord}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Applied: {application.appliedDate}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-primary">
                              ₹{application.property.rent.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">/month</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {application.agreementStatus && (
                              <Badge variant="info" className="text-xs">
                                Agreement Ready
                              </Badge>
                            )}
                            {application.rejectionReason && (
                              <Badge variant="destructive" className="text-xs">
                                {application.rejectionReason}
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              View Details
                              <Clock className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
