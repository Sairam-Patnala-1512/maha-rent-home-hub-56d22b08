import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Home,
  Users,
  Car,
  Wifi,
  Shield,
  Droplets,
  Zap,
  Image,
  FileText,
  CheckCircle2,
} from "lucide-react";

const mockProperties = {
  "1": {
    id: "1",
    title: "2 BHK Apartment in Andheri West",
    address: "403, Harmony Heights, Near Western Express Highway, Andheri West, Mumbai - 400058",
    status: "live",
    rent: 25000,
    deposit: 75000,
    bedrooms: 2,
    bathrooms: 2,
    area: 850,
    floor: 4,
    totalFloors: 12,
    furnishing: "Semi-Furnished",
    propertyType: "Apartment",
    availabilityDate: "Jan 1, 2025",
    listedDate: "Dec 1, 2024",
    description: "Spacious 2 BHK apartment with excellent ventilation and natural light. Located in a well-maintained society with 24/7 security. Close to metro station and shopping complexes.",
    amenities: ["Parking", "Lift", "Power Backup", "Security", "Water Supply 24x7", "CCTV"],
    suitableFor: ["Family", "Working Professionals"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    tenantName: null,
    applications: 3,
  },
  "2": {
    id: "2",
    title: "1 BHK Apartment in Bandra East",
    address: "12, Sea View Apartments, Near Bandra Station, Bandra East, Mumbai - 400051",
    status: "occupied",
    rent: 18000,
    deposit: 54000,
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    floor: 2,
    totalFloors: 6,
    furnishing: "Furnished",
    propertyType: "Apartment",
    availabilityDate: "N/A",
    listedDate: "Oct 15, 2024",
    description: "Cozy 1 BHK apartment with sea view. Fully furnished with modern amenities. Walking distance from Bandra station.",
    amenities: ["Parking", "Lift", "Security", "Water Supply 24x7"],
    suitableFor: ["Working Professionals", "Students"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    tenantName: "Rahul Sharma",
    applications: 0,
  },
};

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [language, setLanguage] = useState("en");

  const property = mockProperties[propertyId] || mockProperties["1"];

  const amenityIcons = {
    Parking: Car,
    Lift: Building2,
    "Power Backup": Zap,
    Security: Shield,
    "Water Supply 24x7": Droplets,
    CCTV: Shield,
    Wifi: Wifi,
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
            onClick={() => navigate("/landlord/properties")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Properties
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {property.title}
                </h1>
                <StatusBadge status={property.status} />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.address}</span>
              </div>
            </div>
            <Button onClick={() => navigate(`/landlord/properties/${propertyId}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Property Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Property ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-semibold">{property.propertyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms} BHK</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Built-up Area</p>
                      <p className="font-semibold">{property.area} sq.ft</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Floor</p>
                      <p className="font-semibold">{property.floor} of {property.totalFloors}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Furnishing</p>
                      <p className="font-semibold">{property.furnishing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Listed On</p>
                      <p className="font-semibold">{property.listedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available From</p>
                      <p className="font-semibold">{property.availabilityDate}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{property.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {property.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || CheckCircle2;
                      return (
                        <Badge key={amenity} variant="secondary" className="py-2 px-3 text-sm gap-2">
                          <Icon className="h-4 w-4" />
                          {amenity}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Suitable For */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Suitable For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {property.suitableFor.map((category) => (
                      <Badge key={category} variant="outline" className="py-1.5 px-3">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rent Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    Rent Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{property.rent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold">₹{property.deposit.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Listing Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Listing Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={property.status} />
                  </div>
                  {property.applications > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Applications</span>
                      <Badge variant="info">{property.applications} pending</Badge>
                    </div>
                  )}
                  {property.tenantName && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Tenant</span>
                      <span className="font-medium">{property.tenantName}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="govOutline"
                    className="w-full justify-start"
                    onClick={() => navigate(`/landlord/properties/${propertyId}/edit`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Property
                  </Button>
                  {property.applications > 0 && (
                    <Button
                      variant="govOutline"
                      className="w-full justify-start"
                      onClick={() => navigate("/landlord/applications")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Applications
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}