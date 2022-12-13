//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => {
    console.log("connect mongo");
  })
  .catch((err) => {
    console.error(err);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    email: req.body.username,
    password: hash,
  });
  await newUser.save();
  res.render("secrets");
});

app.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await User.findOne({ email: username });
  if (foundUser) {
    bcrypt.compare(password, foundUser.password).then(function (result) {
      if (result) {
        res.render("secrets");
      } else {
        console.log("Incorrect password");
        console.log(result);
      }
    });
  } else {
    console.log("User Not found.");
  }
});
app.listen(3000, function () {
  console.log("server started on port 3000.");
});
