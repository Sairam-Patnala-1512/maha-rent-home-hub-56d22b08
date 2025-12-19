import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
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
  Eye,
  FileText,
  Download,
  Calendar,
} from "lucide-react";

export default function AgreementRepository() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const agreements = [
    { id: "AGR001", tenant: "Rahul Sharma", landlord: "Amit Patel", property: "1 BHK Bandra East", startDate: "Oct 15, 2024", endDate: "Sep 14, 2025", rent: 18000, status: "active" },
    { id: "AGR002", tenant: "Anita Sharma", landlord: "Sneha Kulkarni", property: "1 RK Thane", startDate: "Sep 1, 2024", endDate: "Aug 31, 2025", rent: 8000, status: "active" },
    { id: "AGR003", tenant: "Kiran Joshi", landlord: "Suresh Patil", property: "2 BHK Pune", startDate: "Aug 1, 2024", endDate: "Jul 31, 2025", rent: 15000, status: "active" },
    { id: "AGR004", tenant: "Pooja Singh", landlord: "Ajay Kumar", property: "Studio Malad", startDate: "Jul 1, 2024", endDate: "Jun 30, 2025", rent: 10000, status: "active" },
    { id: "AGR005", tenant: "Sunil Rao", landlord: "Vikram Singh", property: "3 BHK Powai", startDate: "Dec 1, 2024", endDate: "Nov 30, 2025", rent: 55000, status: "pending" },
    { id: "AGR006", tenant: "Neha Gupta", landlord: "Meena Deshmukh", property: "2 BHK Nagpur", startDate: "Jan 1, 2024", endDate: "Dec 31, 2024", rent: 12000, status: "expired" },
  ];

  const filteredAgreements = agreements.filter((agr) => {
    const matchesSearch = agr.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agr.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || agr.status === statusFilter;
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
                Agreement Repository
              </h1>
              <p className="text-muted-foreground mt-1">
                Central repository of all rental agreements
              </p>
            </div>
            <Button variant="govOutline">
              <Download className="h-4 w-4 mr-2" />
              Export Agreements
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by agreement ID, tenant, or property..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Signature</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
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
                    <TableHead>Agreement ID</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Rent (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgreements.map((agr) => (
                    <TableRow key={agr.id}>
                      <TableCell className="font-mono text-sm">{agr.id}</TableCell>
                      <TableCell className="font-medium">{agr.tenant}</TableCell>
                      <TableCell>{agr.landlord}</TableCell>
                      <TableCell>{agr.property}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{agr.startDate}</p>
                          <p className="text-muted-foreground">to {agr.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>₹{agr.rent.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={agr.status === "active" ? "approved" : agr.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredAgreements.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No agreements found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
