import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NPKSensor from "@/components/sensors/NPKSensor";
import MoistureSensor from "@/components/sensors/MoistureSensor";
import TempHumiditySensor from "@/components/sensors/TempHumiditySensor";
import PHSensor from "@/components/sensors/PHSensor";
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Sprout,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getLatestSensor } from "@/lib/api";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch real sensor data
  useEffect(() => {
    getLatestSensor()
      .then((data) => {
        setSensorData({
          npk: {
            nitrogen: data.n,
            phosphorus: data.p,
            potassium: data.k,
          },
          moisture: data.moisture,
          tempHumidity: {
            temperature: data.temperature,
            humidity: data.humidity,
          },
          ph: data.ph,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sensor fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !sensorData) {
    return (
      <DashboardLayout>
        <div className="p-8 text-lg">Loading live sensor data...</div>
      </DashboardLayout>
    );
  }

  const soilStatus = {
    overall: "Good",
    message: "Soil condition is suitable for crop growth",
    details: [
      { label: "Moisture", status: "optimal", value: `${sensorData.moisture}%` },
      { label: "NPK Balance", status: "good", value: "Normal" },
      { label: "pH Level", status: "optimal", value: sensorData.ph },
      {
        label: "Temperature",
        status: "good",
        value: `${sensorData.tempHumidity.temperature}°C`,
      },
    ],
  };

  const weatherData = {
    current: {
      temp: sensorData.tempHumidity.temperature,
      humidity: sensorData.tempHumidity.humidity,
      wind: 12,
      condition: "Partly Cloudy",
    },
    forecast: [
      { day: "Today", high: 34, low: 24, icon: Sun },
      { day: "Tomorrow", high: 32, low: 23, icon: CloudSun },
      { day: "Wed", high: 30, low: 22, icon: Droplets },
    ],
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold">Farm Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of your farm conditions
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8">
        <Link to="/recommendations">
          <Button className="gap-2">
            <Sprout className="w-4 h-4" />
            Get Crop Advice
          </Button>
        </Link>
        <Link to="/chatbot">
          <Button variant="outline">Ask AI Assistant</Button>
        </Link>
      </div>

      {/* Soil Status */}
      <div className="p-6 rounded-2xl bg-card shadow mb-8">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">
              Crop Health: <span className="text-green-600">{soilStatus.overall}</span>
            </h2>
            <p className="text-muted-foreground">{soilStatus.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {soilStatus.details.map((d) => (
            <div key={d.label} className="p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground">{d.label}</p>
              <p className="font-semibold">{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sensors */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Live Sensor Data</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <NPKSensor data={sensorData.npk} />
            <MoistureSensor value={sensorData.moisture} />
            <TempHumiditySensor data={sensorData.tempHumidity} />
            <PHSensor value={sensorData.ph} />
          </div>
        </div>

        {/* Weather */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CloudSun className="w-5 h-5" /> Weather Summary
          </h2>

          <div className="p-6 bg-card rounded-2xl shadow">
            <p className="text-sm text-muted-foreground">Current Weather</p>
            <p className="text-4xl font-bold">{weatherData.current.temp}°C</p>
            <p>{weatherData.current.condition}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex gap-2">
                <Droplets /> {weatherData.current.humidity}%
              </div>
              <div className="flex gap-2">
                <Wind /> {weatherData.current.wind} km/h
              </div>
            </div>
          </div>

          <div className="p-4 bg-accent/20 rounded-xl border">
            <div className="flex gap-3">
              <AlertTriangle />
              <div>
                <p className="font-medium">Irrigation Reminder</p>
                <p className="text-sm text-muted-foreground">
                  Schedule watering within 24 hours
                </p>
                <Link to="/alerts" className="text-primary text-sm font-medium">
                  View all alerts →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

