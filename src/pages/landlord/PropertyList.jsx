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
  Building2,
  Plus,
  Search,
  Eye,
  Edit,
  MoreVertical,
  MapPin,
  Users,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PropertyList() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  const properties = [
    {
      id: "1",
      title: "2 BHK Apartment in Andheri West",
      address: "403, Harmony Heights, Andheri West, Mumbai",
      status: "live",
      rent: 25000,
      deposit: 75000,
      applications: 3,
      tenantName: null,
      bedrooms: 2,
      area: 850,
      listedDate: "Dec 1, 2024",
    },
    {
      id: "2",
      title: "1 BHK Apartment in Bandra East",
      address: "12, Sea View Apartments, Bandra East, Mumbai",
      status: "occupied",
      rent: 18000,
      deposit: 54000,
      applications: 0,
      tenantName: "Rahul Sharma",
      bedrooms: 1,
      area: 550,
      listedDate: "Oct 15, 2024",
    },
    {
      id: "3",
      title: "3 BHK Penthouse in Powai",
      address: "2001, Lake View Tower, Powai, Mumbai",
      status: "draft",
      rent: 55000,
      deposit: 165000,
      applications: 0,
      tenantName: null,
      bedrooms: 3,
      area: 1450,
      listedDate: "Dec 10, 2024",
    },
    {
      id: "4",
      title: "1 RK Studio in Thane",
      address: "101, Green Valley, Thane West",
      status: "in-review",
      rent: 8000,
      deposit: 24000,
      applications: 1,
      tenantName: null,
      bedrooms: 1,
      area: 350,
      listedDate: "Dec 8, 2024",
    },
    {
      id: "5",
      title: "2 BHK Flat in Dadar",
      address: "504, Shivaji Nagar, Dadar East, Mumbai",
      status: "occupied",
      rent: 22000,
      deposit: 66000,
      applications: 0,
      tenantName: "Priya Desai",
      bedrooms: 2,
      area: 750,
      listedDate: "Aug 20, 2024",
    },
  ];

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredByStatus = (status) => {
    if (status === "all") return filteredProperties;
    return filteredProperties.filter((p) => p.status === status);
  };

  const PropertyCard = ({ property }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{property.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{property.address}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/landlord/properties/${property.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/landlord/properties/${property.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Rent</p>
            <p className="font-semibold">₹{property.rent.toLocaleString()}/mo</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-semibold">{property.area} sq.ft</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Bedrooms</p>
            <p className="font-semibold">{property.bedrooms} BHK</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <StatusBadge status={property.status} />
            {property.applications > 0 && (
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                {property.applications} applications
              </span>
            )}
          </div>
          {property.tenantName && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{property.tenantName}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

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
                My Properties
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage all your listed properties
              </p>
            </div>
            <Button onClick={() => navigate("/landlord/properties/add")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({filteredProperties.length})</TabsTrigger>
              <TabsTrigger value="live">Live ({getFilteredByStatus("live").length})</TabsTrigger>
              <TabsTrigger value="occupied">Occupied ({getFilteredByStatus("occupied").length})</TabsTrigger>
              <TabsTrigger value="draft">Draft ({getFilteredByStatus("draft").length})</TabsTrigger>
              <TabsTrigger value="in-review">Under Review ({getFilteredByStatus("in-review").length})</TabsTrigger>
            </TabsList>

            {["all", "live", "occupied", "draft", "in-review"].map((status) => (
              <TabsContent key={status} value={status} className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {getFilteredByStatus(status).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                {getFilteredByStatus(status).length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No properties found</p>
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
