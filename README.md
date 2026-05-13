# 🀄 DominóScore — Marcador Premium de Dominó

¡Bienvenido a **DominóScore**! Una aplicación web moderna y dinámica diseñada para llevar la anotación de puntos en tus partidas de dominó al siguiente nivel. Cuenta con sincronización en tiempo real y un modo espectador único.

---

## 🚀 Características Principales

- **🎨 Diseño Premium:** Estilo *Dark Gaming* con toques de neón y efecto cristal (*Glassmorphism*). Optimizado para celulares.
- **🔄 Sincronización en Tiempo Real:** Gracias a **Firebase Realtime Database**, los cambios se ven al instante en todos los dispositivos conectados.
- **👥 Sistema de Salas y Código Único:** Cada partida genera un código de 4 caracteres. Compártelo para que otros se unan.
- **👁️ Modo Espectador Seguro:** Los invitados que entren con el código de sala solo podrán ver el marcador en vivo. Los botones de edición y anotación se bloquean para ellos.
- **📲 Compartir por WhatsApp:** Botón directo para enviar el código y el link de la partida a tus amigos por WhatsApp.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto es una aplicación **100% Frontend** (se ejecuta directamente en el cliente) y utiliza servicios en la nube para el backend:

- **HTML5:** Estructura semántica de la aplicación.
- **CSS3:** Estilos personalizados, variables CSS, animaciones y diseño responsivo sin frameworks (Vanilla CSS).
- **JavaScript (Vanilla):** Lógica completa del juego, manejo de estado y eventos.
- **Firebase:** Utilizado como *Backend-as-a-Service* (BaaS) para la base de datos en tiempo real.

---

## 📖 Cómo Funciona

### Como Creador de la Partida:
1. Entra a la aplicación y llena los nombres de los equipos.
2. Selecciona el límite de puntos y el valor de la capicúa.
3. Dale a **"Iniciar Partida"**.
4. En la barra superior verás un código (ej: `A7B9`).
5. Toca el botón de **WhatsApp** al lado del código para invitar a tus amigos a ver la partida.

### Como Espectador:
1. Abre el enlace compartido.
2. En la sección "Unirse a una partida (Invitado)", introduce el código de 4 caracteres.
3. Dale a **"Ver Partida"**.
4. ¡Listo! Verás los puntos subir en tiempo real sin poder modificarlos.

---

## 💻 Desarrollo Local

Si deseas clonar este proyecto y probarlo en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/yandellcuevas-sketch/PuntosDomino.git
   ```
2. Abre el archivo `index.html` en tu navegador.
3. Asegúrate de configurar tus propias credenciales de Firebase en `firebase.js` si deseas usar tu propia base de datos.

---

Desarrollado con ❤️ para los amantes del dominó.