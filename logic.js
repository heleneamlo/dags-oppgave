
// Initialize Firebase
const db = firebase.firestore();

const form = document.querySelector('form');

// Add a new document in collection "names"
form.addEventlistener("submit", function(){
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