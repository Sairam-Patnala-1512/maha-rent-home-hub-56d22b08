import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GovHeader } from "@/components/shared/GovHeader";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Home,
  Image,
  CheckCircle2,
  Upload,
  Plus,
  X,
} from "lucide-react";

export default function AddProperty() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Basic Details", icon: Building2 },
    { id: 2, title: "Rooms & Amenities", icon: Home },
    { id: 3, title: "Images & Documents", icon: Image },
    { id: 4, title: "Review & Submit", icon: CheckCircle2 },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPropertyId, setSubmittedPropertyId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    propertyCategory: "",
    propertyType: "",
    address: "",
    city: "",
    district: "",
    locality: "",
    pincode: "",
    rent: "",
    deposit: "",
    availabilityDate: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnishing: "",
    floor: "",
    totalFloors: "",
    amenities: [],
    suitableFor: [],
    description: "",
    images: [],
    declaration: false,
  });

  const suitableForOptions = [
    "Family",
    "Working Professionals",
    "Students",
    "Migrant Workers",
    "Senior Citizens",
  ];

  const amenitiesList = [
    "Parking", "Lift", "Power Backup", "Security", "Gym",
    "Swimming Pool", "Garden", "CCTV", "Water Supply 24x7", "Gas Pipeline",
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const propertyId = `PROP${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedPropertyId(propertyId);
    setIsSubmitted(true);
  };

  const toggleSuitableFor = (option) => {
    setFormData((prev) => ({
      ...prev,
      suitableFor: prev.suitableFor.includes(option)
        ? prev.suitableFor.filter((o) => o !== option)
        : [...prev.suitableFor, option],
    }));
  };

  // Step 5: Submission Confirmation
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <GovHeader
          userName="Amit Patel"
          userRole="landlord"
          onLanguageChange={setLanguage}
          currentLanguage={language}
        />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Property Submitted Successfully!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your property has been submitted for review by MHADA officials.
                </p>

                <div className="p-4 rounded-lg bg-muted/50 mb-6 inline-block">
                  <p className="text-sm text-muted-foreground">Property ID</p>
                  <p className="text-xl font-mono font-bold text-primary">{submittedPropertyId}</p>
                </div>

                <div className="p-4 rounded-lg border border-warning/30 bg-warning/5 mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                    <span className="font-medium text-warning">Status: Under Review</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Review typically takes 2-3 business days. You will receive a notification once approved.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => navigate("/landlord/properties")}>
                    <Building2 className="h-4 w-4 mr-2" />
                    View Property List
                  </Button>
                  <Button
                    variant="govOutline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setFormData({
                        title: "",
                        propertyCategory: "",
                        propertyType: "",
                        address: "",
                        city: "",
                        district: "",
                        locality: "",
                        pincode: "",
                        rent: "",
                        deposit: "",
                        availabilityDate: "",
                        bedrooms: "",
                        bathrooms: "",
                        area: "",
                        furnishing: "",
                        floor: "",
                        totalFloors: "",
                        amenities: [],
                        suitableFor: [],
                        description: "",
                        images: [],
                        declaration: false,
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader
        userName="Amit Patel"
        userRole="landlord"
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/landlord/properties")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Add New Property
            </h1>
            <p className="text-muted-foreground">
              List your property on the MHADA Rental Housing Portal
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-12 sm:w-24 mx-2 ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>

          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Property Details</CardTitle>
                <CardDescription>Enter the basic information about your property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 2 BHK Apartment in Andheri West"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Property Category</Label>
                    <Select
                      value={formData.propertyCategory}
                      onValueChange={(value) => setFormData({ ...formData, propertyCategory: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Unit Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1rk">1 RK</SelectItem>
                        <SelectItem value="1bhk">1 BHK</SelectItem>
                        <SelectItem value="2bhk">2 BHK</SelectItem>
                        <SelectItem value="3bhk">3 BHK</SelectItem>
                        <SelectItem value="4bhk">4+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="nagpur">Nagpur</SelectItem>
                        <SelectItem value="thane">Thane</SelectItem>
                        <SelectItem value="nashik">Nashik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>District</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) => setFormData({ ...formData, district: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai-city">Mumbai City</SelectItem>
                        <SelectItem value="mumbai-suburban">Mumbai Suburban</SelectItem>
                        <SelectItem value="thane">Thane</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="nagpur">Nagpur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      placeholder="e.g., Andheri West"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address with landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="400058"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Built-up Area (sq.ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="850"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rent">Monthly Rent (₹)</Label>
                    <Input
                      id="rent"
                      type="number"
                      placeholder="25000"
                      value={formData.rent}
                      onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit">Security Deposit (₹)</Label>
                    <Input
                      id="deposit"
                      type="number"
                      placeholder="75000"
                      value={formData.deposit}
                      onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availabilityDate">Availability Date</Label>
                  <Input
                    id="availabilityDate"
                    type="date"
                    value={formData.availabilityDate}
                    onChange={(e) => setFormData({ ...formData, availabilityDate: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Rooms & Amenities */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Rooms & Amenities</CardTitle>
                <CardDescription>Specify the room configuration and available amenities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 BHK</SelectItem>
                        <SelectItem value="2">2 BHK</SelectItem>
                        <SelectItem value="3">3 BHK</SelectItem>
                        <SelectItem value="4">4+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Select
                      value={formData.bathrooms}
                      onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq.ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="850"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Furnishing</Label>
                    <Select
                      value={formData.furnishing}
                      onValueChange={(value) => setFormData({ ...formData, furnishing: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="furnished">Fully Furnished</SelectItem>
                        <SelectItem value="semi">Semi Furnished</SelectItem>
                        <SelectItem value="unfurnished">Unfurnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor Number</Label>
                    <Input
                      id="floor"
                      placeholder="4"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalFloors">Total Floors</Label>
                    <Input
                      id="totalFloors"
                      placeholder="12"
                      value={formData.totalFloors}
                      onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {amenitiesList.map((amenity) => (
                      <div
                        key={amenity}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.amenities.includes(amenity)
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        <Checkbox checked={formData.amenities.includes(amenity)} />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Suitable For</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {suitableForOptions.map((option) => (
                      <div
                        key={option}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.suitableFor.includes(option)
                            ? "bg-accent/10 border-accent"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => toggleSuitableFor(option)}
                      >
                        <Checkbox checked={formData.suitableFor.includes(option)} />
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property, nearby landmarks, connectivity, etc."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Images & Documents */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Images & Floor Plan</CardTitle>
                <CardDescription>Upload property images and floor plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Property Images (Upload up to 10)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 hover:border-primary/50 cursor-pointer transition-colors"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Upload Image</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Floor Plan (Optional)</Label>
                  <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center hover:border-primary/50 cursor-pointer transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload floor plan (PDF, JPG, PNG)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Ownership Documents</Label>
                  <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center hover:border-primary/50 cursor-pointer transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload property ownership proof (PDF)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Review your property details before submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Details Section */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Basic Details</h4>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                      Edit
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title</span>
                      <span className="font-medium">{formData.title || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="capitalize font-medium">{formData.propertyCategory || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unit Type</span>
                      <span className="uppercase font-medium">{formData.propertyType || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">City / District</span>
                      <span className="capitalize font-medium">{formData.city || "-"} / {formData.district || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Locality</span>
                      <span className="font-medium">{formData.locality || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Built-up Area</span>
                      <span className="font-medium">{formData.area || "0"} sq.ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Rent</span>
                      <span className="font-medium text-primary">₹{formData.rent || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="font-medium">{formData.availabilityDate || "Immediate"}</span>
                    </div>
                  </div>
                </div>

                {/* Configuration Section */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Rooms & Amenities</h4>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                      Edit
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-medium">{formData.bedrooms || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms</span>
                      <span className="font-medium">{formData.bathrooms || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Furnishing</span>
                      <span className="capitalize font-medium">{formData.furnishing || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor</span>
                      <span className="font-medium">{formData.floor || "-"} of {formData.totalFloors || "-"}</span>
                    </div>
                  </div>
                  {formData.amenities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity) => (
                          <span key={amenity} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.suitableFor.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Suitable For</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.suitableFor.map((option) => (
                          <span key={option} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Images Section */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Images & Documents</h4>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formData.images.length > 0 
                      ? `${formData.images.length} images uploaded` 
                      : "No images uploaded (you can add them later)"}
                  </p>
                </div>

                {/* Declaration */}
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setFormData({ ...formData, declaration: !formData.declaration })}
                  >
                    <Checkbox checked={formData.declaration} className="mt-1" />
                    <div>
                      <p className="text-sm font-medium">Declaration</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        I hereby declare that all information provided is true and accurate. I am the rightful owner 
                        or authorized representative of this property and agree to comply with MHADA rental housing 
                        guidelines and Maharashtra Rent Control Act provisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm text-info">
                    <strong>Note:</strong> Your property will be reviewed by MHADA officials before going live.
                    This usually takes 2-3 business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!formData.declaration}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Submit Property
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
