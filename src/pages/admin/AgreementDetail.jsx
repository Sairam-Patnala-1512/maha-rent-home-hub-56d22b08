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
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";

export default function AgreementDetail() {
  const navigate = useNavigate();
  const { agreementId } = useParams();
  const [language, setLanguage] = useState("en");

  // Mock agreement data
  const agreementData = {
    AGR001: {
      id: "AGR001",
      status: "active",
      createdDate: "Oct 15, 2024",
      startDate: "Oct 15, 2024",
      endDate: "Sep 14, 2025",
      rent: 18000,
      deposit: 54000,
      stampDuty: 500,
      registrationFee: 1000,
      property: {
        title: "1 BHK Bandra East",
        address: "Room 15, Hill View Society, Bandra East, Mumbai - 400051",
        type: "Apartment",
        bhk: "1 BHK",
        area: "550 sq.ft",
      },
      tenant: {
        name: "Rahul Sharma",
        phone: "+91 87654 32109",
        email: "rahul.sharma@example.com",
        aadhaar: "XXXX-XXXX-4567",
      },
      landlord: {
        name: "Amit Patel",
        phone: "+91 98765 43210",
        email: "amit.patel@example.com",
        pan: "ABCDE1234F",
      },
      witnesses: [
        { name: "Suresh Kumar", phone: "+91 99887 76655" },
        { name: "Meena Patil", phone: "+91 88776 65544" },
      ],
      signatures: {
        tenant: { signed: true, date: "Oct 15, 2024" },
        landlord: { signed: true, date: "Oct 14, 2024" },
      },
    },
    AGR002: {
      id: "AGR002",
      status: "active",
      createdDate: "Sep 1, 2024",
      startDate: "Sep 1, 2024",
      endDate: "Aug 31, 2025",
      rent: 8000,
      deposit: 24000,
      stampDuty: 300,
      registrationFee: 500,
      property: {
        title: "1 RK Thane",
        address: "Flat 102, Green View, Thane West - 400601",
        type: "Apartment",
        bhk: "1 RK",
        area: "350 sq.ft",
      },
      tenant: {
        name: "Anita Sharma",
        phone: "+91 77665 54433",
        email: "anita.sharma@example.com",
        aadhaar: "XXXX-XXXX-7890",
      },
      landlord: {
        name: "Sneha Kulkarni",
        phone: "+91 99887 76655",
        email: "sneha.kulkarni@example.com",
        pan: "FGHIJ5678K",
      },
      witnesses: [
        { name: "Ramesh Iyer", phone: "+91 88997 76655" },
        { name: "Priya Nair", phone: "+91 77886 65544" },
      ],
      signatures: {
        tenant: { signed: true, date: "Sep 1, 2024" },
        landlord: { signed: true, date: "Aug 31, 2024" },
      },
    },
  };

  const agreement = agreementData[agreementId] || {
    id: agreementId,
    status: "unknown",
    createdDate: "-",
    startDate: "-",
    endDate: "-",
    rent: 0,
    deposit: 0,
    stampDuty: 0,
    registrationFee: 0,
    property: { title: "Not Found", address: "-", type: "-", bhk: "-", area: "-" },
    tenant: { name: "-", phone: "-", email: "-", aadhaar: "-" },
    landlord: { name: "-", phone: "-", email: "-", pan: "-" },
    witnesses: [],
    signatures: { tenant: { signed: false }, landlord: { signed: false } },
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
            onClick={() => navigate("/admin/agreements")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agreements
          </Button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Agreement {agreement.id}
                </h1>
                <Badge className={
                  agreement.status === "active" ? "bg-success/10 text-success border-success/20" :
                  agreement.status === "pending" ? "bg-warning/10 text-warning border-warning/20" :
                  "bg-destructive/10 text-destructive border-destructive/20"
                }>
                  {agreement.status === "active" ? <CheckCircle className="h-3 w-3 mr-1" /> :
                   <Clock className="h-3 w-3 mr-1" />}
                  {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Created on {agreement.createdDate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="govOutline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{agreement.property.title}</h3>
                      <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {agreement.property.address}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{agreement.property.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Configuration</p>
                        <p className="font-medium">{agreement.property.bhk}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Area</p>
                        <p className="font-medium">{agreement.property.area}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    Financial Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Monthly Rent</p>
                      <p className="text-xl font-bold text-primary">₹{agreement.rent.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Security Deposit</p>
                      <p className="text-xl font-bold">₹{agreement.deposit.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Stamp Duty</p>
                      <p className="text-xl font-bold">₹{agreement.stampDuty.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Registration Fee</p>
                      <p className="text-xl font-bold">₹{agreement.registrationFee.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Parties */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tenant */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <User className="h-5 w-5 text-info" />
                      Tenant Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-semibold">{agreement.tenant.name}</p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {agreement.tenant.phone}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {agreement.tenant.email}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        Aadhaar: {agreement.tenant.aadhaar}
                      </p>
                    </div>
                    <div className="pt-3 border-t">
                      {agreement.signatures.tenant.signed ? (
                        <div className="flex items-center gap-2 text-success text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Signed on {agreement.signatures.tenant.date}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-warning text-sm">
                          <Clock className="h-4 w-4" />
                          Pending Signature
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Landlord */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <User className="h-5 w-5 text-primary" />
                      Landlord Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-semibold">{agreement.landlord.name}</p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {agreement.landlord.phone}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {agreement.landlord.email}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        PAN: {agreement.landlord.pan}
                      </p>
                    </div>
                    <div className="pt-3 border-t">
                      {agreement.signatures.landlord.signed ? (
                        <div className="flex items-center gap-2 text-success text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Signed on {agreement.signatures.landlord.date}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-warning text-sm">
                          <Clock className="h-4 w-4" />
                          Pending Signature
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Witnesses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Witnesses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {agreement.witnesses.map((witness, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <p className="font-medium">{witness.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Phone className="h-3 w-3" />
                          {witness.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agreement Period */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Agreement Period
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{agreement.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">{agreement.endDate}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">11 Months</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Agreement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>

              {/* PoC Disclaimer */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">PoC Disclaimer</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This is a demonstration environment. Agreement data shown is for illustration purposes only.
                      </p>
                    </div>
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