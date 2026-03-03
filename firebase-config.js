// Firebase Configuration (Compat version - no imports needed)
// Firebase SDK loaded via script tags in HTML

const firebaseConfig = {
  apiKey: "AIzaSyBe9j9udmBMxjSgQ9rjlao8bYOGnPcg69Y",
  authDomain: "bedrockela-96dbd.firebaseapp.com",
  projectId: "bedrockela-96dbd",
  storageBucket: "bedrockela-96dbd.firebasestorage.app",
  messagingSenderId: "195204486496",
  appId: "1:195204486496:web:c28bcef144debea29f3a05",
  measurementId: "G-5F2WPVCWXG"
};

// Initialize Firebase using compat SDK (loaded via script tags)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized');
} else {
  console.error('❌ Firebase SDK not loaded - check script tags');
}
