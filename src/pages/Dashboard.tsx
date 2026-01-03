import Navbar from "@/components/Navbar";
import SensorCard from "@/components/SensorCard";
import WeatherWidget from "@/components/WeatherWidget";
import AlertCard from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  Leaf,
  Activity,
  TrendingUp
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const sensorData = [
  { title: "Soil Moisture", value: 65, unit: "%", icon: Droplets, status: "good" as const, colorClass: "bg-water/10 text-water" },
  { title: "Temperature", value: 28, unit: "°C", icon: Thermometer, status: "good" as const, colorClass: "bg-warning/10 text-warning" },
  { title: "Humidity", value: 72, unit: "%", icon: Wind, status: "good" as const, colorClass: "bg-info/10 text-info" },
  { title: "Nitrogen (N)", value: 45, unit: "mg/kg", icon: Leaf, status: "warning" as const, colorClass: "bg-leaf/10 text-leaf" },
  { title: "Phosphorus (P)", value: 32, unit: "mg/kg", icon: Leaf, status: "good" as const, colorClass: "bg-primary/10 text-primary" },
  { title: "Potassium (K)", value: 58, unit: "mg/kg", icon: Leaf, status: "good" as const, colorClass: "bg-soil/10 text-soil" },
];

const weatherData = {
  temperature: 28,
  humidity: 72,
  condition: "sunny" as const,
  windSpeed: 12,
  forecast: [
    { day: "Mon", temp: 29, condition: "sunny" },
    { day: "Tue", temp: 27, condition: "cloudy" },
    { day: "Wed", temp: 26, condition: "rainy" },
    { day: "Thu", temp: 28, condition: "sunny" },
    { day: "Fri", temp: 30, condition: "sunny" },
  ],
};

const moistureHistory = [
  { time: "6 AM", value: 55 },
  { time: "9 AM", value: 58 },
  { time: "12 PM", value: 62 },
  { time: "3 PM", value: 68 },
  { time: "6 PM", value: 65 },
  { time: "9 PM", value: 63 },
];

const alerts = [
  {
    title: "Optimal Conditions",
    message: "Soil conditions are suitable for crop growth. All parameters within healthy range.",
    severity: "info" as const,
    time: "Just now",
  },
  {
    title: "Low Nitrogen Detected",
    message: "Nitrogen levels are slightly below optimal for wheat cultivation.",
    severity: "medium" as const,
    action: "Consider applying nitrogen-rich fertilizer in the next 3 days.",
    time: "2 hours ago",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="page-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Farm Dashboard</h1>
          <p className="page-description">
            Real-time monitoring of your farm conditions and IoT sensor data
          </p>
        </div>

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sensorData.map((sensor, index) => (
            <SensorCard
              key={index}
              title={sensor.title}
              value={sensor.value}
              unit={sensor.unit}
              icon={sensor.icon}
              status={sensor.status}
              colorClass={sensor.colorClass}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Soil Moisture Chart */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Soil Moisture Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={moistureHistory}>
                  <defs>
                    <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 85%)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(140, 10%, 40%)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(140, 10%, 40%)"
                    fontSize={12}
                    domain={[40, 80]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(140, 15%, 85%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Moisture"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(199, 89%, 48%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMoisture)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <WeatherWidget data={weatherData} />
        </div>

        {/* Crop Health & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Health Status */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Crop Health Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <span className="font-medium text-foreground">Overall Health</span>
                  </div>
                  <span className="font-bold text-success">Good</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Growth Stage</p>
                    <p className="font-semibold text-foreground">Vegetative</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Days to Harvest</p>
                    <p className="font-semibold text-foreground">~45 days</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  ✅ Soil condition is suitable for crop growth. Continue current irrigation schedule.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-warning" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <AlertCard
                    key={index}
                    title={alert.title}
                    message={alert.message}
                    severity={alert.severity}
                    action={alert.action}
                    time={alert.time}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
