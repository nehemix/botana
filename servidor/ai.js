const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Este es el motor, la personalidad se la pasamos desde botana.js
async function preguntarIA(pregunta, historial = [], promptPersonalidad) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // <--- MODELO CORRECTO
      tools: [{ googleSearch: {} }],
      systemInstruction: promptPersonalidad // <--- AHORA SÍ USA EL PROMPT QUE LE PASÁS
    });

    const chat = model.startChat({
      history: historial
    });

    const result = await chat.sendMessage(pregunta);
    return result.response.text();
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return "lpm se rompió algo, no te puedo responder";
  }
}

module.exports = { preguntarIA };