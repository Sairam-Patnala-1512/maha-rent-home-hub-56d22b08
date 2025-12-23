import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  Calendar,
  FileText,
  Building2,
  Users,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Monthly trends data
const monthlyTrendsData = [
  { month: "Jul", properties: 145, users: 89, agreements: 67 },
  { month: "Aug", properties: 178, users: 112, agreements: 89 },
  { month: "Sep", properties: 156, users: 98, agreements: 78 },
  { month: "Oct", properties: 189, users: 134, agreements: 102 },
  { month: "Nov", properties: 212, users: 156, agreements: 118 },
  { month: "Dec", properties: 234, users: 178, agreements: 134 },
];

// Distribution data
const distributionData = [
  { name: "Active", value: 456, color: "hsl(142, 76%, 36%)" },
  { name: "Pending", value: 234, color: "hsl(45, 93%, 47%)" },
  { name: "Expired", value: 123, color: "hsl(0, 84%, 60%)" },
  { name: "Draft", value: 89, color: "hsl(215, 20%, 65%)" },
];

export default function Reports() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const reportCategories = [
    {
      id: "properties",
      title: "Property Reports",
      description: "Listings, occupancy, and inventory analysis",
      icon: Building2,
      reports: [
        { name: "Monthly Property Listings", date: "Dec 2024", downloads: 234 },
        { name: "Occupancy Rate Analysis", date: "Dec 2024", downloads: 189 },
        { name: "District-wise Inventory", date: "Dec 2024", downloads: 156 },
      ],
    },
    {
      id: "users",
      title: "User Reports",
      description: "Tenant and landlord registration analytics",
      icon: Users,
      reports: [
        { name: "New Registrations Report", date: "Dec 2024", downloads: 312 },
        { name: "Verification Status Report", date: "Dec 2024", downloads: 267 },
        { name: "User Activity Summary", date: "Dec 2024", downloads: 198 },
      ],
    },
    {
      id: "agreements",
      title: "Agreement Reports",
      description: "Rental agreement statistics and compliance",
      icon: FileCheck,
      reports: [
        { name: "Active Agreements Summary", date: "Dec 2024", downloads: 421 },
        { name: "Agreement Completion Rate", date: "Dec 2024", downloads: 356 },
        { name: "Renewal Analysis", date: "Dec 2024", downloads: 289 },
      ],
    },
    {
      id: "grievances",
      title: "Grievance Reports",
      description: "Complaint resolution and SLA metrics",
      icon: AlertTriangle,
      reports: [
        { name: "Monthly Grievance Summary", date: "Dec 2024", downloads: 178 },
        { name: "Resolution Time Analysis", date: "Dec 2024", downloads: 145 },
        { name: "Category-wise Breakdown", date: "Dec 2024", downloads: 134 },
      ],
    },
  ];

  const quickStats = [
    { label: "Reports Generated", value: "1,247", change: "+12%" },
    { label: "Downloads This Month", value: "3,456", change: "+8%" },
    { label: "Scheduled Reports", value: "24", change: "+2" },
    { label: "Custom Reports", value: "18", change: "+5" },
  ];

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
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Reports & Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Generate and download platform reports
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="govOutline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Custom Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-xs text-success font-medium">{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report Categories */}
          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Properties</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="agreements" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Agreements</span>
              </TabsTrigger>
              <TabsTrigger value="grievances" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Grievances</span>
              </TabsTrigger>
            </TabsList>

            {reportCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.reports.map((report) => (
                        <div
                          key={report.name}
                          className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{report.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {report.date} • {report.downloads} downloads
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button variant="govOutline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Analytics Overview */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrendsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="properties" name="Properties" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="users" name="Users" fill="hsl(215, 76%, 56%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="agreements" name="Agreements" fill="hsl(280, 65%, 60%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Distribution Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
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
