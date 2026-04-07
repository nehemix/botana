const chat = require("./chat.json");

function buscarContexto(query) {
  // 1. Limpiamos la pregunta
  const palabrasIgnorar = ["que", "como", "donde", "cuando", "quien", "para", "con", "del", "las", "los", "una", "esto", "eso", "aquello"];
  const palabrasClave = query.toLowerCase()
    .replace(/[?¿!¡,.]/g, "")
    .split(" ")
    .filter(p => p.length > 2 && !palabrasIgnorar.includes(p));

  // 2. Buscamos coincidencias históricas (Memoria a largo plazo)
  let coincidencias = chat.filter(m => {
    const msj = m.mensaje.toLowerCase();
    return palabrasClave.some(palabra => msj.includes(palabra));
  }).slice(-10); // Traemos las 10 coincidencias más recientes

  // 3. Traemos SIEMPRE los últimos mensajes (Memoria a corto plazo / Repreguntas)
  // Esto permite que si decís "¿Por qué?", sepa qué se dijo justo antes
  const ultimosMensajes = chat.slice(-8); 

  // 4. Combinamos ambos sin repetir mensajes
  // Usamos un Set para evitar que un mensaje aparezca dos veces si es reciente y tiene palabras clave
  const mensajesUnicos = [...new Map([...coincidencias, ...ultimosMensajes].map(m => [JSON.stringify(m), m])).values()];

  // 5. Formateamos para la IA
  return mensajesUnicos
    .map(m => `${m.autor}: ${m.mensaje}`)
    .join("\n");
}

module.exports = { buscarContexto };