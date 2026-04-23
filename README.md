<h1>🤖 Botana Project</h1>

<p><strong>Botana</strong> es una aplicación híbrida que integra un bot de <strong>Discord</strong> con una interfaz de chat web moderna. El sistema está diseñado para ofrecer una experiencia de usuario fluida, combinando inteligencia artificial con una infraestructura de red optimizada.</p>

<hr>

<h2>🚀 Características Principales</h2>

<h3>🎮 Integración con Discord</h3>
<p>Bot de chat inteligente potenciado por el modelo <strong>Gemini 2.5 Flash</strong>. Capaz de mantener conversaciones contextuales, realizar búsquedas en tiempo real y gestionar comandos personalizados con una personalidad definida.</p>

<h3>🌐 Interfaz Web</h3>
<p>Single Page Application (SPA) con diseño <strong>Glassmorphism</strong>, optimizada para dispositivos móviles. Incluye animaciones cinemáticas mediante CSS y JavaScript para una interacción visual de alto nivel.</p>

<h3>🛡️ Seguridad y Monitoreo</h3>
<ul>
  <li><strong>Honeypot:</strong> Sistema integrado para la detección y registro de tráfico malicioso.</li>
  <li><strong>Reverse Proxy:</strong> Configuración robusta sobre <strong>Nginx 1.28.3</strong> con terminación <strong>SSL (HTTPS)</strong>.</li>
</ul>

<hr>

<h2>🏗️ Stack Tecnológico</h2>

<table>
  <tr>
    <th>Componente</th>
    <th>Tecnología</th>
  </tr>
  <tr>
    <td><strong>Entorno de ejecución</strong></td>
    <td>Node.js (v18+)</td>
  </tr>
  <tr>
    <td><strong>Framework de Bot</strong></td>
    <td>Discord.js v14</td>
  </tr>
  <tr>
    <td><strong>Servidor Web</strong></td>
    <td>Express.js</td>
  </tr>
  <tr>
    <td><strong>Infraestructura</strong></td>
    <td>Google Cloud Platform (GCE)</td>
  </tr>
  <tr>
    <td><strong>Sistema Operativo</strong></td>
    <td>Debian Bookworm</td>
  </tr>
  <tr>
    <td><strong>Gestión de Procesos</strong></td>
    <td>PM2</td>
  </tr>
</table>

<hr>

<h2>🛠️ Instalación y Despliegue</h2>

<h3>Clonar el repositorio</h3>
<pre><code>git clone https://github.com/nehemi/botana.git
cd botana/servidor
</code></pre>

<h3>Instalar dependencias</h3>
<pre><code>npm install
</code></pre>

<h3>⚙️ Variables de entorno</h3>
<p>Creá un archivo <code>.env</code> en la carpeta <code>servidor/</code>:</p>

<pre><code>DISCORD_TOKEN=tu_token_de_discord
GEMINI_API_KEY=tu_llave_de_google_ai
</code></pre>

<hr>

<h2>🐳 Despliegue con Docker (Recomendado)</h2>

<p>Para una ejecución aislada, limpia y más sencilla, puedes usar Docker y Docker Compose:</p>

<pre><code>docker-compose up -d --build
</code></pre>
<p>Esto construirá la imagen copiando tu frontend/backend y levantará el contenedor en el puerto 8080 de forma automática leyendo las credenciales de tu archivo <code>servidor/.env</code>.</p>

<hr>

<h2>� Despliegue con PM2</h2>

<h3>Iniciar el proceso</h3>
<pre><code>pm2 start botana.js --name "botana-bot"
</code></pre>

<h3>Inicio automático</h3>
<pre><code>pm2 startup
pm2 save
</code></pre>

<hr>

<h2>🔒 Hardening y Red</h2>

<ul>
  <li><strong>Reverse Proxy (Nginx):</strong> Oculta firmas de servidor y gestiona SSL.</li>
  <li><strong>Certificado SSL:</strong> Implementado con Certbot (Let's Encrypt).</li>
  <li><strong>DNS Dinámico:</strong> Integración con DuckDNS mediante cron.</li>
  <li><strong>Seguridad en Express:</strong> Cabeceras protegidas y <code>X-Powered-By</code> desactivado.</li>
</ul>

<hr>

<h2>📂 Estructura del Proyecto</h2>

<pre><code>botana/
├── cliente/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── servidor/
│   ├── botana.js
│   ├── .env
│   └── package.json
└── duckdns/
    └── duck.sh
</code></pre>

<hr>
</body>
</html>
