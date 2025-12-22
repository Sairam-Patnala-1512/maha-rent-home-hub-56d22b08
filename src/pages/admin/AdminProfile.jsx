import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Shield,
  Building,
  CheckCircle2,
  Key,
  Clock,
} from "lucide-react";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const profile = {
    name: "Sanjeev Kumar",
    mobile: "+91 99876 54321",
    email: "sanjeev.kumar@mhada.gov.in",
    department: "Maharashtra Housing and Area Development Authority",
    role: "State Administrator",
    employeeId: "MHADA-ADM-2024-001",
    accessLevel: "Full Access",
    lastLogin: "Dec 20, 2024, 09:45 AM",
  };

  const complianceStatus = {
    training: "completed",
    certification: "valid",
    backgroundCheck: "cleared",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName={profile.name}
        userRole="admin"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Admin Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              View your administrator profile and access information
            </p>
          </div>

          <div className="grid gap-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Administrator Information
                </CardTitle>
                <CardDescription>
                  Your official MHADA administrator details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.role}</p>
                    <Badge variant="secondary" className="mt-2">
                      <Shield className="h-3 w-3 mr-1" />
                      {profile.accessLevel}
                    </Badge>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Mobile Number
                    </Label>
                    <p className="font-medium p-3 bg-muted rounded-md">
                      {profile.mobile}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      Official Email
                    </Label>
                    <p className="font-medium p-3 bg-muted rounded-md">
                      {profile.email}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                      <Building className="h-4 w-4" />
                      Department
                    </Label>
                    <p className="font-medium p-3 bg-muted rounded-md text-sm">
                      {profile.department}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                      <Key className="h-4 w-4" />
                      Employee ID
                    </Label>
                    <p className="font-medium p-3 bg-muted rounded-md font-mono">
                      {profile.employeeId}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Access Level Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Access Level & Permissions
                </CardTitle>
                <CardDescription>
                  Your administrative access rights (read-only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border bg-success-light">
                    <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                    <h4 className="font-medium text-sm">User Management</h4>
                    <p className="text-xs text-muted-foreground">Full access</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-success-light">
                    <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                    <h4 className="font-medium text-sm">Property Inventory</h4>
                    <p className="text-xs text-muted-foreground">Full access</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-success-light">
                    <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                    <h4 className="font-medium text-sm">Grievance Management</h4>
                    <p className="text-xs text-muted-foreground">Full access</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-success-light">
                    <CheckCircle2 className="h-5 w-5 text-success mb-2" />
                    <h4 className="font-medium text-sm">Audit Logs</h4>
                    <p className="text-xs text-muted-foreground">View access</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Compliance Status
                </CardTitle>
                <CardDescription>
                  Your training and verification status (read-only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Security Training</span>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last completed: Nov 15, 2024
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Admin Certification</span>
                      <Badge variant="success">Valid</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Valid until: Dec 31, 2025
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Background Check</span>
                      <Badge variant="success">Cleared</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Verified: Jan 10, 2024
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Last login: {profile.lastLogin}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
