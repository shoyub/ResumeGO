/* eslint-disable no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_AI_API;

// Validate API key
if (!apiKey || apiKey === "your_gemini_api_key_here") {
  console.error(
    "Gemini AI API key not configured. Please add your API key to the .env file."
  );
}

// Only initialize if API key is valid
let genAI = null;
if (apiKey && apiKey !== "your_gemini_api_key_here") {
  genAI = new GoogleGenerativeAI(apiKey);
}

let AIchatSession = null;

if (genAI) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  AIchatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
}

export { AIchatSession };
