var numberOfBottles = 99;
while (numberOfBottles >= 0) {
  var bottleWord = "bottles";
  var bottleSentance = "Take one down, pass it around,";
  if (numberOfBottles === 1) {
    bottleWord = "bottle";
  } else if (numberOfBottles === 0) {
    bottleWord = "No more bottles";
    bottleSentance = "Go to the shop, to get some more.";
  }
  console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
  console.log(numberOfBottles + " " + bottleWord + " of beer,");
  console.log(bottleSentance);
  numberOfBottles--;
  console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
}
