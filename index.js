const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);



async function run() {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const text = "The quick brown fox jumped over the lazy dog"

    const result = await model.embedContent(text)
    const embedding = result.embedding
    console.log(embedding)
}

run()