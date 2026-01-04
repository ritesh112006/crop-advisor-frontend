import { createContext, useContext, useState, ReactNode } from "react";

interface CropData {
  id: number;
  name: string;
  matchScore: number;
  yieldRange: string;
  sowingTime: string;
  harvestTime: string;
  waterNeeds: "Low" | "Medium" | "High";
  fertilizerTips: string;
  imageEmoji: string;
  confidence?: number;
  yield?: string;
}

interface SensorData {
  moisture: number;
  ph: number;
  temperature: number;
  humidity: number;
  N: number;
  P: number;
  K: number;
}

interface CropContextType {
  selectedCrop: CropData | null;
  setSelectedCrop: (crop: CropData | null) => void;
  sensorData: SensorData | null;
  setSensorData: (data: SensorData | null) => void;
}

const CropContext = createContext<CropContextType | undefined>(undefined);

export const CropProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  return (
    <CropContext.Provider value={{ selectedCrop, setSelectedCrop, sensorData, setSensorData }}>
      {children}
    </CropContext.Provider>
  );
};

export const useCrop = () => {
  const context = useContext(CropContext);
  if (!context) {
    throw new Error("useCrop must be used within a CropProvider");
  }
  return context;
};
