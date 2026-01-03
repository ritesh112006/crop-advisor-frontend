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
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Droplets,
  Thermometer,
  Leaf,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface RecommendationResult {
  crop: string;
  confidence: number;
  yieldRange: string;
  sowingTime: string;
  fertilizer: string;
  explanation: string;
  alternativeCrops: { name: string; confidence: number }[];
}

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
      crop: "Wheat",
      confidence: 92,
      yieldRange: "3.5 - 4.2 tonnes/hectare",
      sowingTime: "November 15 - December 10",
      fertilizer: "DAP (100 kg/ha) at sowing, Urea (150 kg/ha) in two splits",
      explanation: "Based on your soil parameters and weather conditions, wheat is the most suitable crop. The nitrogen levels are adequate, and the expected rainfall during the growing season matches wheat's water requirements. The temperature range is optimal for vegetative growth.",
      alternativeCrops: [
        { name: "Barley", confidence: 85 },
        { name: "Chickpea", confidence: 78 },
        { name: "Mustard", confidence: 72 },
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

          {/* Recommendation Result */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Main Recommendation */}
                <Card variant="elevated" className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Recommended Crop
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                        <Sprout className="h-10 w-10 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">{result.crop}</h2>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
                        <span className="text-sm font-medium text-success">
                          {result.confidence}% Confidence
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Best Sowing Time</p>
                          <p className="text-sm text-muted-foreground">{result.sowingTime}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                        <Droplets className="h-5 w-5 text-water mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Expected Yield</p>
                          <p className="text-sm text-muted-foreground">{result.yieldRange}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                        <Leaf className="h-5 w-5 text-leaf mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Fertilizer Recommendation</p>
                          <p className="text-sm text-muted-foreground">{result.fertilizer}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Explanation */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base">Why This Crop?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.explanation}
                    </p>
                  </CardContent>
                </Card>

                {/* Alternative Crops */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-base">Alternative Crops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.alternativeCrops.map((crop, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                              {index + 2}
                            </span>
                            <span className="font-medium text-foreground">{crop.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {crop.confidence}% match
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
