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
  res.render("photo", { title: "PhotoVG", message: "Photo Selection" });
});
app.get("/footer", (req, res) => {
  res.render("footer", {});
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
