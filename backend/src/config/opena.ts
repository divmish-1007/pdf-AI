import OpenAI from "openai"
import dotenv from "dotenv"
dotenv.config()

export const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:"https://api.groq.com/openai/v1",
})

const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: "Explain the importance of fast language models",
})

console.log(response.output_text)