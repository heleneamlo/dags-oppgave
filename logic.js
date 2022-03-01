// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

function addPerson(newPerson) {
    db.collection('names')
        .get()
        .then(snapshot => {
                db.collection('names')
                .add(newPerson)
                .then(() => {
                    alertPopup('Person Registrert!');
                });
        });
};
form.addEventListener("submit", e => {
    e.preventDefault()
    const docFornavn = document.querySelector('#navn').value;
    const newPerson = {
        name: docFornavn,
    }
addPerson(newPerson)
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