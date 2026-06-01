import { ChromaClient } from "chromadb"

export const chromaClient = new ChromaClient({
    path: "http://localhost:8000"
})

export const getCollection = async () => {
    return await chromaClient.getOrCreateCollection({
        name: "pdf-documents"
    })
}

export const dropCollection = async () => {
    return await chromaClient.deleteCollection({
        name: "pdf-documents"
    })
}
