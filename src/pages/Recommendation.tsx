import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Sprout,
  Leaf,
  Calendar,
  TrendingUp,
  Droplets,
  ThermometerSun,
  FlaskConical,
  Check,
  ArrowRight,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCrop } from "@/contexts/CropContext";
import { getLatestSensor, getPrediction } from "@/lib/api";

/* ---------- TYPES ---------- */
interface CropRecommendation {
  id: number;
  name: string;
  matchScore: number;
  yieldRange: string;
  sowingTime: string;
  harvestTime: string;
  waterNeeds: "Low" | "Medium" | "High";
  fertilizerTips: string;
  imageEmoji: string;
}

/* ---------- COMPONENT ---------- */
const Recommendations = () => {
  const { t } = useLanguage();
  const { selectedCrop, setSelectedCrop, sensorData, setSensorData } = useCrop();

  const [aiResult, setAiResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH SENSOR + AI ---------- */
  useEffect(() => {
    async function loadData() {
      try {
        const sensor = await getLatestSensor();
        setSensorData(sensor);

        const prediction = await getPrediction(sensor);
        setAiResult(prediction);
      } catch (err) {
        console.error("AI fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading || !sensorData) {
    return (
      <DashboardLayout>
        <div className="p-8 text-lg">Loading AI recommendations...</div>
      </DashboardLayout>
    );
  }

  /* ---------- AI AUTO-SELECT CROP ---------- */
  if (!selectedCrop && aiResult) {
    const autoCrop: CropRecommendation = {
      id: 1,
      name: aiResult.recommended_crop,
      matchScore: 95,
      yieldRange: `${aiResult.predicted_yield_ton_per_hectare} t/ha`,
      sowingTime: "As per local season",
      harvestTime: "As per crop cycle",
      waterNeeds: "Medium",
      fertilizerTips: aiResult.recommended_fertilizer,
      imageEmoji: "🌱",
    };

    setSelectedCrop(autoCrop);
  }

  /* ---------- SELECTED CROP VIEW ---------- */
  if (selectedCrop) {
    return (
      <DashboardLayout>
        <div className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{selectedCrop.imageEmoji}</div>
              <div>
                <p className="text-sm text-primary">{t("cropSelected")}</p>
                <h1 className="text-3xl font-serif font-semibold">
                  {selectedCrop.name}
                </h1>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedCrop(null)}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t("changeCrop")}
            </Button>
          </div>
        </div>

        {/* WATER */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-card shadow">
            <h2 className="text-xl font-semibold mb-4 flex gap-2">
              <Droplets /> {t("wateringSchedule")}
            </h2>
            <p className="text-2xl font-bold">
              {sensorData.moisture}%
            </p>
            <p className="text-muted-foreground mt-2">
              Water need: {selectedCrop.waterNeeds}
            </p>
          </div>

          {/* FERTILIZER */}
          <div className="p-6 rounded-2xl bg-card shadow">
            <h2 className="text-xl font-semibold mb-4 flex gap-2">
              <FlaskConical /> {t("fertilizerSchedule")}
            </h2>
            <p className="text-sm">💡 {selectedCrop.fertilizerTips}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-6 rounded-2xl bg-card shadow">
          <h2 className="text-xl font-semibold mb-4">Crop Details</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-xl">
              <TrendingUp /> {selectedCrop.yieldRange}
            </div>
            <div className="bg-muted p-4 rounded-xl">
              <Calendar /> {selectedCrop.sowingTime}
            </div>
            <div className="bg-muted p-4 rounded-xl">
              <Calendar /> {selectedCrop.harvestTime}
            </div>
            <div className="bg-muted p-4 rounded-xl">
              <Droplets /> {selectedCrop.waterNeeds}
            </div>
          </div>
        </div>

        {/* AI CHAT */}
        <div className="mt-8">
          <Link to="/chatbot">
            <Button size="lg" className="gap-2">
              <MessageCircle />
              {t("talkToAI")}
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return null;
};

export default Recommendations;
