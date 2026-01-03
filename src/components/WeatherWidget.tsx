import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: "sunny" | "cloudy" | "rainy";
  windSpeed: number;
  forecast: { day: string; temp: number; condition: string }[];
}

interface WeatherWidgetProps {
  data: WeatherData;
}

const conditionIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

const WeatherWidget = ({ data }: WeatherWidgetProps) => {
  const ConditionIcon = conditionIcons[data.condition];

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-water" />
          Weather Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-water/10 rounded-2xl">
              <ConditionIcon className="h-10 w-10 text-water" />
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">
                {data.temperature}°C
              </div>
              <p className="text-muted-foreground capitalize">{data.condition}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-water" />
              <span className="text-muted-foreground">{data.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{data.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="border-t border-border pt-4">
          <p className="text-sm font-medium text-muted-foreground mb-3">5-Day Forecast</p>
          <div className="grid grid-cols-5 gap-2">
            {data.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground mb-1">{day.day}</p>
                <Thermometer className="h-4 w-4 mx-auto text-warning mb-1" />
                <p className="text-sm font-semibold text-foreground">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
