# Usamos Node liviano
FROM node:18-alpine
WORKDIR /usr/src/app

# Copiamos archivos de dependencias desde la carpeta servidor
COPY servidor/package*.json ./
RUN npm install --only=production

# Copiamos el código del servidor y la carpeta del cliente
COPY servidor/ ./servidor/
COPY cliente/ ./cliente/

# Exponemos el puerto dinámico de Google Cloud
ENV PORT=8080
EXPOSE 8080

# Ejecutamos desde la carpeta servidor
CMD [ "node", "servidor/botana.js" ]