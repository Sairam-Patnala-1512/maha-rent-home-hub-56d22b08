import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Edit2,
  Save,
  X,
  Shield,
  FileText,
  UserCheck,
} from "lucide-react";

export default function TenantProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    mobile: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    aadhaar: "XXXX XXXX 1234",
    address: "B-204, Sunrise Apartments, Andheri West, Mumbai - 400058",
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const verificationStatus = {
    profile: "verified",
    ekyc: "verified",
    digilocker: "verified",
    police: "pending",
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const getStatusBadge = (status) => {
    if (status === "verified") {
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName={profile.name}
        userRole="tenant"
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
              onClick={() => navigate("/tenant/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              My Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and verification status
            </p>
          </div>

          <div className="grid gap-6">
            {/* Profile Information Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Your basic profile details
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Avatar */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">Citizen / Tenant</p>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, name: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-foreground font-medium p-2 bg-muted rounded-md">
                        {profile.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Mobile Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="mobile"
                        value={editedProfile.mobile}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, mobile: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-foreground font-medium p-2 bg-muted rounded-md">
                        {profile.mobile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, email: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-foreground font-medium p-2 bg-muted rounded-md">
                        {profile.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Aadhaar Number
                    </Label>
                    <p className="text-foreground font-medium p-2 bg-muted rounded-md">
                      {profile.aadhaar}
                      <span className="text-xs text-muted-foreground ml-2">(Masked)</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.address}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, address: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium p-2 bg-muted rounded-md">
                      {profile.address}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verification Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Verification Status
                </CardTitle>
                <CardDescription>
                  Track your document and identity verification progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
                        <User className="h-5 w-5 text-success" />
                      </div>
                      {getStatusBadge(verificationStatus.profile)}
                    </div>
                    <h4 className="font-medium">Profile</h4>
                    <p className="text-xs text-muted-foreground">Basic information</p>
                  </div>

                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      {getStatusBadge(verificationStatus.ekyc)}
                    </div>
                    <h4 className="font-medium">eKYC</h4>
                    <p className="text-xs text-muted-foreground">Aadhaar-based verification</p>
                  </div>

                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
                        <FileText className="h-5 w-5 text-success" />
                      </div>
                      {getStatusBadge(verificationStatus.digilocker)}
                    </div>
                    <h4 className="font-medium">DigiLocker</h4>
                    <p className="text-xs text-muted-foreground">Document verification</p>
                  </div>

                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-10 w-10 rounded-full bg-warning-light flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-warning" />
                      </div>
                      {getStatusBadge(verificationStatus.police)}
                    </div>
                    <h4 className="font-medium">Police Verification</h4>
                    <p className="text-xs text-muted-foreground">Background check</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={() => navigate("/tenant/verification")}>
                    Complete Verification
                  </Button>
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
