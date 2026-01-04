import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

interface NPKSensorProps {
  data: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

const NPKSensor = ({ data }: NPKSensorProps) => {
  return (
    <Card variant="sensor">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Leaf className="w-5 h-5 text-primary" />
          NPK Levels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Nitrogen (N)</span>
          <span className="font-semibold">{data.nitrogen} mg/kg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Phosphorus (P)</span>
          <span className="font-semibold">{data.phosphorus} mg/kg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Potassium (K)</span>
          <span className="font-semibold">{data.potassium} mg/kg</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NPKSensor;
