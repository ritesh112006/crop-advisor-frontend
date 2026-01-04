import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface MoistureSensorProps {
  value: number;
}

const MoistureSensor = ({ value }: MoistureSensorProps) => {
  const getStatus = (val: number) => {
    if (val < 30) return { text: "Low", color: "text-destructive" };
    if (val > 70) return { text: "High", color: "text-blue-500" };
    return { text: "Optimal", color: "text-primary" };
  };

  const status = getStatus(value);

  return (
    <Card variant="sensor">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Droplets className="w-5 h-5 text-blue-500" />
          Soil Moisture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}%</div>
        <p className={`text-sm ${status.color}`}>{status.text}</p>
      </CardContent>
    </Card>
  );
};

export default MoistureSensor;
