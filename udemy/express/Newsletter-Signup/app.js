const express = require("express");
const http = require("https");

const app = express();

const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
mailchimp.setConfig({
  apiKey: "eb5927dc06d05549e9257d3a005af69e-us13",
  server: "us13",
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  const listId = "f5fd253574";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });
    } catch (err) {
      res.redirect("/failure");
      return;
    }
    res.redirect("/success");
  }
  run();
});

app.get("/failure", function (req, res) {
  res.sendFile(__dirname + "/failure.html");
});

app.get("/success", function (req, res) {
  res.sendFile(__dirname + "/success.html");
});

app.listen(3000);
