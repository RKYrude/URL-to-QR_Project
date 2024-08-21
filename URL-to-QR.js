import express from "express"
import bodyParser from "body-parser"
import qr from "qr-image"
import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.render("URLtoQR.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/generate", (req, res) => {

  let inputURL = req.body["inputURL"];
  let inputfileName = req.body["fileName"];
  if(inputfileName == ""){
    inputfileName = "QRimg.png"
  }
  let qr_img = qr.image(inputURL);

  qr_img.pipe(fs.createWriteStream(__dirname + "/public/images/QRimg.png"));

  res.render("URLtoQR2.ejs", {
    
    fileName: inputfileName,
  });
});




// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjxiYSo7W1jakXJtUs8vQ15pGj_uN0HS8",
  authDomain: "url-to-qr-1d19b.firebaseapp.com",
  projectId: "url-to-qr-1d19b",
  storageBucket: "url-to-qr-1d19b.appspot.com",
  messagingSenderId: "378109342379",
  appId: "1:378109342379:web:f8d894a2beafdc3c9dbdee",
  measurementId: "G-BFJ9B2Q6MD"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const analytics = getAnalytics(fire);