import express from "express"
import { upload } from "../config/multer.js"
import extractPdfText from "../services/pdf.service.js"
import { cleanText } from "../utils/cleanText.js"
import { chunkText } from "../utils/chunkText.js"
import { generateEmbedding } from "../embeddings/genrateEmbedding.js"
import { getCollection } from "../vectorStore/chroma.js"

const uplaodRouter = express.Router()

uplaodRouter.post(
    '/pdf',
    upload.single("pdf"),

    async (req, res) => {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }

        const extractedText = await extractPdfText(req.file.path)

        const cleanedText = cleanText(extractedText)

        const chunks = chunkText({
            text: cleanedText
        })

        if (chunks.length === 0) {
            return res.status(400).json({
                message: "No chunks genrated"
            })
        }

        const ids: string[] = []
        const documents: string[] = []
        const vectors: number[][] = []

        const pdfId = Date.now()
// Embeddings genrated for each chunks
        for (let i = 0; i < chunks.length; i++) {
            const embedding = await generateEmbedding(chunks[i]!)

            ids.push(`${pdfId}-chunk-${i}`)
            documents.push(chunks[i]!)
            if (!embedding) {
                continue;
            }
            vectors.push(embedding)

        }

        const collection = await getCollection()
// Embeddings stored in the DB
        await collection.add({
            ids,
            documents,
            embeddings: vectors
        })


        const count = await collection.count()
        console.log("Total Vectors: ", count)

        res.json({
            message: "PDF parsed successfully",
            toalStoedEmbeddings: count
        })

    })

export default uplaodRouter