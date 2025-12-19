import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatsCard } from "@/components/shared/StatsCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Search,
  Eye,
  FileText,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export default function ApplicationsMonitoring() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = {
    total: 1245,
    pending: 234,
    approved: 876,
    rejected: 135,
  };

  const applications = [
    { id: "APP001", tenant: "Priya Desai", landlord: "Amit Patel", property: "2 BHK Andheri West", date: "Dec 12, 2024", status: "pending" },
    { id: "APP002", tenant: "Vikram Singh", landlord: "Sneha Kulkarni", property: "1 RK Thane", date: "Dec 11, 2024", status: "approved" },
    { id: "APP003", tenant: "Rahul Mehta", landlord: "Meena Deshmukh", property: "1 BHK Nagpur", date: "Dec 10, 2024", status: "rejected" },
    { id: "APP004", tenant: "Anita Sharma", landlord: "Suresh Patil", property: "2 BHK Pune", date: "Dec 9, 2024", status: "in-review" },
    { id: "APP005", tenant: "Kiran Joshi", landlord: "Ajay Kumar", property: "Studio Malad", date: "Dec 8, 2024", status: "approved" },
    { id: "APP006", tenant: "Pooja Singh", landlord: "Priya Desai", property: "1 BHK Bandra", date: "Dec 7, 2024", status: "pending" },
    { id: "APP007", tenant: "Sunil Rao", landlord: "Vikram Singh", property: "3 BHK Powai", date: "Dec 6, 2024", status: "approved" },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                Applications Monitoring
              </h1>
              <p className="text-muted-foreground mt-1">
                Track and monitor all rental applications
              </p>
            </div>
            <Button variant="govOutline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Total Applications"
              value={stats.total.toLocaleString()}
              icon={FileText}
            />
            <StatsCard
              title="Pending Review"
              value={stats.pending}
              icon={Clock}
              variant="accent"
            />
            <StatsCard
              title="Approved"
              value={stats.approved}
              icon={CheckCircle2}
              variant="primary"
            />
            <StatsCard
              title="Rejected"
              value={stats.rejected}
              icon={XCircle}
            />
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by application ID, tenant, or property..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono text-sm">{app.id}</TableCell>
                      <TableCell className="font-medium">{app.tenant}</TableCell>
                      <TableCell>{app.landlord}</TableCell>
                      <TableCell>{app.property}</TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
