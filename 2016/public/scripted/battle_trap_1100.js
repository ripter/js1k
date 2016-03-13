(function(){
  c.font = '36px Papyrus, fantasy';

  // Text is an array of strings.
  // Example: ['one string', 'two string', 'three string', 'four']
  function write(text) {
    c.fillStyle = '#001f3f';
    c.fillRect(0, 0, a.width, a.height);
    c.fillStyle = '#01FF70'
    text.forEach(function(line, idx) {
      // x, y, line height
      c.fillText(line, 100, 100 + (idx * 75));
      console.log(line);
    });
  }

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
      var chapter = journal[x];
      var page = chapter[y];

      // Out of chapters?
      if (journal.length === x) {
        return;
      }

      // end of chapter?
      if (chapter.length === y) {
        return setTimeout(next.bind(0, x+1, 0), 2000);
      }

      write(addLog(page));
      setTimeout(next.bind(0, x, y+1), 1000);
    }

    // Start the render loop
    next(0, 0);
  }

  function d20() {
    return 0| (Math.random() * 20) + 1;
  }
  function d4() {
    return 0| (Math.random() * 4) + 1;
  }


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
  var log = run();
  render(log);
})();
