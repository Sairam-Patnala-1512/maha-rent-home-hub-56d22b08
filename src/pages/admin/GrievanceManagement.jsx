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
  MessageSquare,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

export default function GrievanceManagement() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const stats = {
    total: 456,
    open: 45,
    inProgress: 23,
    resolved: 388,
  };

  const grievances = [
    { id: "GRV001", subject: "Water supply issue", category: "Maintenance", submittedBy: "Rahul Sharma", date: "Dec 12, 2024", priority: "high", status: "open" },
    { id: "GRV002", subject: "Rent receipt not received", category: "Documentation", submittedBy: "Priya Desai", date: "Dec 11, 2024", priority: "medium", status: "in-progress" },
    { id: "GRV003", subject: "Agreement renewal delay", category: "Agreement", submittedBy: "Amit Patel", date: "Dec 10, 2024", priority: "high", status: "open" },
    { id: "GRV004", subject: "Parking dispute", category: "Dispute", submittedBy: "Vikram Singh", date: "Dec 8, 2024", priority: "low", status: "resolved" },
    { id: "GRV005", subject: "Security deposit refund", category: "Payment", submittedBy: "Sneha Kulkarni", date: "Dec 5, 2024", priority: "high", status: "in-progress" },
    { id: "GRV006", subject: "Portal login issue", category: "Technical", submittedBy: "Anita Sharma", date: "Dec 3, 2024", priority: "medium", status: "resolved" },
  ];

  const filteredGrievances = grievances.filter((grv) => {
    const matchesSearch = grv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grv.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || grv.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || grv.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-destructive bg-destructive/10";
      case "medium": return "text-warning bg-warning/10";
      case "low": return "text-success bg-success/10";
      default: return "text-muted-foreground bg-muted";
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
                Grievance Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and resolve user grievances
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
              title="Total Grievances"
              value={stats.total}
              icon={MessageSquare}
            />
            <StatsCard
              title="Open"
              value={stats.open}
              icon={AlertTriangle}
              variant="accent"
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              icon={Clock}
            />
            <StatsCard
              title="Resolved"
              value={stats.resolved}
              icon={CheckCircle2}
              variant="primary"
            />
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search grievances..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
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
                    <TableHead>Grievance ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrievances.map((grv) => (
                    <TableRow key={grv.id}>
                      <TableCell className="font-mono text-sm">{grv.id}</TableCell>
                      <TableCell className="font-medium">{grv.subject}</TableCell>
                      <TableCell>{grv.category}</TableCell>
                      <TableCell>{grv.submittedBy}</TableCell>
                      <TableCell>{grv.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(grv.priority)}`}>
                          {grv.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={grv.status === "resolved" ? "approved" : grv.status === "in-progress" ? "in-review" : "pending"} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/grievances/${grv.id}`)}
                        >
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
