const express = require("express");
const app = express();
const port = 3000;
const path = require('path');



// Set view engine ke EJS
app.set("view engine", "ejs");

// Middleware untuk menyajikan file statis (opsional)
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

// Route utama
app.get("/", (req, res) => {
  res.render("index", { title: "Home" , image: "/image/header-Home.png", image_menuPHONE: "/image/BG-buttonPhone.png", image_menuWEB: "/image/BG-buttonWEB.png", image_button: "/image/button.png", image_flowers1 :"/image/flowers.png", image_flowers2 :"/image/flowers2.png" , background : "/image/BG-2.png"});
});
app.get("/photo", (req, res) => {
  const selectedStrip = req.query.strip || ""
  res.render("photo", { title: "PhotoVG" ,message: "T A K E    P H O T O S", home_button: "/image/home-button.png", bingkai: "/image/bingkai.png", awan: "/image/awan.png", shoot: "/image/shootButton.png", download:"/image/downloadButton.png",strip: selectedStrip});
});
app.get("/footer", (req, res) => {
  res.render("footer", {});
});
app.get("/header", (req, res) => {
  res.render("header", {home_button: "/image/home-button.png",});
});
app.get("/ambilFoto", (req, res) => {
  const selectedStrip = req.query.strip || ""
  res.render("ambilFoto", {bingkai: "/image/bingkai.png",message: "T A K E    P H O T O S", awan: "/image/awan.png", shoot: "/image/shootButton.png", download:"/image/downloadButton.png",strip: selectedStrip });
});
app.get("/chooseStrip", (req, res) => {
  const strips = ["/image/strip1.png","/image/strip2.png","/image/strip3.png","/image/strip4.png",];
  res.render("chooseStrip", { strips });
});
// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
