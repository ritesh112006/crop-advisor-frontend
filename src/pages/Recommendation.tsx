import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Droplets,
  Thermometer,
  Leaf,
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  IndianRupee
} from "lucide-react";

interface CropDetails {
  name: string;
  confidence: number;
  yieldRange: string;
  sowingTime: string;
  fertilizer: string;
  waterRequirement: string;
  growthDuration: string;
  soilType: string;
  marketPrice: string;
  explanation: string;
}

interface RecommendationResult {
  primaryCrop: CropDetails;
  alternativeCrops: CropDetails[];
}

const CropDetailCard = ({ 
  crop, 
  rank, 
  isPrimary = false 
}: { 
  crop: CropDetails; 
  rank: number; 
  isPrimary?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(isPrimary);

  return (
    <Card 
      variant="elevated" 
      className={`transition-all duration-300 ${
        isPrimary 
          ? "border-2 border-primary/30 bg-primary/5" 
          : "hover:border-primary/20"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPrimary ? "bg-primary/20" : "bg-muted"
            }`}>
              {isPrimary ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : (
                <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
              )}
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {crop.name}
                {isPrimary && (
                  <Badge variant="success" className="text-xs">Best Match</Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {crop.confidence}% confidence match
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Sowing Time</p>
                <p className="text-sm font-medium">{crop.sowingTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
              <TrendingUp className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Expected Yield</p>
                <p className="text-sm font-medium">{crop.yieldRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Growth Duration</p>
                <p className="text-sm font-medium">{crop.growthDuration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
              <Droplets className="h-4 w-4 text-water" />
              <div>
                <p className="text-xs text-muted-foreground">Water Needed</p>
                <p className="text-sm font-medium">{crop.waterRequirement}</p>
              </div>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Leaf className="h-5 w-5 text-leaf mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Fertilizer Recommendation</p>
                <p className="text-sm text-muted-foreground">{crop.fertilizer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Sprout className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Suitable Soil Type</p>
                <p className="text-sm text-muted-foreground">{crop.soilType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <IndianRupee className="h-5 w-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Market Price (MSP)</p>
                <p className="text-sm text-muted-foreground">{crop.marketPrice}</p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="pt-2 border-t">
            <p className="text-sm font-medium text-foreground mb-1">Why this crop?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {crop.explanation}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const Recommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    location: "",
    season: "",
  });
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock recommendation result
    setResult({
      primaryCrop: {
        name: "Wheat",
        confidence: 92,
        yieldRange: "3.5 - 4.2 tonnes/hectare",
        sowingTime: "November 15 - December 10",
        fertilizer: "DAP (100 kg/ha) at sowing, Urea (150 kg/ha) in two splits",
        waterRequirement: "450-650 mm",
        growthDuration: "120-150 days",
        soilType: "Loamy, Clay loam",
        marketPrice: "₹2,125 - ₹2,275 per quintal",
        explanation: "Based on your soil parameters and weather conditions, wheat is the most suitable crop. The nitrogen levels are adequate, and the expected rainfall during the growing season matches wheat's water requirements. The temperature range is optimal for vegetative growth.",
      },
      alternativeCrops: [
        {
          name: "Barley",
          confidence: 85,
          yieldRange: "2.8 - 3.5 tonnes/hectare",
          sowingTime: "October 25 - November 25",
          fertilizer: "NPK (60:40:20 kg/ha)",
          waterRequirement: "350-500 mm",
          growthDuration: "110-130 days",
          soilType: "Sandy loam, Loamy",
          marketPrice: "₹1,850 - ₹2,100 per quintal",
          explanation: "Barley is drought-tolerant and performs well in your soil conditions. It requires less water than wheat and can be harvested earlier, making it suitable for areas with limited irrigation.",
        },
        {
          name: "Chickpea",
          confidence: 78,
          yieldRange: "1.5 - 2.0 tonnes/hectare",
          sowingTime: "October 15 - November 15",
          fertilizer: "DAP (20 kg/ha), Rhizobium culture",
          waterRequirement: "250-400 mm",
          growthDuration: "90-120 days",
          soilType: "Sandy loam, Black soil",
          marketPrice: "₹5,230 - ₹5,500 per quintal",
          explanation: "Chickpea is a legume that fixes nitrogen in the soil, improving fertility for subsequent crops. It has low water requirements and high market value, making it economically attractive.",
        },
        {
          name: "Mustard",
          confidence: 72,
          yieldRange: "1.2 - 1.8 tonnes/hectare",
          sowingTime: "October 1 - October 25",
          fertilizer: "NPK (80:40:40 kg/ha), Sulfur 40 kg/ha",
          waterRequirement: "200-350 mm",
          growthDuration: "110-140 days",
          soilType: "Loamy, Sandy loam",
          marketPrice: "₹5,050 - ₹5,450 per quintal",
          explanation: "Mustard is well-suited for your region's climate and requires minimal irrigation. The oil content and market demand make it a profitable choice for the Rabi season.",
        },
      ],
    });

    setIsLoading(false);
  };

  const handleUseSensorData = () => {
    setFormData({
      nitrogen: "45",
      phosphorus: "32",
      potassium: "58",
      temperature: "28",
      humidity: "72",
      ph: "6.5",
      rainfall: "850",
      location: "Hyderabad, Telangana",
      season: "rabi",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <h1 className="page-title">Crop Recommendation</h1>
          <p className="page-description">
            Get AI-powered crop suggestions based on your soil and weather conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Enter Farm Details
              </CardTitle>
              <CardDescription>
                Provide your soil parameters and location for accurate recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quick Fill Button */}
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleUseSensorData}
                >
                  <Zap className="h-4 w-4" />
                  Use IoT Sensor Data
                </Button>

                {/* NPK Values */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-leaf" />
                    Soil Nutrients (NPK)
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="nitrogen" className="text-xs">Nitrogen (mg/kg)</Label>
                      <Input
                        id="nitrogen"
                        type="number"
                        placeholder="45"
                        value={formData.nitrogen}
                        onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phosphorus" className="text-xs">Phosphorus (mg/kg)</Label>
                      <Input
                        id="phosphorus"
                        type="number"
                        placeholder="32"
                        value={formData.phosphorus}
                        onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="potassium" className="text-xs">Potassium (mg/kg)</Label>
                      <Input
                        id="potassium"
                        type="number"
                        placeholder="58"
                        value={formData.potassium}
                        onChange={(e) => handleInputChange("potassium", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Environmental Conditions */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-warning" />
                    Environmental Conditions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="temperature" className="text-xs">Temperature (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        placeholder="28"
                        value={formData.temperature}
                        onChange={(e) => handleInputChange("temperature", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="humidity" className="text-xs">Humidity (%)</Label>
                      <Input
                        id="humidity"
                        type="number"
                        placeholder="72"
                        value={formData.humidity}
                        onChange={(e) => handleInputChange("humidity", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ph" className="text-xs">Soil pH</Label>
                      <Input
                        id="ph"
                        type="number"
                        step="0.1"
                        placeholder="6.5"
                        value={formData.ph}
                        onChange={(e) => handleInputChange("ph", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rainfall" className="text-xs">Rainfall (mm/year)</Label>
                      <Input
                        id="rainfall"
                        type="number"
                        placeholder="850"
                        value={formData.rainfall}
                        onChange={(e) => handleInputChange("rainfall", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Location & Season */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-destructive" />
                    Location & Season
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="location" className="text-xs">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="season" className="text-xs">Season</Label>
                      <Select
                        value={formData.season}
                        onValueChange={(value) => handleInputChange("season", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                          <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                          <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get Recommendation
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recommendation Results */}
          <div className="space-y-4">
            {result ? (
              <>
                {/* Primary Crop */}
                <CropDetailCard 
                  crop={result.primaryCrop} 
                  rank={1} 
                  isPrimary={true} 
                />

                {/* Alternative Crops Section */}
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-muted-foreground" />
                    Alternative Crops
                  </h3>
                  <div className="space-y-3">
                    {result.alternativeCrops.map((crop, index) => (
                      <CropDetailCard 
                        key={crop.name}
                        crop={crop} 
                        rank={index + 2} 
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Card variant="flat" className="h-full flex items-center justify-center bg-muted/30">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Sprout className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Recommendation Yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your farm details on the left to get AI-powered crop recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recommendation;