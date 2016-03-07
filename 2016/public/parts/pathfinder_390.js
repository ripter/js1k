// Pathfinder style
var goblin = {
  name: 'Goblin',
  hp: 6,
  ac: 13,
  bab: 2,
  damage: '1d4'
};

var fighter = {
  name: 'Fighter',
  hp: 11,
  ac: 17,
  bab: 5,
  damage: '1d8+4'
}

function battle(a, b) {
  var hit, dmg, log = [];

  while (a.hp > 0 && b.hp > 0) {
    log.push(fight(a,b));
    log.push(fight(b,a));
  }

  return log;
}

// returns a fight log item.
function fight(a, b) {
  hit = rollDice('1d20'+a.bab) >= b.ac;
  dmg = hit ? rollDice(a.damage) : 0;

  b.hp -= dmg; // if it didn't hit dmg will be 0
  return {
    name: a.name,
    hp: a.hp,
    dmg: dmg
  };
}

function toLog(battleLog) {
  return battleLog.map(function(log) {
    return [
      log.name,
      log.dmg > 0 ?
      ' strikes with '+log.dmg+' damage. '
      : 'fumbles and misses. ',
      'he still has ',
      log.hp,
      'HP.'
    ].join(' ');
  });
}
