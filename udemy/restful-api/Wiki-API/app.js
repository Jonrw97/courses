const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/wikiDB")
  .then(() => {
    console.log("connect mongo");
  })
  .catch((err) => {
    console.error(err);
  });

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = new mongoose.model("Article", articlesSchema);

app
  .route("/articles")

  .get(async function (req, res) {
    const foundArticles = await Article.find();
    res.send(foundArticles);
  })

  .post(async function (req, res) {
    console.log();
    console.log();
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    await newArticle.save();
    res.send("Successfully saved Article");
  })

  .delete(async function (req, res) {
    await Article.deleteMany();
    res.send("Successfully deleted all Articles");
  });

app
  .route("/articles/:customArticle")

  .get(async function (req, res) {
    const foundArticle = await Article.findOne({ title: req.params.customArticle });
    res.send(foundArticle);
  })

  .put(async function (req, res) {
    await Article.replaceOne(
      { title: req.params.customArticle },
      { title: req.body.title, content: req.body.content }
    );
    res.send("Successfully replaced Article: " + req.params.customArticle + ".");
  })

  .patch(async function (req, res) {
    await Article.updateOne(
      { title: req.params.customArticle },
      { title: req.body.title, content: req.body.content }
    );
    res.send("Successfully updated Article: " + req.params.customArticle + ".");
  })

  .delete(async function (req, res) {
    await Article.deleteOne({ title: req.params.customArticle });
    res.send("Successfully Deleted Article: " + req.params.customArticle + ".");
  });

app.listen(3000, function () {
  console.log("running on 3000");
});
