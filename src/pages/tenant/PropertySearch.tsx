import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Map,
} from "lucide-react";

export default function PropertySearch() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Mock properties data
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
    },
  ];

  const localities = [
    "All Locations",
    "Andheri West",
    "Andheri East",
    "Bandra West",
    "Bandra East",
    "Powai",
    "Thane",
    "Pune",
    "Navi Mumbai",
  ];

  const propertyTypes = ["All Types", "Apartment", "Studio", "Room", "House", "PG"];
  const budgetRanges = ["Any Budget", "Under ₹10K", "₹10K - ₹25K", "₹25K - ₹50K", "₹50K+"];
  const eligibilityCategories = ["EWS", "Student", "Migrant", "Senior Citizen", "General"];

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
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
        {/* Search Header */}
        <div className="bg-gradient-hero py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
              Find Your Perfect Rental Home
            </h1>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location, landmark, or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card"
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48 h-12 bg-card">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {localities.map((loc) => (
                    <SelectItem key={loc} value={loc.toLowerCase().replace(" ", "-")}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-40 h-12 bg-card">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select defaultValue="any">
                <SelectTrigger className="w-full md:w-40 h-12 bg-card">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range.toLowerCase().replace(/[₹\s+]/g, "")}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="hero" size="lg" className="h-12">
                <Search className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
              <Card className="sticky top-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                      Clear All
                    </Button>
                  </div>

                  {/* Eligibility Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Eligibility Category</h4>
                    <div className="space-y-2">
                      {eligibilityCategories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <Checkbox
                            id={cat}
                            checked={selectedFilters.includes(cat)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFilters([...selectedFilters, cat]);
                              } else {
                                removeFilter(cat);
                              }
                            }}
                          />
                          <label htmlFor={cat} className="text-sm cursor-pointer">
                            {cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BHK Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">BHK Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {["1 RK", "1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((bhk) => (
                        <Button
                          key={bhk}
                          variant={selectedFilters.includes(bhk) ? "default" : "outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            if (selectedFilters.includes(bhk)) {
                              removeFilter(bhk);
                            } else {
                              setSelectedFilters([...selectedFilters, bhk]);
                            }
                          }}
                        >
                          {bhk}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Furnishing Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Furnishing</h4>
                    <div className="space-y-2">
                      {["Furnished", "Semi-Furnished", "Unfurnished"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label htmlFor={type} className="text-sm cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities Filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Amenities</h4>
                    <div className="space-y-2">
                      {["Parking", "Lift", "Power Backup", "Security", "Gym"].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox id={amenity} />
                          <label htmlFor={amenity} className="text-sm cursor-pointer">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    {properties.length} Properties Found
                  </h2>
                  {selectedFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedFilters.map((filter) => (
                        <Badge key={filter} variant="secondary" className="gap-1">
                          {filter}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeFilter(filter)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                  </Button>
                  
                  <Button
                    variant="govOutline"
                    size="sm"
                    onClick={() => navigate("/tenant/properties/map")}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Map View
                  </Button>
                  
                  <div className="hidden sm:flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    variant="tenant"
                    onView={() => navigate(`/tenant/properties/${property.id}`)}
                    onApply={() => navigate(`/tenant/apply/${property.id}`)}
                    onFavorite={() => console.log("Favorite:", property.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
