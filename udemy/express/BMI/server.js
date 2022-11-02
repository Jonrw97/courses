const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  function bmiCalculator(weight, height) {
    var bmi = Math.round(weight / Math.pow(height, 2));
    if (bmi < 18.5) {
      var interpretation = "Your BMI is " + bmi + ", so you are underweight.";
    }
    if (bmi > 18.5 && bmi < 24.9) {
      interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
    }
    if (bmi > 24.9) {
      interpretation = "Your BMI is " + bmi + ", so you are overweight.";
    }
    return interpretation;
  }
  res.send(bmiCalculator(weight, height));
});

app.listen(3000);
