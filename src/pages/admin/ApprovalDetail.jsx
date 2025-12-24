import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  AlertTriangle,
  Eye,
} from "lucide-react";

export default function ApprovalDetail() {
  const navigate = useNavigate();
  const { approvalId } = useParams();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [remarks, setRemarks] = useState("");

  // Mock data based on approval ID
  const approvalData = {
    "1": {
      id: "1",
      type: "Property",
      name: "2 BHK Bandra West",
      submittedBy: "Amit Patel",
      submittedDate: "Dec 12, 2024",
      status: "pending",
      details: {
        address: "Flat 401, Sea View Apartments, Bandra West, Mumbai - 400050",
        district: "Mumbai Suburban",
        propertyType: "Apartment",
        bhk: "2 BHK",
        area: "1200 sq.ft",
        furnishing: "Semi-Furnished",
        rent: 35000,
        deposit: 105000,
      },
      submitter: {
        name: "Amit Patel",
        phone: "+91 98765 43210",
        email: "amit.patel@example.com",
        verified: true,
      },
      documents: [
        { name: "Property Ownership Deed", status: "verified" },
        { name: "Property Tax Receipt", status: "verified" },
        { name: "NOC from Society", status: "pending" },
        { name: "ID Proof", status: "verified" },
      ],
      timeline: [
        { action: "Submitted", date: "Dec 12, 2024", time: "10:30 AM" },
        { action: "Documents Uploaded", date: "Dec 12, 2024", time: "10:45 AM" },
        { action: "Under Review", date: "Dec 12, 2024", time: "02:00 PM" },
      ],
    },
    "2": {
      id: "2",
      type: "Landlord",
      name: "Priya Enterprises",
      submittedBy: "Priya Desai",
      submittedDate: "Dec 11, 2024",
      status: "pending",
      details: {
        businessName: "Priya Enterprises",
        registrationNo: "MH-2024-12345",
        address: "Office 201, Business Centre, Andheri East, Mumbai",
        propertyCount: 5,
      },
      submitter: {
        name: "Priya Desai",
        phone: "+91 99887 76655",
        email: "priya.desai@example.com",
        verified: false,
      },
      documents: [
        { name: "Business Registration", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "Address Proof", status: "verified" },
        { name: "Bank Statement", status: "pending" },
      ],
      timeline: [
        { action: "Application Submitted", date: "Dec 11, 2024", time: "09:15 AM" },
        { action: "Documents Uploaded", date: "Dec 11, 2024", time: "09:30 AM" },
      ],
    },
    "3": {
      id: "3",
      type: "Tenant",
      name: "Vikram Singh",
      submittedBy: "Vikram Singh",
      submittedDate: "Dec 10, 2024",
      status: "pending",
      details: {
        occupation: "IT Professional",
        employer: "Tech Solutions Pvt Ltd",
        monthlyIncome: "₹85,000",
        currentAddress: "Flat 102, Green Valley, Powai, Mumbai",
      },
      submitter: {
        name: "Vikram Singh",
        phone: "+91 88776 65544",
        email: "vikram.singh@example.com",
        verified: false,
      },
      documents: [
        { name: "Aadhaar Card", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "Salary Slips", status: "verified" },
        { name: "Employment Letter", status: "pending" },
      ],
      timeline: [
        { action: "Profile Created", date: "Dec 10, 2024", time: "11:00 AM" },
        { action: "Documents Uploaded", date: "Dec 10, 2024", time: "11:30 AM" },
      ],
    },
  };

  const approval = approvalData[approvalId] || {
    id: approvalId,
    type: "Unknown",
    name: "Not Found",
    submittedBy: "-",
    submittedDate: "-",
    status: "pending",
    details: {},
    submitter: { name: "-", phone: "-", email: "-", verified: false },
    documents: [],
    timeline: [],
  };

  const handleApprove = () => {
    toast({
      title: "Approved Successfully",
      description: `${approval.name} has been approved and is now active.`,
    });
    navigate("/admin/approvals");
  };

  const handleReject = () => {
    if (!remarks.trim()) {
      toast({
        title: "Remarks Required",
        description: "Please provide remarks for rejection.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Rejected",
      description: `${approval.name} has been rejected.`,
      variant: "destructive",
    });
    navigate("/admin/approvals");
  };

  const getTypeIcon = () => {
    switch (approval.type) {
      case "Property":
        return <Building2 className="h-6 w-6" />;
      case "Landlord":
        return <User className="h-6 w-6" />;
      case "Tenant":
        return <User className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Admin Officer"
        userRole="admin"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/admin/approvals")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pending Approvals
          </Button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                approval.type === "Property" ? "bg-primary/10 text-primary" :
                approval.type === "Landlord" ? "bg-accent/10 text-accent-foreground" :
                "bg-info/10 text-info"
              }`}>
                {getTypeIcon()}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {approval.name}
                  </h1>
                  <Badge variant="outline" className="text-warning border-warning">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {approval.type} Verification • Submitted on {approval.submittedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verification Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {approval.type} Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {approval.type === "Property" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <p className="font-medium">{approval.details.propertyType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Configuration</p>
                        <p className="font-medium">{approval.details.bhk}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Area</p>
                        <p className="font-medium">{approval.details.area}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Furnishing</p>
                        <p className="font-medium">{approval.details.furnishing}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">District</p>
                        <p className="font-medium">{approval.details.district}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-sm">{approval.details.address}</p>
                      </div>
                      <div className="col-span-full">
                        <Separator className="my-4" />
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          Monthly Rent
                        </p>
                        <p className="text-xl font-bold text-primary">
                          ₹{approval.details.rent?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          Security Deposit
                        </p>
                        <p className="text-xl font-bold">
                          ₹{approval.details.deposit?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {approval.type === "Landlord" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Business Name</p>
                        <p className="font-medium">{approval.details.businessName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Registration No.</p>
                        <p className="font-medium font-mono">{approval.details.registrationNo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Properties Listed</p>
                        <p className="font-medium">{approval.details.propertyCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-sm">{approval.details.address}</p>
                      </div>
                    </div>
                  )}

                  {approval.type === "Tenant" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Occupation</p>
                        <p className="font-medium">{approval.details.occupation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employer</p>
                        <p className="font-medium">{approval.details.employer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Income</p>
                        <p className="font-medium">{approval.details.monthlyIncome}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Address</p>
                        <p className="font-medium text-sm">{approval.details.currentAddress}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Uploaded Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {approval.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === "verified" ? (
                            <Badge className="bg-success/10 text-success border-success/20">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-warning border-warning">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Section */}
              <Card className="border-warning/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Admin Action Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Remarks (required for rejection)
                    </label>
                    <Textarea
                      placeholder="Enter your remarks or reason for approval/rejection..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                      onClick={handleReject}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      className="flex-1 bg-success hover:bg-success/90"
                      onClick={handleApprove}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Submitter Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Submitter Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{approval.submitter.name}</p>
                    {approval.submitter.verified ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-warning border-warning">
                        Unverified
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {approval.submitter.phone}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {approval.submitter.email}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {approval.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < approval.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-medium text-sm">{event.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* PoC Disclaimer */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">PoC Disclaimer</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This is a demonstration environment. Approval actions are simulated and no real data is processed.
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