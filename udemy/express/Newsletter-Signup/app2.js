const express = require("express");
const http = require("https");

const app = express();

const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/f5fd253574";
  const options = { Method: "POST", auth: "Jono: eb5927dc06d05549e9257d3a005af69e-us13" };
  const request = http.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse);
    });
  });
  request.write(jsonData);
  request.end();
  // ""
});

app.listen(3000, function () {
  console.log("app is running on 3000");
});
