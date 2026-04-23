FROM node:18-alpine

# Establecer el directorio de trabajo principal
WORKDIR /app

# Copiar los archivos de configuración de dependencias primero
# Esto ayuda a aprovechar la caché de Docker y acelerar builds posteriores
COPY servidor/package*.json ./servidor/

# Instalar las dependencias de producción
RUN cd servidor && npm install --omit=dev

# Copiar el resto del código del servidor y el cliente
COPY servidor/ ./servidor/
COPY cliente/ ./cliente/

# Exponer el puerto donde corre la app web
EXPOSE 8080

# Comando por defecto para iniciar la aplicación
CMD ["node", "servidor/botana.js"]