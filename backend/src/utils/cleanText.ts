export const cleanText = (text: string) => {

    return text

    .replace(/\n+/g, " ")

    .replace(/\s+/g, " ")
    
    .replace(/[^\x20-\x7E]/g, "")

    .trim()

}