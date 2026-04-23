# Usamos una imagen ligera de Node.js versión 20
FROM node:20-alpine

WORKDIR /app

# Copiamos los archivos de dependencias e instalamos
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

CMD ["node", "botana.js"]