
// Initialize Firebase
const db = firebase.firestore();
let rediger = document.getElementById("rediger");
const form = document.querySelector('#nameForm');

function lol(output){
    console.log(output)
};
//get ip for banning ram
function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

var url = "https://ipgeolocation.abstractapi.com/v1/?api_key=2d4b8ef391fc43e5aa7274ae60d0b066"

httpGetAsync(url,lol);

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
            list.innerHTML += `<hr></hr>`;
        };
    });
}); 