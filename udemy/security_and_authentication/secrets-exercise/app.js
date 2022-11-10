//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

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

const secret = "Thisisourlittlesecret.";

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

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
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  await newUser.save();
  res.render("secrets");
});

app.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await User.findOne({ email: username });
  if (foundUser) {
    if (foundUser.password === password) {
      res.render("secrets");
    } else {
      console.log("Incorrect password");
    }
  } else {
    console.log("User Not found.");
  }
});
app.listen(3000, function () {
  console.log("server started on port 3000.");
});
