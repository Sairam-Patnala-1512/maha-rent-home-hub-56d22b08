import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  Home,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
} from "lucide-react";

export default function AdminPropertyDetail() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [language, setLanguage] = useState("en");

  // Mock property data based on ID
  const propertyData = {
    PROP001: {
      id: "PROP001",
      title: "2 BHK Andheri West",
      address: "Flat 302, Shanti Apartments, Andheri West, Mumbai - 400058",
      district: "Mumbai Suburban",
      status: "occupied",
      rent: 25000,
      deposit: 75000,
      propertyType: "Apartment",
      bhk: "2 BHK",
      area: "850 sq.ft",
      furnishing: "Semi-Furnished",
      landlord: {
        name: "Amit Patel",
        phone: "+91 98765 43210",
        email: "amit.patel@example.com",
        verified: true,
      },
      tenant: {
        name: "Rahul Sharma",
        phone: "+91 87654 32109",
        email: "rahul.sharma@example.com",
        moveInDate: "2024-06-15",
      },
      registrationDate: "2024-01-10",
      lastUpdated: "2024-11-20",
      agreementStatus: "Active",
      documents: ["Property Papers", "NOC", "Tax Receipt"],
    },
    PROP002: {
      id: "PROP002",
      title: "1 BHK Bandra East",
      address: "Room 15, Hill View Society, Bandra East, Mumbai - 400051",
      district: "Mumbai Suburban",
      status: "vacant",
      rent: 18000,
      deposit: 54000,
      propertyType: "Apartment",
      bhk: "1 BHK",
      area: "550 sq.ft",
      furnishing: "Unfurnished",
      landlord: {
        name: "Priya Desai",
        phone: "+91 99887 76655",
        email: "priya.desai@example.com",
        verified: true,
      },
      tenant: null,
      registrationDate: "2024-03-22",
      lastUpdated: "2024-10-15",
      agreementStatus: "None",
      documents: ["Property Papers", "Tax Receipt"],
    },
    PROP003: {
      id: "PROP003",
      title: "3 BHK Powai",
      address: "A-1201, Hiranandani Gardens, Powai, Mumbai - 400076",
      district: "Mumbai Suburban",
      status: "in-review",
      rent: 55000,
      deposit: 165000,
      propertyType: "Apartment",
      bhk: "3 BHK",
      area: "1400 sq.ft",
      furnishing: "Fully Furnished",
      landlord: {
        name: "Vikram Singh",
        phone: "+91 88776 65544",
        email: "vikram.singh@example.com",
        verified: false,
      },
      tenant: null,
      registrationDate: "2024-11-01",
      lastUpdated: "2024-11-28",
      agreementStatus: "Pending Review",
      documents: ["Property Papers"],
    },
  };

  const property = propertyData[propertyId] || {
    id: propertyId,
    title: "Property Details",
    address: "Address not available",
    district: "Unknown",
    status: "draft",
    rent: 0,
    deposit: 0,
    propertyType: "Unknown",
    bhk: "-",
    area: "-",
    furnishing: "-",
    landlord: {
      name: "Unknown",
      phone: "-",
      email: "-",
      verified: false,
    },
    tenant: null,
    registrationDate: "-",
    lastUpdated: "-",
    agreementStatus: "None",
    documents: [],
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
            onClick={() => navigate("/admin/inventory")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory
          </Button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {property.title}
                </h1>
                <StatusBadge status={property.status} />
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {property.address}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Property ID: <span className="font-mono">{property.id}</span>
              </p>
            </div>
            <div className="flex gap-2">
              {property.status === "in-review" && (
                <>
                  <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Property Type</p>
                    <p className="font-medium">{property.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Configuration</p>
                    <p className="font-medium">{property.bhk}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="font-medium">{property.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Furnishing</p>
                    <p className="font-medium">{property.furnishing}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">District</p>
                    <p className="font-medium">{property.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Date</p>
                    <p className="font-medium">{property.registrationDate}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      Monthly Rent
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{property.rent.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      Security Deposit
                    </p>
                    <p className="text-2xl font-bold">
                      ₹{property.deposit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Landlord Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{property.landlord.name}</p>
                  {property.landlord.verified ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-600 border-amber-300">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {property.landlord.phone}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {property.landlord.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tenant Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Tenant Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {property.tenant ? (
                  <div className="space-y-4">
                    <p className="font-medium">{property.tenant.name}</p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {property.tenant.phone}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {property.tenant.email}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Move-in: {property.tenant.moveInDate}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Home className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">No tenant assigned</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agreement Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Agreement Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant={property.agreementStatus === "Active" ? "default" : "outline"}
                      className={
                        property.agreementStatus === "Active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : ""
                      }
                    >
                      {property.agreementStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="text-sm">{property.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Uploaded Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {property.documents.length > 0 ? (
                  <div className="space-y-2">
                    {property.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                      >
                        <span className="text-sm flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {doc}
                        </span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No documents uploaded
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
