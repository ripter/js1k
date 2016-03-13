(function(){
  function render(journal) {
    var log = [];

    function addLog(line) {
      // Only display 5 lines in the log
      if (5 === log.length) {
        log.shift();
      }

      log.push(line);
      return log;
    }

    function next(x, y) {
      // Out of chapters?
      if (journal.length === x) {
        return;
      }
      // end of chapter?
      if (y === journal[x].length) {
        return setTimeout(next.bind(0, x+1, 0), 2000);
      }
      write(addLog(journal[x][y]));
      setTimeout(next.bind(0, x, y+1), 1000);
    }

    // Text is an array of strings.
    // Example: ['one string', 'two string', 'three string', 'four']
    function write(text) {
      c.fillStyle = '#001f3f';
      c.fillRect(0, 0, a.width, a.height);
      c.fillStyle = '#01FF70'
      text.forEach(function(line, idx) {
        // x, y, line height
        c.fillText(line, 100, 100 + (idx * 75));
      });
    }

    // Start the render loop
    c.font = '36px Papyrus, fantasy';
    next(0, 0);
  }

  // Random number
  function rnd(max, min) {
    return 0| (Math.random() * max) + 0|min;
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
    var log = ['Battle: ' + monster.name + ' hp: ' + monster.hp];
    var hpMonster = monster.hp;
    var attack;

    while (player.hp > 0 && hpMonster > 0) {
      if (d20() + player.bab >= monster.ac) {
        attack = player.dmg();
        hpMonster -= attack;
        log.push('Attack: ' + attack + ' damage.')
      } else {
        log.push('Attack Missed');
      }

      if (monster.hp < 1) {
        log.push('Won! My hp: '+ player.hp);
        break;
      }

      if ((d20() + monster.bab) > player.ac) {
        attack = monster.dmg();
        player.hp -= attack;
        log.push('I was hit for ' + attack + ' damage.');
      }

      if (player.hp < 1) {
        log.push('I was slain by a ' + monster.name);
        break;
      }
    }

    return log;
  }

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
        result = battle(player, mob);
      }
      if (2 === roll) {
        result = trap(player, trapRock);
      }
      if (4 === roll && player.hp < 11) {
        result = status(player);
      }

      if (result) {
        log.push(result);
      }
    }

    return log;
  }

  // Try it out
  var log = run();
  console.log(log);
  render(log);
})();
