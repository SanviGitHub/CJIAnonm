// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBquCJ6kPUYED5_J5swZ29UWEZyPIs7Cfo",
  authDomain: "foro-anonimo-87f08.firebaseapp.com",
  projectId: "foro-anonimo-87f08",
  storageBucket: "foro-anonimo-87f08.appspot.com",
  messagingSenderId: "903922609927",
  appId: "1:903922609927:web:c0bf7e427c721bcbb49fa2",
  measurementId: "G-YGCBW98VHV",
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección "mensajes"
const messagesCollection = collection(db, "mensajes");

// Manejar el envío del formulario
document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (!message) {
    alert("Por favor, escribe un mensaje antes de enviarlo.");
    return;
  }

  try {
    // Guardar el mensaje en Firestore
    await addDoc(messagesCollection, { content: message, timestamp: new Date() });
    messageInput.value = ""; // Limpiar el campo
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    alert("Hubo un error al enviar el mensaje. Intenta de nuevo.");
  }
});

// Escuchar mensajes en tiempo real
const messagesContainer = document.getElementById("messages");

const q = query(messagesCollection, orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
  messagesContainer.innerHTML = ""; // Limpiar mensajes previos

  snapshot.forEach((doc) => {
    const messageData = doc.data();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.textContent = messageData.content;

    // Añadir la clase "own" para tus propios mensajes (simulación)
    if (Math.random() > 0.5) bubble.classList.add("own");

    messageElement.appendChild(bubble);
    messagesContainer.appendChild(messageElement);

    // Desplazar al último mensaje
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});
