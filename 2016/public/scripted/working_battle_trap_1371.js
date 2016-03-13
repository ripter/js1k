(function(){
  var journal = [];
  var displayBuffer = [];

  // Add the entry to the journal
  // delay optional.
  function logLine(entry, delay) {
    journal.push({entry: entry, delay: delay || 1000});
  }
  // displays a line from the journal at a time.
  function writeLine() {
    var log = journal.shift();
    if (!log) { return; }
    var line = log.entry;

    // use a buffer for the 'scroll' effect
    if (5 === displayBuffer.length) {
      displayBuffer.shift();
    }
    displayBuffer.push(line);

    // render the buffer
    c.font = '36px Papyrus, fantasy';
    c.fillStyle = '#001f3f';
    c.fillRect(0, 0, a.width, a.height);
    c.fillStyle = '#01FF70'
    displayBuffer.forEach(function(line, idx) {
      //        (x,    y,   line height)
      c.fillText(line, 100, 100 + (idx * 75));
    });

    setTimeout(writeLine, log.delay);
  }

  // Random number
  function rnd(max, min) {
    return 0| (Math.random() * max + min || 0);
  }
  var d20 = rnd.bind(0, 20, 1);
  var d8 = rnd.bind(0, 8, 1)
  var d6 = rnd.bind(0, 6, 1)
  var d4 = rnd.bind(0, 4, 1);


  // Player battles a monster!
  // Mutates player.hp
  // player {hp, bab, ac}
  // monster {name, bab, ac, dmg}
  function battle(player, monster) {
    logLine('Battle: ' + monster.name + ' hp: ' + monster.hp);
    var hpMonster = monster.hp;
    var attack;

    while (player.hp > 0 && hpMonster > 0) {
      if (d20() + player.bab >= monster.ac) {
        attack = player.dmg();
        hpMonster -= attack;
        logLine('Attack: ' + attack + ' damage.');
      } else {
        logLine('Attack Missed');
      }

      if (monster.hp < 1) {
        logLine('Won! My hp: '+ player.hp);
        break;
      }

      if ((d20() + monster.bab) > player.ac) {
        attack = monster.dmg();
        player.hp -= attack;
        logLine('I was hit for ' + attack + ' damage.');
      }

      if (player.hp < 1) {
        logLine('I was slain by a ' + monster.name);
        break;
      }
    }
  }

  // Player triggers a trap.
  // player = {bab, hp}
  // trap = {name, ac, dmg}
  function trap(player, trap) {
    logLine('I see a ' + trap.name);

    var attack = d20() + player.bab;
    if (attack >= trap.ac) {
      logLine('I found some gold coins!');
      player.gold += d4();
    } else {
      logLine('It was a trap!');

      attack = trap.dmg();
      player.hp -= attack;
      logLine('I took ' + attack + ' damage.');
    }
  }

  function status(player) {
    logLine('Status: HP ' + player.hp + ', Gold ' + player.gold);
  }

  function run() {
    var player = {hp: 11, bab: 5, ac: 17, gold: 0, dmg: d8};
    var monsters = [
      {name: 'Goblin',       hp: 6,  ac: 13, bab: 2, dmg: d4},
      {name: 'Goblin Dog',   hp: 9,  ac: 13, bab: 2, dmg: d6},
      {name: 'Goblin Snake', hp: 13, ac: 14, bab: 2, dmg: d4},
      {name: 'Golden Cat',   hp: 11, ac: 15, bab: 5, dmg: d4},
    ]
    var trapRock = {name: 'strange rocks', ac: 13, dmg: d4};
    var result, roll;
    var mob;

    while (player.hp > 0) {
      roll = d4();
      result = null;

      if (1 === roll) {
        mob = monsters[rnd(monsters.length)];
        battle(player, mob);
      }
      if (2 === roll) {
        trap(player, trapRock);
      }
      if (4 === roll && player.hp < 11) {
        status(player);
      }
    }
  }


  // Try it out
  // function is called on entry add/log
  run();
  // start writing the journal.
  writeLine();
})();
