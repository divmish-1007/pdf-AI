import express from "express"

const chatRouter = express.Router()

chatRouter.post('/', (req, ress) => {
    return ress.json({
        message:"Post request handaled"
    })
})

export default chatRouter