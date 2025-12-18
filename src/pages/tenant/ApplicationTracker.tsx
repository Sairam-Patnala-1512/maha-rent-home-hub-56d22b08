import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Check,
  Clock,
  FileText,
  Home,
  Shield,
  User,
  Building,
  Calendar,
  Download,
  MessageSquare,
  Phone,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const applicationSteps = [
  { id: 1, name: "Application Submitted", status: "completed", date: "Dec 18, 2024 - 10:30 AM" },
  { id: 2, name: "Document Verification", status: "completed", date: "Dec 18, 2024 - 02:15 PM" },
  { id: 3, name: "Landlord Review", status: "current", date: "In Progress" },
  { id: 4, name: "Agreement Generation", status: "pending", date: "" },
  { id: 5, name: "Digital Signing", status: "pending", date: "" },
  { id: 6, name: "Registration Complete", status: "pending", date: "" },
];

export default function ApplicationTracker() {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [language, setLanguage] = useState<"en" | "mr">("en");

  // Mock application data
  const application = {
    id: applicationId || "APP001",
    status: "in-review" as const,
    submittedDate: "Dec 18, 2024",
    property: {
      id: "1",
      title: "Spacious 2 BHK with Balcony",
      address: "Near Western Express Highway, Andheri West",
      rent: 25000,
      deposit: 75000,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
    },
    landlord: {
      name: "Mr. Rajesh Patel",
      phone: "+91 98XXX XXXXX",
      verified: true,
    },
    applicant: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      ekyc: "verified",
      policeVerification: "pending",
    },
    timeline: [
      {
        date: "Dec 18, 2024 - 10:30 AM",
        title: "Application Submitted",
        description: "Your rental application has been successfully submitted.",
        status: "completed",
      },
      {
        date: "Dec 18, 2024 - 02:15 PM",
        title: "Documents Verified",
        description: "All uploaded documents have been verified successfully.",
        status: "completed",
      },
      {
        date: "Dec 18, 2024 - 03:00 PM",
        title: "Sent to Landlord",
        description: "Application forwarded to landlord for review.",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Awaiting Landlord Response",
        description: "The landlord is reviewing your application. Typically takes 2-3 business days.",
        status: "current",
      },
    ],
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case "current":
        return <Loader2 className="h-6 w-6 text-primary animate-spin" />;
      case "failed":
        return <XCircle className="h-6 w-6 text-destructive" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/dashboard")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Application Status
                </h1>
                <p className="text-muted-foreground mt-1">
                  Application ID: <span className="font-mono font-medium">{application.id}</span>
                </p>
              </div>
              <StatusBadge status={application.status} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Application Progress</CardTitle>
                  <CardDescription>Track your application through each stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {applicationSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-4 pb-8 last:pb-0">
                        {/* Connector Line */}
                        {index !== applicationSteps.length - 1 && (
                          <div
                            className={cn(
                              "absolute left-[15px] w-0.5 h-16",
                              step.status === "completed" ? "bg-success" : "bg-muted"
                            )}
                            style={{ top: `${index * 72 + 32}px` }}
                          />
                        )}
                        
                        {/* Icon */}
                        <div className="relative z-10 flex-shrink-0">
                          {getStepIcon(step.status)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={cn(
                              "font-medium",
                              step.status === "pending" && "text-muted-foreground"
                            )}>
                              {step.name}
                            </h4>
                            {step.status === "current" && (
                              <Badge variant="info">In Progress</Badge>
                            )}
                          </div>
                          {step.date && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {step.date}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.timeline.map((event, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex gap-4 p-4 rounded-lg",
                          event.status === "current" ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          event.status === "completed" ? "bg-success/10" : 
                          event.status === "current" ? "bg-primary/10" : "bg-muted"
                        )}>
                          {event.status === "completed" ? (
                            <Check className="h-5 w-5 text-success" />
                          ) : event.status === "current" ? (
                            <Clock className="h-5 w-5 text-primary" />
                          ) : (
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{event.title}</h4>
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-success/5 border border-success/20">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">eKYC Verification</p>
                        <p className="text-xs text-success">Completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/5 border border-warning/20">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Police Verification</p>
                        <p className="text-xs text-warning">In Progress</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Property Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Applied Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={application.property.imageUrl}
                    alt={application.property.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-sm">{application.property.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {application.property.address}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Rent</p>
                      <p className="font-semibold text-primary">₹{application.property.rent.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Deposit</p>
                      <p className="font-semibold">₹{application.property.deposit.toLocaleString()}</p>
                    </div>
                  </div>
                  <Button
                    variant="govOutline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => navigate(`/tenant/properties/${application.property.id}`)}
                  >
                    <Home className="h-4 w-4 mr-1" />
                    View Property
                  </Button>
                </CardContent>
              </Card>

              {/* Landlord Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Property Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{application.landlord.name}</h4>
                        {application.landlord.verified && (
                          <Badge variant="success" className="text-[10px]">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{application.landlord.phone}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact Landlord
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Application
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate("/grievance")}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Raise Concern
                  </Button>
                </CardContent>
              </Card>

              {/* Help Notice */}
              <Card variant="info">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Need Help?</h4>
                      <p className="text-xs text-muted-foreground">
                        If your application is taking longer than expected, you can raise a grievance or contact our support team.
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
