import { GoogleGenAI, Type } from "@google/genai";
import { Platform, ProductDetails } from "../types";

// Initialize Gemini Client
// IMPORTANT: The API key is assumed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCopy = async (
  product: ProductDetails,
  tone: 'funny' | 'urgent' | 'professional' = 'funny'
): Promise<{ title: string; description: string; hashtags: string[] }> => {
  
  const prompt = `
    You are a world-class copywriter for an affiliate marketing bot.
    Task: Write a short, viral, and ${tone} sales post for a product.
    
    Product Details:
    - Name: ${product.name}
    - Platform: ${product.platform}
    - Price: ${product.price}
    
    Requirements:
    1. Title: Catchy, uses an emoji, maximum 60 characters.
    2. Description: 2-3 sentences. Focus on benefits or humor. Mention the price if it looks like a deal.
    3. Hashtags: 3-5 relevant hashtags for Instagram/TikTok.
    4. Language: Portuguese (Brazil).
    
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
      title: "🔥 Oferta Imperdível!",
      description: `Confira este produto incrível no ${product.platform}. O preço está ótimo!`,
      hashtags: ["#promo", "#oferta", "#imperdivel"]
    };
  }
};