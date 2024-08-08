import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUQVsiytOa9sTWrx_hYLMsvNWSQAmzIvs",
    authDomain: "add-doc-a227d.firebaseapp.com",
    projectId: "add-doc-a227d",
    storageBucket: "add-doc-a227d.appspot.com",
    messagingSenderId: "402883757497",
    appId: "1:402883757497:web:eea2cbc56f4578af2c6268"
};

// Firebase ko initialize karna
const app = initializeApp(firebaseConfig);

// Firestore aur Storage ko initialize karna
const db = getFirestore(app);
const storage = getStorage(app);

export {
    db,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    onSnapshot,
    storage,
    ref,
    uploadBytes,
    getDownloadURL
};


