import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status?: "good" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  colorClass?: string;
}

const statusColors = {
  good: "text-success",
  warning: "text-warning",
  critical: "text-destructive",
};

const SensorCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = "good",
  colorClass = "bg-primary/10 text-primary"
}: SensorCardProps) => {
  return (
    <Card variant="sensor" className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-3xl font-bold tracking-tight", statusColors[status])}>
                {value}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {unit}
              </span>
            </div>
          </div>
          <div className={cn("p-3 rounded-xl", colorClass)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
