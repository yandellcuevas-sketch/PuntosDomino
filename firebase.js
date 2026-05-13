// firebase.js

// ─────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE FIREBASE (Realtime Database)
// ─────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCzE8-5KsC7a-XD6AgFhIbc1faCfSG9xZ4",
  authDomain: "puntosdomino.firebaseapp.com",
  projectId: "puntosdomino",
  storageBucket: "puntosdomino.firebasestorage.app",
  messagingSenderId: "924063677603",
  appId: "1:924063677603:web:5b9e52677ca59d026d9316",
  measurementId: "G-ZSZEN01339"
};

let db = null;

// Inicializar Firebase
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log("Firebase (Realtime Database) inicializado.");
} else {
    console.log("Firebase no configurado. La aplicación funcionará en modo local (localStorage).");
}

const PATH_GAME = 'games/partida_actual';
const PATH_HISTORY = 'history/full_history';

// ─── Funciones de Sincronización ──────────────────────────────────

// Guardar la partida activa
function fb_saveGame(gameData) {
    if (!db) return;
    db.ref(PATH_GAME).set(gameData)
        .catch(e => console.error("Error al guardar partida en Firebase:", e));
}

// Escuchar cambios en la partida activa en tiempo real
function fb_onGameChange(callback) {
    if (!db) return null;
    const ref = db.ref(PATH_GAME);
    ref.on('value', (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        }
    }, e => console.error("Error en listener de partida:", e));
    return ref;
}

// Guardar el historial completo
function fb_saveHistory(historyList) {
    if (!db) return;
    db.ref(PATH_HISTORY).set({ list: historyList })
        .catch(e => console.error("Error al guardar historial en Firebase:", e));
}

// Escuchar cambios en el historial en tiempo real
function fb_onHistoryChange(callback) {
    if (!db) return null;
    const ref = db.ref(PATH_HISTORY);
    ref.on('value', (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val().list);
        }
    }, e => console.error("Error en listener de historial:", e));
    return ref;
}
