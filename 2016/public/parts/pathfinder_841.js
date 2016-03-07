function attack(bonus, damage, armorClass) {
  if (rollDice('1d20+', bonus) >= armorClass) {
    return rollDice(damage);
  }
  return 0;
}


var template = {
  hit: function(name, damage) {
    return name + ' hits for ' + damage + ' damage.';
  },
  miss: function(name) {
    return name + ' swings wildly and misses.';
  },
  die: function(name) {
    return name + ' has been slain.';
  },
  status: function(name, hp) {
    return name + ' is down to ' + hp + ' hitpoitns.';
  }
};

function battle(a, b) {
  var log = [];
  var dmg;
  var initiative = [a, b];

  while (a.hitpoitns > 0 && b.hitpoitns > 0) {
    // A attacks B
    dmg = attack(a.attackBonus, a.damage, b.armorClass);
    b.hitpoitns -= dmg;
    if (dmg === 0) {
      log.push(template.miss(a.name));
    } else {
      log.push(template.hit(a.name, dmg));
    }
    log.push(template.status(b.name, b.hitpoitns));

    if (b.hitpoitns <= 0) {
      break;
    }

    // B attacks A
    dmg = attack(b.attackBonus, b.damage, a.armorClass);
    a.hitpoitns -= dmg;
    if (dmg === 0) {
      log.push(template.miss(b.name));
    } else {
      log.push(template.hit(b.name, dmg));
    }
    log.push(template.status(a.name, a.hitpoitns));
  }

  if (b.hitpoitns <= 0) {
    log.push(template.die(b.name));
  } else {
    log.push(template.die(a.name));
  }

  return log;
};

var text = battle(fighter, goblin);
