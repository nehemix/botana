const path = require("path"); // Importante para las rutas de carpetas
require("dotenv").config({ path: path.join(__dirname, '.env') });
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
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

// --- SISTEMA DE RATE LIMITING BÁSICO ---
const rateLimit = new Map();
// Limpiamos el contador cada 60 segundos
setInterval(() => rateLimit.clear(), 60000);

const rateLimiterMiddleware = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const count = rateLimit.get(ip) || 0;
  if (count >= 15) {
    return res.status(429).json({ respuesta: "pará emocion, me estás mandando muchos mensajes. aguantá un toque." });
  }
  rateLimit.set(ip, count + 1);
  next();
};

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
  // Hacemos que el bot solo responda si lo mencionan
  if (message.author.bot || !message.guild || !message.mentions.has(client.user)) {
    return;
  }
  
  const sessionId = `discord-${message.author.id}`; 
  const historial = obtenerHistorial(sessionId);
  
  // Limpiamos la mención del mensaje para que la IA no la procese
  const preguntaLimpia = message.content.replace(/<@!?\d+>/g, '').trim();

  if (preguntaLimpia.length > 2000) {
    return message.reply("mucho texto, resumilo un toque que no leo tanto.");
  }
  
  const respuesta = await preguntarIA(preguntaLimpia, historial, BOTANA_PROMPT);
  
  guardarMensaje(sessionId, "user", preguntaLimpia);
  guardarMensaje(sessionId, "model", respuesta);
  
  await message.reply(respuesta.toLowerCase()); 
});

// --- VALIDACIÓN DE CREDENCIALES ---
// Esto nos dirá exactamente qué claves está viendo Node.js al arrancar.
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ ERROR: No se encontró DISCORD_TOKEN. Revisa tu archivo .env.");
  process.exit(1);
} else {
  console.log("✅ DISCORD_TOKEN encontrado.");
}

if (!process.env.DEEPSEEK_API_KEY) {
  console.error("❌ ERROR: No se encontró DEEPSEEK_API_KEY. Revisa tu archivo .env.");
  process.exit(1);
} else {
  console.log(`✅ DEEPSEEK_API_KEY encontrada. Usando clave que termina en: ...${process.env.DEEPSEEK_API_KEY.slice(-4)}`);
}

client.login(process.env.DISCORD_TOKEN);

// --- API WEB ---
app.post("/chat", rateLimiterMiddleware, async (req, res) => {
  const { mensaje, sessionId } = req.body; 
  if (!mensaje || !sessionId) return res.status(400).send("falta info");
  if (mensaje.length > 2000) return res.status(400).json({ respuesta: "mucho texto, resumilo un toque." });

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