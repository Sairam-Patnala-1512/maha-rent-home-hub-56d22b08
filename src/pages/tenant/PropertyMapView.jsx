import { useState, useEffect, useCallback, useMemo } from "react";
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
  ChevronRight,
  Sparkles,
  Eye,
  Home,
  TrendingUp,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertyMapView() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(11);
  const [isZooming, setIsZooming] = useState(false);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [expandedCluster, setExpandedCluster] = useState(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [mapStyle, setMapStyle] = useState("default");
  const [showDensity, setShowDensity] = useState(true);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  const CLUSTER_ZOOM_THRESHOLD = 13;
  const MIN_ZOOM = 8;
  const MAX_ZOOM = 18;

  const properties = [
    {
      id: "1",
      title: "Spacious 2 BHK with Balcony",
      address: "Near Western Express Highway",
      locality: "Andheri West",
      city: "Mumbai",
      rent: 25000,
      deposit: 75000,
      bedrooms: 2,
      bathrooms: 2,
      area: 850,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["EWS", "General"],
      coordinates: { top: 32, left: 28 },
      verified: true,
    },
    {
      id: "2",
      title: "Modern 1 BHK Studio",
      address: "Linking Road",
      locality: "Bandra West",
      city: "Mumbai",
      rent: 35000,
      deposit: 100000,
      bedrooms: 1,
      bathrooms: 1,
      area: 550,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      propertyType: "Studio",
      eligibility: ["Student", "General"],
      coordinates: { top: 38, left: 32 },
      verified: true,
    },
    {
      id: "3",
      title: "Family 3 BHK Flat",
      address: "Hiranandani Gardens",
      locality: "Powai",
      city: "Mumbai",
      rent: 55000,
      deposit: 150000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["General"],
      coordinates: { top: 28, left: 72 },
      verified: true,
    },
    {
      id: "4",
      title: "Budget 1 RK Near Station",
      address: "Near Thane Station",
      locality: "Thane West",
      city: "Thane",
      rent: 8000,
      deposit: 24000,
      bedrooms: 1,
      bathrooms: 1,
      area: 300,
      imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      propertyType: "Room",
      eligibility: ["EWS", "Migrant"],
      coordinates: { top: 22, left: 78 },
      verified: false,
    },
    {
      id: "5",
      title: "Cozy 2 BHK with Parking",
      address: "FC Road Area",
      locality: "Shivajinagar",
      city: "Pune",
      rent: 18000,
      deposit: 54000,
      bedrooms: 2,
      bathrooms: 1,
      area: 750,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["Student", "General"],
      coordinates: { top: 58, left: 18 },
      verified: true,
    },
    {
      id: "6",
      title: "Premium 2 BHK Sea View",
      address: "Carter Road",
      locality: "Bandra West",
      city: "Mumbai",
      rent: 75000,
      deposit: 225000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["General"],
      coordinates: { top: 42, left: 35 },
      verified: true,
    },
    {
      id: "7",
      title: "Affordable 1 BHK",
      address: "Near IT Park",
      locality: "Hinjewadi",
      city: "Pune",
      rent: 12000,
      deposit: 36000,
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      imageUrl: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      propertyType: "Apartment",
      eligibility: ["EWS", "General"],
      coordinates: { top: 62, left: 22 },
      verified: true,
    },
    {
      id: "8",
      title: "Luxury 3 BHK Penthouse",
      address: "Worli Sea Face",
      locality: "Worli",
      city: "Mumbai",
      rent: 150000,
      deposit: 450000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      propertyType: "Penthouse",
      eligibility: ["General"],
      coordinates: { top: 45, left: 28 },
      verified: true,
    },
  ];

  // Calculate visible properties based on zoom and pan
  const visibleProperties = useMemo(() => {
    const viewRadius = Math.max(35, 100 - (zoomLevel - MIN_ZOOM) * 6);
    return properties.filter((p) => {
      const distance = Math.sqrt(
        Math.pow(p.coordinates.top - mapCenter.y, 2) + 
        Math.pow(p.coordinates.left - mapCenter.x, 2)
      );
      return distance < viewRadius;
    });
  }, [zoomLevel, mapCenter]);

  // Generate clusters
  const { clusters, totalInClusters } = useMemo(() => {
    if (zoomLevel >= CLUSTER_ZOOM_THRESHOLD) {
      return { clusters: visibleProperties.map(p => ({ ...p, isIndividual: true })), totalInClusters: 0 };
    }
    
    const clusterRadius = 12;
    const result = [];
    const used = new Set();
    let clusteredCount = 0;
    
    visibleProperties.forEach((p, i) => {
      if (used.has(i)) return;
      
      const clusterMembers = [p];
      used.add(i);
      
      visibleProperties.forEach((other, j) => {
        if (i === j || used.has(j)) return;
        const distance = Math.sqrt(
          Math.pow(p.coordinates.top - other.coordinates.top, 2) + 
          Math.pow(p.coordinates.left - other.coordinates.left, 2)
        );
        
        if (distance < clusterRadius) {
          clusterMembers.push(other);
          used.add(j);
        }
      });
      
      if (clusterMembers.length > 1) {
        const avgTop = clusterMembers.reduce((sum, m) => sum + m.coordinates.top, 0) / clusterMembers.length;
        const avgLeft = clusterMembers.reduce((sum, m) => sum + m.coordinates.left, 0) / clusterMembers.length;
        const avgRent = clusterMembers.reduce((sum, m) => sum + m.rent, 0) / clusterMembers.length;
        clusteredCount += clusterMembers.length;
        result.push({
          id: `cluster-${i}`,
          members: clusterMembers,
          coordinates: { top: avgTop, left: avgLeft },
          count: clusterMembers.length,
          avgRent,
        });
      } else {
        result.push({ ...p, isIndividual: true });
      }
    });
    
    return { clusters: result, totalInClusters: clusteredCount };
  }, [visibleProperties, zoomLevel]);

  // Zoom handlers with smooth transition
  const handleZoom = useCallback((direction) => {
    const newZoom = direction === 'in' 
      ? Math.min(zoomLevel + 1, MAX_ZOOM)
      : Math.max(zoomLevel - 1, MIN_ZOOM);
    
    if (newZoom !== zoomLevel) {
      setIsZooming(true);
      setZoomLevel(newZoom);
      setTimeout(() => setIsZooming(false), 400);
    }
  }, [zoomLevel]);

  const handlePinClick = useCallback((property) => {
    setSelectedProperty((prev) => (prev?.id === property.id ? null : property));
    setExpandedCluster(null);
  }, []);

  const handleMapClick = useCallback((e) => {
    if (e.target === e.currentTarget || e.target.closest('[data-map-bg]')) {
      setSelectedProperty(null);
      setExpandedCluster(null);
    }
  }, []);

  const handleRecenter = useCallback(() => {
    setMapCenter({ x: 50, y: 50 });
    setZoomLevel(11);
    setIsZooming(true);
    setExpandedCluster(null);
    setSelectedProperty(null);
    setTimeout(() => setIsZooming(false), 400);
  }, []);

  const handleClusterClick = useCallback((cluster) => {
    if (expandedCluster?.id === cluster.id) {
      setExpandedCluster(null);
    } else {
      setExpandedCluster(cluster);
      setZoomLevel(CLUSTER_ZOOM_THRESHOLD);
      setIsZooming(true);
      setTimeout(() => setIsZooming(false), 400);
    }
  }, [expandedCluster]);

  // Pan handling
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button') || e.target.closest('[data-pin]')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isPanning) return;
    const dx = (e.clientX - panStart.x) * 0.1;
    const dy = (e.clientY - panStart.y) * 0.1;
    setMapCenter(prev => ({
      x: Math.max(20, Math.min(80, prev.x - dx)),
      y: Math.max(20, Math.min(80, prev.y - dy)),
    }));
    setPanStart({ x: e.clientX, y: e.clientY });
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    handleZoom(e.deltaY < 0 ? 'in' : 'out');
  }, [handleZoom]);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    const showControls = () => {
      setControlsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setControlsVisible(false), 4000);
    };
    
    window.addEventListener('mousemove', showControls);
    showControls();
    
    return () => {
      window.removeEventListener('mousemove', showControls);
      clearTimeout(timeout);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProperty(null);
        setExpandedCluster(null);
      }
      if (e.key === "+" || e.key === "=") handleZoom('in');
      if (e.key === "-") handleZoom('out');
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleZoom]);

  const zoomProgress = ((zoomLevel - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100;
  const mapScale = 1 + (zoomLevel - 11) * 0.08;

  // Price formatting
  const formatPrice = (price) => {
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
    return `₹${price}`;
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Premium Header Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-background via-background/95 to-transparent pb-8 pointer-events-none">
          <div className="pointer-events-auto bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate("/tenant/properties")}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                  
                  <div className="h-6 w-px bg-border hidden sm:block" />
                  
                  {/* Property Stats */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                      <div className="relative">
                        <Home className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse" />
                      </div>
                      <span className="text-sm font-semibold">{visibleProperties.length}</span>
                      <span className="text-xs text-primary/80 hidden sm:inline">Properties</span>
                    </div>
                    
                    {totalInClusters > 0 && zoomLevel < CLUSTER_ZOOM_THRESHOLD && (
                      <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                        <Sparkles className="h-3 w-3" />
                        <span>Zoom in to explore clusters</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={mapStyle === 'default' ? 'ghost' : 'outline'}
                    size="sm"
                    onClick={() => setMapStyle(prev => prev === 'default' ? 'satellite' : 'default')}
                    className="hidden sm:flex gap-1.5"
                  >
                    <Layers className="h-4 w-4" />
                    <span className="text-xs">{mapStyle === 'default' ? 'Map' : 'Satellite'}</span>
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 shadow-lg"
                    onClick={() => navigate("/tenant/properties")}
                  >
                    <List className="h-4 w-4" />
                    <span>List View</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Screen Map Canvas */}
        <div 
          className={cn(
            "flex-1 relative overflow-hidden cursor-grab select-none",
            isPanning && "cursor-grabbing"
          )}
          onClick={handleMapClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Premium Maharashtra Map Background */}
          <div 
            data-map-bg
            className={cn(
              "absolute inset-0 transition-transform ease-out",
              isZooming ? "duration-500" : "duration-200"
            )}
            style={{ 
              transform: `scale(${mapScale}) translate(${(50 - mapCenter.x) * 0.5}%, ${(50 - mapCenter.y) * 0.5}%)`,
            }}
          >
            {/* Base gradient - subtle warm tone */}
            <div className={cn(
              "absolute inset-0 transition-colors duration-500",
              mapStyle === 'default' 
                ? "bg-gradient-to-br from-[hsl(40,15%,96%)] via-[hsl(35,12%,94%)] to-[hsl(45,10%,91%)]"
                : "bg-gradient-to-br from-[hsl(200,20%,25%)] via-[hsl(180,15%,30%)] to-[hsl(160,10%,28%)]"
            )} />
            
            {/* Premium SVG Map */}
            <svg 
              viewBox="0 0 1000 750" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={mapStyle === 'default' ? "hsl(200,40%,88%)" : "hsl(200,50%,20%)"} />
                  <stop offset="100%" stopColor={mapStyle === 'default' ? "hsl(195,35%,82%)" : "hsl(195,45%,15%)"} />
                </linearGradient>
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={mapStyle === 'default' ? "hsl(45,12%,95%)" : "hsl(140,15%,22%)"} />
                  <stop offset="100%" stopColor={mapStyle === 'default' ? "hsl(40,8%,90%)" : "hsl(135,12%,18%)"} />
                </linearGradient>
                
                {/* Glow filter for cities */}
                <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.3" />
                  <feComposite in2="blur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Arabian Sea */}
              <path
                d="M0,200 L0,750 L400,750 L350,650 Q280,580 220,500 L180,400 Q150,320 120,260 L80,200 Z"
                fill="url(#waterGradient)"
                opacity="0.6"
              />
              
              {/* Maharashtra State - Detailed boundary */}
              <path
                d="M150,120 Q220,90 320,100 L420,80 Q500,95 580,85 L680,110 Q740,140 800,180 L860,260 Q880,340 860,420 L820,500 Q760,560 680,590 L580,620 Q480,640 380,620 L280,590 Q200,550 150,480 L110,400 Q80,320 90,240 L110,180 Q130,145 150,120 Z"
                fill="url(#landGradient)"
                stroke={mapStyle === 'default' ? "hsl(var(--border))" : "hsl(180,30%,40%)"}
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              
              {/* District boundaries - Very subtle */}
              <g stroke={mapStyle === 'default' ? "hsl(var(--muted-foreground) / 0.1)" : "hsl(180,30%,35%)"} strokeWidth="0.5" fill="none">
                <path d="M320,140 Q380,200 350,280 Q300,350 360,400" />
                <path d="M480,120 Q520,200 500,300 Q480,400 540,480" />
                <path d="M620,150 Q680,240 660,350 Q640,450 700,520" />
                <path d="M200,280 Q300,300 400,280 Q500,260 600,300" />
                <path d="M180,400 Q280,420 380,400 Q480,380 580,420" />
              </g>
              
              {/* Major highways - Elegant styling */}
              <g fill="none" strokeLinecap="round">
                {/* Mumbai-Pune Expressway */}
                <path
                  d="M330,260 Q300,320 280,380 Q260,440 250,500"
                  stroke={mapStyle === 'default' ? "hsl(35,50%,70%)" : "hsl(45,40%,35%)"}
                  strokeWidth="3"
                  opacity="0.5"
                />
                {/* Mumbai-Nashik Highway */}
                <path
                  d="M340,240 Q400,200 480,180 Q560,160 640,180"
                  stroke={mapStyle === 'default' ? "hsl(35,50%,70%)" : "hsl(45,40%,35%)"}
                  strokeWidth="3"
                  opacity="0.5"
                />
                {/* Mumbai-Nagpur */}
                <path
                  d="M360,260 Q450,280 550,300 Q680,320 800,280"
                  stroke={mapStyle === 'default' ? "hsl(30,45%,75%)" : "hsl(40,35%,30%)"}
                  strokeWidth="2"
                  opacity="0.4"
                />
              </g>
              
              {/* Rivers - Elegant blue lines */}
              <g fill="none" stroke="url(#waterGradient)" strokeLinecap="round">
                <path d="M120,360 Q220,340 320,360 Q420,380 520,350 Q620,320 720,350" strokeWidth="2" opacity="0.4" />
                <path d="M400,150 Q420,250 410,350 Q400,450 380,520" strokeWidth="1.5" opacity="0.3" />
              </g>
              
              {/* Major Cities with premium markers */}
              <g className="transition-all duration-300">
                {/* Mumbai */}
                <g transform="translate(340, 260)" filter={showDensity ? "url(#cityGlow)" : undefined}>
                  <circle r="8" fill="hsl(var(--primary))" opacity="0.9" className="animate-pulse" />
                  <circle r="4" fill="hsl(var(--primary-foreground))" />
                  <text 
                    x="14" 
                    y="4" 
                    className={cn(
                      "text-[11px] font-semibold",
                      mapStyle === 'default' ? "fill-foreground" : "fill-white"
                    )}
                  >
                    Mumbai
                  </text>
                  <text x="14" y="16" className="text-[8px] fill-muted-foreground">Metro Region</text>
                </g>
                
                {/* Pune */}
                <g transform="translate(260, 460)">
                  <circle r="6" fill="hsl(var(--secondary))" opacity="0.9" />
                  <circle r="3" fill="hsl(var(--secondary-foreground))" />
                  <text 
                    x="12" 
                    y="4" 
                    className={cn(
                      "text-[10px] font-medium",
                      mapStyle === 'default' ? "fill-foreground" : "fill-white"
                    )}
                  >
                    Pune
                  </text>
                </g>
                
                {/* Nashik */}
                <g transform="translate(480, 180)">
                  <circle r="5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                  <circle r="2.5" fill="hsl(var(--background))" />
                  <text 
                    x="10" 
                    y="3" 
                    className={cn(
                      "text-[9px] font-medium",
                      mapStyle === 'default' ? "fill-muted-foreground" : "fill-white/70"
                    )}
                  >
                    Nashik
                  </text>
                </g>
                
                {/* Nagpur */}
                <g transform="translate(780, 280)">
                  <circle r="5" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                  <circle r="2.5" fill="hsl(var(--background))" />
                  <text 
                    x="10" 
                    y="3" 
                    className={cn(
                      "text-[9px] font-medium",
                      mapStyle === 'default' ? "fill-muted-foreground" : "fill-white/70"
                    )}
                  >
                    Nagpur
                  </text>
                </g>
                
                {/* Thane */}
                <g transform="translate(380, 230)">
                  <circle r="4" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                  <text 
                    x="8" 
                    y="3" 
                    className={cn(
                      "text-[8px]",
                      mapStyle === 'default' ? "fill-muted-foreground" : "fill-white/60"
                    )}
                  >
                    Thane
                  </text>
                </g>
              </g>
              
              {/* Density heatmap overlay */}
              {showDensity && (
                <g opacity="0.15">
                  <circle cx="340" cy="260" r="80" fill="hsl(var(--primary))" />
                  <circle cx="260" cy="460" r="50" fill="hsl(var(--secondary))" />
                </g>
              )}
            </svg>
            
            {/* Subtle grid overlay */}
            <div 
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                zoomLevel > 12 ? "opacity-10" : "opacity-5"
              )}
              style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)
                `,
                backgroundSize: `${80 / mapScale}px ${80 / mapScale}px`
              }} 
            />
            
            {/* Premium vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
          </div>

          {/* Property Pins Layer */}
          <div 
            className={cn(
              "absolute inset-0 transition-transform ease-out pointer-events-none",
              isZooming ? "duration-500" : "duration-200"
            )}
            style={{ 
              transform: `translate(${(50 - mapCenter.x) * 0.5}%, ${(50 - mapCenter.y) * 0.5}%)`,
            }}
          >
            {clusters.map((item) => {
              // Cluster Pin
              if (!item.isIndividual && item.members) {
                const isExpanded = expandedCluster?.id === item.id;
                
                return (
                  <div
                    key={item.id}
                    data-pin
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ 
                      top: `${item.coordinates.top}%`, 
                      left: `${item.coordinates.left}%`,
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClusterClick(item);
                      }}
                      className={cn(
                        "relative flex flex-col items-center group transition-all duration-300",
                        "hover:scale-110",
                        isExpanded && "scale-115"
                      )}
                    >
                      {/* Cluster bubble with premium styling */}
                      <div className={cn(
                        "relative flex items-center justify-center transition-all duration-300",
                        "w-14 h-14 rounded-full shadow-xl",
                        "bg-gradient-to-br from-primary via-primary to-primary-dark",
                        "ring-4 ring-primary/20 group-hover:ring-primary/40",
                        isExpanded && "ring-primary/50 shadow-primary/30"
                      )}>
                        <div className="text-center">
                          <span className="font-bold text-primary-foreground text-lg">{item.count}</span>
                        </div>
                        
                        {/* Animated ring */}
                        <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-30" />
                        <div className="absolute inset-[-4px] rounded-full border-2 border-primary/30 animate-pulse" />
                      </div>
                      
                      {/* Avg price indicator */}
                      <div className="mt-1.5 px-2 py-0.5 bg-card/95 backdrop-blur-sm rounded-full shadow-md text-xs font-medium text-foreground border border-border/50">
                        Avg {formatPrice(item.avgRent)}
                      </div>
                    </button>
                  </div>
                );
              }
              
              // Individual Property Pin
              const property = item;
              const isHovered = hoveredProperty === property.id;
              const isSelected = selectedProperty?.id === property.id;
              const hasSelection = selectedProperty !== null;
              const isDimmed = hasSelection && !isSelected && !isHovered;
              
              return (
                <div
                  key={property.id}
                  data-pin
                  className={cn(
                    "absolute z-20 transform -translate-x-1/2 -translate-y-full pointer-events-auto",
                    "transition-all duration-300 ease-out",
                    isSelected && "z-40",
                    isDimmed && "opacity-35 scale-85 saturate-50"
                  )}
                  style={{ 
                    top: `${property.coordinates.top}%`, 
                    left: `${property.coordinates.left}%`,
                  }}
                  onMouseEnter={() => setHoveredProperty(property.id)}
                  onMouseLeave={() => setHoveredProperty(null)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePinClick(property);
                    }}
                    className={cn(
                      "relative flex flex-col items-center group transition-all duration-300",
                      isHovered && !isSelected && "scale-110 -translate-y-1",
                      isSelected && "scale-120 -translate-y-2"
                    )}
                  >
                    {/* Premium Price Tag */}
                    <div className={cn(
                      "relative px-3 py-2 rounded-xl font-bold text-sm shadow-xl transition-all duration-300",
                      "backdrop-blur-sm",
                      isSelected
                        ? "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground ring-4 ring-primary/30 shadow-primary/40"
                        : isHovered
                          ? "bg-card text-primary border-2 border-primary shadow-2xl ring-2 ring-primary/20"
                          : "bg-card/95 text-foreground border border-border shadow-lg group-hover:shadow-xl"
                    )}>
                      <span className="relative z-10">{formatPrice(property.rent)}</span>
                      
                      {/* Verified badge */}
                      {property.verified && !isDimmed && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-success rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    
                    {/* Pin pointer */}
                    <div className={cn(
                      "w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent transition-all duration-300",
                      isSelected
                        ? "border-t-primary"
                        : isHovered
                          ? "border-t-primary/90"
                          : "border-t-card/95"
                    )} />
                    
                    {/* Ground shadow */}
                    <div className={cn(
                      "rounded-full bg-foreground/20 mt-1 transition-all duration-300",
                      isSelected ? "w-6 h-2" : isHovered ? "w-5 h-1.5" : "w-4 h-1"
                    )} />
                    
                    {/* Selection pulse */}
                    {isSelected && (
                      <>
                        <div className="absolute -inset-6 rounded-full border-2 border-primary/30 animate-ping pointer-events-none" />
                        <div className="absolute -inset-4 rounded-full border border-primary/20 animate-pulse pointer-events-none" />
                      </>
                    )}
                  </button>

                  {/* Hover Preview Card */}
                  {isHovered && !isSelected && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                      <Card className="w-64 shadow-2xl border-primary/20 bg-card/98 backdrop-blur-xl overflow-hidden">
                        <div className="h-24 relative overflow-hidden">
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <Badge className="absolute bottom-2 left-2" variant="secondary">
                            {property.propertyType}
                          </Badge>
                        </div>
                        <CardContent className="p-3">
                          <p className="font-semibold text-sm truncate">{property.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {property.locality}, {property.city}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Bed className="h-3 w-3" />
                              {property.bedrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath className="h-3 w-3" />
                              {property.bathrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <Square className="h-3 w-3" />
                              {property.area} sqft
                            </span>
                          </div>
                          <div className="mt-2 pt-2 border-t flex items-center justify-between">
                            <span className="text-primary font-bold">{formatPrice(property.rent)}/mo</span>
                            <span className="text-xs text-primary flex items-center gap-0.5">
                              Click to view <ChevronRight className="h-3 w-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {visibleProperties.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <Card className="bg-card/98 backdrop-blur-xl shadow-2xl max-w-sm pointer-events-auto">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No Properties Here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Zoom out or pan the map to discover available properties across Maharashtra
                  </p>
                  <Button onClick={handleRecenter} className="gap-2">
                    <Navigation className="h-4 w-4" />
                    Reset View
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Premium Zoom Controls */}
          <div className={cn(
            "absolute bottom-32 right-4 z-30 transition-all duration-500",
            controlsVisible ? "opacity-100 translate-x-0" : "opacity-50 translate-x-1 hover:opacity-100 hover:translate-x-0"
          )}>
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-1.5 flex flex-col gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-10 w-10 rounded-xl transition-all",
                  zoomLevel >= MAX_ZOOM 
                    ? "opacity-40 cursor-not-allowed" 
                    : "hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= MAX_ZOOM}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              
              {/* Zoom level indicator */}
              <div className="px-2 py-3 flex flex-col items-center gap-2">
                <div className="h-20 w-1.5 bg-muted rounded-full overflow-hidden relative">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-300 rounded-full"
                    style={{ height: `${zoomProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">{zoomLevel}x</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-10 w-10 rounded-xl transition-all",
                  zoomLevel <= MIN_ZOOM 
                    ? "opacity-40 cursor-not-allowed" 
                    : "hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= MIN_ZOOM}
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Additional Controls */}
          <div className={cn(
            "absolute bottom-32 left-4 z-30 flex flex-col gap-2 transition-all duration-500",
            controlsVisible ? "opacity-100 translate-x-0" : "opacity-50 -translate-x-1 hover:opacity-100 hover:translate-x-0"
          )}>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 bg-card/95 backdrop-blur-xl shadow-lg rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary"
              onClick={handleRecenter}
            >
              <Locate className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "h-10 w-10 bg-card/95 backdrop-blur-xl shadow-lg rounded-xl transition-colors",
                showDensity && "bg-primary/10 border-primary/50 text-primary"
              )}
              onClick={() => setShowDensity(!showDensity)}
            >
              <TrendingUp className="h-5 w-5" />
            </Button>
          </div>

          {/* Map Attribution */}
          <div className="absolute bottom-4 right-4 text-[10px] text-muted-foreground/70 bg-card/80 backdrop-blur-sm px-2.5 py-1 rounded-lg z-20">
            <span className="font-medium">Maharashtra, India</span> • MHADA Portal
          </div>

          {/* Selected Property Detail Card */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[420px] z-40 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <Card className="shadow-2xl ring-1 ring-primary/20 overflow-hidden bg-card/98 backdrop-blur-xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm h-9 w-9 text-white hover:bg-destructive hover:text-destructive-foreground rounded-xl"
                      onClick={() => setSelectedProperty(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge className="bg-primary/90 text-primary-foreground shadow-lg">
                        {selectedProperty.propertyType}
                      </Badge>
                      {selectedProperty.verified && (
                        <Badge variant="secondary" className="bg-success/90 text-success-foreground shadow-lg">
                          <Eye className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(selectedProperty.rent)}
                        </span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-xl mb-1">{selectedProperty.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-4">
                      <MapPin className="h-4 w-4 text-primary" />
                      {selectedProperty.address}, {selectedProperty.locality}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-xl mb-4">
                      <div className="text-center">
                        <Bed className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="font-semibold">{selectedProperty.bedrooms}</p>
                        <p className="text-xs text-muted-foreground">Beds</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <Bath className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="font-semibold">{selectedProperty.bathrooms}</p>
                        <p className="text-xs text-muted-foreground">Baths</p>
                      </div>
                      <div className="text-center">
                        <Square className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="font-semibold">{selectedProperty.area}</p>
                        <p className="text-xs text-muted-foreground">Sq.ft</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {selectedProperty.eligibility.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedProperty(null)}
                      >
                        Close
                      </Button>
                      <Button 
                        className="flex-1 gap-2 shadow-lg"
                        onClick={() => navigate(`/tenant/properties/${selectedProperty.id}`)}
                      >
                        View Details
                        <ChevronRight className="h-4 w-4" />
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
