import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaOw54JeM2a5U1PloCVXOJ9wsUpqpT9zk",
  authDomain: "insta-lite-c1edf.firebaseapp.com",
  projectId: "insta-lite-c1edf",
  storageBucket: "insta-lite-c1edf.firebasestorage.app",
  messagingSenderId: "631055723149",
  appId: "1:631055723149:web:dfe82a1119256b9493d0c4",
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

const auth = getAuth(app);

export { app, db, auth };
