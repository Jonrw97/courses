function whosPaying(names) {
  var arrayLen = names.length();
  var paying = Math.floor(arrayLen * Math.random());
  return names[paying] + " is going to buy lunch today!";
}
