import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Upload,
  Building2,
  MapPin,
  AlertCircle,
  RefreshCw,
  Lock,
  Smartphone,
  Home,
} from "lucide-react";

export default function LandlordVerification() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [currentStep, setCurrentStep] = useState(0);
  const [aadhaarConsent, setAadhaarConsent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [digilockerConnected, setDigilockerConnected] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const [ownershipDocUploaded, setOwnershipDocUploaded] = useState(false);
  const [ownershipVerified, setOwnershipVerified] = useState(false);

  const steps = [
    { id: 0, title: "Overview", icon: FileText },
    { id: 1, title: "Identity (eKYC)", icon: Shield },
    { id: 2, title: "Address", icon: MapPin },
    { id: 3, title: "Ownership", icon: Building2 },
    { id: 4, title: "Summary", icon: CheckCircle2 },
  ];

  const getStepStatus = (stepId) => {
    if (stepId === 1 && aadhaarVerified) return "completed";
    if (stepId === 2 && addressVerified) return "completed";
    if (stepId === 3 && ownershipVerified) return "completed";
    if (stepId === 4 && aadhaarVerified && addressVerified && ownershipVerified) return "completed";
    if (stepId === currentStep) return "current";
    if (stepId < currentStep) return "completed";
    return "pending";
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setAadhaarVerified(true);
    }
  };

  const handleConnectDigilocker = () => {
    setTimeout(() => {
      setDigilockerConnected(true);
      setAddressVerified(true);
    }, 1500);
  };

  const handleUploadOwnership = () => {
    setOwnershipDocUploaded(true);
    setTimeout(() => {
      setOwnershipVerified(true);
    }, 2000);
  };

  const progress = ((currentStep) / (steps.length - 1)) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Verification Overview
              </CardTitle>
              <CardDescription>
                Complete verification is mandatory to list properties on MHADA portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong>Why verification?</strong> MHADA requires landlord verification to ensure 
                  property legitimacy and protect tenant interests under Maharashtra Rent Control regulations.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Required Verification Steps:</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Identity Verification (Aadhaar eKYC)</h5>
                        <span className="text-xs text-warning flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        UIDAI-compliant OTP-based verification
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Address Verification (DigiLocker)</h5>
                        <span className="text-xs text-warning flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fetch address proof from DigiLocker
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Property Ownership Verification</h5>
                        <span className="text-xs text-warning flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload ownership documents for government verification
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Verification is consent-based and secure. Data usage governed by applicable IT & privacy laws.
                </p>
              </div>

              <Button onClick={() => setCurrentStep(1)} className="w-full">
                Start Verification
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Identity Verification (Aadhaar eKYC)
              </CardTitle>
              <CardDescription>
                UIDAI-compliant OTP-based authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!aadhaarVerified ? (
                <>
                  {!otpSent ? (
                    <>
                      <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">UIDAI Consent Declaration</h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          I hereby provide my voluntary consent to MHADA to:
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                          <li>Use my Aadhaar number for authentication</li>
                          <li>Fetch my demographic details from UIDAI</li>
                          <li>Use this data for landlord verification purposes</li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Aadhaar Number</Label>
                          <Input 
                            placeholder="XXXX XXXX XXXX" 
                            maxLength={14}
                            className="font-mono"
                          />
                          <p className="text-xs text-muted-foreground">
                            Your Aadhaar number is encrypted and never stored
                          </p>
                        </div>

                        <div className="flex items-start gap-2">
                          <Checkbox 
                            id="aadhaar-consent"
                            checked={aadhaarConsent}
                            onCheckedChange={setAadhaarConsent}
                          />
                          <Label htmlFor="aadhaar-consent" className="text-sm leading-relaxed">
                            I agree to the terms and provide consent for Aadhaar-based verification 
                            as per UIDAI guidelines
                          </Label>
                        </div>
                      </div>

                      <Button 
                        onClick={handleSendOtp} 
                        disabled={!aadhaarConsent}
                        className="w-full"
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Send OTP to Registered Mobile
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm font-medium">OTP sent to +91 91XXX XXX89</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Enter 6-digit OTP</Label>
                          <Input 
                            placeholder="Enter OTP" 
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="font-mono text-center text-lg tracking-widest"
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Didn't receive OTP?</span>
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Resend OTP
                          </Button>
                        </div>
                      </div>

                      <Button 
                        onClick={handleVerifyOtp} 
                        disabled={otp.length !== 6}
                        className="w-full"
                      >
                        Verify OTP
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                    <h4 className="font-semibold text-lg mb-1">Identity Verified</h4>
                    <p className="text-sm text-muted-foreground">
                      Aadhaar eKYC authentication successful
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name</span>
                        <p className="font-medium">Amit Patel</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Aadhaar</span>
                        <p className="font-medium font-mono">XXXX XXXX 5678</p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => setCurrentStep(2)} className="w-full">
                    Continue to Address Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              )}

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Authentication powered by UIDAI. No biometric data is collected.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Address Verification (DigiLocker)
              </CardTitle>
              <CardDescription>
                Fetch verified address proof from DigiLocker
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!addressVerified ? (
                <>
                  <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <p className="text-sm">
                      DigiLocker is a Government of India initiative to provide secure access 
                      to issued documents in digital format.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium mb-3">Documents to be fetched:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Address Proof (Aadhaar / Utility Bill)
                      </li>
                    </ul>
                  </div>

                  {!digilockerConnected ? (
                    <Button onClick={handleConnectDigilocker} className="w-full">
                      <img 
                        src="https://www.digilocker.gov.in/assets/img/digilocker-logo.png" 
                        alt="DigiLocker" 
                        className="h-5 w-5 mr-2"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      Connect DigiLocker
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 p-4">
                      <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Fetching documents...</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                    <h4 className="font-semibold text-lg mb-1">Address Verified</h4>
                    <p className="text-sm text-muted-foreground">
                      Document fetched from DigiLocker
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Address Proof</span>
                      <span className="text-xs text-success flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Issuer Verified
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-start gap-2">
                        <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-muted-foreground">
                          403, Harmony Heights, Andheri West, Mumbai - 400058, Maharashtra
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => setCurrentStep(3)} className="w-full">
                    Continue to Ownership Verification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              )}

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Documents fetched securely via Government of India DigiLocker.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Property Ownership Verification
              </CardTitle>
              <CardDescription>
                Upload ownership documents for government cross-verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!ownershipVerified ? (
                <>
                  <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <p className="text-sm">
                      Property ownership documents are verified against State Revenue & Registration 
                      Department records to ensure legitimacy.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ownership Declaration</Label>
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          I hereby declare that I am the legal owner / authorized representative 
                          of the property I intend to list on MHADA Rental Portal, and the 
                          documents provided are genuine and valid.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Proof of Ownership</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Acceptable documents: Property Tax Receipt, Sale Deed, Index II, 7/12 Extract
                      </p>
                      
                      {!ownershipDocUploaded ? (
                        <div 
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={handleUploadOwnership}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">Click to upload document</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-lg border bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-primary" />
                              <div>
                                <p className="font-medium text-sm">property_tax_receipt.pdf</p>
                                <p className="text-xs text-muted-foreground">2.3 MB</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin text-warning" />
                              <span className="text-xs text-warning">Verifying...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Government Cross-Check</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Documents will be verified against State Revenue Department records. 
                          This process may take 24-48 hours for manual verification cases.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                    <h4 className="font-semibold text-lg mb-1">Ownership Verified</h4>
                    <p className="text-sm text-muted-foreground">
                      Document verified against government records
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Property Tax Receipt</span>
                      <span className="text-xs text-success flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Property ID: MH/MUM/AND/2024/00456</p>
                      <p>Verified against: BMC Property Records</p>
                    </div>
                  </div>

                  <Button onClick={() => setCurrentStep(4)} className="w-full">
                    View Verification Summary
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              )}

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Verification required before property listing approval.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Verification Complete
              </CardTitle>
              <CardDescription>
                All verification steps completed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h4 className="font-semibold text-xl mb-2">You're Fully Verified!</h4>
                <p className="text-sm text-muted-foreground">
                  You can now list properties on MHADA Rental Portal
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Verification Summary</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-success" />
                      <span className="font-medium">Identity Verification</span>
                    </div>
                    <span className="text-success flex items-center gap-1 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-success" />
                      <span className="font-medium">Address Verification</span>
                    </div>
                    <span className="text-success flex items-center gap-1 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-success" />
                      <span className="font-medium">Property Ownership</span>
                    </div>
                    <span className="text-success flex items-center gap-1 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Verification Authority</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Verified through Government of India & State Housing Systems
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Verification ID: MHADA/LND/2024/VRF-78456
                </p>
                <p className="text-xs text-muted-foreground">
                  Timestamp: {new Date().toLocaleString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Verification powered by Government of India digital infrastructure. 
                  Data usage governed by applicable IT & privacy laws.
                </p>
              </div>

              <Button onClick={() => navigate("/landlord/dashboard")} className="w-full">
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
        userName="Amit Patel"
        userRole="landlord"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/landlord/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Complete Verification
            </h1>
            <p className="text-muted-foreground">
              Verify your identity and property ownership to list on MHADA portal
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium">
                {steps[currentStep].title}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => index <= currentStep && setCurrentStep(index)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
                        status === 'completed'
                          ? 'bg-success text-success-foreground'
                          : status === 'current'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          {renderStepContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
