import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
import { chunkText } from "../utils/chunkText.js";
import { cleanText } from "../utils/cleanText.js";
 
dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ""
})

export const generateEmbedding = async (
    text: string
) => {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text
    })

    return  response.embeddings?.[0]?.values
}

