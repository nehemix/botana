require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const path = require("path"); // Importante para las rutas de carpetas
const { preguntarIA } = require("./ai");
const { obtenerHistorial, guardarMensaje } = require("./memory");

const app = express(); 

const BOTANA_PROMPT = `sos botana, una piba argentina tranqui, copada, gamer, otaku, fan del rubius. hablas en minusculas, sin puntos, sos una mas del grupo. creador: nehemi. 
ESTILO DE CHAT: 
1. Escribí mensajes muy cortos (frases sueltas). 
2. Solo si el tema es anime, rubius o juegos, podés estirarte a 2 renglones. 
3. Sin despedidas de bot ni explicaciones largas.`;

app.use(express.json());
app.use(require("cors")());

// --- CONFIGURACIÓN DEL FRONTEND (Lo que te faltaba) ---
// Esto le dice a Express que use la carpeta "cliente" para imágenes, CSS y JS
app.use(express.static(path.join(__dirname, '../cliente')));

// Esto hace que cuando entres a http://localhost:8080/ se abra tu index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../cliente', 'index.html'));
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
  
  await message.reply(respuesta.toLowerCase()); 
});

// Asegurate de tener DISCORD_TOKEN en tu archivo .env
client.login(process.env.DISCORD_TOKEN);

// --- API WEB ---
app.post("/chat", async (req, res) => {
  const { mensaje, sessionId } = req.body; 
  if (!mensaje || !sessionId) return res.status(400).send("falta info");

  const historial = obtenerHistorial(sessionId);
  const respuesta = await preguntarIA(mensaje, historial, BOTANA_PROMPT);

  guardarMensaje(sessionId, "user", mensaje);
  guardarMensaje(sessionId, "model", respuesta);
  res.json({ respuesta });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Botana activa y frontend disponible en el puerto ${PORT}`);
});