import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calendar,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [language, setLanguage] = useState("en");
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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
    },
    nearbyPlaces: [
      { name: "Andheri Metro Station", distance: "500m" },
      { name: "D-Mart Supermarket", distance: "200m" },
      { name: "HDFC Bank ATM", distance: "100m" },
      { name: "Apollo Hospital", distance: "1.2km" },
      { name: "St. Xavier's School", distance: "800m" },
    ],
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
              <button className="aspect-[4/3] rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center gap-2 hover:bg-muted/80 transition-colors">
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
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>
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
                      <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center mb-6">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Map view</p>
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
                    <Button variant="outline" className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Landlord
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
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
    </div>
  );
}