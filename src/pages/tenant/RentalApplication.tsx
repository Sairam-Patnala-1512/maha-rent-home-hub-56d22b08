import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  User,
  Briefcase,
  FileText,
  Home,
  Shield,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Employment", icon: Briefcase },
  { id: 3, name: "Documents", icon: FileText },
  { id: 4, name: "Review", icon: Check },
];

export default function RentalApplication() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    alternatePhone: "",
    dateOfBirth: "1990-05-15",
    gender: "male",
    maritalStatus: "single",
    currentAddress: "",
    permanentAddress: "",
    
    // Employment
    employmentType: "",
    companyName: "",
    designation: "",
    monthlyIncome: "",
    workAddress: "",
    employmentDuration: "",
    
    // Documents
    idProof: null,
    incomeProof: null,
    addressProof: null,
    
    // Additional
    numberOfOccupants: "1",
    hasPets: false,
    reasonForRenting: "",
    moveInDate: "",
    rentalDuration: "12",
    
    // Consent
    termsAccepted: false,
    backgroundCheckConsent: false,
  });

  // Mock property data
  const property = {
    id: propertyId || "1",
    title: "Spacious 2 BHK with Balcony",
    address: "Andheri West, Mumbai",
    rent: 25000,
    deposit: 75000,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission
    navigate(`/tenant/applications/${property.id}/status`);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Property
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Rental Application
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete the form below to apply for this property
            </p>
          </div>

          {/* Property Summary */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                  <p className="text-sm mt-1">
                    <span className="font-semibold text-primary">₹{property.rent.toLocaleString()}</span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Security Deposit</p>
                  <p className="font-semibold">₹{property.deposit.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Steps */}
          <div className="mb-8">
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center gap-2",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      currentStep > step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Step {currentStep}: {steps[currentStep - 1].name}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Provide your personal details"}
                {currentStep === 2 && "Share your employment information"}
                {currentStep === 3 && "Upload required documents"}
                {currentStep === 4 && "Review and submit your application"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name (as per Aadhaar)</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Auto-filled from eKYC</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                      <Input
                        id="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={(e) => updateFormData("alternatePhone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select value={formData.gender} onValueChange={(v) => updateFormData("gender", v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Marital Status</Label>
                      <Select value={formData.maritalStatus} onValueChange={(v) => updateFormData("maritalStatus", v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentAddress">Current Address</Label>
                    <Textarea
                      id="currentAddress"
                      value={formData.currentAddress}
                      onChange={(e) => updateFormData("currentAddress", e.target.value)}
                      placeholder="Enter your current residential address"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Employment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <RadioGroup
                      value={formData.employmentType}
                      onValueChange={(v) => updateFormData("employmentType", v)}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                      {["Salaried", "Self-Employed", "Student", "Retired"].map((type) => (
                        <div key={type}>
                          <RadioGroupItem
                            value={type.toLowerCase()}
                            id={type}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={type}
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <Briefcase className="mb-2 h-5 w-5" />
                            <span className="text-sm">{type}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {formData.employmentType && formData.employmentType !== "retired" && formData.employmentType !== "student" && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company/Business Name</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => updateFormData("companyName", e.target.value)}
                            placeholder="Enter company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation</Label>
                          <Input
                            id="designation"
                            value={formData.designation}
                            onChange={(e) => updateFormData("designation", e.target.value)}
                            placeholder="Enter your role"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                          <Input
                            id="monthlyIncome"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={(e) => updateFormData("monthlyIncome", e.target.value)}
                            placeholder="e.g., 50000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employmentDuration">Employment Duration</Label>
                          <Select value={formData.employmentDuration} onValueChange={(v) => updateFormData("employmentDuration", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5+">5+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workAddress">Work Address</Label>
                        <Textarea
                          id="workAddress"
                          value={formData.workAddress}
                          onChange={(e) => updateFormData("workAddress", e.target.value)}
                          placeholder="Enter your office/business address"
                          rows={2}
                        />
                      </div>
                    </>
                  )}

                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Rental Details</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupants">Number of Occupants</Label>
                        <Select value={formData.numberOfOccupants} onValueChange={(v) => updateFormData("numberOfOccupants", v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, "5+"].map((n) => (
                              <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                        <Input
                          id="moveInDate"
                          type="date"
                          value={formData.moveInDate}
                          onChange={(e) => updateFormData("moveInDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rentalDuration">Rental Duration (months)</Label>
                        <Select value={formData.rentalDuration} onValueChange={(v) => updateFormData("rentalDuration", v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 months</SelectItem>
                            <SelectItem value="11">11 months</SelectItem>
                            <SelectItem value="12">12 months</SelectItem>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-info/10 border border-info/20 rounded-lg p-4 flex items-start gap-3">
                    <Shield className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Documents are pre-verified via DigiLocker</p>
                      <p className="text-sm text-muted-foreground">
                        Your Aadhaar and PAN have been verified through DigiLocker. You may upload additional documents if required.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {[
                      { name: "ID Proof (Aadhaar)", status: "verified", field: "idProof" },
                      { name: "Income Proof (Salary Slip / ITR)", status: "pending", field: "incomeProof" },
                      { name: "Address Proof", status: "verified", field: "addressProof" },
                    ].map((doc) => (
                      <div
                        key={doc.name}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border",
                          doc.status === "verified" ? "bg-success/5 border-success/20" : "bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            doc.status === "verified" ? "bg-success/10" : "bg-muted"
                          )}>
                            <FileText className={cn(
                              "h-5 w-5",
                              doc.status === "verified" ? "text-success" : "text-muted-foreground"
                            )} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className={cn(
                              "text-xs",
                              doc.status === "verified" ? "text-success" : "text-muted-foreground"
                            )}>
                              {doc.status === "verified" ? "Verified via DigiLocker" : "Upload required"}
                            </p>
                          </div>
                        </div>
                        {doc.status === "pending" ? (
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-1" />
                            Upload
                          </Button>
                        ) : (
                          <Check className="h-5 w-5 text-success" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Renting (Optional)</Label>
                    <Textarea
                      id="reason"
                      value={formData.reasonForRenting}
                      onChange={(e) => updateFormData("reasonForRenting", e.target.value)}
                      placeholder="Briefly describe why you're looking for rental accommodation..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <User className="h-4 w-4" /> Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Name:</span> {formData.fullName}</p>
                        <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Briefcase className="h-4 w-4" /> Employment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Type:</span> {formData.employmentType || "Not specified"}</p>
                        <p><span className="text-muted-foreground">Company:</span> {formData.companyName || "Not specified"}</p>
                        <p><span className="text-muted-foreground">Monthly Income:</span> ₹{formData.monthlyIncome || "Not specified"}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Home className="h-4 w-4" /> Rental Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Property:</span> {property.title}</p>
                        <p><span className="text-muted-foreground">Rent:</span> ₹{property.rent.toLocaleString()}/month</p>
                        <p><span className="text-muted-foreground">Occupants:</span> {formData.numberOfOccupants}</p>
                        <p><span className="text-muted-foreground">Duration:</span> {formData.rentalDuration} months</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                      />
                      <label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                        I agree to the <span className="text-primary underline">Terms and Conditions</span> and{" "}
                        <span className="text-primary underline">Privacy Policy</span> of Maharashtra State Rental Housing Portal.
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="bgCheck"
                        checked={formData.backgroundCheckConsent}
                        onCheckedChange={(checked) => updateFormData("backgroundCheckConsent", checked)}
                      />
                      <label htmlFor="bgCheck" className="text-sm leading-tight cursor-pointer">
                        I consent to background verification including police verification as per government norms.
                      </label>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Important Notice</p>
                      <p className="text-sm text-muted-foreground">
                        By submitting this application, you confirm that all information provided is accurate. 
                        False information may result in application rejection and legal action.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    disabled={!formData.termsAccepted || !formData.backgroundCheckConsent}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
