import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Search,
  FileText,
  Download,
  Eye,
  Building2,
  User,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Clock,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockAgreements = [
  {
    id: "AGR001",
    propertyId: "1",
    propertyName: "2 BHK Apartment in Andheri West",
    propertyAddress: "403, Harmony Heights, Andheri West",
    tenantName: "Priya Desai",
    tenantPhone: "+91 98765 43210",
    tenantEmail: "priya.desai@email.com",
    status: "pending",
    rent: 25000,
    deposit: 75000,
    startDate: "Jan 1, 2025",
    endDate: "Dec 31, 2025",
    duration: "12 months",
    createdDate: "Dec 15, 2024",
    timeline: [
      { status: "Agreement Generated", date: "Dec 15, 2024", completed: true },
      { status: "Sent to Tenant", date: "Dec 15, 2024", completed: true },
      { status: "Awaiting Tenant Signature", date: null, completed: false },
      { status: "Agreement Active", date: null, completed: false },
    ],
  },
  {
    id: "AGR002",
    propertyId: "2",
    propertyName: "1 BHK Apartment in Bandra East",
    propertyAddress: "12, Sea View Apartments, Bandra East",
    tenantName: "Rahul Sharma",
    tenantPhone: "+91 99887 76655",
    tenantEmail: "rahul.sharma@email.com",
    status: "completed",
    rent: 18000,
    deposit: 54000,
    startDate: "Oct 15, 2024",
    endDate: "Oct 14, 2025",
    duration: "12 months",
    createdDate: "Oct 10, 2024",
    timeline: [
      { status: "Agreement Generated", date: "Oct 10, 2024", completed: true },
      { status: "Sent to Tenant", date: "Oct 10, 2024", completed: true },
      { status: "Signed by Tenant", date: "Oct 12, 2024", completed: true },
      { status: "Agreement Active", date: "Oct 15, 2024", completed: true },
    ],
  },
  {
    id: "AGR003",
    propertyId: "5",
    propertyName: "2 BHK Flat in Dadar",
    propertyAddress: "504, Shivaji Nagar, Dadar East",
    tenantName: "Amit Kulkarni",
    tenantPhone: "+91 88776 65544",
    tenantEmail: "amit.kulkarni@email.com",
    status: "completed",
    rent: 22000,
    deposit: 66000,
    startDate: "Aug 20, 2024",
    endDate: "Aug 19, 2025",
    duration: "12 months",
    createdDate: "Aug 15, 2024",
    timeline: [
      { status: "Agreement Generated", date: "Aug 15, 2024", completed: true },
      { status: "Sent to Tenant", date: "Aug 15, 2024", completed: true },
      { status: "Signed by Tenant", date: "Aug 18, 2024", completed: true },
      { status: "Agreement Active", date: "Aug 20, 2024", completed: true },
    ],
  },
];

export default function LandlordAgreements() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredAgreements = mockAgreements.filter(
    (agreement) =>
      agreement.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredByStatus = (status) => {
    if (status === "all") return filteredAgreements;
    return filteredAgreements.filter((a) => a.status === status);
  };

  const openDetail = (agreement) => {
    setSelectedAgreement(agreement);
    setDetailOpen(true);
  };

  const AgreementCard = ({ agreement }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{agreement.propertyName}</h3>
              <p className="text-sm text-muted-foreground">{agreement.propertyAddress}</p>
            </div>
          </div>
          <StatusBadge status={agreement.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{agreement.tenantName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{agreement.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
              {agreement.id}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => openDetail(agreement)}>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Amit Patel"
        userRole="landlord"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/landlord/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Manage Agreements
              </h1>
              <p className="text-muted-foreground mt-1">
                View and track all your rental agreements
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by property, tenant, or agreement ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({filteredAgreements.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({getFilteredByStatus("pending").length})</TabsTrigger>
              <TabsTrigger value="completed">Active ({getFilteredByStatus("completed").length})</TabsTrigger>
            </TabsList>

            {["all", "pending", "completed"].map((status) => (
              <TabsContent key={status} value={status} className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {getFilteredByStatus(status).map((agreement) => (
                    <AgreementCard key={agreement.id} agreement={agreement} />
                  ))}
                </div>
                {getFilteredByStatus(status).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No agreements found</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Agreement Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAgreement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Agreement Details
                </DialogTitle>
                <DialogDescription>
                  Agreement ID: {selectedAgreement.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Property Info */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Property Details
                  </h4>
                  <Card>
                    <CardContent className="p-4">
                      <p className="font-medium">{selectedAgreement.propertyName}</p>
                      <p className="text-sm text-muted-foreground">{selectedAgreement.propertyAddress}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Tenant Info */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Tenant Details
                  </h4>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <p className="font-medium">{selectedAgreement.tenantName}</p>
                      <p className="text-sm text-muted-foreground">{selectedAgreement.tenantEmail}</p>
                      <p className="text-sm text-muted-foreground">{selectedAgreement.tenantPhone}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Agreement Terms */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    Agreement Terms
                  </h4>
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Rent</p>
                          <p className="font-semibold">₹{selectedAgreement.rent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Security Deposit</p>
                          <p className="font-semibold">₹{selectedAgreement.deposit.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Start Date</p>
                          <p className="font-semibold">{selectedAgreement.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p className="font-semibold">{selectedAgreement.endDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Status Timeline */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Status Timeline
                  </h4>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {selectedAgreement.timeline.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                item.completed
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {item.completed ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={cn(
                                "font-medium",
                                !item.completed && "text-muted-foreground"
                              )}>
                                {item.status}
                              </p>
                              {item.date && (
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Download Option */}
                <div className="flex gap-3">
                  <Button variant="govOutline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Agreement
                  </Button>
                  {selectedAgreement.status === "pending" && (
                    <Button variant="outline" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Resend to Tenant
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}