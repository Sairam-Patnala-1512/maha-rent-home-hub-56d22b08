import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Download,
  Share2,
  Home,
  FileText,
  Calendar,
  IndianRupee,
  Shield,
  Printer,
  ExternalLink,
  Copy,
  PartyPopper,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AgreementConfirmation() {
  const navigate = useNavigate();
  const { agreementId } = useParams();
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const { toast } = useToast();

  // Mock agreement data
  const agreement = {
    id: agreementId || "AGR001",
    registrationNo: "MH/MUM/2024/RNT/00012345",
    signedDate: "Dec 19, 2024",
    validFrom: "Jan 1, 2025",
    validTo: "Dec 31, 2025",
    property: {
      title: "Spacious 2 BHK with Balcony",
      address: "Flat No. 502, Building A, Green Valley Society, Andheri West, Mumbai - 400053",
    },
    tenant: {
      name: "Rahul Sharma",
    },
    landlord: {
      name: "Rajesh Patel",
    },
    terms: {
      rent: 25000,
      deposit: 75000,
      duration: 12,
    },
  };

  const copyRegistrationNo = () => {
    navigator.clipboard.writeText(agreement.registrationNo);
    toast({
      title: "Copied!",
      description: "Registration number copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <PartyPopper className="h-6 w-6 text-accent" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Agreement Registered Successfully!
              </h1>
              <PartyPopper className="h-6 w-6 text-accent" />
            </div>
            <p className="text-muted-foreground">
              Your rental agreement has been digitally signed and registered.
            </p>
          </div>

          {/* Registration Details */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-success/5 border border-success/20">
                <div>
                  <p className="text-sm text-muted-foreground">Registration Number</p>
                  <p className="font-mono font-bold text-lg">{agreement.registrationNo}</p>
                </div>
                <Button variant="outline" size="sm" onClick={copyRegistrationNo}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Signed On</p>
                  <p className="font-semibold">{agreement.signedDate}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Agreement ID</p>
                  <p className="font-mono font-semibold">{agreement.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Agreement Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property</p>
                  <p className="font-medium">{agreement.property.title}</p>
                  <p className="text-sm text-muted-foreground">{agreement.property.address}</p>
                </div>
              </div>

              {/* Parties */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tenant</p>
                    <p className="font-medium">{agreement.tenant.name}</p>
                    <Badge variant="success" className="mt-1 text-[10px]">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Digitally Signed
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Landlord</p>
                    <p className="font-medium">{agreement.landlord.name}</p>
                    <Badge variant="success" className="mt-1 text-[10px]">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Digitally Signed
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Duration & Financials */}
              <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold">{agreement.terms.duration} months</p>
                  <p className="text-xs text-muted-foreground">
                    {agreement.validFrom} - {agreement.validTo}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <IndianRupee className="h-4 w-4" />
                    <span className="text-sm">Monthly Rent</span>
                  </div>
                  <p className="font-semibold text-primary">₹{agreement.terms.rent.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Deposit</span>
                  </div>
                  <p className="font-semibold">₹{agreement.terms.deposit.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Download Your Agreement</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button variant="default" size="lg" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Agreement
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Verify Online
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card variant="info">
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
              <CardDescription>Complete these steps to move into your new home</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Pay Security Deposit</p>
                    <p className="text-sm text-muted-foreground">
                      Transfer ₹{agreement.terms.deposit.toLocaleString()} to the landlord's account
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Coordinate Move-in Date</p>
                    <p className="text-sm text-muted-foreground">
                      Contact the landlord to arrange key handover
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Update Address</p>
                    <p className="text-sm text-muted-foreground">
                      Update your address in Aadhaar and other official documents
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="default" onClick={() => navigate("/tenant/dashboard")}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/tenant/agreements")}>
              View All Agreements
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
