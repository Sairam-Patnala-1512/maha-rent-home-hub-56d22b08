import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Building2,
  MapPin,
  Shield,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Home,
  Banknote,
  AlertTriangle,
} from "lucide-react";

export default function UserDetail() {
  const { userId, userType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");

  // Mock user data based on type and ID
  const tenantData = {
    T001: {
      id: "T001",
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@email.com",
      status: "verified",
      properties: 1,
      joined: "Oct 15, 2024",
      address: "123, Green Park Colony, Pune - 411001",
      aadhaar: "XXXX-XXXX-4521",
      pan: "ABCDE1234F",
      occupation: "Software Engineer",
      monthlyIncome: "₹85,000",
      emergencyContact: "9876543211",
      verificationStatus: {
        ekyc: "verified",
        digilocker: "verified",
        policeVerification: "verified",
      },
      rentalHistory: [
        { property: "2BHK Flat, Koregaon Park", period: "Jan 2023 - Present", status: "active" },
      ],
      documents: [
        { name: "Aadhaar Card", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "Income Proof", status: "verified" },
        { name: "Photo ID", status: "verified" },
      ],
    },
    T002: {
      id: "T002",
      name: "Priya Desai",
      phone: "9123456789",
      email: "priya@email.com",
      status: "verified",
      properties: 0,
      joined: "Nov 20, 2024",
      address: "45, Shivaji Nagar, Mumbai - 400001",
      aadhaar: "XXXX-XXXX-7832",
      pan: "FGHIJ5678K",
      occupation: "Marketing Manager",
      monthlyIncome: "₹65,000",
      emergencyContact: "9123456790",
      verificationStatus: {
        ekyc: "verified",
        digilocker: "verified",
        policeVerification: "pending",
      },
      rentalHistory: [],
      documents: [
        { name: "Aadhaar Card", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "Income Proof", status: "pending" },
        { name: "Photo ID", status: "verified" },
      ],
    },
    T003: {
      id: "T003",
      name: "Vikram Singh",
      phone: "9112233445",
      email: "vikram@email.com",
      status: "pending",
      properties: 1,
      joined: "Dec 1, 2024",
      address: "78, MG Road, Nagpur - 440001",
      aadhaar: "XXXX-XXXX-1234",
      pan: "LMNOP9012Q",
      occupation: "Business Owner",
      monthlyIncome: "₹1,20,000",
      emergencyContact: "9112233446",
      verificationStatus: {
        ekyc: "pending",
        digilocker: "pending",
        policeVerification: "pending",
      },
      rentalHistory: [
        { property: "3BHK Villa, Civil Lines", period: "Dec 2024 - Present", status: "active" },
      ],
      documents: [
        { name: "Aadhaar Card", status: "pending" },
        { name: "PAN Card", status: "pending" },
        { name: "Income Proof", status: "pending" },
        { name: "Photo ID", status: "pending" },
      ],
    },
  };

  const landlordData = {
    L001: {
      id: "L001",
      name: "Amit Patel",
      phone: "9123456789",
      email: "amit@email.com",
      status: "verified",
      properties: 5,
      joined: "Jun 15, 2024",
      address: "567, Model Colony, Pune - 411016",
      aadhaar: "XXXX-XXXX-9876",
      pan: "RSTUV3456W",
      gstNumber: "27AABCU9603R1ZM",
      bankAccount: "XXXX-XXXX-1234",
      verificationStatus: {
        ekyc: "verified",
        digilocker: "verified",
        propertyVerification: "verified",
      },
      propertyList: [
        { id: "P001", title: "2BHK Flat, Koregaon Park", status: "occupied", rent: "₹25,000" },
        { id: "P002", title: "3BHK Apartment, Baner", status: "available", rent: "₹35,000" },
        { id: "P003", title: "1BHK Studio, Wakad", status: "occupied", rent: "₹15,000" },
        { id: "P004", title: "2BHK Flat, Hinjewadi", status: "available", rent: "₹22,000" },
        { id: "P005", title: "4BHK Villa, Kothrud", status: "occupied", rent: "₹55,000" },
      ],
      documents: [
        { name: "Property Documents", status: "verified" },
        { name: "Aadhaar Card", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "GST Certificate", status: "verified" },
      ],
    },
    L002: {
      id: "L002",
      name: "Sneha Kulkarni",
      phone: "9988776655",
      email: "sneha@email.com",
      status: "verified",
      properties: 3,
      joined: "Jul 20, 2024",
      address: "234, FC Road, Pune - 411004",
      aadhaar: "XXXX-XXXX-5432",
      pan: "XYZAB7890C",
      gstNumber: "27AABCU9604R1ZN",
      bankAccount: "XXXX-XXXX-5678",
      verificationStatus: {
        ekyc: "verified",
        digilocker: "verified",
        propertyVerification: "verified",
      },
      propertyList: [
        { id: "P006", title: "2BHK Flat, Viman Nagar", status: "occupied", rent: "₹28,000" },
        { id: "P007", title: "1BHK Flat, Kharadi", status: "available", rent: "₹18,000" },
        { id: "P008", title: "3BHK Penthouse, Magarpatta", status: "occupied", rent: "₹45,000" },
      ],
      documents: [
        { name: "Property Documents", status: "verified" },
        { name: "Aadhaar Card", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "GST Certificate", status: "pending" },
      ],
    },
    L003: {
      id: "L003",
      name: "Suresh Patil",
      phone: "9876543211",
      email: "suresh@email.com",
      status: "pending",
      properties: 2,
      joined: "Nov 1, 2024",
      address: "89, Law College Road, Pune - 411004",
      aadhaar: "XXXX-XXXX-8765",
      pan: "DEFGH4567I",
      gstNumber: "Pending",
      bankAccount: "XXXX-XXXX-9012",
      verificationStatus: {
        ekyc: "pending",
        digilocker: "pending",
        propertyVerification: "pending",
      },
      propertyList: [
        { id: "P009", title: "2BHK Flat, Aundh", status: "in-review", rent: "₹24,000" },
        { id: "P010", title: "1BHK Flat, Pashan", status: "in-review", rent: "₹16,000" },
      ],
      documents: [
        { name: "Property Documents", status: "pending" },
        { name: "Aadhaar Card", status: "pending" },
        { name: "PAN Card", status: "verified" },
        { name: "GST Certificate", status: "pending" },
      ],
    },
  };

  const userData = userType === "tenant" ? tenantData[userId] : landlordData[userId];

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <GovHeader
          userName="Admin Officer"
          userRole="admin"
          onLanguageChange={setLanguage}
          currentLanguage={language}
        />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">User Not Found</h1>
            <Button onClick={() => navigate("/admin/users")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to User Directory
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getVerificationIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleVerifyUser = () => {
    toast({
      title: "User Verified",
      description: `${userData.name} has been verified successfully.`,
    });
  };

  const handleSuspendUser = () => {
    toast({
      title: "User Suspended",
      description: `${userData.name} has been suspended.`,
      variant: "destructive",
    });
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
            onClick={() => navigate("/admin/users")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to User Directory
          </Button>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {userData.name}
                  </h1>
                  <StatusBadge status={userData.status} />
                </div>
                <p className="text-muted-foreground">
                  {userType === "tenant" ? "Tenant" : "Landlord"} • {userData.id}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {userData.status === "pending" && (
                <Button variant="default" onClick={handleVerifyUser}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Verify User
                </Button>
              )}
              <Button variant="destructive" onClick={handleSuspendUser}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">+91 {userData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{userData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="font-medium">{userData.joined}</p>
                    </div>
                  </div>
                  {userType === "tenant" && (
                    <>
                      <div className="flex items-center gap-3">
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Income</p>
                          <p className="font-medium">{userData.monthlyIncome}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Occupation</p>
                          <p className="font-medium">{userData.occupation}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Identity Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Identity Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                    <p className="font-medium font-mono">{userData.aadhaar}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">PAN Number</p>
                    <p className="font-medium font-mono">{userData.pan}</p>
                  </div>
                  {userType === "landlord" && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">GST Number</p>
                        <p className="font-medium font-mono">{userData.gstNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bank Account</p>
                        <p className="font-medium font-mono">{userData.bankAccount}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Properties / Rental History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {userType === "tenant" ? "Rental History" : "Properties Owned"}
                  </CardTitle>
                  <CardDescription>
                    {userType === "tenant"
                      ? `${userData.rentalHistory?.length || 0} rental record(s)`
                      : `${userData.propertyList?.length || 0} property(ies) listed`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userType === "tenant" ? (
                    userData.rentalHistory?.length > 0 ? (
                      <div className="space-y-3">
                        {userData.rentalHistory.map((rental, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Home className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{rental.property}</p>
                                <p className="text-sm text-muted-foreground">{rental.period}</p>
                              </div>
                            </div>
                            <StatusBadge status={rental.status} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No rental history</p>
                    )
                  ) : (
                    <div className="space-y-3">
                      {userData.propertyList?.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => navigate(`/admin/properties/${property.id}`)}
                        >
                          <div className="flex items-center gap-3">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{property.title}</p>
                              <p className="text-sm text-muted-foreground">{property.rent}/month</p>
                            </div>
                          </div>
                          <StatusBadge status={property.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Verification & Documents */}
            <div className="space-y-6">
              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(userData.verificationStatus).map(([key, status]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="capitalize text-sm">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <div className="flex items-center gap-2">
                        {getVerificationIcon(status)}
                        <span
                          className={`text-sm capitalize ${
                            status === "verified"
                              ? "text-green-600"
                              : status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Uploaded Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Uploaded Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <span className="text-sm font-medium">{doc.name}</span>
                      <div className="flex items-center gap-2">
                        {getVerificationIcon(doc.status)}
                        <Badge
                          variant={doc.status === "verified" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Properties</span>
                    <span className="font-bold text-lg">{userData.properties}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="font-medium">{userData.joined}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account Status</span>
                    <StatusBadge status={userData.status} />
                  </div>
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
