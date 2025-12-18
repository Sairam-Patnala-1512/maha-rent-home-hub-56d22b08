import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  Download,
  User,
  Building,
  Calendar,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GrievanceStatus() {
  const navigate = useNavigate();
  const { grievanceId } = useParams();
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const [newComment, setNewComment] = useState("");

  // Mock grievance data
  const grievance = {
    id: grievanceId || "GRV001",
    subject: "Delay in Application Processing",
    description: "My application APP001 has been pending for more than 10 days. I submitted all the required documents and completed my eKYC verification. However, there has been no update on my application status. I need to move into the property by the end of this month and this delay is causing significant inconvenience.",
    category: "Application",
    priority: "medium",
    status: "in-review" as const,
    createdAt: "Dec 15, 2024 - 10:30 AM",
    lastUpdate: "Dec 17, 2024 - 03:45 PM",
    assignedTo: "Support Team - Level 2",
    relatedApplication: "APP001",
    attachments: ["screenshot_1.png", "document.pdf"],
    timeline: [
      {
        date: "Dec 17, 2024 - 03:45 PM",
        title: "Under Investigation",
        description: "Your grievance has been escalated to Level 2 support. We are investigating the delay in your application.",
        type: "update",
        by: "Support Team",
      },
      {
        date: "Dec 16, 2024 - 11:20 AM",
        title: "Response from Support",
        description: "We are looking into your concern. The delay appears to be due to additional verification requirements. We will update you within 24-48 hours.",
        type: "response",
        by: "Support Agent - Priya M.",
      },
      {
        date: "Dec 15, 2024 - 02:15 PM",
        title: "Assigned to Support",
        description: "Your grievance has been assigned to our support team for review.",
        type: "update",
        by: "System",
      },
      {
        date: "Dec 15, 2024 - 10:30 AM",
        title: "Grievance Submitted",
        description: "Your grievance has been registered successfully.",
        type: "created",
        by: "Rahul Sharma",
      },
    ],
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "created":
        return <AlertCircle className="h-5 w-5 text-info" />;
      case "response":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "update":
        return <Clock className="h-5 w-5 text-warning" />;
      case "resolved":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "secondary";
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // Mock adding comment
    setNewComment("");
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
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/grievance")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Grievance Portal
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {grievance.subject}
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Grievance ID: <span className="font-mono font-medium">{grievance.id}</span>
                </p>
              </div>
              <StatusBadge status={grievance.status} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Grievance Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grievance Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm">{grievance.description}</p>
                  </div>

                  {grievance.attachments.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Attachments</p>
                      <div className="flex flex-wrap gap-2">
                        {grievance.attachments.map((file, index) => (
                          <Button key={index} variant="outline" size="sm">
                            <Paperclip className="h-3 w-3 mr-1" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                  <CardDescription>Track all updates on your grievance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {grievance.timeline.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="relative">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              event.type === "response" ? "bg-primary/10" :
                              event.type === "resolved" ? "bg-success/10" :
                              event.type === "created" ? "bg-info/10" : "bg-warning/10"
                            )}>
                              {getTimelineIcon(event.type)}
                            </div>
                            {index !== grievance.timeline.length - 1 && (
                              <div className="absolute left-1/2 top-10 w-0.5 h-full -translate-x-1/2 bg-muted" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <span className="text-xs text-muted-foreground">{event.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <Badge variant="outline" className="text-xs">
                              By: {event.by}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Add Comment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Comment</CardTitle>
                  <CardDescription>Provide additional information or follow up</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Type your message here..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Status</span>
                    <StatusBadge status={grievance.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Priority</span>
                    <Badge variant={getPriorityColor(grievance.priority) as any}>
                      {grievance.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge variant="outline">{grievance.category}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="text-sm font-medium">{grievance.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Last Update</p>
                      <p className="text-sm font-medium">{grievance.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned To</p>
                      <p className="text-sm font-medium">{grievance.assignedTo}</p>
                    </div>
                  </div>
                  {grievance.relatedApplication && (
                    <div className="flex items-start gap-3">
                      <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Related Application</p>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-sm font-medium"
                          onClick={() => navigate(`/tenant/applications/${grievance.relatedApplication}`)}
                        >
                          {grievance.relatedApplication}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Summary
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    Close Grievance
                  </Button>
                </CardContent>
              </Card>

              {/* Expected Resolution */}
              <Card variant="info">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Expected Resolution</h4>
                      <p className="text-xs text-muted-foreground">
                        Based on current status, your grievance is expected to be resolved within 3-5 business days.
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
