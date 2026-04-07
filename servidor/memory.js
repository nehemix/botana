const memorias = {};

function obtenerHistorial(sessionId) {
  if (!memorias[sessionId]) {
    memorias[sessionId] = [];
  }
  return memorias[sessionId];
}

function guardarMensaje(sessionId, role, text) {
  const historial = obtenerHistorial(sessionId);
  historial.push({ role, parts: [{ text }] });
  
  // Mantenemos solo los últimos 10 mensajes para que no se pierda el hilo ni gastes tokens de más
  if (historial.length > 10) {
    memorias[sessionId] = historial.slice(-10);
  }
}

module.exports = { obtenerHistorial, guardarMensaje };