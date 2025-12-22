import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Globe,
  Bell,
  Shield,
  Save,
  Mail,
  Smartphone,
  FileText,
} from "lucide-react";

export default function TenantSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  
  const [settings, setSettings] = useState({
    language: "en",
    notifications: {
      email: true,
      sms: true,
      applicationUpdates: true,
      agreementReminders: true,
      promotionalMessages: false,
    },
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleNotificationChange = (key, value) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    });
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
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your language, notifications, and privacy preferences
            </p>
          </div>

          <div className="grid gap-6">
            {/* Language Preference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Language Preference
                </CardTitle>
                <CardDescription>
                  Choose your preferred language for the portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={settings.language}
                  onValueChange={(value) =>
                    setSettings({ ...settings, language: value })
                  }
                  className="grid gap-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="en" id="lang-en" />
                    <Label htmlFor="lang-en" className="flex-1 cursor-pointer">
                      <span className="font-medium">English</span>
                      <p className="text-sm text-muted-foreground">
                        Use English as the display language
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="mr" id="lang-mr" />
                    <Label htmlFor="lang-mr" className="flex-1 cursor-pointer">
                      <span className="font-medium">मराठी (Marathi)</span>
                      <p className="text-sm text-muted-foreground">
                        मराठी भाषेत पोर्टल वापरा
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how you receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Communication Channels */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Communication Channels</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-info-light flex items-center justify-center">
                          <Mail className="h-5 w-5 text-info" />
                        </div>
                        <div>
                          <Label className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates via email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("email", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <Label className="font-medium">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates via SMS
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("sms", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Notification Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label className="font-medium">Application Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Status changes for your rental applications
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.applicationUpdates}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("applicationUpdates", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label className="font-medium">Agreement Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Rent due dates and agreement renewals
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.agreementReminders}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("agreementReminders", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label className="font-medium">Promotional Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          New properties and special offers
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.promotionalMessages}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("promotionalMessages", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Consent */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Consent
                </CardTitle>
                <CardDescription>
                  Information about how your data is handled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Data Protection</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your personal data is protected under the Digital Personal Data
                        Protection Act, 2023. MHADA collects and processes your data solely
                        for providing rental housing services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Consent Given</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You have consented to share your Aadhaar, DigiLocker documents,
                        and undergo police verification for the purpose of tenant verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-info-light border border-info/20">
                  <p className="text-sm text-info">
                    To withdraw consent or request data deletion, please contact MHADA
                    helpline at 022-66405000 or email privacy@mhada.gov.in
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
