import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Upload,
  AlertCircle,
  CheckCircle2,
  FileText,
  Image,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RaiseGrievance() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    priority: "medium",
    subject: "",
    description: "",
    relatedTo: "",
    applicationId: "",
    propertyId: "",
    attachments: [] as string[],
    consent: false,
  });

  const categories = [
    { value: "application", label: "Application Related" },
    { value: "property", label: "Property Related" },
    { value: "agreement", label: "Agreement Related" },
    { value: "landlord", label: "Landlord Dispute" },
    { value: "technical", label: "Technical Issue" },
    { value: "verification", label: "Verification Delay" },
    { value: "payment", label: "Payment / Refund" },
    { value: "other", label: "Other" },
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Grievance Submitted",
      description: "Your grievance has been registered successfully. ID: GRV004",
    });

    navigate("/grievance/GRV004");
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
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
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/grievance")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Grievance Portal
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Raise New Grievance
            </h1>
            <p className="text-muted-foreground mt-1">
              Submit your concern and we'll address it promptly
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Category & Priority */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grievance Details</CardTitle>
                  <CardDescription>Select the category and priority of your concern</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => updateFormData("category", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
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

                    <div className="space-y-2">
                      <Label>Priority Level *</Label>
                      <RadioGroup
                        value={formData.priority}
                        onValueChange={(v) => updateFormData("priority", v)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="low" />
                          <Label htmlFor="low" className="text-sm cursor-pointer">Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium" className="text-sm cursor-pointer">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="high" />
                          <Label htmlFor="high" className="text-sm cursor-pointer">High</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => updateFormData("subject", e.target.value)}
                      placeholder="Brief title of your grievance"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      placeholder="Please describe your issue in detail. Include any relevant dates, reference numbers, or specific problems you've encountered..."
                      rows={5}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 50 characters. Be as specific as possible for faster resolution.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related References */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related References (Optional)</CardTitle>
                  <CardDescription>Link to existing applications or properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>This grievance is related to:</Label>
                    <RadioGroup
                      value={formData.relatedTo}
                      onValueChange={(v) => updateFormData("relatedTo", v)}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                    >
                      {["None", "Application", "Property", "Agreement"].map((type) => (
                        <div key={type}>
                          <RadioGroupItem
                            value={type.toLowerCase()}
                            id={`related-${type}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`related-${type}`}
                            className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer text-sm"
                          >
                            {type}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {formData.relatedTo === "application" && (
                    <div className="space-y-2">
                      <Label htmlFor="applicationId">Application ID</Label>
                      <Input
                        id="applicationId"
                        value={formData.applicationId}
                        onChange={(e) => updateFormData("applicationId", e.target.value)}
                        placeholder="e.g., APP001"
                      />
                    </div>
                  )}

                  {formData.relatedTo === "property" && (
                    <div className="space-y-2">
                      <Label htmlFor="propertyId">Property ID</Label>
                      <Input
                        id="propertyId"
                        value={formData.propertyId}
                        onChange={(e) => updateFormData("propertyId", e.target.value)}
                        placeholder="e.g., PROP001"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attachments (Optional)</CardTitle>
                  <CardDescription>Upload screenshots or documents to support your grievance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Supported formats: JPG, PNG, PDF (Max 5MB each)
                    </p>
                    <Button variant="outline" type="button">
                      Choose Files
                    </Button>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            {file.endsWith(".pdf") ? (
                              <FileText className="h-5 w-5 text-primary" />
                            ) : (
                              <Image className="h-5 w-5 text-primary" />
                            )}
                            <span className="text-sm">{file}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeAttachment(index)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Consent & Submit */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => updateFormData("consent", checked)}
                    />
                    <label htmlFor="consent" className="text-sm leading-tight cursor-pointer">
                      I confirm that the information provided is accurate and I understand that filing
                      false grievances may result in action against my account.
                    </label>
                  </div>

                  <div className="bg-info/10 border border-info/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">What happens next?</p>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• You'll receive a grievance ID immediately</li>
                        <li>• Our team will review within 2 business days</li>
                        <li>• You'll get email/SMS updates on progress</li>
                        <li>• Expected resolution time: 5-7 business days</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate("/grievance")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!formData.consent || !formData.category || !formData.subject || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2 animate-pulse" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Grievance"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
