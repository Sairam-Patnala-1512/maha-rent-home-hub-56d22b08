import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  FileCheck,
  UserCheck,
  Loader2,
  AlertCircle,
  Download,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Overview", icon: User },
  { id: 2, title: "eKYC", icon: ShieldCheck },
  { id: 3, title: "DigiLocker", icon: FileCheck },
  { id: 4, title: "Police Verification", icon: UserCheck },
  { id: 5, title: "Complete", icon: CheckCircle2 },
];

export default function ProfileVerification() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step states
  const [verificationStatus, setVerificationStatus] = useState({
    profile: "completed",
    ekyc: "pending",
    digilocker: "pending",
    police: "pending",
  });
  
  // eKYC state
  const [ekycConsent, setEkycConsent] = useState(false);
  const [ekycVerifying, setEkycVerifying] = useState(false);
  
  // DigiLocker state
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [digilockerVerifying, setDigilockerVerifying] = useState(false);
  
  // Police verification state
  const [policeSubmitted, setPoliceSubmitted] = useState(false);

  const availableDocuments = [
    { id: "aadhaar", name: "Aadhaar Card", issuer: "UIDAI" },
    { id: "pan", name: "PAN Card", issuer: "Income Tax Department" },
    { id: "driving", name: "Driving License", issuer: "RTO Maharashtra" },
  ];

  const handleEkycVerify = () => {
    setEkycVerifying(true);
    setTimeout(() => {
      setEkycVerifying(false);
      setVerificationStatus((prev) => ({ ...prev, ekyc: "completed" }));
      setCurrentStep(3);
    }, 2000);
  };

  const handleDigilockerFetch = () => {
    setDigilockerVerifying(true);
    setTimeout(() => {
      setDigilockerVerifying(false);
      setVerificationStatus((prev) => ({ ...prev, digilocker: "completed" }));
      setCurrentStep(4);
    }, 2000);
  };

  const handlePoliceSubmit = () => {
    setPoliceSubmitted(true);
    setVerificationStatus((prev) => ({ ...prev, police: "submitted" }));
    setTimeout(() => {
      setVerificationStatus((prev) => ({ ...prev, police: "completed" }));
      setCurrentStep(5);
    }, 1500);
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const getProgressPercent = () => {
    return ((currentStep - 1) / (STEPS.length - 1)) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Verification Overview</CardTitle>
              <CardDescription>
                Complete all verification steps to get verified and increase your approval chances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Profile Details */}
                <div className="flex items-center justify-between p-4 rounded-lg border bg-success/5 border-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Profile Details</p>
                      <p className="text-sm text-muted-foreground">Basic information completed</p>
                    </div>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>

                {/* eKYC */}
                <div className={`flex items-center justify-between p-4 rounded-lg border ${
                  verificationStatus.ekyc === "completed" 
                    ? "bg-success/5 border-success/20" 
                    : "bg-warning/5 border-warning/20"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      verificationStatus.ekyc === "completed" ? "bg-success/10" : "bg-warning/10"
                    }`}>
                      <ShieldCheck className={`h-5 w-5 ${
                        verificationStatus.ekyc === "completed" ? "text-success" : "text-warning"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">eKYC Verification</p>
                      <p className="text-sm text-muted-foreground">Aadhaar-based identity verification</p>
                    </div>
                  </div>
                  <Badge variant={verificationStatus.ekyc === "completed" ? "success" : "warning"}>
                    {verificationStatus.ekyc === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>

                {/* DigiLocker */}
                <div className={`flex items-center justify-between p-4 rounded-lg border ${
                  verificationStatus.digilocker === "completed" 
                    ? "bg-success/5 border-success/20" 
                    : "bg-muted/50"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      verificationStatus.digilocker === "completed" ? "bg-success/10" : "bg-muted"
                    }`}>
                      <FileCheck className={`h-5 w-5 ${
                        verificationStatus.digilocker === "completed" ? "text-success" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">DigiLocker Documents</p>
                      <p className="text-sm text-muted-foreground">Fetch documents from DigiLocker</p>
                    </div>
                  </div>
                  <Badge variant={verificationStatus.digilocker === "completed" ? "success" : "secondary"}>
                    {verificationStatus.digilocker === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>

                {/* Police Verification */}
                <div className={`flex items-center justify-between p-4 rounded-lg border ${
                  verificationStatus.police === "completed" 
                    ? "bg-success/5 border-success/20" 
                    : "bg-muted/50"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      verificationStatus.police === "completed" ? "bg-success/10" : "bg-muted"
                    }`}>
                      <UserCheck className={`h-5 w-5 ${
                        verificationStatus.police === "completed" ? "text-success" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">Police Verification</p>
                      <p className="text-sm text-muted-foreground">Background verification request</p>
                    </div>
                  </div>
                  <Badge variant={verificationStatus.police === "completed" ? "success" : "secondary"}>
                    {verificationStatus.police === "completed" ? "Completed" : 
                     verificationStatus.police === "submitted" ? "Submitted" : "Pending"}
                  </Badge>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={() => setCurrentStep(2)}>
                Start Verification
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                eKYC Verification
              </CardTitle>
              <CardDescription>
                Verify your identity using Aadhaar-based eKYC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus.ekyc === "completed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">eKYC Verified Successfully</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your identity has been verified using Aadhaar eKYC
                  </p>
                  <Button onClick={() => setCurrentStep(3)}>
                    Continue to DigiLocker
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Aadhaar-based Verification</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          This process will verify your identity using UIDAI's Aadhaar database. 
                          An OTP will be sent to your registered mobile number.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm font-medium mb-2">Aadhaar Number</p>
                      <p className="font-mono text-lg">XXXX XXXX 4532</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Linked to mobile: XXXXXX7890
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consent" 
                        checked={ekycConsent}
                        onCheckedChange={setEkycConsent}
                      />
                      <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                        I hereby give my consent to MHADA to verify my identity using Aadhaar eKYC. 
                        I understand that my Aadhaar details will be used solely for verification purposes.
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      disabled={!ekycConsent || ekycVerifying}
                      onClick={handleEkycVerify}
                    >
                      {ekycVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify with OTP
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                DigiLocker Document Fetch
              </CardTitle>
              <CardDescription>
                Fetch your documents securely from DigiLocker
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus.digilocker === "completed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Documents Fetched Successfully</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your documents have been retrieved from DigiLocker
                  </p>
                  <Button onClick={() => setCurrentStep(4)}>
                    Continue to Police Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <p className="text-sm font-medium mb-1">DigiLocker Account</p>
                    <p className="text-muted-foreground text-sm">Connected as: rahul.sharma@digilocker</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Available Documents</p>
                    {availableDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedDocuments.includes(doc.id)
                            ? "bg-primary/5 border-primary/30"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => {
                          setSelectedDocuments((prev) =>
                            prev.includes(doc.id)
                              ? prev.filter((id) => id !== doc.id)
                              : [...prev, doc.id]
                          );
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={selectedDocuments.includes(doc.id)} />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Issued by: {doc.issuer}</p>
                          </div>
                        </div>
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      disabled={selectedDocuments.length === 0 || digilockerVerifying}
                      onClick={handleDigilockerFetch}
                    >
                      {digilockerVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Fetching Documents...
                        </>
                      ) : (
                        <>
                          Fetch Selected Documents
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Police Verification
              </CardTitle>
              <CardDescription>
                Submit request for background verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus.police === "completed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Verification Approved</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your police verification has been approved
                  </p>
                  <Button onClick={() => setCurrentStep(5)}>
                    Complete Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : policeSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="h-8 w-8 text-warning animate-spin" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Verification In Progress</h3>
                  <p className="text-muted-foreground text-sm">
                    Your verification request has been submitted and is being processed...
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">About Police Verification</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          This verification confirms your background check through local police authorities.
                          The request will be processed within 3-5 working days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm font-medium mb-3">Verification Details</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span className="font-medium">Rahul Sharma</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address</span>
                          <span className="font-medium">Andheri West, Mumbai</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Station</span>
                          <span className="font-medium">Andheri Police Station</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handlePoliceSubmit}>
                      Submit Verification Request
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <CardTitle className="text-xl">Profile Verified!</CardTitle>
              <CardDescription>
                Congratulations! Your profile has been fully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Profile Details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>eKYC Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>DigiLocker Linked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Police Verification</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border text-center">
                <Badge variant="success" className="text-base px-4 py-1">
                  Verified Citizen
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Your applications will now have higher priority
                </p>
              </div>

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
            <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/dashboard")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Profile Verification
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete verification to unlock full features
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <Progress value={getProgressPercent()} className="h-2 mb-4" />
            <div className="flex justify-between">
              {STEPS.map((step) => {
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        status === "current" ? "bg-primary text-primary-foreground" :
                        status === "completed" ? "bg-success text-white" : "bg-muted"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="text-xs hidden sm:block">{step.title}</span>
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
