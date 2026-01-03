import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  message: string;
  severity: "low" | "medium" | "high" | "info";
  action?: string;
  time?: string;
}

const severityConfig = {
  low: {
    icon: Info,
    borderColor: "border-l-info",
    iconColor: "text-info",
    bgColor: "bg-info/5",
  },
  medium: {
    icon: AlertCircle,
    borderColor: "border-l-warning",
    iconColor: "text-warning",
    bgColor: "bg-warning/5",
  },
  high: {
    icon: AlertTriangle,
    borderColor: "border-l-destructive",
    iconColor: "text-destructive",
    bgColor: "bg-destructive/5",
  },
  info: {
    icon: CheckCircle,
    borderColor: "border-l-success",
    iconColor: "text-success",
    bgColor: "bg-success/5",
  },
};

const AlertCard = ({ title, message, severity, action, time }: AlertCardProps) => {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Card 
      variant="alert" 
      className={cn(config.borderColor, config.bgColor)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("p-2 rounded-lg bg-card", config.iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-semibold text-foreground truncate">{title}</h4>
              {time && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{message}</p>
            {action && (
              <p className="text-sm font-medium text-primary">
                💡 {action}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
