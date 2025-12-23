import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Users,
  FileText,
  AlertTriangle,
  Map,
  TrendingUp,
  Clock,
  CheckCircle2,
  Shield,
  Activity,
  BarChart3,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");

  const stats = {
    totalProperties: 10542,
    activeListings: 7823,
    registeredTenants: 52341,
    registeredLandlords: 8234,
    activeAgreements: 25421,
    pendingVerifications: 234,
    openGrievances: 45,
    resolvedGrievances: 1234,
  };

  const districtData = [
    { name: "Mumbai City", properties: 3245, occupancy: 78 },
    { name: "Mumbai Suburban", properties: 2567, occupancy: 82 },
    { name: "Thane", properties: 1823, occupancy: 75 },
    { name: "Pune", properties: 1456, occupancy: 85 },
    { name: "Nagpur", properties: 876, occupancy: 68 },
  ];

  const recentActivities = [
    { id: 1, action: "New property listed", user: "Amit Patel", time: "5 min ago", type: "property" },
    { id: 2, action: "Agreement signed", user: "Rahul Sharma", time: "12 min ago", type: "agreement" },
    { id: 3, action: "Grievance resolved", user: "Admin Team", time: "25 min ago", type: "grievance" },
    { id: 4, action: "Verification completed", user: "Priya Desai", time: "1 hour ago", type: "verification" },
    { id: 5, action: "New tenant registered", user: "Vikram Singh", time: "2 hours ago", type: "user" },
  ];

  const propertyDistributionData = [
    { name: "Mumbai City", properties: 3245, verified: 2890, pending: 355 },
    { name: "Mumbai Suburban", properties: 2567, verified: 2234, pending: 333 },
    { name: "Thane", properties: 1823, verified: 1567, pending: 256 },
    { name: "Pune", properties: 1456, verified: 1298, pending: 158 },
    { name: "Nagpur", properties: 876, verified: 756, pending: 120 },
    { name: "Nashik", properties: 342, verified: 289, pending: 53 },
    { name: "Aurangabad", properties: 233, verified: 198, pending: 35 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))'];

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Maharashtra Rental Housing Portal - Overview
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="govOutline" onClick={() => navigate("/admin/map")}>
                <Map className="h-4 w-4 mr-2" />
                GIS View
              </Button>
              <Button onClick={() => navigate("/admin/reports")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Properties"
              value={stats.totalProperties.toLocaleString()}
              subtitle={`${stats.activeListings.toLocaleString()} active listings`}
              icon={Building2}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Registered Users"
              value={(stats.registeredTenants + stats.registeredLandlords).toLocaleString()}
              subtitle={`${stats.registeredTenants.toLocaleString()} tenants`}
              icon={Users}
              variant="primary"
            />
            <StatsCard
              title="Active Agreements"
              value={stats.activeAgreements.toLocaleString()}
              subtitle="Digital rental agreements"
              icon={FileText}
              variant="accent"
            />
            <StatsCard
              title="Pending Actions"
              value={stats.pendingVerifications + stats.openGrievances}
              subtitle="Require attention"
              icon={AlertTriangle}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="districts">Districts</TabsTrigger>
                      <TabsTrigger value="trends">Trends</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                            <span className="text-lg font-bold text-success">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Verification Rate</span>
                            <span className="text-lg font-bold text-info">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Grievance Resolution</span>
                            <span className="text-lg font-bold text-warning">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Agreement Completion</span>
                            <span className="text-lg font-bold text-primary">94%</span>
                          </div>
                          <Progress value={94} className="h-2" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="districts" className="mt-4">
                      <div className="space-y-3">
                        {districtData.map((district) => (
                          <div
                            key={district.name}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/admin/districts/${district.name.toLowerCase().replace(" ", "-")}`)}
                          >
                            <div>
                              <p className="font-medium">{district.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {district.properties.toLocaleString()} properties
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{district.occupancy}%</p>
                              <p className="text-xs text-muted-foreground">Occupancy</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="trends" className="mt-4">
                      <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                        <div className="text-center text-muted-foreground">
                          <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Trend visualization coming soon</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Property Distribution</CardTitle>
                      <CardDescription>GIS Map View of Maharashtra</CardDescription>
                    </div>
                    <Button variant="govOutline" size="sm" onClick={() => navigate("/admin/map")}>
                      <Map className="h-4 w-4 mr-1" />
                      Full Map
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={propertyDistributionData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          angle={-35}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis 
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value, name) => [value.toLocaleString(), name === 'verified' ? 'Verified' : name === 'pending' ? 'Pending' : 'Total']}
                        />
                        <Legend 
                          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                          formatter={(value) => value === 'verified' ? 'Verified Properties' : 'Pending Verification'}
                        />
                        <Bar dataKey="verified" stackId="a" fill="hsl(var(--success))" name="verified" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="pending" stackId="a" fill="hsl(var(--warning))" name="pending" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-warning-light flex items-center justify-center">
                        <Clock className="h-4 w-4 text-warning" />
                      </div>
                      <span className="text-sm">Pending Verifications</span>
                    </div>
                    <span className="font-semibold">{stats.pendingVerifications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-destructive-light flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                      <span className="text-sm">Open Grievances</span>
                    </div>
                    <span className="font-semibold">{stats.openGrievances}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-success-light flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <span className="text-sm">Resolved This Month</span>
                    </div>
                    <span className="font-semibold">{stats.resolvedGrievances}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "property" ? "bg-primary" :
                          activity.type === "agreement" ? "bg-success" :
                          activity.type === "grievance" ? "bg-warning" :
                          "bg-info"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="success">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-8 w-8 text-success" />
                    <div>
                      <h3 className="font-semibold">System Status</h3>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">API Status</span>
                      <span className="text-success font-medium">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Database</span>
                      <span className="text-success font-medium">Healthy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Backup</span>
                      <span className="font-medium">2 hours ago</span>
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