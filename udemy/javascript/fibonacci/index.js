function fibonacciGenerator(n) {
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  } else {
    var numbers = [0, 1];
    for (var i = 3; i <= n + 1; i++) {
      var newNumber = numbers[numbers.length - 1] + numbers[numbers.length - 2];
      numbers.push(newNumber);
    }
  }
  return numbers;
}
