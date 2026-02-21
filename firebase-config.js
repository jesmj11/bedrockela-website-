// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe9j9udmBMxjSgQ9rjlao8bYOGnPcg69Y",
  authDomain: "bedrockela-96dbd.firebaseapp.com",
  projectId: "bedrockela-96dbd",
  storageBucket: "bedrockela-96dbd.firebasestorage.app",
  messagingSenderId: "195204486496",
  appId: "1:195204486496:web:c28bcef144debea29f3a05",
  measurementId: "G-5F2WPVCWXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
