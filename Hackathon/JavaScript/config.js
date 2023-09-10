
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
  import {
    getDatabase,
    set,ref,update
  } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
  
  const firebaseConfig = {
    apiKey: "AIzaSyBoEBvJd2fPqoQicPal2R6EY8v3yZX5-nk",
    authDomain: "smit-attendance-app-5ee6c.firebaseapp.com",
    projectId: "smit-attendance-app-5ee6c",
    storageBucket: "smit-attendance-app-5ee6c.appspot.com",
    messagingSenderId: "115320514002",
    appId: "1:115320514002:web:48fac91368655e7343140b",
    measurementId: "G-VJZJRFCQ4T"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase(app);

  export{
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    database,
    set,ref,update
  }