import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "te" | "ta";

const translations: Record<Language, Record<string, string>> = {
  en: {
    cropSelected: "AI Recommended Crop",
    changeCrop: "Change Crop",
    wateringSchedule: "Watering Schedule",
    fertilizerSchedule: "Fertilizer Tips",
    talkToAI: "Ask AI Assistant",
  },
  hi: {
    cropSelected: "AI अनुशंसित फसल",
    changeCrop: "फसल बदलें",
    wateringSchedule: "सिंचाई अनुसूची",
    fertilizerSchedule: "उर्वरक सुझाव",
    talkToAI: "AI सहायक से पूछें",
  },
  te: {
    cropSelected: "AI సిఫార్సు చేసిన పంట",
    changeCrop: "పంట మార్చండి",
    wateringSchedule: "నీటిపారుదల షెడ్యూల్",
    fertilizerSchedule: "ఎరువుల చిట్కాలు",
    talkToAI: "AI సహాయకుడిని అడగండి",
  },
  ta: {
    cropSelected: "AI பரிந்துரைக்கப்பட்ட பயிர்",
    changeCrop: "பயிரை மாற்று",
    wateringSchedule: "நீர்ப்பாசன அட்டவணை",
    fertilizerSchedule: "உர குறிப்புகள்",
    talkToAI: "AI உதவியாளரிடம் கேளுங்கள்",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
