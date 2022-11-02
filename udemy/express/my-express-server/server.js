const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.send("hello");
});

app.get("/about", function (req, res) {
  res.send("<h2>Hi my name is Jonathan Watkins, i changed th</h2>");
});

app.listen(3000);
