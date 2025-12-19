import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Map,
  Building2,
  Users,
  Home,
  Filter,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

export default function GISMapView() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const districts = [
    { id: "mumbai-city", name: "Mumbai City", properties: 3245, vacant: 782, occupied: 2463 },
    { id: "mumbai-suburban", name: "Mumbai Suburban", properties: 2567, vacant: 456, occupied: 2111 },
    { id: "thane", name: "Thane", properties: 1823, vacant: 342, occupied: 1481 },
    { id: "pune", name: "Pune", properties: 1456, vacant: 198, occupied: 1258 },
    { id: "nagpur", name: "Nagpur", properties: 876, vacant: 234, occupied: 642 },
  ];

  const mapLegend = [
    { color: "bg-success", label: "Occupied", count: 7955 },
    { color: "bg-warning", label: "Vacant", count: 2012 },
    { color: "bg-primary", label: "Under Review", count: 575 },
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                GIS Property Map
              </h1>
              <p className="text-muted-foreground mt-1">
                Geographic view of properties across Maharashtra
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="vacant">Vacant Only</SelectItem>
                  <SelectItem value="occupied">Occupied Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[600px] bg-gradient-to-br from-primary/5 to-info/5">
                    {/* Mock Map Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-24 w-24 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">
                          Interactive GIS Map View
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Maharashtra State Property Distribution
                        </p>
                      </div>
                    </div>

                    {/* Mock Property Markers */}
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-success rounded-full animate-pulse shadow-lg" title="Mumbai City" />
                    <div className="absolute top-1/3 left-1/2 w-5 h-5 bg-success rounded-full animate-pulse shadow-lg" title="Mumbai Suburban" />
                    <div className="absolute top-[40%] left-[55%] w-4 h-4 bg-warning rounded-full animate-pulse shadow-lg" title="Thane" />
                    <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-success rounded-full animate-pulse shadow-lg" title="Nagpur" />
                    <div className="absolute bottom-1/3 left-[45%] w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg" title="Pune" />
                    <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-warning rounded-full animate-pulse shadow-lg" title="Nashik" />

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button size="icon" variant="secondary" className="shadow-md">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="shadow-md">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="shadow-md">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="shadow-md">
                        <Layers className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 p-4 bg-background/95 backdrop-blur rounded-lg shadow-lg">
                      <p className="text-sm font-medium mb-2">Legend</p>
                      <div className="space-y-2">
                        {mapLegend.map((item) => (
                          <div key={item.label} className="flex items-center gap-2 text-sm">
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            <span>{item.label}</span>
                            <span className="text-muted-foreground">({item.count.toLocaleString()})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">District Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {districts.map((district) => (
                    <div
                      key={district.id}
                      className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedDistrict(district.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{district.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {district.properties.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          {district.occupied}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-warning rounded-full" />
                          {district.vacant}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">Total Properties</span>
                    </div>
                    <span className="font-semibold">10,542</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-success" />
                      <span className="text-sm">Occupancy Rate</span>
                    </div>
                    <span className="font-semibold text-success">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-info" />
                      <span className="text-sm">Active Tenants</span>
                    </div>
                    <span className="font-semibold">52,341</span>
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
