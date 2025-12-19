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
  Building2,
  Download,
  Filter,
} from "lucide-react";

export default function InventoryList() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");

  const properties = [
    { id: "PROP001", title: "2 BHK Andheri West", district: "Mumbai Suburban", landlord: "Amit Patel", status: "occupied", rent: 25000, tenant: "Rahul Sharma" },
    { id: "PROP002", title: "1 BHK Bandra East", district: "Mumbai Suburban", landlord: "Priya Desai", status: "vacant", rent: 18000, tenant: null },
    { id: "PROP003", title: "3 BHK Powai", district: "Mumbai Suburban", landlord: "Vikram Singh", status: "in-review", rent: 55000, tenant: null },
    { id: "PROP004", title: "1 RK Thane West", district: "Thane", landlord: "Sneha Kulkarni", status: "occupied", rent: 8000, tenant: "Anita Sharma" },
    { id: "PROP005", title: "2 BHK Dadar East", district: "Mumbai City", landlord: "Rahul Mehta", status: "vacant", rent: 22000, tenant: null },
    { id: "PROP006", title: "1 BHK Pune Camp", district: "Pune", landlord: "Suresh Patil", status: "occupied", rent: 15000, tenant: "Kiran Joshi" },
    { id: "PROP007", title: "2 BHK Nagpur", district: "Nagpur", landlord: "Meena Deshmukh", status: "draft", rent: 12000, tenant: null },
    { id: "PROP008", title: "Studio Malad", district: "Mumbai Suburban", landlord: "Ajay Kumar", status: "occupied", rent: 10000, tenant: "Pooja Singh" },
  ];

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.landlord.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesDistrict = districtFilter === "all" || p.district === districtFilter;
    return matchesSearch && matchesStatus && matchesDistrict;
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
                Property Inventory
              </h1>
              <p className="text-muted-foreground mt-1">
                Complete list of registered properties
              </p>
            </div>
            <Button variant="govOutline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, title, or landlord..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={districtFilter} onValueChange={setDistrictFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="Mumbai City">Mumbai City</SelectItem>
                    <SelectItem value="Mumbai Suburban">Mumbai Suburban</SelectItem>
                    <SelectItem value="Thane">Thane</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Nagpur">Nagpur</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="in-review">Under Review</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
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
                    <TableHead>Property ID</TableHead>
                    <TableHead>Property Title</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Rent (₹)</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-mono text-sm">{property.id}</TableCell>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>{property.district}</TableCell>
                      <TableCell>{property.landlord}</TableCell>
                      <TableCell>₹{property.rent.toLocaleString()}</TableCell>
                      <TableCell>{property.tenant || "-"}</TableCell>
                      <TableCell>
                        <StatusBadge status={property.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/properties/${property.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No properties found</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Showing {filteredProperties.length} of {properties.length} properties</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
