importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
    apiKey: "AIzaSyAW5XI1xtyDSCwXqgJxKY_bzLTJEHISoxo",
    authDomain: "gark-b5d29.firebaseapp.com",
    projectId: "gark-b5d29",
    storageBucket: "gark-b5d29.appspot.com",
    messagingSenderId: "482874847853",
    appId: "1:482874847853:web:047579139ad926d0b78564",
    measurementId: "G-VQXZB5PNJ6"
});
// Initialize Firebase
const messaging = firebase.messaging();
