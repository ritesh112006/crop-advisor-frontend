import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cloud, Droplets, Thermometer, Wind, Sun, TrendingUp, TrendingDown } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend
} from "recharts";
import { useState } from "react";

const monthlyData = [
  { month: "Jan", temp: 22, rainfall: 15, humidity: 55 },
  { month: "Feb", temp: 25, rainfall: 10, humidity: 50 },
  { month: "Mar", temp: 30, rainfall: 12, humidity: 45 },
  { month: "Apr", temp: 35, rainfall: 8, humidity: 40 },
  { month: "May", temp: 38, rainfall: 25, humidity: 45 },
  { month: "Jun", temp: 34, rainfall: 120, humidity: 70 },
  { month: "Jul", temp: 30, rainfall: 200, humidity: 85 },
  { month: "Aug", temp: 29, rainfall: 180, humidity: 82 },
  { month: "Sep", temp: 28, rainfall: 150, humidity: 78 },
  { month: "Oct", temp: 28, rainfall: 80, humidity: 65 },
  { month: "Nov", temp: 25, rainfall: 20, humidity: 58 },
  { month: "Dec", temp: 22, rainfall: 10, humidity: 55 },
];

const weeklyData = [
  { day: "Mon", temp: 28, rainfall: 0, humidity: 65 },
  { day: "Tue", temp: 29, rainfall: 5, humidity: 70 },
  { day: "Wed", temp: 27, rainfall: 15, humidity: 75 },
  { day: "Thu", temp: 26, rainfall: 20, humidity: 80 },
  { day: "Fri", temp: 28, rainfall: 8, humidity: 72 },
  { day: "Sat", temp: 30, rainfall: 0, humidity: 65 },
  { day: "Sun", temp: 31, rainfall: 0, humidity: 60 },
];

const seasonalComparison = [
  { season: "Kharif 2023", rainfall: 850, avgTemp: 28 },
  { season: "Rabi 2023-24", rainfall: 120, avgTemp: 22 },
  { season: "Kharif 2024", rainfall: 920, avgTemp: 29 },
  { season: "Current", rainfall: 780, avgTemp: 27 },
];

const insights = [
  { 
    icon: TrendingUp, 
    title: "Temperature Rising", 
    description: "Average temperature this week is 2°C higher than last week",
    color: "text-warning"
  },
  { 
    icon: Droplets, 
    title: "Rainfall Below Average", 
    description: "Rainfall was 15% below average last month. Consider irrigation.",
    color: "text-water"
  },
  { 
    icon: Wind, 
    title: "Good Humidity Levels", 
    description: "Humidity levels are optimal for current crop growth stage.",
    color: "text-success"
  },
];

const Weather = () => {
  const [period, setPeriod] = useState("weekly");

  const chartData = period === "weekly" ? weeklyData : monthlyData;
  const xKey = period === "weekly" ? "day" : "month";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="page-container">
        <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Weather History</h1>
            <p className="page-description">
              Analyze past weather patterns to plan your farming activities
            </p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="sensor">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Thermometer className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">28°C</p>
                  <p className="text-xs text-muted-foreground">Avg Temperature</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="sensor">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-water/10">
                  <Droplets className="h-5 w-5 text-water" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">780mm</p>
                  <p className="text-xs text-muted-foreground">Total Rainfall</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="sensor">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Wind className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">68%</p>
                  <p className="text-xs text-muted-foreground">Avg Humidity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="sensor">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sun/10">
                  <Sun className="h-5 w-5 text-sun" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">6.2h</p>
                  <p className="text-xs text-muted-foreground">Avg Sunshine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature Trend */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-warning" />
                Temperature Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 85%)" />
                  <XAxis dataKey={xKey} stroke="hsl(140, 10%, 40%)" fontSize={12} />
                  <YAxis stroke="hsl(140, 10%, 40%)" fontSize={12} domain={[15, 45]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(140, 15%, 85%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(38, 92%, 50%)", r: 4 }}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rainfall */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-water" />
                Rainfall Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 85%)" />
                  <XAxis dataKey={xKey} stroke="hsl(140, 10%, 40%)" fontSize={12} />
                  <YAxis stroke="hsl(140, 10%, 40%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(140, 15%, 85%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="rainfall"
                    fill="hsl(199, 89%, 48%)"
                    radius={[4, 4, 0, 0]}
                    name="Rainfall (mm)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Seasonal Comparison & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seasonal Comparison */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Seasonal Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={seasonalComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 85%)" />
                  <XAxis type="number" stroke="hsl(140, 10%, 40%)" fontSize={12} />
                  <YAxis dataKey="season" type="category" stroke="hsl(140, 10%, 40%)" fontSize={11} width={90} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(140, 15%, 85%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="rainfall" fill="hsl(199, 89%, 48%)" name="Rainfall (mm)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weather Insights */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Weather Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="p-2 rounded-lg bg-card">
                      <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{insight.title}</p>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Weather;
