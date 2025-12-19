import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  IndianRupee,
  Building2,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
} from "lucide-react";

export default function ApplicationDetail() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");

  // Mock application data
  const application = {
    id: applicationId || "APP001",
    tenantName: "Priya Desai",
    tenantPhone: "9876543210",
    tenantEmail: "priya.desai@email.com",
    tenantAddress: "201, Sunrise Apartments, Malad West, Mumbai - 400064",
    property: "2 BHK Apartment in Andheri West",
    propertyId: "1",
    propertyAddress: "403, Harmony Heights, Andheri West, Mumbai",
    rent: 25000,
    appliedDate: "Dec 12, 2024",
    status: "pending",
    verificationStatus: "verified",
    occupation: "IT Professional",
    company: "TechCorp India Pvt Ltd",
    monthlyIncome: 75000,
    familyMembers: 3,
    moveInDate: "Jan 1, 2025",
    leaseDuration: "11 months",
    message: "Looking for a peaceful residential property for my family. We are a small family of 3 - myself, my husband, and our 5-year-old daughter. We are non-smokers and don't have any pets.",
    documents: [
      { name: "Aadhaar Card", status: "verified" },
      { name: "PAN Card", status: "verified" },
      { name: "Salary Slips (3 months)", status: "verified" },
      { name: "Employment Letter", status: "pending" },
    ],
  };

  const handleApprove = () => {
    toast({
      title: "Application Approved",
      description: "Rental agreement generation has been initiated.",
    });
    navigate("/landlord/applications");
  };

  const handleReject = () => {
    toast({
      title: "Application Rejected",
      description: "The tenant has been notified.",
      variant: "destructive",
    });
    navigate("/landlord/applications");
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
            onClick={() => navigate("/landlord/applications")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Application #{application.id}
                </h1>
                <StatusBadge status={application.status} />
              </div>
              <p className="text-muted-foreground mt-1">
                Applied on {application.appliedDate}
              </p>
            </div>
            {application.status === "pending" && (
              <div className="flex gap-2">
                <Button variant="success" onClick={handleApprove}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve Application
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Tenant Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Tenant Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-primary">
                        {application.tenantName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{application.tenantName}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {application.verificationStatus === "verified" && (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <Shield className="h-3 w-3" />
                            KYC Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-medium">+91 {application.tenantPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{application.tenantEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Occupation</p>
                        <p className="font-medium">{application.occupation}</p>
                        <p className="text-xs text-muted-foreground">{application.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Monthly Income</p>
                        <p className="font-medium">₹{application.monthlyIncome.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-xs text-muted-foreground">Current Address</p>
                        <p className="font-medium">{application.tenantAddress}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rental Request */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Rental Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-1">{application.property}</h4>
                    <p className="text-sm text-muted-foreground">{application.propertyAddress}</p>
                    <p className="text-lg font-semibold text-primary mt-2">
                      ₹{application.rent.toLocaleString()}/month
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Move-in Date</p>
                      <p className="font-medium">{application.moveInDate}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Lease Duration</p>
                      <p className="font-medium">{application.leaseDuration}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Family Members</p>
                      <p className="font-medium">{application.familyMembers} persons</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-2">Message from Tenant</p>
                    <p className="text-sm text-muted-foreground">{application.message}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Document Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {application.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <span className="text-sm">{doc.name}</span>
                      {doc.status === "verified" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="govOutline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Tenant
                  </Button>
                  <Button variant="govOutline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="govOutline" className="w-full justify-start">
                    <Building2 className="h-4 w-4 mr-2" />
                    View Property
                  </Button>
                </CardContent>
              </Card>

              {application.status === "approved" && (
                <Card variant="success">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-success mb-3" />
                    <h3 className="font-semibold mb-2">Application Approved</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Rental agreement is being generated. Both parties will receive the document for e-signing.
                    </p>
                    <Button variant="success" size="sm" className="w-full">
                      View Agreement
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
