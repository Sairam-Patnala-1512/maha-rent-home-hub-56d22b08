import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Shield,
  Building2,
} from "lucide-react";

export default function GrievanceDetail() {
  const navigate = useNavigate();
  const { grievanceId } = useParams();
  const [language, setLanguage] = useState("en");

  // Mock grievance data
  const grievanceData = {
    GRV001: {
      id: "GRV001",
      subject: "Water supply issue",
      category: "Maintenance",
      priority: "high",
      status: "open",
      submittedDate: "Dec 12, 2024",
      description: "There has been no water supply in my rented apartment for the past 3 days. The landlord is not responding to my calls. I have tried contacting the society office but they say it's the landlord's responsibility. This is causing severe inconvenience to my family.",
      submitter: {
        name: "Rahul Sharma",
        phone: "+91 87654 32109",
        email: "rahul.sharma@example.com",
        role: "Tenant",
      },
      property: {
        id: "PROP001",
        title: "2 BHK Andheri West",
        address: "Flat 302, Shanti Apartments, Andheri West, Mumbai",
      },
      timeline: [
        { action: "Grievance Submitted", date: "Dec 12, 2024", time: "10:30 AM", by: "Rahul Sharma" },
        { action: "Assigned to Admin", date: "Dec 12, 2024", time: "11:00 AM", by: "System" },
        { action: "Under Review", date: "Dec 12, 2024", time: "02:00 PM", by: "Admin Team" },
      ],
      comments: [
        { author: "Rahul Sharma", date: "Dec 12, 2024", content: "Please resolve this urgently. My family is suffering." },
        { author: "Admin Team", date: "Dec 12, 2024", content: "We have contacted the landlord and are awaiting response." },
      ],
    },
    GRV002: {
      id: "GRV002",
      subject: "Rent receipt not received",
      category: "Documentation",
      priority: "medium",
      status: "in-progress",
      submittedDate: "Dec 11, 2024",
      description: "I have been paying rent on time every month but the landlord has not provided rent receipts for the last 3 months. I need these receipts for tax purposes.",
      submitter: {
        name: "Priya Desai",
        phone: "+91 99887 76655",
        email: "priya.desai@example.com",
        role: "Tenant",
      },
      property: {
        id: "PROP002",
        title: "1 BHK Bandra East",
        address: "Room 15, Hill View Society, Bandra East, Mumbai",
      },
      timeline: [
        { action: "Grievance Submitted", date: "Dec 11, 2024", time: "09:15 AM", by: "Priya Desai" },
        { action: "Assigned to Admin", date: "Dec 11, 2024", time: "09:30 AM", by: "System" },
        { action: "Landlord Notified", date: "Dec 11, 2024", time: "10:00 AM", by: "Admin Team" },
      ],
      comments: [
        { author: "Admin Team", date: "Dec 11, 2024", content: "We have notified the landlord to provide rent receipts." },
      ],
    },
  };

  const grievance = grievanceData[grievanceId] || {
    id: grievanceId,
    subject: "Not Found",
    category: "-",
    priority: "low",
    status: "open",
    submittedDate: "-",
    description: "Grievance not found.",
    submitter: { name: "-", phone: "-", email: "-", role: "-" },
    property: { id: "-", title: "Not Found", address: "-" },
    timeline: [],
    comments: [],
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-destructive bg-destructive/10 border-destructive/20";
      case "medium": return "text-warning bg-warning/10 border-warning/20";
      case "low": return "text-success bg-success/10 border-success/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "text-warning bg-warning/10 border-warning/20";
      case "in-progress": return "text-info bg-info/10 border-info/20";
      case "resolved": return "text-success bg-success/10 border-success/20";
      default: return "text-muted-foreground bg-muted";
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
            onClick={() => navigate("/admin/grievances")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Grievances
          </Button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {grievance.id}
                </h1>
                <Badge className={getPriorityColor(grievance.priority)}>
                  {grievance.priority.charAt(0).toUpperCase() + grievance.priority.slice(1)} Priority
                </Badge>
                <Badge className={getStatusColor(grievance.status)}>
                  {grievance.status === "in-progress" ? "In Progress" : 
                   grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1)}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">
                {grievance.subject}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Category: {grievance.category} • Submitted on {grievance.submittedDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Grievance Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Grievance Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {grievance.description}
                  </p>
                </CardContent>
              </Card>

              {/* Related Property */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Related Property
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold">{grievance.property.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {grievance.property.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">
                      Property ID: {grievance.property.id}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Comments / Communication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Communication Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {grievance.comments.map((comment, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.date}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    ))}
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
                    Submitted By
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{grievance.submitter.name}</p>
                    <Badge variant="outline">{grievance.submitter.role}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {grievance.submitter.phone}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {grievance.submitter.email}
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
                    {grievance.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`} />
                          {index < grievance.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-medium text-sm">{event.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {event.by}
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
                      <p className="font-medium text-sm">View Only Mode</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Admin can view grievance details. Actions are limited to the Pending Approvals workflow in this PoC.
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