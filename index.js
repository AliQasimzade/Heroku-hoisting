const express = require("express");
const app = express();
const firebase = require("firebase");
const port = process.env.PORT || 3000;

require("firebase/firestore");
require("firebase/database");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var cors = require("cors");
app.use(cors({ origin: "*" }));

var firebaseConfig = {
  apiKey: "AIzaSyBwE6VsuDodrixBsWn0nuAvBMAELAzR3b0",
  authDomain: "dashboard-database-af1ec.firebaseapp.com",
  databaseURL: "https://dashboard-database-af1ec-default-rtdb.firebaseio.com",
  projectId: "dashboard-database-af1ec",
  storageBucket: "dashboard-database-af1ec.appspot.com",
  messagingSenderId: "540361460565",
  appId: "1:540361460565:web:68e55cb51f0b0624817ddc",
  measurementId: "G-4F40NZ5Q6T",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const database = firebase.database();

app.get("/getData", (req, res) => {
  db.collection("data")
    .doc("6IWWfXYYe2jqsUCvQInA")
    .get()
    .then((result) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(result.data());
    });
});

app.get("/chart", (req,res) => {

  database.ref("Sidebar").on('value',function(snapshot){
   res.send(snapshot.val())
   console.log(snapshot.val())
  })

  
})

app.post("/users", (req, res) => {
  const data = req.body;

  db.collection("data")
    .doc("6IWWfXYYe2jqsUCvQInA")
    .update({
      Lists: firebase.firestore.FieldValue.arrayUnion(data)
    })

    res.send(data)
    
});

app.post("/deleteuser", (req, res) => {
  const data = req.body;

  db.collection("data")
    .doc("6IWWfXYYe2jqsUCvQInA")
    .update({
      Lists: firebase.firestore.FieldValue.arrayRemove(data)
    });

    res.send(data)
    
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
