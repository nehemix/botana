async function preguntarIA(pregunta, historial = [], promptPersonalidad) {
  try {
    const messages = [
      { role: "system", content: promptPersonalidad }
    ];

    // Mapeamos el historial de memoria al formato que espera DeepSeek (OpenAI format)
    for (const msg of historial) {
      messages.push({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.parts ? msg.parts[0].text : msg.text || ""
      });
    }

    messages.push({ role: "user", content: pregunta });

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Modelo rápido de DeepSeek
        messages: messages
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Error en DeepSeek API:", err);
      return "lpm se rompió algo, no te puedo responder ahora";
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error de red con DeepSeek:", error);
    return "lpm se rompió algo, no te puedo responder ahora";
  }
}

module.exports = { preguntarIA };