import { useState, useEffect, useCallback } from "react";
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
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertyMapView() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isZooming, setIsZooming] = useState(false);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [visibleProperties, setVisibleProperties] = useState([]);

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

  // Simulate visibility based on zoom level
  useEffect(() => {
    const calculateVisibleProperties = () => {
      // At higher zoom levels, fewer properties are "in view"
      const visibilityRadius = Math.max(30, 100 - (zoomLevel - 8) * 10);
      const visible = properties.filter((p) => {
        const top = parseFloat(p.coordinates.top);
        const left = parseFloat(p.coordinates.left);
        const distance = Math.sqrt(
          Math.pow(top - mapCenter.y, 2) + Math.pow(left - mapCenter.x, 2)
        );
        return distance < visibilityRadius;
      });
      setVisibleProperties(visible);
    };
    calculateVisibleProperties();
  }, [zoomLevel, mapCenter]);

  const handleZoomIn = useCallback(() => {
    if (zoomLevel >= 18) return;
    setIsZooming(true);
    setZoomLevel((prev) => Math.min(prev + 1, 18));
    setTimeout(() => setIsZooming(false), 300);
  }, [zoomLevel]);

  const handleZoomOut = useCallback(() => {
    if (zoomLevel <= 8) return;
    setIsZooming(true);
    setZoomLevel((prev) => Math.max(prev - 1, 8));
    setTimeout(() => setIsZooming(false), 300);
  }, [zoomLevel]);

  const handlePinClick = useCallback((property) => {
    setSelectedProperty((prev) => (prev?.id === property.id ? null : property));
  }, []);

  const handleMapClick = useCallback((e) => {
    // Close selected property when clicking on map background
    if (e.target === e.currentTarget || e.target.closest('[data-map-background]')) {
      setSelectedProperty(null);
    }
  }, []);

  const handleRecenter = useCallback(() => {
    setMapCenter({ x: 50, y: 50 });
    setZoomLevel(12);
    setIsZooming(true);
    setTimeout(() => setIsZooming(false), 300);
  }, []);

  // Keyboard support for closing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProperty) {
        setSelectedProperty(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProperty]);

  const zoomScale = 1 + (zoomLevel - 12) * 0.1;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 flex flex-col min-h-0">
        {/* Header Bar */}
        <div className="bg-card border-b px-4 py-3 flex-shrink-0">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/properties")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium">
                    {visibleProperties.length} {visibleProperties.length === 1 ? "Property" : "Properties"} in this area
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="govOutline"
              size="sm"
              className="relative ring-2 ring-primary/20"
              onClick={() => navigate("/tenant/properties")}
            >
              <List className="h-4 w-4 mr-1" />
              List View
            </Button>
          </div>
        </div>

        {/* Map Container - Full Height */}
        <div className="flex-1 relative overflow-hidden" onClick={handleMapClick}>
          {/* Maharashtra State Map Background */}
          <div 
            data-map-background
            className={cn(
              "absolute inset-0 transition-transform duration-500 ease-out",
              isZooming && "scale-[1.02]"
            )}
            style={{ transform: `scale(${zoomScale})` }}
          >
            {/* Base Map Layer - Neutral terrain */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(45,15%,92%)] via-[hsl(45,12%,88%)] to-[hsl(45,10%,85%)]" />
            
            {/* Maharashtra State Outline SVG */}
            <svg 
              viewBox="0 0 800 600" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* State Boundary */}
              <path
                d="M150,100 Q200,80 280,90 L350,70 Q400,85 450,75 L520,95 Q560,90 600,110 L650,130 Q680,160 700,200 L720,280 Q710,340 680,400 L650,450 Q600,480 550,490 L480,500 Q420,510 360,495 L280,480 Q220,460 180,420 L140,360 Q110,300 120,240 L130,180 Q140,140 150,100 Z"
                fill="none"
                stroke="hsl(var(--muted-foreground) / 0.3)"
                strokeWidth="3"
                strokeDasharray="8,4"
              />
              
              {/* Major Districts - Subtle fills */}
              <path
                d="M350,150 Q400,140 450,160 L480,200 Q470,250 440,280 L380,290 Q340,270 330,230 L340,180 Q345,160 350,150 Z"
                fill="hsl(var(--primary) / 0.05)"
                stroke="hsl(var(--muted-foreground) / 0.15)"
                strokeWidth="1"
              />
              <path
                d="M200,280 Q250,260 300,280 L340,330 Q330,380 290,400 L230,390 Q190,360 200,310 L200,280 Z"
                fill="hsl(var(--primary) / 0.03)"
                stroke="hsl(var(--muted-foreground) / 0.15)"
                strokeWidth="1"
              />
              <path
                d="M480,300 Q530,280 580,310 L600,370 Q580,420 540,440 L480,430 Q450,400 460,350 L480,300 Z"
                fill="hsl(var(--primary) / 0.04)"
                stroke="hsl(var(--muted-foreground) / 0.15)"
                strokeWidth="1"
              />
              
              {/* Major Highways */}
              <path
                d="M180,200 Q280,220 380,200 Q480,180 580,220 L680,260"
                fill="none"
                stroke="hsl(35,80%,55%)"
                strokeWidth="3"
                opacity="0.6"
              />
              <path
                d="M300,120 Q340,200 360,300 Q380,400 400,480"
                fill="none"
                stroke="hsl(35,80%,55%)"
                strokeWidth="3"
                opacity="0.6"
              />
              <path
                d="M500,140 Q520,240 540,340 Q560,420 550,500"
                fill="none"
                stroke="hsl(35,70%,50%)"
                strokeWidth="2"
                opacity="0.5"
              />
              
              {/* Rivers */}
              <path
                d="M120,320 Q200,300 280,320 Q360,340 440,310 Q520,280 600,300"
                fill="none"
                stroke="hsl(200,50%,70%)"
                strokeWidth="2"
                opacity="0.5"
              />
              <path
                d="M350,100 Q370,180 380,260 Q400,340 380,420"
                fill="none"
                stroke="hsl(200,50%,70%)"
                strokeWidth="1.5"
                opacity="0.4"
              />
              
              {/* City Labels */}
              <g className="text-[10px] fill-muted-foreground/60 font-medium">
                <text x="380" y="170">Mumbai</text>
                <text x="250" y="320">Pune</text>
                <text x="520" y="250">Nashik</text>
                <text x="550" y="380">Aurangabad</text>
                <text x="220" y="420">Kolhapur</text>
                <text x="600" y="180">Nagpur</text>
                <text x="450" y="130">Thane</text>
              </g>
              
              {/* City Markers */}
              <circle cx="400" cy="180" r="6" fill="hsl(var(--primary))" opacity="0.4" />
              <circle cx="270" cy="330" r="5" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="540" cy="260" r="4" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="570" cy="390" r="4" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="240" cy="430" r="4" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="620" cy="190" r="5" fill="hsl(var(--primary))" opacity="0.3" />
            </svg>
            
            {/* Grid Overlay - Subtle coordinate lines */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)
                `,
                backgroundSize: `${80 / zoomScale}px ${80 / zoomScale}px`
              }} />
            </div>
            
            {/* Terrain Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px'
              }}
            />
            
            {/* Vignette Effect for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
          </div>

          {/* Map attribution */}
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/80 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm z-10 border border-border/50">
            <span className="font-medium">Maharashtra, India</span> • MHADA Portal (Demo)
          </div>

          {/* Empty State */}
          {visibleProperties.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="bg-card/95 backdrop-blur-sm rounded-lg shadow-lg px-6 py-4 text-center max-w-xs">
                <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium text-foreground">No properties in this area</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try zooming out or panning to explore more listings
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 pointer-events-auto"
                  onClick={handleRecenter}
                >
                  <Navigation className="h-3.5 w-3.5 mr-1.5" />
                  Reset View
                </Button>
              </div>
            </div>
          )}

          {/* Property Pins */}
          {visibleProperties.map((property) => {
            const isHovered = hoveredProperty === property.id;
            const isSelected = selectedProperty?.id === property.id;
            
            return (
              <div
                key={property.id}
                className={cn(
                  "absolute z-10 transform -translate-x-1/2 -translate-y-full cursor-pointer",
                  "transition-all duration-200 ease-out",
                  isSelected && "z-30"
                )}
                style={{ 
                  top: property.coordinates.top, 
                  left: property.coordinates.left,
                }}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinClick(property);
                }}
              >
                {/* Pin */}
                <div className={cn(
                  "relative flex flex-col items-center transition-transform duration-200",
                  isHovered && !isSelected && "scale-110",
                  isSelected && "scale-125"
                )}>
                  {/* Price Tag */}
                  <div className={cn(
                    "px-2.5 py-1.5 rounded-lg font-semibold text-xs shadow-lg transition-all duration-200",
                    "hover:shadow-xl",
                    isSelected
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                      : isHovered
                        ? "bg-card text-primary border-2 border-primary shadow-primary/20"
                        : "bg-card text-foreground border hover:border-primary/50"
                  )}>
                    ₹{(property.rent / 1000).toFixed(0)}K
                  </div>
                  
                  {/* Pin Point */}
                  <div className={cn(
                    "w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent transition-colors",
                    isSelected
                      ? "border-t-primary"
                      : isHovered
                        ? "border-t-primary/70"
                        : "border-t-card"
                  )} />
                  
                  {/* Pin Shadow - Animate on hover */}
                  <div className={cn(
                    "rounded-full bg-foreground/20 mt-1 transition-all duration-200",
                    isSelected ? "w-4 h-1.5" : isHovered ? "w-3.5 h-1" : "w-3 h-1"
                  )} />

                  {/* Ripple effect for selected */}
                  {isSelected && (
                    <div className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Hover Card */}
                {isHovered && !isSelected && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Card className="w-52 shadow-xl border-primary/20">
                      <CardContent className="p-3">
                        <p className="font-medium text-sm truncate">{property.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {property.locality}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {property.bedrooms} Bed
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="h-3 w-3" />
                            {property.area} sqft
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                          <Badge variant="secondary" className="text-xs">
                            {property.propertyType}
                          </Badge>
                        </div>
                        <p className="text-xs text-primary mt-2 font-medium">Click to preview →</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            );
          })}

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "bg-card shadow-md transition-all",
                zoomLevel >= 18 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground"
              )}
              onClick={handleZoomIn}
              disabled={zoomLevel >= 18}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "bg-card shadow-md transition-all",
                zoomLevel <= 8 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground"
              )}
              onClick={handleZoomOut}
              disabled={zoomLevel <= 8}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="h-px bg-border my-1" />
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-card shadow-md hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={handleRecenter}
            >
              <Locate className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-card shadow-md hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Level Indicator */}
          <div className={cn(
            "absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md text-sm z-20 transition-all duration-200",
            isZooming && "ring-2 ring-primary/50"
          )}>
            <span className="text-muted-foreground">Zoom:</span>{" "}
            <span className="font-medium">{zoomLevel}x</span>
            <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${((zoomLevel - 8) / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Mobile Property Count */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:hidden z-20">
            <div className="bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-sm flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{visibleProperties.length} Properties</span>
            </div>
          </div>

          {/* Selected Property Card */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-30 animate-in slide-in-from-bottom-4 duration-300">
              <Card className="shadow-xl ring-1 ring-primary/20">
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
                      className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm h-8 w-8 hover:bg-destructive hover:text-destructive-foreground transition-colors"
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