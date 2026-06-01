import express from "express"
import { dropCollection } from "../vectorStore/chroma.js"

const deleteRouter = express.Router()

deleteRouter.delete("/reset", async (req, res) => {
    try {
        await dropCollection()

        res.json({
            success: true,
            message: "Collection deleted successfully"
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: "Failed to delete collection"
        })
    }
})

export default deleteRouter