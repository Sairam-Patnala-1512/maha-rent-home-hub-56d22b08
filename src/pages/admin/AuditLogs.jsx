import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Download,
  Activity,
  User,
  Building2,
  FileText,
  Shield,
  Settings,
} from "lucide-react";

export default function AuditLogs() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const logs = [
    { id: "LOG001", timestamp: "Dec 12, 2024 14:32:15", user: "Amit Patel (Landlord)", action: "property_created", details: "Created new property: 2 BHK Andheri West", ip: "192.168.1.45" },
    { id: "LOG002", timestamp: "Dec 12, 2024 14:28:00", user: "Admin Officer", action: "application_approved", details: "Approved application APP003", ip: "10.0.0.15" },
    { id: "LOG003", timestamp: "Dec 12, 2024 14:15:30", user: "Rahul Sharma (Tenant)", action: "login", details: "Successful login via OTP", ip: "192.168.2.100" },
    { id: "LOG004", timestamp: "Dec 12, 2024 13:45:22", user: "Priya Desai (Tenant)", action: "application_submitted", details: "Submitted application for 2 BHK Andheri West", ip: "192.168.3.55" },
    { id: "LOG005", timestamp: "Dec 12, 2024 13:30:00", user: "Admin Officer", action: "grievance_resolved", details: "Resolved grievance GRV004", ip: "10.0.0.15" },
    { id: "LOG006", timestamp: "Dec 12, 2024 12:45:10", user: "Sneha Kulkarni (Landlord)", action: "property_updated", details: "Updated rent for 1 RK Thane", ip: "192.168.4.22" },
    { id: "LOG007", timestamp: "Dec 12, 2024 12:00:00", user: "System", action: "backup_completed", details: "Daily backup completed successfully", ip: "10.0.0.1" },
    { id: "LOG008", timestamp: "Dec 12, 2024 11:30:45", user: "Vikram Singh (Landlord)", action: "agreement_signed", details: "E-signed agreement AGR005", ip: "192.168.5.88" },
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case "login":
      case "logout":
        return <User className="h-4 w-4" />;
      case "property_created":
      case "property_updated":
        return <Building2 className="h-4 w-4" />;
      case "application_submitted":
      case "application_approved":
        return <FileText className="h-4 w-4" />;
      case "grievance_resolved":
        return <Shield className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getActionColor = (action) => {
    if (action.includes("approved") || action.includes("resolved") || action.includes("completed")) {
      return "text-success bg-success/10";
    }
    if (action.includes("rejected") || action.includes("failed")) {
      return "text-destructive bg-destructive/10";
    }
    return "text-primary bg-primary/10";
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action.includes(actionFilter);
    return matchesSearch && matchesAction;
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
                Audit Logs
              </h1>
              <p className="text-muted-foreground mt-1">
                System activity and user action trail
              </p>
            </div>
            <Button variant="govOutline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, action, or details..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="login">Login/Logout</SelectItem>
                    <SelectItem value="property">Property Actions</SelectItem>
                    <SelectItem value="application">Applications</SelectItem>
                    <SelectItem value="agreement">Agreements</SelectItem>
                    <SelectItem value="grievance">Grievances</SelectItem>
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
                    <TableHead className="w-32">Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                          {getActionIcon(log.action)}
                          {log.action.replace(/_/g, " ")}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.ip}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No logs found</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Showing {filteredLogs.length} of {logs.length} log entries</span>
            <span>Logs are retained for 90 days</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
