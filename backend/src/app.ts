import express from "express"
import cors from "cors"
import chatRouter from "./routes/chat.routes.js"
import uplaodRouter from "./routes/upload.routes.js"



const app = express()
app.use(cors())
app.use(express.json())

app.use('/chat', chatRouter)
app.use('/upload', uplaodRouter)

export default app