# Usamos Debian Slim, que mantiene un tamaño reducido pero recibe
# parches de seguridad mucho más rápido que Alpine.
FROM node:20-bookworm-slim

WORKDIR /app

# Le damos permisos al usuario "node" sobre el directorio de trabajo
RUN chown -R node:node /app

# Cambiamos al usuario sin privilegios "node" (incluido por defecto en la imagen)
USER node

# Copiamos los archivos de dependencias e instalamos
COPY --chown=node:node package*.json ./
RUN npm install

# Copiamos el resto del código
COPY --chown=node:node . .

CMD ["node", "index.js"]