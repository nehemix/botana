# Usamos una imagen ligera de Node.js versión 20
FROM node:20-alpine

WORKDIR /app

# Le damos permisos al usuario "node" sobre el directorio de trabajo
RUN chown -R node:node /app

# Cambiamos al usuario sin privilegios "node" (incluido por defecto en la imagen)
USER node

# Copiamos los archivos de dependencias e instalamos
COPY --chown=node:node servidor/package*.json ./servidor/
RUN cd servidor && npm install --omit=dev

# Copiamos el resto del código
COPY --chown=node:node servidor/ ./servidor/
COPY --chown=node:node cliente/ ./cliente/

CMD ["node", "servidor/botana.js"]