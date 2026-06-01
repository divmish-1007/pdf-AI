import express from "express"
import { getCollection } from "../vectorStore/chroma.js"
import { askQuestion } from "../services/chat.service.js"

const chatRouter = express.Router()


chatRouter.get("/debug", async (req,res) => {
   const collection = await getCollection()

   const data = await collection.get({
    include:["documents", "metadatas"]
   })

   res.json(data)
})

chatRouter.post('/', async (req, res) => {

    try{
        const { query } = req.body

        if(!query){
            return res.status(400).json({
                message:"Ask your query"
            })
        }

        const result = await askQuestion(query)

        return res.json({
            result
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }

})

export default chatRouter