
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, ProductDetails } from "../types";

// Initialize Gemini Client
// IMPORTANT: The API key is assumed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCopy = async (
  product: ProductDetails,
  tone: 'funny' | 'urgent' | 'professional' = 'funny'
): Promise<{ title: string; description: string; hashtags: string[] }> => {
  
  const priceContext = product.originalPrice 
    ? `Price Logic: The old price was ${product.originalPrice} and the NEW price is ${product.promotionalPrice}. CALCULATE the discount percentage and mention it if it's above 10%. Use terms like "De X por Y" to create shock.`
    : `Price: ${product.promotionalPrice}. If it's cheap, say it's a steal.`;

  const prompt = `
    You are a viral marketing expert for WhatsApp groups.
    Task: Write a text that feels like a friend recommending a product to a group. It must be FUN, BRIEF, and URGENT.
    
    Product Details:
    - Name: ${product.name}
    - Platform: ${product.platform}
    - ${priceContext}
    
    Structure required:
    1. Title: Short, punchy, uses emojis. Example: "🚨 BUG NA AMAZON?" or "😱 OLHA ESSE PREÇO". Max 50 chars.
    2. Description: EXTREMELY BRIEF (max 2 sentences). 
       - Sentence 1: Fun context of what it is (e.g., "Pra você parar de passar vergonha com fone de fio").
       - Sentence 2: The price anchor (De/Por) + Urgency ("Corre que vai acabar").
    3. Hashtags: 3 short tags.
    
    Language: Portuguese (Brazil). Informal internet slang allowed (kks, top, corre).
    
    Output JSON format only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            hashtags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["title", "description", "hashtags"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.error("Gemini generation error:", error);
    return {
      title: "🔥 OFERTA RELÂMPAGO!",
      description: `Galera, olha isso! De ${product.originalPrice || 'R$ 999'} por apenas ${product.promotionalPrice}! 🏃‍♂️\nÉ pra acabar o estoque agora.`,
      hashtags: ["#corre", "#promobug", "#oferta"]
    };
  }
};
