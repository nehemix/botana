<div align="center">
  <img src="https://capsule-render.vercel.app/render?type=soft&color=auto&height=200&section=header&text=BOTANA%20v1.0&fontSize=70&animation=fadeIn&fontAlignY=38&theme=cyberpunk" />

  <p align="center">
    <img src="https://img.shields.io/badge/Discord-Bot-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
    <img src="https://img.shields.io/badge/Google_Cloud-VM_Instance-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />
    <img src="https://img.shields.io/badge/Nginx-1.28.3-009639?style=for-the-badge&logo=nginx&logoColor=white" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Status-Online-green?style=flat-square" />
    <img src="https://img.shields.io/badge/License-MIT-purple?style=flat-square" />
    <img src="https://img.shields.io/badge/Powered_by-Gemini_AI-orange?style=flat-square" />
  </p>
</div>

---

## 🏮 ¿Qué es Botana?

**Botana** es un ecosistema híbrido diseñado para la interacción y la seguridad. No es solo un bot, es una entidad que vive en dos mundos:

### 🎮 En Discord
Actúa como un bot inteligente potenciado por IA (Gemini/OpenAI). Gestiona comandos, conversa con los usuarios y mantiene la comunidad activa con una personalidad única.

### 🌐 En la Web
Posee una interfaz web propia donde puedes interactuar con él, ver su estado o gestionar configuraciones. Esta web corre sobre un servidor **Node.js** de alto rendimiento.

---

## 🏗️ Infraestructura (The "Cloud" Spirit)

Botana no corre en cualquier lugar; habita en una infraestructura optimizada para la velocidad y la seguridad:

* **Host:** Una Instancia VM en **Google Cloud Platform (GCP)** corriendo **Debian Bookworm**.
* **Gatekeeper:** **Nginx 1.28.3** configurado como Reverse Proxy, manejando el tráfico seguro mediante **SSL (HTTPS)**.
* **Security:** Sistema de **Honeypot** integrado en las rutas web para detectar y registrar intentos de intrusión de bots maliciosos.



---

## ⚔️ Tecnologías (Otaku Stack)

| Componente | Tecnología |
| :--- | :--- |
| **Lenguaje** | Node.js (v18+) |
| **Framework Bot** | Discord.js v14 |
| **Web Server** | Express.js |
| **Reverse Proxy** | Nginx 1.28.3 |
| **Cloud** | Google Compute Engine |
| **Database** | JSON / SQLite (Persistent Memory) |

---

## 🛠️ Instalación para Desarrolladores

Si quieres clonar este proyecto en tu propia VM de Google Cloud:

1. **Clonar el pergamino:**
   ```bash
   git clone [https://github.com/nehemi/botana.git](https://github.com/nehemi/botana.git)
   cd botana/servidor
