var randomNumberP1 = Math.floor(Math.random() * 6) + 1;
var randomNumberP2 = Math.floor(Math.random() * 6) + 1;

var imageNumberP1 = "images/dice" + randomNumberP1 + ".png";
var imageNumberP2 = "images/dice" + randomNumberP2 + ".png";

document.getElementById("img1").src = imageNumberP1;
document.getElementById("img2").src = imageNumberP2;

if (imageNumberP1 > imageNumberP2) {
  document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
} else if (imageNumberP1 === imageNumberP2) {
  document.querySelector("h1").innerHTML = "Draw!";
} else if (imageNumberP1 < imageNumberP2) {
  document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
}
