/*
Pythagoras Tree
variables : 0, 1
constants: [, ]
axiom  : 0
rules  : (1 → 11), (0 → 1[0]0)
*/
var rules = {
  '1': '11',
  '0': '1[0]0'
};

// Render an L-system string.
// origin {x, y, a}
// source '10[]'
function render(origin, source) {
  var TURN = Math.PI/4; // 45 degrees
  var position = origin;
  var stack = [];
  var nextPosition;

  // clear the screen
  c.fillStyle = 'white';
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);

  c.strokeStyle = '#FF851B';
  c.beginPath();
  // start at origin
  c.moveTo(origin.x, origin.y);

  source.split('').forEach(function(code) {
    // push position and angle. turn left 45 degrees
    if (code === '[') {
      stack.push(Object.assign({}, position));
      nextPosition.a -= TURN;
    }

    // pop position and angle. turn right 45 degrees
    if (code === ']') {
      position = stack.pop();
      c.moveTo(position.x, position.y);
      position.a += TURN;
    }

    // draw a 'leaf',
    // a line segment that doesn't advance position.
    if (code === '0') {
      nextPosition = calcNextPosition(position);
      c.lineTo(nextPosition.x, nextPosition.y);
      c.moveTo(position.x, position.y);
    }

    // draw a line segment and advance position.
    if (code === '1') {
      nextPosition = calcNextPosition(position);
      position = nextPosition;
      c.lineTo(nextPosition.x, nextPosition.y);
    }
  });

  c.stroke();
}

// Calculate the next postion
function calcNextPosition(position) {
  var LENGTH = 5;
  var radian = position.a;

  return {
    x: position.x + (0|Math.cos(radian) * LENGTH),
    y: position.y + (0|Math.sin(radian) * LENGTH),
    a: position.a
  };
}
