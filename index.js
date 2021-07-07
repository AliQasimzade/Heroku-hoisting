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
  let table = [];
  database.ref("Table").on("value", (snap) => {
    snap.forEach(function (childsnap) {
      table.push(childsnap.val());
    });
  });
  setTimeout(() => {
    res.send(table);
  }, 200);
});

app.post("/chart", (req, res) => {
  let table = [];
  database.ref("Table").on("value", (snap) => {
    snap.forEach(function (childsnap) {
      let allId = Number(childsnap.key);
      if (allId < req.body.index) {
        table.push(childsnap.val());
      }
    });
  });

  setTimeout(() => {
    res.send(table);
  }, 200);
});

app.post("/update", (req, res) => {
  const data = req.body;
  let keys = [];
  database.ref("Table").on("value", (snap) => {
    snap.forEach(function (childsnap) {
      keys.push(Number(childsnap.key));
      
    });
  });
  // database.ref("Table").update({
  //   name: data.name,
  //   email: data.email,
  //   surname: data.surname,
  //   companyName: data.companyName,
  //   role: data.role,
  //   forecast: data.forecast,
  //   recentActivity: data.recentActivity,
  // });
  res.send(keys);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
