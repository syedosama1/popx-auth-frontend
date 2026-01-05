import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCkr0enxzF0FKJTSgdDodFrtkn9D9tadKM",
  authDomain: "popx-e7879.firebaseapp.com",
  projectId: "popx-e7879",
  storageBucket: "popx-e7879.firebasestorage.app",
  messagingSenderId: "732543989680",
  appId: "1:732543989680:web:cdcf55c7884644ccdf0875",
  measurementId: "G-XLQ11C63P4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)