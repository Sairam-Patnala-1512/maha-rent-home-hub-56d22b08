import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  List,
  X,
  ZoomIn,
  ZoomOut,
  Locate,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertyMapView() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);

  const properties = [
    {
      id: "1",
      title: "Spacious 2 BHK with Balcony",
      address: "Near Western Express Highway",
      locality: "Andheri West",
      rent: 25000,
      deposit: 75000,
      bedrooms: 2,
      bathrooms: 2,
      area: 850,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["EWS", "General"],
      coordinates: { top: "35%", left: "25%" },
    },
    {
      id: "2",
      title: "Modern 1 BHK Studio",
      address: "Linking Road",
      locality: "Bandra West",
      rent: 35000,
      deposit: 100000,
      bedrooms: 1,
      bathrooms: 1,
      area: 550,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      propertyType: "Studio",
      eligibility: ["Student", "General"],
      coordinates: { top: "45%", left: "35%" },
    },
    {
      id: "3",
      title: "Family 3 BHK Flat",
      address: "Hiranandani Gardens",
      locality: "Powai",
      rent: 55000,
      deposit: 150000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["General"],
      coordinates: { top: "30%", left: "70%" },
    },
    {
      id: "4",
      title: "Budget 1 RK Near Station",
      address: "Near Thane Station",
      locality: "Thane West",
      rent: 8000,
      deposit: 24000,
      bedrooms: 1,
      bathrooms: 1,
      area: 300,
      imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      propertyType: "Room",
      eligibility: ["EWS", "Migrant"],
      coordinates: { top: "20%", left: "80%" },
    },
    {
      id: "5",
      title: "Cozy 2 BHK with Parking",
      address: "FC Road Area",
      locality: "Pune",
      rent: 18000,
      deposit: 54000,
      bedrooms: 2,
      bathrooms: 1,
      area: 750,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["Student", "General"],
      coordinates: { top: "60%", left: "15%" },
    },
    {
      id: "6",
      title: "Premium 2 BHK Sea View",
      address: "Carter Road",
      locality: "Bandra West",
      rent: 75000,
      deposit: 225000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["General"],
      coordinates: { top: "50%", left: "50%" },
    },
  ];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 8));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 flex flex-col">
        {/* Header Bar */}
        <div className="bg-card border-b px-4 py-3">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/properties")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">{properties.length} Properties on Map</h1>
              </div>
            </div>
            <Button
              variant="govOutline"
              size="sm"
              onClick={() => navigate("/tenant/properties")}
            >
              <List className="h-4 w-4 mr-1" />
              List View
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted/30 to-primary/10">
            {/* Grid lines to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }} />
            </div>
            
            {/* Simulated roads */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted-foreground/10 transform -translate-y-1/2" />
            <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-muted-foreground/10" />
            <div className="absolute top-0 bottom-0 right-1/4 w-1 bg-muted-foreground/5" />
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-muted-foreground/5" />
            
            {/* Map attribution */}
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
              Map data © MHADA Portal (Demo)
            </div>
          </div>

          {/* Property Pins */}
          {properties.map((property) => (
            <div
              key={property.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200"
              style={{ top: property.coordinates.top, left: property.coordinates.left }}
              onMouseEnter={() => setHoveredProperty(property.id)}
              onMouseLeave={() => setHoveredProperty(null)}
              onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
            >
              {/* Pin */}
              <div className={cn(
                "relative flex flex-col items-center",
                (hoveredProperty === property.id || selectedProperty?.id === property.id) && "scale-110"
              )}>
                {/* Price Tag */}
                <div className={cn(
                  "px-2 py-1 rounded-lg font-semibold text-xs shadow-lg transition-colors",
                  selectedProperty?.id === property.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border"
                )}>
                  ₹{(property.rent / 1000).toFixed(0)}K
                </div>
                
                {/* Pin Point */}
                <div className={cn(
                  "w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent",
                  selectedProperty?.id === property.id
                    ? "border-t-primary"
                    : "border-t-card"
                )} />
                
                {/* Pin Shadow */}
                <div className="w-3 h-1 rounded-full bg-foreground/20 mt-1" />
              </div>

              {/* Hover Card */}
              {hoveredProperty === property.id && selectedProperty?.id !== property.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20">
                  <Card className="w-48 shadow-lg">
                    <CardContent className="p-3">
                      <p className="font-medium text-sm truncate">{property.title}</p>
                      <p className="text-xs text-muted-foreground">{property.locality}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="h-3 w-3" />
                          {property.area} sqft
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
            <Button variant="outline" size="icon" className="bg-card shadow-md" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-card shadow-md" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-card shadow-md">
              <Locate className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-card shadow-md">
              <Layers className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-sm z-20">
            <span className="text-muted-foreground">Zoom:</span>{" "}
            <span className="font-medium">{zoomLevel}x</span>
          </div>

          {/* Selected Property Card */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-30">
              <Card className="shadow-xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm h-8 w-8"
                      onClick={() => setSelectedProperty(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      <Badge variant="default">{selectedProperty.propertyType}</Badge>
                      {selectedProperty.eligibility.slice(0, 1).map((tag) => (
                        <Badge key={tag} variant="info">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{selectedProperty.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                      <MapPin className="h-3.5 w-3.5" />
                      {selectedProperty.address}, {selectedProperty.locality}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {selectedProperty.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {selectedProperty.bathrooms} Bath
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        {selectedProperty.area} sqft
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          ₹{selectedProperty.rent.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <Button onClick={() => navigate(`/tenant/properties/${selectedProperty.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
