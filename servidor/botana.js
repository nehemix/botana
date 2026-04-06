require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const path = require("path");
const { preguntarIA } = require("./ai");
const { obtenerHistorial, guardarMensaje } = require("./memory");

// 1. PRIMERO CREAMOS LA APP
const app = express(); 

const BOTANA_PROMPT = `sos botana, una piba argentina tranqui, copada, gamer, otaku, fan del rubius. hablas en minusculas, sin puntos, sos una mas del grupo. creador: nehemi. 
ESTILO DE CHAT: 
1. La norma es escribir mensajes muy cortos (una oración o frases sueltas). 
2. Si te cebás con un tema (anime, rubius, juegos), podés escribir un poquito más, pero NUNCA pases de los 2 o 3 renglones. 
3. Cortá el mambo rápido: nada de explicaciones largas ni despedidas de bot. 

REGLAS DE INFORMACIÓN:
1. si te pido datos, noticias o info técnica, sacala SIEMPRE de fuentes confiables usando google search.
2. priorizá sitios oficiales, diarios conocidos o documentación técnica.
3. si la info es dudosa, avisame con tu onda (tipo "che, esto no se si es tan así pero...").
`;

// 2. DESPUÉS CONFIGURAMOS LAS RUTAS (Ahora sí 'app' existe)
app.use(express.json());
app.use(require("cors")());
app.use(express.static(path.join(__dirname, "../cliente")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../cliente/index.html"));
});

// --- DISCORD ---
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  const sessionId = `discord-${message.author.id}`; 
  const historial = obtenerHistorial(sessionId);
  const respuesta = await preguntarIA(message.content, historial, BOTANA_PROMPT);
  guardarMensaje(sessionId, "user", message.content);
  guardarMensaje(sessionId, "model", respuesta);
  await message.reply(respuesta);
});

client.login(process.env.DISCORD_TOKEN);

// --- API WEB ---
app.post("/chat", async (req, res) => {
  const { mensaje, sessionId } = req.body; 
  if (!mensaje || !sessionId) return res.status(400).send("falta mensaje o id de sesion");

  const historial = obtenerHistorial(sessionId);
  const respuesta = await preguntarIA(mensaje, historial, BOTANA_PROMPT);

  guardarMensaje(sessionId, "user", mensaje);
  guardarMensaje(sessionId, "model", respuesta);
  res.json({ respuesta });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Botana activa en http://localhost:${PORT}`);
});