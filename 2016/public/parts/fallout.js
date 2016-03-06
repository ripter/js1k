
      var mobs = ['rad roach', 'mole rat', 'vicious dog'];
      var scene = [
        'A MOB slowly approaches.',
        'I was able to kill the MOB'
      ];
      var stories = {
        radioTower: [
          'I see an old radio tower in the distance.',
          'I aproach the raido tower cautiously.',
          'The door is locked.',
          'I was able to break the lock',
        ],
        combat: [
          'The Rad Roach attacks.',
          'It does 3 damage.',
          'I shoot.',
          'It does 6 damage.',
          'The Rad Roach is dead.',
          'Gained 5 exp. Found 1 Rad Roach Meat'
        ]
      };

      c.font = '48px serif';

      // Text is an array of strings.
      // Example: ['one string', 'two string', 'three string', 'four']
      function writeText(x, y, lineHeight, text) {
        c.clearRect(x, y, 100, 100);
        text.forEach(function(line, idx) {
          c.fillText(line, x, y + (idx * lineHeight));
        });
      }

      var write = writeText.bind(null, 100, 100, 100);

      var idx = 0;
      var text = [
        'Sword Attack',
        'Block attack',
        'Goblin atacks with his short sword',
        'Goblin deals X damage'
      ];
      var log = [];

      var intervalID = window.setInterval(function() {
        if (idx === text.length) {
          window.clearInterval(intervalID);
          return;
        }

        log.push(text[idx]);
        idx += 1;
        write(log);
      }, 1000);



      // scene.forEach(function(sentence, idx) {
      //   var mobIndex = 0| Math.random() * mobs.length;
      //   var mob = mobs[mobIndex];
      //   var log = sentence.replace('MOB', mob);
      //
      //   c.fillText(log, 100, 100 + (idx * 100));
      // });
