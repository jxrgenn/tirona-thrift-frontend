import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS, VIBE_SYSTEM_INSTRUCTION } from '../constants';
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVibeCheck = async (userVibe: string) => {
  try {
    const inventoryString = PRODUCTS.map(p => `${p.id}: ${p.name} (${p.tags.join(', ')})`).join('\n');
    
    const prompt = `Inventory:\n${inventoryString}\n\nUser Vibe: ${userVibe}\n\nSelect 3 items that match this vibe.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: VIBE_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            commentary: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Vibe Check Failed:", error);
    return { recommendedIds: [], commentary: "SYSTEM ERROR. VIBE NOT FOUND." };
  }
};

export const askReseller = async (product: Product, question: string) => {
  try {
    const prompt = `Product: ${product.name} (${product.category}). Price: ${product.price}. Description: ${product.description}. Tags: ${product.tags.join(', ')}.
    
    Customer Question: ${question}
    
    You are the "Plug", the owner of Tirona Thrift. Reply to the customer. 
    Tone: Cool, slightly arrogant but helpful, underground, use Tirana/Gen-Z slang (e.g., "shqipe", "flaka", "no cap"). 
    Keep it short (max 20 words).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are the edgy owner of Tirona Thrift. Reply in plain text, lower case.",
      }
    });
    return response.text;
  } catch (error) {
    return "DM me on insta, system busy.";
  }
};