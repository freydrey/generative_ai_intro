const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs")

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


function fileToGenerativePath(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "What's different between these pictures?"
    const imageParts = [
        fileToGenerativePath("cat.jpeg", "image/jpeg"),
        fileToGenerativePath("landscape.jpeg", "image/jpeg")
    ]

    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()
    console.log(text)

}

run()