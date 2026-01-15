
import { GoogleGenAI, Type } from "@google/genai";
import { ExtractionResult } from "../types";

// Helper for encoding base64
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function extractDataFromImage(base64Image: string, mimeType: string): Promise<ExtractionResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: "Extract information from this weight loss schedule table. Return the data in Vietnamese. The dates should be in YYYY-MM-DD format. The BMI and weight should be numbers. The 'notes' should capture the 'GHI CHÚ' column.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          customerName: { type: Type.STRING, description: "Tên khách hàng" },
          startDate: { type: Type.STRING, description: "Ngày bắt đầu (YYYY-MM-DD)" },
          data: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stt: { type: Type.INTEGER },
                date: { type: Type.STRING, description: "Ngày tiêm (YYYY-MM-DD)" },
                weight: { type: Type.NUMBER, description: "Cân nặng (kg)" },
                bmi: { type: Type.NUMBER, description: "Chỉ số BMI" },
                bodyFat: { type: Type.NUMBER, description: "Tỷ lệ mỡ cơ thể (%)" },
                visceralFat: { type: Type.NUMBER, description: "Mỡ nội tạng" },
                notes: { type: Type.STRING, description: "Ghi chú" },
              },
              required: ["stt", "date", "weight", "bmi"],
            },
          },
        },
        required: ["customerName", "data"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Could not parse image data.");
  return JSON.parse(text) as ExtractionResult;
}
