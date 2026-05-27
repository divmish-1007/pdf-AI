import express from "express"
import { upload } from "../config/multer.js"
import extractPdfText from "../services/pdf.service.js"
import { cleanText } from "../utils/cleanText.js"
import { chunkText } from "../utils/chunkText.js"

const uplaodRouter = express.Router()

uplaodRouter.post(
    '/pdf',
    upload.single("pdf"),

    async (req, res) => {

        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded"
            })
        }

        const extractedText = await extractPdfText(req.file.path)
        
        const cleanedText = cleanText(extractedText)

        const chunks = chunkText({
            text:cleanedText
        })

        console.log(chunks[0])

        res.json({
            message: "PDF parsed successfully",
            textLength: cleanedText.length,
            totalChunks: chunks.length,
            firstChunk: chunks[0]
        })

    })

export default uplaodRouter