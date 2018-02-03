console.log('Coin Miner 2018');
// colors: http://www.color-hex.com/color-palette/43493
//
//TEMP
const elRefrence = document.createElement('img');
// b.appendChild(elRefrence);
elRefrence.onload = function() {
  tick();
}
elRefrence.src = 'one-point-perspective-grid.jpg';
//END TEMP

/*
 * Apple Watch Game
 * When a rock appears, tap to mine it and collect the coin.
 * When a choice appears, tap left or right to take that path.
 * Try to get the most coins!
 */
const WIDTH = 312;
const HEIGHT = 390;
const FRAME_RATE = 250;
const VPOINT = {
  X: 0| WIDTH/2,
  Y: 0| 165,
};

let lastTimestamp = -FRAME_RATE;


// Start Game Loop
// Self Invoking Function
function tick(timestamp = 0) {
  timestamp = 0 | timestamp; // round to milliseconds
  const diff = 0| (timestamp - lastTimestamp);
  // console.log('tick', diff);

  if (diff >= FRAME_RATE) {
    lastTimestamp = timestamp;
    // clearScreen();
    // c.save();
    c.drawImage(elRefrence, -159, 0);
    // c.restore();

    drawCross();

    // drawBox(1, (WIDTH/2), 10, 100, 100);

    // drawBox(5, (WIDTH/2), 200, 100, 100);

    // c.save();
    // c.translate(0, -(WIDTH/3));
    c.strokeStyle = 'red';
    drawVanishing(0);
    c.strokeStyle = 'blue';
    drawVanishing(1);
    c.strokeStyle = 'green';
    drawVanishing(3);
    drawVanishing(4);
    drawVanishing(5);
    // c.restore();

    c.strokeStyle = 'black';
    c.strokeRect(0, 0, WIDTH, HEIGHT);
  }

  // allow pausing for debugging.
  if (!window.pause){
    // window.requestAnimationFrame(tick);
  }
};

// clear the screen.
function clearScreen() {
  c.fillStyle = '#725636';
  c.fillRect(0, 0, WIDTH, HEIGHT);
}

function randomNumber(max = 1, min = 0) {
  return 0| Math.random() * max + min;
}

function lineAtAngle(x1, y1, length, angle) {
  angle *= Math.PI / 180;

  const x2 = x1 + length * Math.cos(angle);
  const y2 = y1 + length * Math.sin(angle);
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
}

function drawCross() {
  c.strokeStyle = '#392b1b';
  c.save();
  c.beginPath();

  c.moveTo(WIDTH/2, 0);
  c.lineTo(WIDTH/2, HEIGHT);
  c.moveTo(0, HEIGHT/2);
  c.lineTo(WIDTH, HEIGHT/2);

  c.closePath();
  c.stroke();
}

function drawVanishing(distance = 0) {
  const degree = (22.5 * distance) + 0;
  console.log('degree', degree);
  c.beginPath();

  // lineAtAngle(VPOINT.X, VPOINT.Y, WIDTH/2, ((15 * distance) * Math.PI / 180));
  lineAtAngle(VPOINT.X, VPOINT.Y, WIDTH, degree);
  // c.moveTo(VPOINT.X, VPOINT.Y);
  // c.lineTo(0, WIDTH + (size * distance));
  // c.lineTo(VPOINT.X - (size * distance), VPOINT.Y + 200);
  // c.moveTo(VPOINT.X, VPOINT.Y);
  // c.lineTo(WIDTH, WIDTH + (size * distance));

  c.closePath();
  c.stroke();
}


// draw perpective box that lays flat on the x-axis
// Instead of the position being the top,left, it's the center of the box.
function drawBox(z, x, y, width, height) {
  c.fillStyle = '#f0f0b5';
  c.strokeStyle = '#392b1b';
  const perpective = 2/3;
  const HALF_WIDTH = width/2;
  const HALF_HEIGHT = height/2;
  const OFFSET = 0| z * perpective;
  let x1 = (x - HALF_WIDTH) - OFFSET;
  let y1 = y;
  let x2 = (x + HALF_WIDTH);// / z;
  let y2 = y;
  let x3 = (x + HALF_WIDTH);// / z;
  let y3 = y + height;
  let x4 = (x - HALF_WIDTH);// * z;
  let y4 = y + height;
  c.save();
  c.beginPath();

  console.group('drawBox')
  console.log('z', z);
  console.log('OFFSET', OFFSET);
  console.log('1', x1, y1);
  console.log('2', x2, y2);
  console.log('3', x3, y3);
  console.log('4', x4, y4);
  console.groupEnd();

  c.moveTo(x1, y1);
  c.lineTo(x2, y2); // top
  c.lineTo(x3, y3); // right
  c.lineTo(x4, y4); // bottom
  c.lineTo(x1, y1); // left

  // c.moveTo(x, y);
  // c.lineTo(x + width, y); // top
  // c.lineTo(x + width, y + height); // right
  // c.lineTo(x, y + height); // bottom
  // c.lineTo(x, y); // left
  c.closePath();
  c.stroke();
  c.fill();
}
