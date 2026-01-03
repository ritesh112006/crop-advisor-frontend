import Navbar from "@/components/Navbar";
import AlertCard from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Filter, CheckCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Alert {
  id: number;
  title: string;
  message: string;
  severity: "low" | "medium" | "high" | "info";
  action?: string;
  time: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    title: "Heavy Rainfall Warning",
    message: "Heavy rainfall expected in your region in the next 48 hours. Rainfall may exceed 50mm.",
    severity: "high",
    action: "Delay sowing activities and ensure proper drainage in fields.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Irrigation Required",
    message: "Soil moisture levels have dropped below 40%. Your crops need watering.",
    severity: "medium",
    action: "Schedule irrigation within the next 24 hours.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Optimal Planting Window",
    message: "Weather conditions are ideal for sowing wheat. Temperature and humidity are in optimal range.",
    severity: "info",
    action: "Consider starting sowing activities this week.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 4,
    title: "Temperature Alert",
    message: "Temperature is expected to rise above 38°C tomorrow. This may stress young plants.",
    severity: "medium",
    action: "Provide shade for seedlings and increase watering frequency.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    title: "Low Nitrogen Levels",
    message: "Soil nitrogen levels are below optimal for your current crop stage.",
    severity: "low",
    action: "Apply nitrogen-rich fertilizer within the next week.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    title: "Crop Health: Good",
    message: "All monitored parameters are within healthy ranges. Continue current practices.",
    severity: "info",
    time: "3 days ago",
    read: true,
  },
];

type FilterType = "all" | "unread" | "high" | "medium" | "low";

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    if (filter === "unread") return !alert.read;
    return alert.severity === filter;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  const filterButtons: { label: string; value: FilterType; color?: string }[] = [
    { label: "All", value: "all" },
    { label: `Unread (${unreadCount})`, value: "unread" },
    { label: "High", value: "high", color: "text-destructive" },
    { label: "Medium", value: "medium", color: "text-warning" },
    { label: "Low", value: "low", color: "text-info" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="page-title flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                Alerts & Notifications
              </h1>
              <p className="page-description">
                Stay informed about weather changes, irrigation needs, and crop health
              </p>
            </div>
            <Button 
              variant="secondary" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCircle className="h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <Card variant="flat" className="mb-6 p-4 bg-muted/30">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Filter:</span>
            {filterButtons.map((btn) => (
              <Button
                key={btn.value}
                variant={filter === btn.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(btn.value)}
                className={cn(
                  filter !== btn.value && btn.color
                )}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Alert Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="sensor" className="border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-destructive">
                {alerts.filter((a) => a.severity === "high").length}
              </p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
          <Card variant="sensor" className="border-l-4 border-l-warning">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-warning">
                {alerts.filter((a) => a.severity === "medium").length}
              </p>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </CardContent>
          </Card>
          <Card variant="sensor" className="border-l-4 border-l-info">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-info">
                {alerts.filter((a) => a.severity === "low").length}
              </p>
              <p className="text-sm text-muted-foreground">Low Priority</p>
            </CardContent>
          </Card>
          <Card variant="sensor" className="border-l-4 border-l-success">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-success">
                {alerts.filter((a) => a.severity === "info").length}
              </p>
              <p className="text-sm text-muted-foreground">Informational</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={cn(!alert.read && "relative")}>
                {!alert.read && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                )}
                <AlertCard
                  title={alert.title}
                  message={alert.message}
                  severity={alert.severity}
                  action={alert.action}
                  time={alert.time}
                />
              </div>
            ))
          ) : (
            <Card variant="flat" className="bg-muted/30">
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">No alerts found</p>
                <p className="text-muted-foreground">
                  {filter === "unread" 
                    ? "All alerts have been read" 
                    : `No ${filter} priority alerts at this time`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Alerts;
