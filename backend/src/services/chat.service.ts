import client from "../config/openai.js";
import { generateEmbedding } from "../embeddings/genrateEmbedding.js"
import { getCollection } from "../vectorStore/chroma.js";

export const askQuestion = async (query: string) => {
    const queryEmbedding = await generateEmbedding(query);

    const collection = await getCollection()

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding!],
        nResults: 3,
        include: ['documents', 'distances']
    })

    const documents = results.documents?.[0] ?? []

    console.log("Documents Found:", documents.length)
    console.log("Question:", query)
    console.log("Distances:", results.distances?.[0])


    if (documents.length === 0) {
        return "I Could not find any relevent information in the uploaded documents"
    }

    const context = documents.join("\n\n")

    const prompt = `

    You are a helpful assistant.

    Answer only using the provided context.

    If the answer is not available in the context, say:
    "I could not find that information in the uploaded document."

    context:
    ${context}

    Question:
    ${query}
    `

    const response = await client.responses.create({
        model: "openai/gpt-oss-120b",
        input: prompt
    })

    return response.output_text
}