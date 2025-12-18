import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Shield,
  Calendar,
  Building,
  User,
  IndianRupee,
  Stamp,
  Pen,
} from "lucide-react";

export default function AgreementPreview() {
  const navigate = useNavigate();
  const { agreementId } = useParams();
  const [language, setLanguage] = useState("en");
  const [hasRead, setHasRead] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const agreement = {
    id: agreementId || "AGR001",
    status: "pending-signature",
    generatedDate: "Dec 19, 2024",
    validFrom: "Jan 1, 2025",
    validTo: "Dec 31, 2025",
    property: {
      title: "Spacious 2 BHK with Balcony",
      address: "Flat No. 502, Building A, Green Valley Society, Near Western Express Highway, Andheri West, Mumbai - 400053",
      type: "Residential Apartment",
    },
    tenant: {
      name: "Rahul Sharma",
      aadhaar: "XXXX XXXX 4567",
      pan: "XXXXX1234X",
      address: "123, Old Address, Mumbai - 400001",
    },
    landlord: {
      name: "Rajesh Patel",
      aadhaar: "XXXX XXXX 8901",
      pan: "XXXXX5678Y",
      address: "456, Landlord Address, Mumbai - 400058",
    },
    terms: {
      rent: 25000,
      deposit: 75000,
      maintenance: 2500,
      duration: 12,
      noticePeriod: 2,
      rentDueDate: 5,
      lockInPeriod: 6,
    },
  };

  const handleSign = () => {
    navigate(`/tenant/agreements/${agreement.id}/sign`);
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
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Rental Agreement
                </h1>
                <p className="text-muted-foreground mt-1">
                  Agreement ID: <span className="font-mono font-medium">{agreement.id}</span>
                </p>
              </div>
              <Badge variant="warning" className="gap-1">
                <Edit3 className="h-3 w-3" />
                Pending Signature
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Rental Agreement Document
                      </CardTitle>
                      <CardDescription>
                        Generated as per Maharashtra Rent Control Act
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Document Preview</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview" className="mt-4">
                      <ScrollArea className="h-[500px] rounded-lg border bg-card p-6">
                        <div className="space-y-6 text-sm">
                          <div className="text-center space-y-2">
                            <div className="flex justify-center mb-4">
                              <Stamp className="h-16 w-16 text-primary/30" />
                            </div>
                            <h2 className="text-xl font-bold uppercase">
                              Rent Agreement
                            </h2>
                            <p className="text-muted-foreground">
                              (As per Maharashtra Rent Control Act, 1999)
                            </p>
                            <p className="text-muted-foreground">
                              Agreement ID: {agreement.id}
                            </p>
                          </div>

                          <div className="space-y-4 text-justify">
                            <p>
                              This Rent Agreement is made and executed on <strong>{agreement.generatedDate}</strong> 
                              at Mumbai, Maharashtra between:
                            </p>

                            <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                              <p>
                                <strong>LANDLORD:</strong> {agreement.landlord.name}, residing at {agreement.landlord.address}, 
                                Aadhaar No. {agreement.landlord.aadhaar}, PAN No. {agreement.landlord.pan} 
                                (hereinafter referred to as the "LANDLORD" / "FIRST PARTY")
                              </p>
                            </div>

                            <p className="text-center">AND</p>

                            <div className="pl-4 border-l-2 border-accent/30 space-y-2">
                              <p>
                                <strong>TENANT:</strong> {agreement.tenant.name}, residing at {agreement.tenant.address}, 
                                Aadhaar No. {agreement.tenant.aadhaar}, PAN No. {agreement.tenant.pan} 
                                (hereinafter referred to as the "TENANT" / "SECOND PARTY")
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">1. PROPERTY DETAILS</h3>
                            <p>
                              The Landlord agrees to let out the following property to the Tenant:
                            </p>
                            <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                              <p><strong>Address:</strong> {agreement.property.address}</p>
                              <p><strong>Property Type:</strong> {agreement.property.type}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">2. TERM OF AGREEMENT</h3>
                            <p>
                              This agreement shall be valid for a period of <strong>{agreement.terms.duration} months</strong>, 
                              commencing from <strong>{agreement.validFrom}</strong> and ending on <strong>{agreement.validTo}</strong>.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">3. RENT AND SECURITY DEPOSIT</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Monthly Rent: <strong>₹{agreement.terms.rent.toLocaleString()}</strong></li>
                              <li>Security Deposit: <strong>₹{agreement.terms.deposit.toLocaleString()}</strong></li>
                              <li>Monthly Maintenance: <strong>₹{agreement.terms.maintenance.toLocaleString()}</strong></li>
                              <li>Rent Due Date: {agreement.terms.rentDueDate}th of every month</li>
                            </ul>
                          </div>

                          <div className="mt-8 pt-6 border-t">
                            <p className="text-center mb-8">
                              IN WITNESS WHEREOF, both parties have signed this agreement on the date first mentioned above.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-8">
                              <div className="text-center">
                                <div className="h-24 border-b-2 border-dashed border-muted-foreground/30 flex items-end justify-center pb-2">
                                  <Pen className="h-5 w-5 text-muted-foreground/50" />
                                </div>
                                <p className="mt-2 font-medium">{agreement.landlord.name}</p>
                                <p className="text-xs text-muted-foreground">LANDLORD</p>
                              </div>
                              <div className="text-center">
                                <div className="h-24 border-b-2 border-dashed border-muted-foreground/30 flex items-end justify-center pb-2">
                                  <Pen className="h-5 w-5 text-muted-foreground/50" />
                                </div>
                                <p className="mt-2 font-medium">{agreement.tenant.name}</p>
                                <p className="text-xs text-muted-foreground">TENANT</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="summary" className="mt-4">
                      <div className="grid gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Building className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">Property Details</h4>
                            </div>
                            <div className="text-sm space-y-1 text-muted-foreground">
                              <p>{agreement.property.title}</p>
                              <p>{agreement.property.address}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <IndianRupee className="h-5 w-5 text-primary" />
                                <h4 className="font-medium">Financial Terms</h4>
                              </div>
                              <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Monthly Rent</span>
                                  <span className="font-medium">₹{agreement.terms.rent.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Security Deposit</span>
                                  <span className="font-medium">₹{agreement.terms.deposit.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Maintenance</span>
                                  <span className="font-medium">₹{agreement.terms.maintenance.toLocaleString()}/mo</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <h4 className="font-medium">Duration</h4>
                              </div>
                              <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Agreement Period</span>
                                  <span className="font-medium">{agreement.terms.duration} months</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Lock-in Period</span>
                                  <span className="font-medium">{agreement.terms.lockInPeriod} months</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Notice Period</span>
                                  <span className="font-medium">{agreement.terms.noticePeriod} months</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="read"
                      checked={hasRead}
                      onCheckedChange={(checked) => setHasRead(checked)}
                    />
                    <label htmlFor="read" className="text-sm leading-tight cursor-pointer">
                      I have read and understood the entire rental agreement document.
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked)}
                      disabled={!hasRead}
                    />
                    <label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                      I agree to all terms and conditions mentioned in the agreement and consent to digital signing via Aadhaar eSign.
                    </label>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!hasRead || !acceptedTerms}
                    onClick={handleSign}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Proceed to Aadhaar eSign
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Signing Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-sm">Review Agreement</p>
                      <p className="text-xs text-muted-foreground">Read all terms carefully</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-sm">Accept Terms</p>
                      <p className="text-xs text-muted-foreground">Confirm your consent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-sm">Aadhaar eSign</p>
                      <p className="text-xs text-muted-foreground">OTP verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-sm">Registration</p>
                      <p className="text-xs text-muted-foreground">Automatic registration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="info">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Important</h4>
                      <p className="text-xs text-muted-foreground">
                        The landlord will also need to sign this agreement. You will be notified once both parties have signed.
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