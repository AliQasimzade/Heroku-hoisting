const express = require("express");
const app = express();
const firebase = require("firebase/app");
const port = process.env.PORT || 3000;
require("firebase/firestore");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var cors = require("cors");
app.use(cors({ origin: "*" }));

var firebaseConfig = {
  apiKey: "AIzaSyBwE6VsuDodrixBsWn0nuAvBMAELAzR3b0",
  authDomain: "dashboard-database-af1ec.firebaseapp.com",
  projectId: "dashboard-database-af1ec",
  storageBucket: "dashboard-database-af1ec.appspot.com",
  messagingSenderId: "540361460565",
  appId: "1:540361460565:web:68e55cb51f0b0624817ddc",
  measurementId: "G-4F40NZ5Q6T"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

app.get("/getData", (req, res) => {
  db.collection("data")
    .doc("6IWWfXYYe2jqsUCvQInA")
    .get()
    .then((result) => {
      res.header("Access-Control-Allow-Origin","*");
      res.send(result.data());
    });
});

app.post("/users", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send({
    success: "200 response",
    res: "You are now just talked with server",
  });
  db.collection("data")
    .doc("XLxHb8O2A3EY6IWWfXYYe2jqsUCvQInAa2YAt5Jq")
    .update({ ...Lists.push(firebase.firestore.FieldValue.delete())  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});