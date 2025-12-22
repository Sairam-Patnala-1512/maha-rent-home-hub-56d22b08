import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  RefreshCw,
  XCircle,
  Info,
  Shield,
  Lock,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Profile Details", icon: User },
  { id: 2, title: "Aadhaar eKYC", icon: ShieldCheck },
  { id: 3, title: "DigiLocker", icon: FileCheck },
  { id: 4, title: "Police Verification", icon: UserCheck },
  { id: 5, title: "Summary", icon: CheckCircle2 },
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
  
  // Profile validation state
  const [profileValidation, setProfileValidation] = useState({
    nameMatch: true,
    dobMatch: true,
    mobileVerified: true,
  });
  
  // eKYC state
  const [ekycConsent, setEkycConsent] = useState(false);
  const [ekycVerifying, setEkycVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [ekycError, setEkycError] = useState(false);
  
  // DigiLocker state
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [digilockerVerifying, setDigilockerVerifying] = useState(false);
  const [documentError, setDocumentError] = useState(null);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  
  // Police verification state
  const [policeSubmitted, setPoliceSubmitted] = useState(false);
  const [policeStatus, setPoliceStatus] = useState("not_submitted");
  const [policeConsent, setPoliceConsent] = useState(false);

  const availableDocuments = [
    { id: "aadhaar_xml", name: "Aadhaar XML / e-Aadhaar", issuer: "UIDAI", type: "Identity" },
    { id: "address_proof", name: "Address Proof", issuer: "Various Issuers", type: "Address" },
    { id: "pan", name: "PAN Card", issuer: "Income Tax Department", type: "Identity" },
  ];

  const handleSendOtp = () => {
    setOtpSent(true);
    setEkycError(false);
  };

  const handleEkycVerify = () => {
    if (otpValue.length !== 6) {
      setEkycError(true);
      return;
    }
    setEkycVerifying(true);
    setEkycError(false);
    setTimeout(() => {
      setEkycVerifying(false);
      setVerificationStatus((prev) => ({ ...prev, ekyc: "completed" }));
      setCurrentStep(3);
    }, 2000);
  };

  const handleRetryEkyc = () => {
    setEkycError(false);
    setOtpSent(false);
    setOtpValue("");
  };

  const handleDigilockerFetch = () => {
    setDigilockerVerifying(true);
    setDocumentError(null);
    setTimeout(() => {
      setDigilockerVerifying(false);
      setFetchedDocuments(selectedDocuments.map(id => ({
        id,
        ...availableDocuments.find(d => d.id === id),
        status: "verified",
        issuerVerified: true,
        documentValid: true,
      })));
      setVerificationStatus((prev) => ({ ...prev, digilocker: "completed" }));
      setCurrentStep(4);
    }, 2000);
  };

  const handleRefetchDocument = (docId) => {
    setDocumentError(null);
    setDigilockerVerifying(true);
    setTimeout(() => {
      setDigilockerVerifying(false);
    }, 1500);
  };

  const handlePoliceSubmit = () => {
    setPoliceSubmitted(true);
    setPoliceStatus("submitted");
    setVerificationStatus((prev) => ({ ...prev, police: "submitted" }));
    
    // Simulate status progression
    setTimeout(() => {
      setPoliceStatus("under_review");
    }, 1000);
    
    setTimeout(() => {
      setPoliceStatus("cleared");
      setVerificationStatus((prev) => ({ ...prev, police: "completed" }));
      setCurrentStep(5);
    }, 2500);
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
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Details Validation
              </CardTitle>
              <CardDescription>
                Review and validate your personal details before proceeding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Summary */}
              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-sm font-medium mb-3">Personal Information (Read-Only)</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Full Name</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Rahul Sharma</span>
                      {profileValidation.nameMatch ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Date of Birth</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">15/08/1990</span>
                      {profileValidation.dobMatch ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Mobile Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">+91 98XXXX7890</span>
                      {profileValidation.mobileVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">rahul.sharma@email.com</span>
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Validation Checks</p>
                <div className={`flex items-center justify-between p-3 rounded-lg border ${
                  profileValidation.nameMatch ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
                }`}>
                  <div className="flex items-center gap-2">
                    {profileValidation.nameMatch ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm">Name Match</span>
                  </div>
                  <Badge variant={profileValidation.nameMatch ? "success" : "destructive"}>
                    {profileValidation.nameMatch ? "Verified" : "Requires Correction"}
                  </Badge>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg border ${
                  profileValidation.dobMatch ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
                }`}>
                  <div className="flex items-center gap-2">
                    {profileValidation.dobMatch ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm">DOB Match</span>
                  </div>
                  <Badge variant={profileValidation.dobMatch ? "success" : "destructive"}>
                    {profileValidation.dobMatch ? "Verified" : "Requires Correction"}
                  </Badge>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg border ${
                  profileValidation.mobileVerified ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
                }`}>
                  <div className="flex items-center gap-2">
                    {profileValidation.mobileVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm">Mobile Number Verified</span>
                  </div>
                  <Badge variant={profileValidation.mobileVerified ? "success" : "destructive"}>
                    {profileValidation.mobileVerified ? "Verified" : "Requires Correction"}
                  </Badge>
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                onClick={() => setCurrentStep(2)}
                disabled={!profileValidation.nameMatch || !profileValidation.dobMatch || !profileValidation.mobileVerified}
              >
                Proceed to Identity Verification
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
                Aadhaar-based eKYC
              </CardTitle>
              <CardDescription>
                UIDAI-compliant identity verification via OTP authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus.ekyc === "completed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Authentication Successful</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your identity has been verified through UIDAI Aadhaar eKYC
                  </p>
                  <Button onClick={() => setCurrentStep(3)}>
                    Continue to DigiLocker
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : ekycError && !ekycVerifying ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Authentication Failed</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    OTP verification failed. Please try again.
                  </p>
                  <Button onClick={handleRetryEkyc}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry Authentication
                  </Button>
                </div>
              ) : (
                <>
                  {/* UIDAI Consent Declaration */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">UIDAI Consent Declaration</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          I voluntarily provide my Aadhaar number and authorize MHADA to verify my identity 
                          through UIDAI's Authentication system. I understand that my Aadhaar details will 
                          be used solely for the purpose of tenant verification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purpose of Data Usage */}
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm font-medium mb-2">Purpose of Data Usage</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Identity verification for rental application</li>
                      <li>• KYC compliance under government regulations</li>
                      <li>• Secure document validation for housing allocation</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm font-medium mb-2">Aadhaar Number (Masked)</p>
                      <p className="font-mono text-lg">XXXX XXXX 4532</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Linked mobile: XXXXXX7890
                      </p>
                    </div>

                    {/* Authentication Method */}
                    <div className="p-4 rounded-lg border bg-info/5 border-info/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-info" />
                        <p className="text-sm font-medium">OTP-based eKYC Authentication</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        A 6-digit OTP will be sent to your Aadhaar-registered mobile number for verification.
                      </p>
                    </div>

                    {otpSent && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <p className="text-sm font-medium text-success">OTP Sent Successfully</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Please enter the 6-digit OTP sent to XXXXXX7890
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input
                            id="otp"
                            placeholder="Enter 6-digit OTP"
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            maxLength={6}
                            className="font-mono text-center text-lg tracking-widest"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consent" 
                        checked={ekycConsent}
                        onCheckedChange={setEkycConsent}
                      />
                      <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                        I hereby provide my voluntary consent to MHADA to access and verify my Aadhaar details 
                        through UIDAI for the purpose of identity verification. I confirm that the information 
                        provided is true and accurate.
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    {!otpSent ? (
                      <Button 
                        className="flex-1" 
                        disabled={!ekycConsent}
                        onClick={handleSendOtp}
                      >
                        Send OTP
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1" 
                        disabled={otpValue.length !== 6 || ekycVerifying}
                        onClick={handleEkycVerify}
                      >
                        {ekycVerifying ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Authenticating...
                          </>
                        ) : (
                          <>
                            Verify OTP
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
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
                DigiLocker Document Verification
              </CardTitle>
              <CardDescription>
                Fetch and verify documents via Government of India DigiLocker
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus.digilocker === "completed" ? (
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Documents Verified Successfully</h3>
                    <p className="text-muted-foreground text-sm">
                      Your documents have been fetched and validated from DigiLocker
                    </p>
                  </div>

                  {/* Verified Documents */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Document Validation Status</p>
                    {fetchedDocuments.map((doc) => (
                      <div key={doc.id} className="p-3 rounded-lg border bg-success/5 border-success/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Issued by: {doc.issuer}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-success text-xs">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Issuer Verified</span>
                            </div>
                            <div className="flex items-center gap-1 text-success text-xs">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Document Valid</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" onClick={() => setCurrentStep(4)}>
                    Continue to Police Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">DigiLocker Account Connected</p>
                    </div>
                    <p className="text-muted-foreground text-sm">rahul.sharma@digilocker.gov.in</p>
                  </div>

                  {documentError && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-destructive">Document Not Found</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {documentError} could not be fetched from DigiLocker.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleRefetchDocument(documentError)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Re-fetch Document
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Select Documents to Fetch (GoI Standard)</p>
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
                            <p className="text-xs text-muted-foreground">
                              Issued by: {doc.issuer} • Type: {doc.type}
                            </p>
                          </div>
                        </div>
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-info mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        Documents are fetched securely from DigiLocker and validated against issuer records. 
                        This is a consent-based verification process.
                      </p>
                    </div>
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
                          Fetching & Validating...
                        </>
                      ) : (
                        <>
                          Fetch & Verify Documents
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
                Tenant background verification through state police database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus.police === "completed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Verification Cleared</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your background verification has been completed successfully
                  </p>
                  <Button onClick={() => setCurrentStep(5)}>
                    View Verification Summary
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : policeSubmitted ? (
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="h-8 w-8 text-warning animate-spin" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Verification In Progress</h3>
                    <p className="text-muted-foreground text-sm">
                      Your verification request is being processed
                    </p>
                  </div>

                  {/* Status Timeline */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Verification Status Timeline</p>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-3 p-3 rounded-lg border ${
                        policeStatus === "submitted" || policeStatus === "under_review" || policeStatus === "cleared" 
                          ? "bg-success/5 border-success/20" : "bg-muted/30"
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          policeStatus === "submitted" || policeStatus === "under_review" || policeStatus === "cleared"
                            ? "bg-success text-white" : "bg-muted"
                        }`}>
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Submitted</p>
                          <p className="text-xs text-muted-foreground">Request sent to local police station</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-3 p-3 rounded-lg border ${
                        policeStatus === "under_review" || policeStatus === "cleared" 
                          ? "bg-success/5 border-success/20" 
                          : policeStatus === "submitted" ? "bg-warning/5 border-warning/20" : "bg-muted/30"
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          policeStatus === "under_review" || policeStatus === "cleared"
                            ? "bg-success text-white" 
                            : policeStatus === "submitted" ? "bg-warning text-white" : "bg-muted"
                        }`}>
                          {policeStatus === "submitted" ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Under Review</p>
                          <p className="text-xs text-muted-foreground">Background check in progress</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-3 p-3 rounded-lg border ${
                        policeStatus === "cleared" 
                          ? "bg-success/5 border-success/20" 
                          : policeStatus === "under_review" ? "bg-warning/5 border-warning/20" : "bg-muted/30"
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          policeStatus === "cleared"
                            ? "bg-success text-white" 
                            : policeStatus === "under_review" ? "bg-warning text-white" : "bg-muted"
                        }`}>
                          {policeStatus === "under_review" ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : policeStatus === "cleared" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cleared / Rejected</p>
                          <p className="text-xs text-muted-foreground">Final verification outcome</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-info" />
                      <p className="text-xs text-muted-foreground">
                        Expected processing time: 3-5 working days
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Information Screen */}
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">About Tenant Police Verification</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          As per government regulations, all tenants must undergo police verification 
                          before occupying rental premises. This verification is conducted through 
                          state police database integration.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Data Overview (Read-Only) */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <p className="text-sm font-medium mb-3">Data Being Submitted (Read-Only)</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Full Name</span>
                          <span className="font-medium">Rahul Sharma</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Father's Name</span>
                          <span className="font-medium">Suresh Kumar Sharma</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date of Birth</span>
                          <span className="font-medium">15/08/1990</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Address</span>
                          <span className="font-medium">Andheri West, Mumbai - 400053</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Permanent Address</span>
                          <span className="font-medium">Pune, Maharashtra - 411001</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Police Station</span>
                          <span className="font-medium">Andheri Police Station</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="police-consent" 
                        checked={policeConsent}
                        onCheckedChange={setPoliceConsent}
                      />
                      <label htmlFor="police-consent" className="text-sm text-muted-foreground leading-relaxed">
                        I authorize MHADA to submit my details to the local police station for 
                        background verification. I confirm that all information provided is accurate.
                      </label>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Expected processing time: 3-5 working days
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handlePoliceSubmit}
                      disabled={!policeConsent}
                    >
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
              <CardTitle className="text-xl">Profile Fully Verified</CardTitle>
              <CardDescription>
                Congratulations! Your verification is complete
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Consolidated Verification Summary */}
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <p className="text-sm font-medium mb-3">Verification Summary</p>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Profile Details</span>
                    </div>
                    <Badge variant="success" className="text-xs">Validated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Aadhaar eKYC</span>
                    </div>
                    <Badge variant="success" className="text-xs">Authenticated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>DigiLocker Documents</span>
                    </div>
                    <Badge variant="success" className="text-xs">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Police Verification</span>
                    </div>
                    <Badge variant="success" className="text-xs">Cleared</Badge>
                  </div>
                </div>
              </div>

              {/* Overall Status */}
              <div className="p-4 rounded-lg border text-center">
                <Badge variant="success" className="text-base px-4 py-1.5 mb-3">
                  <Shield className="h-4 w-4 mr-1" />
                  Fully Verified Citizen
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Verified on: {new Date().toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Verification Authority: Government of India Digital Services
                </p>
              </div>

              {/* Disclaimers */}
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-muted/30 border">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Verification powered by Government of India digital infrastructure
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border">
                  <div className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      This is a secure, consent-based verification process
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Data usage governed by applicable IT & privacy laws
                    </p>
                  </div>
                </div>
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
              Government-compliant identity verification process
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
