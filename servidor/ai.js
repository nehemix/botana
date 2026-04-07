const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function preguntarIA(pregunta, historial = [], promptPersonalidad) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // <--- Modelo estable y rápido
      systemInstruction: promptPersonalidad 
    });

    // Filtramos el historial para que Google lo entienda (solo user y model)
    const chat = model.startChat({
      history: historial.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.parts[0].text }]
      }))
    });

    const result = await chat.sendMessage(pregunta);
    return result.response.text();
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return "lpm se rompió algo, no te puedo responder ahora";
  }
}

module.exports = { preguntarIA };