import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2h1RwfQYSCfCBINGlzcecCf5hnhuXH6s",
  authDomain: "salamty-ai.firebaseapp.com",
  projectId: "salamty-ai",
  storageBucket: "salamty-ai.firebasestorage.app",
  messagingSenderId: "92389449424",
  appId: "1:92389449424:web:1845ca1780f16d32ad48d5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;