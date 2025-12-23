import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Calendar,
  Home,
  CheckCircle2,
  Clock,
  PenLine,
} from "lucide-react";

const mockAgreements = [
  {
    id: "AGR001",
    property: {
      title: "1 BHK in Bandra East",
      address: "Near Bandra Station, Bandra East",
      rent: 18000,
    },
    landlord: "Mrs. Sunita Desai",
    status: "pending-signature",
    createdDate: "Dec 15, 2024",
    validFrom: "Jan 1, 2025",
    validTo: "Dec 31, 2025",
    registrationNo: null,
  },
  {
    id: "AGR002",
    property: {
      title: "2 BHK in Dadar West",
      address: "Shivaji Park, Dadar West",
      rent: 32000,
    },
    landlord: "Mr. Suresh Patil",
    status: "active",
    createdDate: "Oct 1, 2024",
    validFrom: "Oct 15, 2024",
    validTo: "Oct 14, 2025",
    registrationNo: "MH/MUM/2024/123456",
  },
];

export default function MyAgreements() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "pending-signature":
        return <PenLine className="h-5 w-5 text-warning" />;
      case "expired":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending-signature":
        return "Pending Signature";
      case "expired":
        return "Expired";
      default:
        return status;
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
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/dashboard")} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              My Agreements
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage your rental agreements
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                  <PenLine className="h-5 w-5 text-warning" />
                </div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">Expired</p>
              </CardContent>
            </Card>
          </div>

          {/* Agreements List */}
          <div className="space-y-4">
            {mockAgreements.map((agreement) => (
              <Card key={agreement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(agreement.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-base">
                            {agreement.property.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {agreement.property.address}
                          </p>
                        </div>
                        <Badge
                          variant={agreement.status === "active" ? "success" : agreement.status === "pending-signature" ? "warning" : "secondary"}
                        >
                          {getStatusLabel(agreement.status)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                          {agreement.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <Home className="h-3.5 w-3.5" />
                          {agreement.landlord}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {agreement.validFrom} - {agreement.validTo}
                        </span>
                      </div>

                      {agreement.registrationNo && (
                        <p className="text-xs text-muted-foreground mb-3">
                          Registration No: <span className="font-mono">{agreement.registrationNo}</span>
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ₹{agreement.property.rent.toLocaleString()}
                          <span className="text-sm text-muted-foreground font-normal">/month</span>
                        </span>

                        <div className="flex items-center gap-2">
                          {agreement.status === "pending-signature" ? (
                            <Button
                              size="sm"
                              onClick={() => navigate(`/tenant/agreements/${agreement.id}/sign`)}
                            >
                              <PenLine className="h-4 w-4 mr-1" />
                              Sign Agreement
                            </Button>
                          ) : (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/tenant/agreements/${agreement.id}/preview`)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockAgreements.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No Agreements Yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Agreements will appear here once your applications are approved
                  </p>
                  <Button onClick={() => navigate("/tenant/applications")}>
                    View Applications
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
