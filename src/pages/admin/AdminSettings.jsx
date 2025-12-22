import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Globe,
  Bell,
  Shield,
  Save,
  Mail,
  AlertTriangle,
  Clock,
  Lock,
  Monitor,
} from "lucide-react";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  
  const [settings, setSettings] = useState({
    language: "en",
    notifications: {
      email: true,
      grievanceAlerts: true,
      systemAlerts: true,
      dailyDigest: true,
      weeklyReports: true,
    },
  });

  const sessionInfo = {
    currentSession: "Active",
    lastActivity: "Just now",
    sessionTimeout: "30 minutes",
    ipAddress: "192.168.1.xxx",
    browser: "Chrome 120.0",
  };

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
        userName="Sanjeev Kumar"
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
              Admin Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your language, notifications, and view session information
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
                  Choose your preferred language for the admin portal
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
                  Control alerts and notifications for administrative actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Communication Channel */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Communication Channel</h4>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-info-light flex items-center justify-center">
                        <Mail className="h-5 w-5 text-info" />
                      </div>
                      <div>
                        <Label className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive official updates via email
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
                </div>

                {/* Alert Types */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Alert Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-warning-light flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <Label className="font-medium">Grievance Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            New grievances and escalations
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.grievanceAlerts}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("grievanceAlerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label className="font-medium">System Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Security and system notifications
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.systemAlerts}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("systemAlerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label className="font-medium">Daily Digest</Label>
                        <p className="text-sm text-muted-foreground">
                          Summary of daily activities
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.dailyDigest}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("dailyDigest", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label className="font-medium">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive weekly analytics
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.weeklyReports}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("weeklyReports", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session & Security Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Session & Security
                </CardTitle>
                <CardDescription>
                  Current session information (read-only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Current Session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">Active</Badge>
                      <span className="text-xs text-muted-foreground">
                        {sessionInfo.browser}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Session Timeout</span>
                    </div>
                    <p className="text-sm">{sessionInfo.sessionTimeout}</p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">IP Address</span>
                    </div>
                    <p className="text-sm font-mono">{sessionInfo.ipAddress}</p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Last Activity</span>
                    </div>
                    <p className="text-sm">{sessionInfo.lastActivity}</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-info-light border border-info/20">
                  <p className="text-sm text-info">
                    For security policy changes or access modifications, please contact
                    the IT Security team at security@mhada.gov.in
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
