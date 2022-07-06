import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAaLkiNevB_9TXWAlMfiAmNf4yTdBwNKxc",
    authDomain: "course-enroll-project.firebaseapp.com",
    projectId: "course-enroll-project",
    storageBucket: "course-enroll-project.appspot.com",
    messagingSenderId: "541935355843",
    appId: "1:541935355843:web:28075c43a8a694295e1f76"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const authentication = getAuth(app);

export {db, authentication}