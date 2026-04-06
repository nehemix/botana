const memorias = {};

function obtenerHistorial(sessionId) {
  if (!memorias[sessionId]) {
    memorias[sessionId] = [];
  }
  return memorias[sessionId];
}

function guardarMensaje(sessionId, role, text) {
  const historial = obtenerHistorial(sessionId);
  // Formato nativo de Google Generative AI
  historial.push({ role, parts: [{ text }] });
  
  // Si la charla es muy larga (más de 15 mensajes), borramos lo viejo
  // para que no te consuma tantos tokens ni se tilde
  if (historial.length > 15) {
    memorias[sessionId] = historial.slice(-15);
  }
}

module.exports = { obtenerHistorial, guardarMensaje };