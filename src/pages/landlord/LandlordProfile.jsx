import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  Upload,
  Building2,
  ArrowLeft,
} from "lucide-react";

export default function LandlordProfile() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const profile = {
    name: "Amit Patel",
    phone: "9123456789",
    email: "amit.patel@email.com",
    address: "403, Harmony Heights, Andheri West, Mumbai - 400058",
    aadhaar: "XXXX XXXX 5678",
    pan: "ABCDE1234F",
    totalProperties: 5,
  };

  const verificationStatus = {
    identity: "verified",
    address: "verified",
    ownership: "pending",
    bankDetails: "verified",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName={profile.name}
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                My Profile
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your account and verification status
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <CardDescription>Your registered details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.name}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>+91 {profile.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Total Properties</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.totalProperties} Properties Listed</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Registered Address</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Identity Documents</CardTitle>
                  <CardDescription>KYC verification documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Aadhaar Card</span>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <p className="text-lg font-mono">{profile.aadhaar}</p>
                      <p className="text-xs text-success mt-1">Verified via DigiLocker</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">PAN Card</span>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <p className="text-lg font-mono">{profile.pan}</p>
                      <p className="text-xs text-success mt-1">Verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Identity Verification</span>
                    <StatusBadge status={verificationStatus.identity} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Address Verification</span>
                    <StatusBadge status={verificationStatus.address} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ownership Documents</span>
                    <StatusBadge status={verificationStatus.ownership} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bank Details</span>
                    <StatusBadge status={verificationStatus.bankDetails} />
                  </div>
                </CardContent>
              </Card>

              <Card variant="warning">
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-warning mb-3" />
                  <h3 className="font-semibold mb-2">Pending Verification</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload property ownership documents to complete verification.
                  </p>
                  <Button variant="warning" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="govOutline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Profile
                  </Button>
                  <Button variant="govOutline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Update Contact Info
                  </Button>
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
