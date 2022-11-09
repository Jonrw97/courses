const express = require("express");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const day = date.getDate();

mongoose
  .connect("mongodb://localhost:27017/todolistDB")
  .then(() => {
    console.log("connect mongo");
  })
  .catch((err) => {
    console.error(err);
  });

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = new mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", async function (req, res) {
  const foundItems = await Item.find({});
  if (foundItems.length === 0) {
    await Item.insertMany(defaultItems);
    console.log("Data inserted");
    res.redirect("/");
  } else {
    res.render("list", { day: day, listTitle: "List", newListItems: foundItems });
  }
});

app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({ name: itemName });
  if (listName === "List") {
    await newItem.save();
    res.redirect("/");
  } else {
    const foundList = await List.findOne({ name: listName });
    await foundList.items.push(newItem);
    await foundList.save();
    res.redirect("/" + listName);
  }
});

app.post("/delete", async function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "List") {
    await Item.findByIdAndRemove(checkedItemId);
    console.log("Item:" + checkedItemId + " Removed");
    res.redirect("/");
  } else {
    await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } });
    res.redirect("/" + listName);
  }
});

app.get("/:customListName", async function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  const foundList = await List.findOne({ name: customListName });
  if (!foundList) {
    const list = new List({
      name: customListName,
      items: defaultItems,
    });
    await list.save();
    res.redirect("/" + customListName);
  } else {
    res.render("list", { day: day, listTitle: foundList.name, newListItems: foundList.items });
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("running on 3000");
});

// Item.find({}, function (err, foundItems) {
//   if (foundItems.length === 0) {
//     Item.insertMany(defaultItems, function (err) {
//       if (err) {
//         console.log(error);
//       } else {
//         console.log("Data inserted");
//       }
//     });
//     res.redirect("/");
//   } else {
//     res.render("list", { listTitle: day, newListItems: foundItems });
//   }
// });
// });
