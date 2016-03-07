var MAX_DISPLAY_LINES = 5;
var LINE_HEIGHT = 75;
var DELAY = {
  PAGE: 1000,
  CHAPTER: 2000
};
c.font = '36px Papyrus, fantasy';

// Text is an array of strings.
// Example: ['one string', 'two string', 'three string', 'four']
function writeText(x, y, lineHeight, text) {
  c.fillStyle = '#001f3f';
  c.fillRect(0, 0, a.width, a.height);
  c.fillStyle = '#01FF70'
  text.forEach(function(line, idx) {
    c.fillText(line, x, y + (idx * lineHeight));
    console.log(line);
  });
}
var write = writeText.bind(null, 100, 100, LINE_HEIGHT);

function render(journal) {
  var log = [];

  function addLog(line) {
    // Do we need to make room on the log?
    if (log.length === MAX_DISPLAY_LINES) {
      log.shift();
    }

    log.push(line);
    return log;
  }

  function next(x, y) {
    var chapter = journal[x];
    var page = chapter[y];

    // Out of chapters?
    if (journal.length === x) {
      return write(addLog('I\'ve been defeated.'));
    }

    // end of chapter?
    if (chapter.length === y) {
      return setTimeout(next.bind(0, x+1, 0), DELAY.CHAPTER);
    }

    write(addLog(page));
    setTimeout(next.bind(0, x, y+1), DELAY.PAGE);
  }

  // Start the render loop
  next(0, 0);
}


// 138 bytes.
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


// Player battles a monster!
// Mutates player.hp
// player {hp, bab, ac}
// monster {name, bab, ac, dmg}
function battle(player, monster) {
  var log = [
    'I spotted a ' + monster.name + '.'
    , (d20() + player.bab) >= monster.ac ?
    'The '+ monster.name +' was no match for me!'
    : 'I managed to flee.'
  ];
  var attack;

  // Monster attack
  if ((d20() + monster.bab) > player.ac) {
    attack = monster.dmg();
    player.hp -= attack;
    log.push('I took ' + attack + ' damage.');
  }

  return log;
}

// basic trap
// I see a strange rock.
// It was a trap!
// I took X damage.

// Player triggers a trap.
// player = {bab, hp}
// trap = {name, ac, dmg}
function trap(player, trap) {
  var log = [
    'I see a ' + trap.name
  ];

  var attack = d20() + player.bab;
  if (attack >= trap.ac) {
    log.push('I found some gold coins!');
    player.gold += d4();
  } else {
    log.push('It was a trap!');

    attack = trap.dmg();
    player.hp -= attack;
    log.push('I took ' + attack + ' damage.');
  }

  return log;
}

function status(player) {
  var log = [
    'Status: HP ' + player.hp + ', Gold ' + player.gold
  ];
  return log;
}


function run() {
  var log = [];
  var player = {hp: 11, bab: 5, ac: 17, gold: 0};
  var goblin = {name: 'Goblin', bab: 2, ac: 13, dmg: d4};
  var trapRock = {name: 'strange rocks', ac: 13, dmg: d4};
  var result, roll;

  while (player.hp > 0) {
    roll = d4();

    if (1 === roll) {
      result = battle(player, goblin);
    }
    if (2 === roll) {
      result = trap(player, trapRock);
    }
    if (3 === roll) {
      // result = status(player);
    }

    log.push(result);
  }

  return log;
}

// Try it out
// battle returns an l-system string.
var log = run();
render(log);
