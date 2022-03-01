
// Initialize Firebase
const db = firebase.firestore();
let rediger = document.getElementById("rediger");
const form = document.querySelector('#nameForm');

// Add a new document in collection "names"
form.addEventListener("submit", function(e){
    e.preventDefault();
    let navn = document.getElementById("navn").value;
    rediger.innerHTML = "Velkommen, vi ønsker deg alt som er godt, "+ navn +"!";
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

let randomNum = Math.round(Math.random()*100);
document.getElementById("lykketall").innerHTML = randomNum;

let lastMin = new Date().getMinutes();
let thisMin;
setInterval(function(){
    console.log("kjører")
    thisMin = new Date().getMinutes();
    if (thisMin !== lastMin){
        lastMin = thisMin;
        randomNum = Math.round(Math.random()*100);
        document.getElementById("lykketall").innerHTML = randomNum;
    }
},1000);


db.collection('names').onSnapshot(snapshot => {
    const docs = snapshot.docChanges()
    docs.forEach(doc => {
        if (doc.type == "added") {
            let list = document.getElementById("list");
            const docdata = doc.doc.data()
            const fornavn = docdata.name
            list.innerHTML += `<li>${fornavn}</li>`;
        };
    });
}); 