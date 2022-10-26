function isLeap(year) {
  var remainder = year % 4;
  if (remainder === 0) {
    remainder = year % 100;
    if (remainder > 0) {
      return "Leap year.";
    } else {
      remainder = year % 400;
      if (remainder === 0) {
        return "Leap year.";
      } else {
        return "Not leap year.";
      }
    }
  } else {
    return "Not leap year.";
  }
}
