(function(){
  var journal = [];
  var displayBuffer = [0,0,0,0,0];

  // Add the entry to the journal
  // delay optional.
  function logLine(entry, delay) {
    journal.push({entry: entry, delay: delay || 1000});
  }
  // render the journal as a slow scroll
  function render() {
    var log = journal.shift();
    if (!log) { return; }

    c.font = '36px Papyrus, fantasy';
    c.fillStyle = '#001f3f';
    c.fillRect(0, 0, a.width, a.height);
    c.fillStyle = '#01FF70'

    // use a buffer for the 'scroll' effect
    displayBuffer.shift();
    displayBuffer.push(log.entry);
    displayBuffer.forEach(function(line, idx) {
      c.fillText(line, 100, 100 + (idx * 75));
    });

    setTimeout(render, log.delay);
  }

  // Random number
  function rnd(max, min) {
    return 0| (Math.random() * max + min || 0);
  }
  var d20 = rnd.bind(0, 20, 1);
  var d8 = rnd.bind(0, 8, 1)
  var d6 = rnd.bind(0, 6, 1)
  var d4 = rnd.bind(0, 4, 1);


  function run() {
    var player = {hp: 10}
    var actions = {
      0: function() {
        logLine('Picking up a distress beacon.');
      },
      1: function() {
        logLine('Found an inhabited planet.')
      },
      2: function() {
        logLine('Refueling at nearby star.')
      },
      3: function() {
        logLine('Mining an astroid.')
      }
    }

    logLine('Leaving the spaceport.');
    for (var i=0; i < 4; i++) {
      actions[d4()]();
    }
  }

  // Generate the journal and render it.
  run();
  render();
})();
