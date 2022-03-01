// Import the functions you need from the SDKs you need
import { initializeApp } from "./node_modules/firebase/app";
import { getFirestore } from "./node_modules/firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9CMCdQHYzTc2sOqlbxlrRdiXwnPGl1ak",
  authDomain: "dagsoppgave-69c62.firebaseapp.com",
  projectId: "dagsoppgave-69c62",
  storageBucket: "dagsoppgave-69c62.appspot.com",
  messagingSenderId: "935042062511",
  appId: "1:935042062511:web:8d2995fa889b9a76949c5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const form = document.querySelector('form');

// Add a new document in collection "names"
let navn = document.getElementById("navn").value;
db.collection("names").doc().set({
    name: navn
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});

db.collection('names').onSnapshot(snapshot => {
    const docs = snapshot.docChanges()
    docs.forEach(doc => {
        if (doc.type == "added") {
            const docdata = doc.doc.data()
            const fornavn = docdata.name
            list.innerHTML += `<li>${fornavn}</li>`;
        };
    });
}); 