import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Users, Building2, Shield, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "tenant";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    aadhaar: "",
    address: "",
    district: "",
    pincode: "",
    category: "",
    consent: false,
  });

  const roleConfig = {
    tenant: {
      title: "Tenant Registration",
      icon: Users,
      description: "Register to search and apply for verified rental properties",
    },
    landlord: {
      title: "Landlord Registration",
      icon: Building2,
      description: "Register to list and manage your rental properties",
    },
    admin: {
      title: "Admin Registration",
      icon: Shield,
      description: "Government official registration (requires verification)",
    },
  };

  const config = roleConfig[role];

  const handleNext = () => {
    if (step === 1 && !formData.fullName) {
      toast({ title: "Required Field", description: "Please enter your full name", variant: "destructive" });
      return;
    }
    if (step === 1 && formData.phone.length !== 10) {
      toast({ title: "Required Field", description: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!formData.consent) {
      toast({ title: "Consent Required", description: "Please accept the terms and conditions", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: "Registration Successful",
      description: "Your account has been created. Please verify your phone number.",
    });
    navigate(`/login?role=${role}`);
  };

  const districts = [
    "Mumbai City", "Mumbai Suburban", "Thane", "Pune", "Nagpur",
    "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Ratnagiri",
  ];

  const categories = [
    { value: "general", label: "General" },
    { value: "ews", label: "EWS (Economically Weaker Section)" },
    { value: "student", label: "Student" },
    { value: "migrant", label: "Migrant Worker" },
    { value: "senior", label: "Senior Citizen" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <GovHeader showAuth={false} />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      s <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-20 h-1 mx-2 transition-colors ${
                        s < step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-muted-foreground">
              <span>Personal Info</span>
              <span>Address</span>
              <span>Verification</span>
            </div>
          </div>

          <Card variant="elevated">
            <div className="h-1.5 bg-gradient-to-r from-primary to-info" />
            
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <config.icon className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl">{config.title}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Role Selection */}
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {["tenant", "landlord"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      role === r
                        ? "bg-card shadow text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r === "tenant" ? "Tenant" : "Landlord"}
                  </button>
                ))}
              </div>

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per Aadhaar) *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        +91
                      </span>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit mobile"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                          })
                        }
                        className="pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {role === "tenant" && (
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="address">Current Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter your current address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) => setFormData({ ...formData, district: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d} value={d.toLowerCase()}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        placeholder="Enter PIN code"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                          })
                        }
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                    <Input
                      id="aadhaar"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.aadhaar}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12),
                        })
                      }
                      className="tracking-wider"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-info-light border border-info/20">
                    <p className="text-sm text-info">
                      Your Aadhaar will be verified through UIDAI. After registration, you will need to complete:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        eKYC Verification
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        DigiLocker Document Linking
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Police Verification (for tenants)
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consent: checked })
                      }
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-tight">
                      I agree to the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      . I consent to Aadhaar-based verification.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <Button variant="govOutline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}

                {step < 3 ? (
                  <Button className="flex-1" onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="flex-1"
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.consent}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href={`/login?role=${role}`} className="text-primary hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}