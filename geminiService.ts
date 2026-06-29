import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface NutritionResult {
  name: string;
  age: string;
  nutrition_status: "Normal" | "Warning" | "Critical";
  observation: string;
  medical_action: string;
  food_suggestions: string[];
  alert_message: string;
  local_translation: string;
}

export async function analyzeNutrition(data: {
  name: string;
  age: string;
  gender: string;
  weight: string;
  prevWeight?: string;
  height: string;
}, langCode: string = 'en'): Promise<NutritionResult> {
  const langNames = { en: 'English', te: 'Telugu', hi: 'Hindi' };
  const langName = langNames[langCode as keyof typeof langNames] || 'English';

  const prompt = `
    You are a Pediatric Nutrition Expert assisting Anganwadi workers in India.
    Analyze the following child data and provide a detailed assessment.

    INPUT DATA:
    * Name: ${data.name || "Unknown"}
    * Age: ${data.age} months
    * Gender: ${data.gender || "Unknown"}
    * Current Weight: ${data.weight} kg
    * Previous Weight (1 month ago): ${data.prevWeight || "N/A"} kg
    * Current Height: ${data.height} cm

    YOUR TASKS:
    1. GROWTH STANDARDS (Reference these values for children aged 2-12):
       BOYS:
       - Age 2: H: 85-91cm, W (Normal: 11-14.5kg, Under: <10.5kg, Over: >15.5kg)
       - Age 3: H: 94-101cm, W (Normal: 13-16.5kg, Under: <12.5kg, Over: >18kg)
       - Age 4: H: 100-108cm, W (Normal: 14.5-19kg, Under: <13.5kg, Over: >21kg)
       - Age 5: H: 106-113cm, W (Normal: 16-21.5kg, Under: <15kg, Over: >24kg)
       - Age 6-8: H: 116-130cm, W (Normal: 20-30kg, Under: <18kg, Over: >34kg)
       - Age 9-12: H: 132-150cm, W (Normal: 26-45kg, Under: <25kg, Over: >52kg)
       GIRLS:
       - Age 2: H: 84-90cm, W (Normal: 10-14kg, Under: <10kg, Over: >15kg)
       - Age 3: H: 92-100cm, W (Normal: 12-16kg, Under: <11.5kg, Over: >17kg)
       - Age 4: H: 98-105cm, W (Normal: 14-18kg, Under: <13kg, Over: >20kg)
       - Age 5: H: 104-110cm, W (Normal: 15.5-21kg, Under: <14.5kg, Over: >23kg)
       - Age 6-8: H: 115-128cm, W (Normal: 19-30kg, Under: <17kg, Over: >32kg)
       - Age 9-12: H: 130-150cm, W (Normal: 25-46kg, Under: <24kg, Over: >50kg)

    2. DIAGNOSTIC LOGIC:
       - GROWTH FALTERING: If Current Weight - Previous Weight < 0.2kg (200g), Status is "Critical" and observation prefix must be: "🚨 GROWTH FALTERING DETECTED: Monthly weight gain is below 200g."
       - UNDERWEIGHT/WASTING: If weight is significantly low for age/height (📉 Only low weight indicator).
       - STUNTING: If height is significantly low for age (📉 + 📏 Low height indicator).
       - KWASHIORKOR/OEDEMA: If weight is normal/high but history shows poor diet or signs of swelling. Medical_action must include: "⚠️ EMERGENCY CHECK: Look for Oedema (pitting swelling in feet/legs). This may be Kwashiorkor despite appearing 'healthy' in weight."
       - OBESITY: If weight is excessively high for height.
    3. MULTI-LANGUAGE:
       - Language target: ${langName}
       - ALL fields must be returned in ${langName}, EXCEPT 'nutrition_status' which remain as English enum values.

    OUTPUT FORMAT (JSON):
    Provide ONLY valid JSON matching this schema:
    {
      "name": "string (in ${langName})",
      "age": "string",
      "nutrition_status": "Normal" | "Warning" | "Critical",
      "observation": "1-sentence explanation in ${langName}",
      "medical_action": "Question about Oedema or specific medical step in ${langName}",
      "food_suggestions": ["nutrient-dense local Indian foods in ${langName}"],
      "alert_message": "Urgent/positive tone message in ${langName}",
      "local_translation": "Summary of observation and action in ${langName}"
    }

    RULES:
    - Status must be Exactly: "Normal", "Warning", or "Critical".
    - Provide more than 3 local Indian food items.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          age: { type: Type.STRING },
          nutrition_status: { 
            type: Type.STRING,
            enum: ["Normal", "Warning", "Critical"]
          },
          observation: { type: Type.STRING },
          medical_action: { type: Type.STRING },
          food_suggestions: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          alert_message: { type: Type.STRING },
          local_translation: { type: Type.STRING }
        },
        required: ["name", "age", "nutrition_status", "observation", "medical_action", "food_suggestions", "alert_message", "local_translation"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(response.text.trim()) as NutritionResult;
  } catch (e) {
    console.error("Failed to parse JSON from AI:", response.text);
    throw new Error("Invalid response format from AI");
  }
}
