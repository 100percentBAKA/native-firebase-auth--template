import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDiUGZ0QQ6wE2kQCp31mQDAM3BhZFP8OtM",
    authDomain: "native-8e85d.firebaseapp.com",
    projectId: "native-8e85d",
    storageBucket: "native-8e85d.appspot.com",
    messagingSenderId: "306912167791",
    appId: "1:306912167791:web:19e97f3e9f3347c2ed8a9a",
    measurementId: "G-4DWGL25P08"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();