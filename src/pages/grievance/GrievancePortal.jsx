import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Bot,
  HelpCircle,
  FileText,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GrievancePortal() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: "bot", message: "Hello! I'm your MHADA support assistant. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const grievances = [
    {
      id: "GRV001",
      subject: "Delay in Application Processing",
      category: "Application",
      status: "in-review",
      createdAt: "Dec 15, 2024",
      lastUpdate: "Dec 17, 2024",
      priority: "medium",
    },
    {
      id: "GRV002",
      subject: "Incorrect Property Information",
      category: "Property",
      status: "resolved",
      createdAt: "Dec 10, 2024",
      lastUpdate: "Dec 14, 2024",
      priority: "low",
    },
    {
      id: "GRV003",
      subject: "Unable to Upload Documents",
      category: "Technical",
      status: "pending",
      createdAt: "Dec 18, 2024",
      lastUpdate: "Dec 18, 2024",
      priority: "high",
    },
  ];

  const faqs = [
    {
      question: "How long does application approval take?",
      answer: "Typically 3-5 business days after document verification.",
    },
    {
      question: "What documents are required for eKYC?",
      answer: "Aadhaar card and PAN card are mandatory. Additional documents may be requested.",
    },
    {
      question: "How can I track my application status?",
      answer: "Visit your dashboard and click on 'My Applications' to track status.",
    },
    {
      question: "Is the rental agreement legally binding?",
      answer: "Yes, agreements signed through Aadhaar eSign are legally valid.",
    },
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { id: chatMessages.length + 1, type: "user", message: chatInput };
    const botResponse = {
      id: chatMessages.length + 2,
      type: "bot",
      message: "Thank you for your query. Let me help you with that. For detailed assistance, you can raise a formal grievance using the 'New Grievance' button.",
    };

    setChatMessages([...chatMessages, userMessage, botResponse]);
    setChatInput("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "in-review":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-info" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "secondary";
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Grievance Portal
              </h1>
              <p className="text-muted-foreground mt-1">
                Get help and raise concerns about your rental journey
              </p>
            </div>
            <Button onClick={() => navigate("/grievance/raise")}>
              <Plus className="h-4 w-4 mr-2" />
              New Grievance
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="grievances">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="grievances">My Grievances</TabsTrigger>
                  <TabsTrigger value="chatbot">AI Assistant</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>

                <TabsContent value="grievances" className="mt-6 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search grievances..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {grievances.map((grievance) => (
                    <Card
                      key={grievance.id}
                      variant="interactive"
                      className="cursor-pointer"
                      onClick={() => navigate(`/grievance/${grievance.id}/status`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            {getStatusIcon(grievance.status)}
                            <div>
                              <h3 className="font-medium">{grievance.subject}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {grievance.category}
                                </Badge>
                                <Badge variant={getPriorityColor(grievance.priority)} className="text-xs">
                                  {grievance.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Created: {grievance.createdAt} • Last update: {grievance.lastUpdate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusBadge status={grievance.status === "resolved" ? "verified" : grievance.status} />
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {grievances.length === 0 && (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">No Grievances Found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You haven't raised any grievances yet.
                        </p>
                        <Button onClick={() => navigate("/grievance/raise")}>
                          Raise New Grievance
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="chatbot" className="mt-6">
                  <Card>
                    <CardHeader className="border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">MHADA Support Assistant</CardTitle>
                          <CardDescription>Powered by AI • Available 24/7</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={cn(
                              "flex gap-3",
                              msg.type === "user" && "flex-row-reverse"
                            )}
                          >
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                msg.type === "bot" ? "bg-primary/10" : "bg-accent/10"
                              )}
                            >
                              {msg.type === "bot" ? (
                                <Bot className="h-4 w-4 text-primary" />
                              ) : (
                                <span className="text-sm font-medium">R</span>
                              )}
                            </div>
                            <div
                              className={cn(
                                "max-w-[80%] rounded-lg p-3",
                                msg.type === "bot"
                                  ? "bg-muted"
                                  : "bg-primary text-primary-foreground"
                              )}
                            >
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleChatSubmit} className="border-t p-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your question..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="faq" className="mt-6 space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">{faq.question}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grievance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-info" />
                      <span className="text-sm">Open</span>
                    </div>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-warning" />
                      <span className="text-sm">In Progress</span>
                    </div>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">Resolved</span>
                    </div>
                    <span className="font-semibold">1</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/grievance/raise")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Raise New Grievance
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/grievance/track")}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Track by ID
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Download History
                  </Button>
                </CardContent>
              </Card>

              <Card variant="accent">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Need Immediate Help?</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Helpline:</span>{" "}
                      <span className="font-medium">1800-XXX-XXXX</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <span className="font-medium">support@mhada.gov.in</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Available Mon-Sat, 9:00 AM - 6:00 PM
                    </p>
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