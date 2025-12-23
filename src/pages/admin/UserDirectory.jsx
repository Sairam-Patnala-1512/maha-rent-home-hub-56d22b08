import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Users,
  Building2,
  Download,
  Shield,
} from "lucide-react";

export default function UserDirectory() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  const tenants = [
    { id: "T001", name: "Rahul Sharma", phone: "9876543210", email: "rahul@email.com", status: "verified", properties: 1, joined: "Oct 15, 2024" },
    { id: "T002", name: "Priya Desai", phone: "9123456789", email: "priya@email.com", status: "verified", properties: 0, joined: "Nov 20, 2024" },
    { id: "T003", name: "Vikram Singh", phone: "9112233445", email: "vikram@email.com", status: "pending", properties: 1, joined: "Dec 1, 2024" },
    { id: "T004", name: "Anita Sharma", phone: "9556677889", email: "anita@email.com", status: "verified", properties: 1, joined: "Sep 5, 2024" },
    { id: "T005", name: "Kiran Joshi", phone: "9998877665", email: "kiran@email.com", status: "verified", properties: 1, joined: "Aug 12, 2024" },
  ];

  const landlords = [
    { id: "L001", name: "Amit Patel", phone: "9123456789", email: "amit@email.com", status: "verified", properties: 5, joined: "Jun 15, 2024" },
    { id: "L002", name: "Sneha Kulkarni", phone: "9988776655", email: "sneha@email.com", status: "verified", properties: 3, joined: "Jul 20, 2024" },
    { id: "L003", name: "Suresh Patil", phone: "9876543211", email: "suresh@email.com", status: "pending", properties: 2, joined: "Nov 1, 2024" },
    { id: "L004", name: "Meena Deshmukh", phone: "9112233446", email: "meena@email.com", status: "verified", properties: 4, joined: "May 10, 2024" },
  ];

  const filterUsers = (users) => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    );
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
                User Directory
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage tenants and landlords registered on the platform
              </p>
            </div>
            <Button variant="govOutline">
              <Download className="h-4 w-4 mr-2" />
              Export Directory
            </Button>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="tenants">
            <TabsList>
              <TabsTrigger value="tenants" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Tenants ({tenants.length})
              </TabsTrigger>
              <TabsTrigger value="landlords" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Landlords ({landlords.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tenants" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Properties</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterUsers(tenants).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-sm">{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>+91 {user.phone}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.properties}</TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <StatusBadge status={user.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/admin/users/tenant/${user.id}`)}
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
            </TabsContent>

            <TabsContent value="landlords" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Properties</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterUsers(landlords).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-sm">{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>+91 {user.phone}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.properties}</TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <StatusBadge status={user.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/admin/users/landlord/${user.id}`)}
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
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
