//require the Mongoose package (after running >npm i mongoose in Hyper to install it)
const mongoose = require("mongoose");

//connect to MongoDB by specifying port to access MongoDB server
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");

  //   Making the fruitsDB

  //create a SCHEMA that sets out the fields each document with datatypes

  const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
  });

  //create a MODEL

  const Fruit = new mongoose.model("Fruit", fruitSchema);

  Fruit.deleteMany({ name: "Apple" }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted documets that match!!");
    }
  });
  //   mongoose.connection.close();
}

// Fruit.find(function (err, fruits) {
//     if (err) {
//       console.log(err);
//     } else {
//       fruits.forEach(function (fruit) {
//         console.log(fruit.name);
//       })}});

//   //create a DOCUMENT

//   const fruit = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Great!",
//   });

//   //save the document

//   fruit.save();

// extra attempt

//   const peopleSchema = new mongoose.Schema({ name: String, age: Number });

//   const People = new mongoose.model("People", peopleSchema);

//   const person = new People({ name: "John", age: 42 });

//   person.save();
