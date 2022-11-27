import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAoIrbNwmof9X10a2rdz0lmkZWEpmmBfKk",
    authDomain: "blog-cff56.firebaseapp.com",
    projectId: "blog-cff56",
    storageBucket: "blog-cff56.appspot.com",
    messagingSenderId: "306541409306",
    appId: "1:306541409306:web:cbce327b6b5fc2cb594da3",
    measurementId: "G-YL01MZHGZM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);