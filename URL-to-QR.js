import express from "express"
import bodyParser from "body-parser"
import qr from "qr-image"
import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

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