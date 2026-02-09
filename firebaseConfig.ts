import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0ikwLcXZd5ZkhJ3YuXVfjgt-fXhpeZrA",
    authDomain: "escopo-v3-8e4c3.firebaseapp.com",
    databaseURL: "https://escopo-v3-8e4c3-default-rtdb.firebaseio.com",
    projectId: "escopo-v3-8e4c3",
    storageBucket: "escopo-v3-8e4c3.firebasestorage.app",
    messagingSenderId: "137825396088",
    appId: "1:137825396088:web:9deaad29139d901a9e148d",
    measurementId: "G-SR67SXMGVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa e exporta serviços com configurações
// ignoreUndefinedProperties: true é CRÍTICO para evitar erros em atualizações parciais
export const db = initializeFirestore(app, {
    ignoreUndefinedProperties: true
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
