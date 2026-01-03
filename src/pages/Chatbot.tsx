import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Mic,
  Globe,
  Sprout,
  Cloud,
  Droplets
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  { icon: Sprout, text: "Which crop is best for my soil?" },
  { icon: Droplets, text: "When should I irrigate?" },
  { icon: Cloud, text: "Weather forecast for next week?" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "mr", name: "मराठी (Marathi)" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content: "Hello! 👋 I'm your Crop Advisor assistant. I can help you with:\n\n• Crop recommendations\n• Weather information\n• Irrigation advice\n• Fertilizer suggestions\n• Pest management\n\nHow can I assist you today?",
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("crop") && (lowerMessage.includes("best") || lowerMessage.includes("recommend"))) {
      return "Based on your current soil conditions (N: 45, P: 32, K: 58 mg/kg), I recommend **Wheat** for the Rabi season. It has a 92% suitability match with your soil parameters.\n\n**Alternative options:**\n• Barley (85% match)\n• Chickpea (78% match)\n\nWould you like detailed information about any of these crops?";
    }

    if (lowerMessage.includes("irrigat") || lowerMessage.includes("water")) {
      return "Based on current sensor readings:\n\n📊 **Soil Moisture:** 65%\n🌡️ **Temperature:** 28°C\n💧 **Status:** Adequate\n\nYour soil moisture is currently within the optimal range (60-70%). **No immediate irrigation needed.**\n\nNext recommended irrigation: In 2-3 days, when moisture drops below 55%.\n\n💡 Tip: Water early morning or late evening to reduce evaporation.";
    }

    if (lowerMessage.includes("weather") || lowerMessage.includes("forecast")) {
      return "**7-Day Weather Forecast** 🌤️\n\n• **Today:** 28°C, Sunny\n• **Tomorrow:** 29°C, Partly Cloudy\n• **Wed:** 27°C, Light Rain Expected\n• **Thu:** 26°C, Cloudy\n• **Fri:** 28°C, Sunny\n• **Sat:** 30°C, Clear\n• **Sun:** 31°C, Hot & Dry\n\n⚠️ **Alert:** Light rainfall expected on Wednesday. Plan outdoor activities accordingly.";
    }

    if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrient")) {
      return "**Fertilizer Recommendation** 🌱\n\nBased on your soil NPK levels:\n\n• **Nitrogen (N):** 45 mg/kg - Slightly low\n• **Phosphorus (P):** 32 mg/kg - Adequate\n• **Potassium (K):** 58 mg/kg - Good\n\n**Recommendation:**\n1. Apply DAP (100 kg/ha) at sowing\n2. Urea (150 kg/ha) in two splits:\n   - First split: 25 days after sowing\n   - Second split: 45 days after sowing\n\nWould you like more details on application methods?";
    }

    if (lowerMessage.includes("pest") || lowerMessage.includes("disease")) {
      return "**Pest & Disease Management** 🐛\n\nCommon issues for your region:\n\n1. **Aphids** - Check undersides of leaves\n2. **Rust** - Look for orange-brown spots\n3. **Root rot** - Avoid overwatering\n\n**Prevention Tips:**\n• Maintain proper plant spacing\n• Use neem-based organic pesticides\n• Remove infected plants immediately\n\nWould you like specific treatment recommendations?";
    }

    return "I understand you're asking about farming. Could you please be more specific? I can help you with:\n\n• **Crop recommendations** - Ask \"Which crop is best for my soil?\"\n• **Irrigation advice** - Ask \"When should I irrigate?\"\n• **Weather forecast** - Ask \"What's the weather this week?\"\n• **Fertilizer tips** - Ask \"What fertilizer should I use?\"\n• **Pest management** - Ask \"How to control pests?\"\n\nFeel free to ask any farming-related question!";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const botResponse: Message = {
      id: messages.length + 2,
      type: "bot",
      content: getBotResponse(input),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botResponse]);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 page-container pb-4">
        <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              Farming Assistant
            </h1>
            <p className="page-description">
              Ask questions about crops, weather, irrigation, and more
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((q, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => handleQuickQuestion(q.text)}
              className="gap-2"
            >
              <q.icon className="h-4 w-4" />
              {q.text}
            </Button>
          ))}
        </div>

        {/* Chat Container */}
        <Card variant="elevated" className="flex-1 flex flex-col h-[500px]">
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.type === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-leaf text-leaf-foreground"
                  )}
                >
                  {message.type === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  )}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      message.type === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-leaf text-leaf-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Mic className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Chatbot;
