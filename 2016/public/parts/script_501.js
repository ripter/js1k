// dice is a string in D&D style
// example: 2d6, 1d20, 4d2+7, 1d10-2
function rollDice(dice) {
  var match = /(\d*)d(\d+)([+-]?\d*)/.exec(dice);
  var numberOfDice = 0|match[1] || 1;
  var numberOfSides = 0|match[2];
  var modifier = 0|match[3];
  var result = 0;

  while (numberOfDice--) {
    result += 0| (Math.random() * numberOfSides) + 1;
  }

  result += modifier;
  return result;
}

var d20 = rollDice.bind(0, '1d20');
var d4 = rollDice.bind(0, '1d4');

// Basic battle:
// I spoted a Goblin.
// That Goblin was no match for me!
// I suffered 1 damage.

var player = {
  hp: 11,
  bab: 5,
  ac: 17
};

var goblin = {
  name: 'Goblin',
  bab: 2,
  ac: 13,
  dmg: d4
};

function battle(a, b) {
  var log = [
    'I spotted a ' + b.name + '.'
  ];
  var attack;

  // My attack
  attack = d20() + a.bab;
  if (attack >= b.ac) {
    log.push('The '+ b.name +' was no match for me!');
  } else {
    log.push('I managed to flee.')
  }

  // Monster attack
  attack = d20() + b.bab;
  if (attack > a.ac) {
    attack = b.dmg();
    a.hp -= attack;
    log.push('I took ' + attack + ' damage.');
  }

  return log;
}
