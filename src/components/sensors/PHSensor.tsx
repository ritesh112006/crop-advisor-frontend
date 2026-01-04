import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

interface PHSensorProps {
  value: number;
}

const PHSensor = ({ value }: PHSensorProps) => {
  const getStatus = (val: number) => {
    if (val < 5.5) return { text: "Acidic", color: "text-orange-500" };
    if (val > 7.5) return { text: "Alkaline", color: "text-blue-500" };
    return { text: "Neutral", color: "text-primary" };
  };

  const status = getStatus(value);

  return (
    <Card variant="sensor">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <FlaskConical className="w-5 h-5 text-purple-500" />
          pH Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className={`text-sm ${status.color}`}>{status.text}</p>
      </CardContent>
    </Card>
  );
};

export default PHSensor;
