// dice is a string in D&D style
// example: 2d6, 1d20, 4d2+7, 1d10-2
function rollDice(dice) {
  var match = /(\d*)d(\d+)([+-]?\d*)/.exec(dice);
  var numberOfDice = 0|match[1] || 1;
  var numberOfSides = 0|match[2];
  var modifier = 0|match[3];
  var result = 0;

  while (numberOfDice--) {
    result += 0| Math.random() * numberOfSides + 1;
  }

  result += modifier;
  return result;
}
