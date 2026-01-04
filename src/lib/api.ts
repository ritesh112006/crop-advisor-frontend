// src/lib/api.ts

const BASE_URL = "https://crop-advisor-backend-3hsd.onrender.com";

// -------------------- SENSOR DATA --------------------
export async function getLatestSensorData() {
  const res = await fetch(`${BASE_URL}/latest`);
  if (!res.ok) throw new Error("Failed to fetch sensor data");
  return res.json();
}

// -------------------- WEATHER --------------------
export async function getWeather(city: string = "Pune") {
  const res = await fetch(`${BASE_URL}/weather?city=${city}`);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
}

// -------------------- AI PREDICTION --------------------
export async function getPrediction(data: {
  moisture: number;
  ph: number;
  temperature: number;
  humidity: number;
  N: number;
  P: number;
  K: number;
}) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}
