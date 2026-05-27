import fs from "fs"
import { PDFParse } from "pdf-parse"


const extractPdfText = async (filePath: string) => {
    const pdfBuffer = fs.readFileSync(filePath)

    const parser =  new PDFParse({
        data: pdfBuffer
    })

    const data = await parser.getText()

    return data.text
}

export default extractPdfText