import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Shield,
  Home,
  Sofa,
  Car,
  Zap,
  Droplets,
  Wind,
  Wifi,
  Building,
  Users,
  Clock,
  Play,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MessageSquare,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  BadgeCheck,
  Info,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [language, setLanguage] = useState("en");
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Modal states
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleConfirmed, setScheduleConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const property = {
    id: id || "1",
    title: "Spacious 2 BHK with Balcony",
    address: "Near Western Express Highway, Andheri West",
    locality: "Andheri West",
    city: "Mumbai",
    pincode: "400053",
    rent: 25000,
    deposit: 75000,
    maintenance: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 850,
    floor: "5th of 12",
    facing: "East",
    age: "5 Years",
    furnishing: "Semi-Furnished",
    availability: "Immediate",
    propertyType: "Apartment",
    eligibility: ["EWS", "General"],
    verificationStatus: "verified",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
    amenities: [
      { icon: Car, name: "Parking", available: true },
      { icon: Building, name: "Lift", available: true },
      { icon: Zap, name: "Power Backup", available: true },
      { icon: Shield, name: "24/7 Security", available: true },
      { icon: Droplets, name: "Water Supply", available: true },
      { icon: Wind, name: "AC", available: true },
      { icon: Wifi, name: "Internet Ready", available: true },
      { icon: Sofa, name: "Furnished", available: true },
    ],
    description: `This beautiful 2 BHK apartment offers a perfect blend of comfort and convenience. Located in the heart of Andheri West, it provides easy access to the Western Express Highway, making commuting a breeze.

The apartment features spacious rooms with ample natural light, modern fixtures, and a well-designed layout. The master bedroom comes with an attached bathroom, while the second bedroom is perfect for guests or as a home office.

The semi-furnished setup includes essential furniture, modular kitchen with chimney, and wardrobes in both bedrooms. The society offers excellent amenities including a swimming pool, gym, and children's play area.`,
    landlord: {
      name: "Mr. Rajesh Patel",
      verified: true,
      responseTime: "Usually responds within 2 hours",
      memberSince: "2020",
      propertiesListed: 5,
      phone: "+91 98XXX XXXXX",
    },
    nearbyPlaces: [
      { name: "Andheri Metro Station", distance: "500m" },
      { name: "D-Mart Supermarket", distance: "200m" },
      { name: "HDFC Bank ATM", distance: "100m" },
      { name: "Apollo Hospital", distance: "1.2km" },
      { name: "St. Xavier's School", distance: "800m" },
    ],
    verification: {
      verifiedBy: "MHADA / Government Authority",
      verificationType: "Property ownership & listing details",
      verificationDate: "Dec 10, 2024",
    },
    coordinates: {
      lat: 19.1334,
      lng: 72.8263,
    },
  };

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleScheduleVisit = () => {
    if (selectedDate && selectedTime) {
      setScheduleConfirmed(true);
    }
  };

  const handleSendMessage = () => {
    if (contactMessage.trim()) {
      setMessageSent(true);
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Rahul Sharma"
        userRole="tenant"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative aspect-[16/10] rounded-xl overflow-hidden group">
              <img
                src={property.images[currentImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-sm">
                {currentImage + 1} / {property.images.length}
              </div>

              <div className="absolute top-4 left-4">
                <StatusBadge status={property.verificationStatus} />
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center transition-colors",
                    isFavorite && "text-destructive"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
                </button>
                <button className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center">
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx + 1)}
                  className={cn(
                    "aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all",
                    currentImage === idx + 1 ? "border-primary" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              <button 
                className="aspect-[4/3] rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
                onClick={() => setVirtualTourOpen(true)}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Virtual Tour</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant="default">{property.propertyType}</Badge>
                  {property.eligibility.map((tag) => (
                    <Badge key={tag} variant="info">{tag}</Badge>
                  ))}
                  <Badge variant="success">{property.furnishing}</Badge>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {property.title}
                  </h1>
                  {/* Verified Property Badge */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/30 cursor-help">
                        <BadgeCheck className="h-4 w-4 text-success" />
                        <span className="text-xs font-medium text-success">Verified Property</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-success" />
                          <span className="font-semibold text-sm">Property Verification</span>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Verified by:</span>
                            <span className="font-medium">{property.verification.verifiedBy}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-medium">{property.verification.verificationType}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{property.verification.verificationDate}</span>
                          </p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{property.address}, {property.city} - {property.pincode}</span>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Bed className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{property.bedrooms}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Bath className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{property.bathrooms}</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Square className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{property.area}</p>
                      <p className="text-sm text-muted-foreground">Sq. Ft.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{property.floor.split(" ")[0]}</p>
                      <p className="text-sm text-muted-foreground">Floor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About This Property</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {property.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Property Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Home className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Property Type</p>
                            <p className="font-medium">{property.propertyType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Building className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Floor</p>
                            <p className="font-medium">{property.floor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Square className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Carpet Area</p>
                            <p className="font-medium">{property.area} sq.ft</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Sofa className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Furnishing</p>
                            <p className="font-medium">{property.furnishing}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Property Age</p>
                            <p className="font-medium">{property.age}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Availability</p>
                            <p className="font-medium">{property.availability}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="amenities" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Amenities & Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {property.amenities.map((amenity) => (
                          <div
                            key={amenity.name}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-lg border",
                              amenity.available ? "bg-success/5 border-success/20" : "bg-muted/50"
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              amenity.available ? "bg-success/10" : "bg-muted"
                            )}>
                              <amenity.icon className={cn(
                                "h-5 w-5",
                                amenity.available ? "text-success" : "text-muted-foreground"
                              )} />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{amenity.name}</p>
                              {amenity.available && (
                                <p className="text-xs text-success">Available</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Location & Nearby</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Interactive Map Section */}
                      <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-primary animate-pulse" />
                          <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-primary" />
                          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-muted-foreground" />
                        </div>
                        <div className="relative z-10 text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                            <MapPin className="h-8 w-8 text-primary" />
                          </div>
                          <h4 className="font-semibold mb-1">{property.locality}, {property.city}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{property.address}</p>
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="outline" size="sm">
                              <ZoomIn className="h-4 w-4 mr-1" />
                              Zoom In
                            </Button>
                            <Button variant="outline" size="sm">
                              <ZoomOut className="h-4 w-4 mr-1" />
                              Zoom Out
                            </Button>
                            <Button size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Open in Maps
                            </Button>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium mb-3">Nearby Places</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {property.nearbyPlaces.map((place, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <span className="text-sm">{place.name}</span>
                            <Badge variant="outline">{place.distance}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="floorplan" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">Floor plan not available</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary">₹{property.rent.toLocaleString()}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Security Deposit: ₹{property.deposit.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Maintenance: ₹{property.maintenance.toLocaleString()}/month
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" onClick={() => navigate(`/tenant/apply/${property.id}`)}>
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={() => setContactModalOpen(true)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Landlord
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={() => setScheduleModalOpen(true)}>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{property.landlord.name}</h4>
                        {property.landlord.verified && (
                          <Badge variant="success" className="text-[10px]">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{property.landlord.responseTime}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Member since {property.landlord.memberSince}</p>
                    <p>{property.landlord.propertiesListed} properties listed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Virtual Tour Modal */}
      <Dialog open={virtualTourOpen} onOpenChange={setVirtualTourOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Virtual Tour
            </DialogTitle>
            <DialogDescription>360° walkthrough of {property.title}</DialogDescription>
          </DialogHeader>
          
          {/* Virtual Tour Viewer */}
          <div className="relative aspect-video rounded-lg bg-gradient-to-br from-muted via-muted/80 to-muted overflow-hidden">
            {/* Mock 360 View */}
            <div className="absolute inset-0">
              <img
                src={property.images[0]}
                alt="Virtual Tour View"
                className="w-full h-full object-cover"
              />
              {/* Overlay for 360 effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
            </div>
            
            {/* Room Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium">
              Living Room
            </div>
            
            {/* Hotspot Indicators */}
            <button className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center animate-pulse hover:bg-primary transition-colors">
              <span className="text-primary-foreground text-xs font-bold">1</span>
            </button>
            <button className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center animate-pulse hover:bg-primary transition-colors" style={{ animationDelay: '0.5s' }}>
              <span className="text-primary-foreground text-xs font-bold">2</span>
            </button>
            <button className="absolute bottom-1/3 left-1/2 w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center animate-pulse hover:bg-primary transition-colors" style={{ animationDelay: '1s' }}>
              <span className="text-primary-foreground text-xs font-bold">3</span>
            </button>
            
            {/* Center Play Icon for Demo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-card/80 backdrop-blur-sm rounded-xl p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium">360° Virtual Tour</p>
                <p className="text-xs text-muted-foreground mt-1">Click hotspots to explore rooms</p>
              </div>
            </div>
            
            {/* Tour Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2">
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Zoom Out">
                <ZoomOut className="h-4 w-4" />
              </button>
              <div className="w-px h-6 bg-border" />
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Rotate Left">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Rotate Right">
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="w-px h-6 bg-border" />
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Zoom In">
                <ZoomIn className="h-4 w-4" />
              </button>
              <div className="w-px h-6 bg-border" />
              <button className="p-2 hover:bg-muted rounded-full transition-colors" title="Fullscreen">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
            
            {/* Room Navigator */}
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 space-y-1">
              <button className="w-full px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                Living Room
              </button>
              <button className="w-full px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors">
                Bedroom 1
              </button>
              <button className="w-full px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors">
                Bedroom 2
              </button>
              <button className="w-full px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors">
                Kitchen
              </button>
              <button className="w-full px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors">
                Bathroom
              </button>
            </div>
          </div>
          
          {/* Tour Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Use controls to navigate • Click hotspots to explore</p>
            <p className="text-xs">Demo Mode - PoC Placeholder</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Landlord Modal */}
      <Dialog open={contactModalOpen} onOpenChange={(open) => { setContactModalOpen(open); if (!open) { setMessageSent(false); setContactMessage(""); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Landlord</DialogTitle>
            <DialogDescription>Get in touch with {property.landlord.name}</DialogDescription>
          </DialogHeader>
          {messageSent ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Message Sent!</h4>
              <p className="text-sm text-muted-foreground">The landlord will respond within 24-48 hours.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone (Masked)</p>
                    <p className="text-xs text-muted-foreground">{property.landlord.phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Send a Message</Label>
                  <Textarea placeholder="Hi, I'm interested in this property..." value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setContactModalOpen(false)}>Cancel</Button>
                <Button onClick={handleSendMessage} disabled={!contactMessage.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Visit Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={(open) => { setScheduleModalOpen(open); if (!open) { setScheduleConfirmed(false); setSelectedDate(null); setSelectedTime(""); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule a Visit</DialogTitle>
            <DialogDescription>Select a date and time to visit this property</DialogDescription>
          </DialogHeader>
          {scheduleConfirmed ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Visit Scheduled!</h4>
              <p className="text-sm text-muted-foreground">{format(selectedDate, "PPP")} at {selectedTime}</p>
              <p className="text-xs text-muted-foreground mt-2">You'll receive a confirmation shortly.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Select Date</Label>
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date()} className="rounded-md border pointer-events-auto" />
                </div>
                <div>
                  <Label className="mb-2 block">Select Time</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button key={time} variant={selectedTime === time ? "default" : "outline"} size="sm" onClick={() => setSelectedTime(time)} className="text-xs">
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>Cancel</Button>
                <Button onClick={handleScheduleVisit} disabled={!selectedDate || !selectedTime}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Confirm Visit
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}