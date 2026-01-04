import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

interface TempHumiditySensorProps {
  data: {
    temperature: number;
    humidity: number;
  };
}

const TempHumiditySensor = ({ data }: TempHumiditySensorProps) => {
  return (
    <Card variant="sensor">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Thermometer className="w-5 h-5 text-orange-500" />
          Temp & Humidity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Temperature</span>
          <span className="font-semibold">{data.temperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Humidity</span>
          <span className="font-semibold">{data.humidity}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempHumiditySensor;
