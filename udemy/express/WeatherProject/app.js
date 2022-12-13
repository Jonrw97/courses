const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "55bc864beb4650efa493633a0db852bc";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weather = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.render(__dirname + "/weather.html", { query: query, temp: temp, weather: weather, icon: icon });
    });
  });
});

app.listen(3000);
