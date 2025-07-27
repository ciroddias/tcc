import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function invoke(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
     config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    }
  });
  return response.text;
}