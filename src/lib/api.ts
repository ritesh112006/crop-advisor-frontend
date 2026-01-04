// ===============================
// 🌾 Crop Advisor – API Service
// ===============================

const BASE_URL = "https://crop-advisor-backend-3hsd.onrender.com";

// -------------------------------
// 🔹 TYPES (Strong typing for TS)
// -------------------------------

export interface SensorData {
  moisture: number;
  ph: number;
  temperature: number;
  humidity: number;
  N: number;
  P: number;
  K: number;
}

export interface PredictionResponse {
  recommended_crop: string;
  recommended_fertilizer: string;
  predicted_yield_ton_per_hectare: number;
}

// -------------------------------
// 🔹 HELPER (Common response check)
// -------------------------------

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API Error");
  }
  return res.json();
}

// -------------------------------
// 🌱 SENSOR – Latest Data
// -------------------------------

export async function getLatestSensor(): Promise<SensorData> {
  const res = await fetch(`${BASE_URL}/latest`);
  return handleResponse(res);
}

// -------------------------------
// 🤖 AI – Crop Prediction
// -------------------------------

export async function getPrediction(
  sensorData: SensorData
): Promise<PredictionResponse> {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sensorData),
  });

  return handleResponse(res);
}

// -------------------------------
// 🌦️ WEATHER – Live Weather
// -------------------------------

export async function getWeather(city: string = "Pune") {
  const res = await fetch(
    `${BASE_URL}/weather?city=${encodeURIComponent(city)}`
  );
  return handleResponse(res);
}

// -------------------------------
// 📜 SENSOR HISTORY (Future-ready)
// -------------------------------
// Backend route can be added later
// export async function getSensorHistory() {
//   const res = await fetch(`${BASE_URL}/history`);
//   return handleResponse(res);
// }
