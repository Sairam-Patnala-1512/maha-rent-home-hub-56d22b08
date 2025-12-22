import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  PenLine,
  CheckCircle2,
  Download,
  Home,
  Calendar,
  User,
  Loader2,
  Eye,
  Shield,
} from "lucide-react";

const SIGN_STEPS = [
  { id: 1, title: "Review", icon: Eye },
  { id: 2, title: "E-Sign", icon: PenLine },
  { id: 3, title: "Confirm", icon: CheckCircle2 },
];

const mockAgreement = {
  id: "AGR001",
  property: {
    title: "1 BHK in Bandra East",
    address: "Near Bandra Station, Bandra East, Mumbai - 400051",
    type: "1 BHK Apartment",
    area: "450 sq.ft",
  },
  landlord: {
    name: "Mrs. Sunita Desai",
    phone: "XXXXXX7890",
  },
  terms: {
    rent: 18000,
    deposit: 54000,
    duration: "12 months",
    startDate: "Jan 1, 2025",
    endDate: "Dec 31, 2025",
    noticePeriod: "2 months",
    maintenanceCharges: 1500,
  },
  status: "pending-signature",
};

export default function AgreementSign() {
  const navigate = useNavigate();
  const { agreementId } = useParams();
  const [language, setLanguage] = useState("en");
  const [currentStep, setCurrentStep] = useState(1);
  
  // Review state
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // E-Sign state
  const [signConsent, setSignConsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleSign = () => {
    setSigning(true);
    setTimeout(() => {
      setSigning(false);
      setSigned(true);
      setCurrentStep(3);
    }, 2000);
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const getProgressPercent = () => {
    return ((currentStep - 1) / (SIGN_STEPS.length - 1)) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Agreement Details
              </CardTitle>
              <CardDescription>
                Review the agreement terms before signing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Info */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mockAgreement.property.title}</h3>
                    <p className="text-sm text-muted-foreground">{mockAgreement.property.address}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>{mockAgreement.property.type}</span>
                      <span>•</span>
                      <span>{mockAgreement.property.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Landlord Info */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Landlord Details</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name</span>
                    <p className="font-medium">{mockAgreement.landlord.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone</span>
                    <p className="font-medium">{mockAgreement.landlord.phone}</p>
                  </div>
                </div>
              </div>

              {/* Key Terms */}
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Agreement Terms</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <p className="font-semibold text-primary">₹{mockAgreement.terms.rent.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Security Deposit</span>
                    <p className="font-medium">₹{mockAgreement.terms.deposit.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration</span>
                    <p className="font-medium">{mockAgreement.terms.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Notice Period</span>
                    <p className="font-medium">{mockAgreement.terms.noticePeriod}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Start Date</span>
                    <p className="font-medium">{mockAgreement.terms.startDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">End Date</span>
                    <p className="font-medium">{mockAgreement.terms.endDate}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Maintenance Charges</span>
                    <p className="font-medium">₹{mockAgreement.terms.maintenanceCharges.toLocaleString()}/month</p>
                  </div>
                </div>
              </div>

              {/* Download Preview */}
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Agreement Preview (PDF)
              </Button>

              {/* Accept Terms */}
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I have read and agree to all the terms and conditions mentioned in this rental agreement. 
                  I understand that this is a legally binding document.
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate("/tenant/agreements")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className="flex-1" 
                  disabled={!termsAccepted}
                  onClick={() => setCurrentStep(2)}
                >
                  Proceed to Sign
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenLine className="h-5 w-5 text-primary" />
                Digital Signature
              </CardTitle>
              <CardDescription>
                Sign the agreement using Aadhaar-based e-Sign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Secure e-Sign Process</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your signature will be verified using Aadhaar OTP authentication. 
                      This creates a legally valid digital signature.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <p className="text-sm font-medium mb-2">Signing As</p>
                  <p className="font-semibold">Rahul Sharma</p>
                  <p className="text-sm text-muted-foreground">Aadhaar: XXXX XXXX 4532</p>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="signConsent" 
                    checked={signConsent}
                    onCheckedChange={setSignConsent}
                  />
                  <label htmlFor="signConsent" className="text-sm text-muted-foreground leading-relaxed">
                    I authorize MHADA to use my Aadhaar for e-Sign verification. 
                    I confirm that I am signing this document voluntarily.
                  </label>
                </div>

                {signConsent && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm font-medium mb-3">OTP Verification</p>
                      {!otpSent ? (
                        <Button onClick={handleSendOtp} className="w-full">
                          Send OTP to XXXXXX7890
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-success">OTP sent to your registered mobile</p>
                          <Input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            className="text-center text-lg tracking-widest"
                          />
                          <Button variant="ghost" size="sm" className="w-full">
                            Resend OTP
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className="flex-1" 
                  disabled={!signConsent || !otpSent || otp.length < 6 || signing}
                  onClick={handleSign}
                >
                  {signing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing Agreement...
                    </>
                  ) : (
                    <>
                      <PenLine className="h-4 w-4 mr-2" />
                      Sign Agreement
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <CardTitle className="text-xl">Agreement Signed Successfully!</CardTitle>
              <CardDescription>
                Your rental agreement has been digitally signed and registered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-success/5 border border-success/20 text-center">
                <Badge variant="success" className="text-base px-4 py-1 mb-2">
                  Signed & Registered
                </Badge>
                <p className="font-mono text-sm text-muted-foreground">
                  Registration No: MH/MUM/2024/789012
                </p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Agreement ID</span>
                    <span className="font-mono">{mockAgreement.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium">{mockAgreement.property.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validity</span>
                    <span className="font-medium">{mockAgreement.terms.startDate} - {mockAgreement.terms.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signed On</span>
                    <span className="font-medium">Dec 20, 2024</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Signed Agreement
              </Button>

              <Button className="w-full" onClick={() => navigate("/tenant/dashboard")}>
                Return to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
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
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/agreements")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agreements
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Sign Agreement
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and digitally sign your rental agreement
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <Progress value={getProgressPercent()} className="h-2 mb-4" />
            <div className="flex justify-between">
              {SIGN_STEPS.map((step) => {
                const status = getStepStatus(step.id);
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      status === "current" ? "text-primary" : 
                      status === "completed" ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                        status === "current" ? "bg-primary text-primary-foreground" :
                        status === "completed" ? "bg-success text-white" : "bg-muted"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
