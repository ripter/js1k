console.log('Coin Miner 2018');
// colors: http://www.color-hex.com/color-palette/43493
// projection: https://www.sitepoint.com/building-3d-engine-javascript/
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
    c.drawImage(elRefrence, -159, 0);

    c.strokeStyle = 'red';
    drawVert(0);
    drawVert(1);
    drawVert(2);
    drawVert(3);
    drawVert(4);
    drawVert(5);
    drawVert(6);

    c.strokeStyle = 'green';
    drawHorz(0);
    drawHorz(1);
    drawHorz(2);
    drawHorz(3);
    drawHorz(4);
    drawHorz(5);
    drawHorz(6);


    // c.clearRect(0, 0, WIDTH, (HEIGHT/4)*1.5);

    // outlike the UI
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

// Draw a line at angle
function lineAtAngle(x1, y1, length, angle) {
  angle *= Math.PI / 180;

  const x2 = x1 + length * Math.cos(angle);
  const y2 = y1 + length * Math.sin(angle);
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
}


function drawVert(distance = 0) {
  const degree = (90 * distance);
  const size = 8.6;
  c.beginPath();

  lineAtAngle(VPOINT.X, VPOINT.Y, WIDTH, 90 - (size * distance));
  lineAtAngle(VPOINT.X, VPOINT.Y, WIDTH, 90 + (size * distance));

  c.closePath();
  c.stroke();
}

function drawHorz(distance = 0) {
  // const size = (8.6 * distance);
  const size = 10;
  const FLOOR = 275;
  const offset = (distance * size);
  c.beginPath();

  c.moveTo(0, FLOOR + offset);
  c.lineTo(WIDTH, FLOOR + offset);

  // lineAtAngle(0, HEIGHT - (distance * size), WIDTH, 0);
  // The horizontal lines get closer as we get closer to the vanishing point.
  // Use a vanishing point line to calculate the offset.
  // const angle = 90 * Math.PI / 180;
  // const length = size;
  //
  // const x1 = VPOINT.X;
  // const y1 = 275;
  // const x2 = x1 + length * Math.cos(angle);
  // const y2 = y1 + length * Math.sin(angle);
  // c.moveTo(x1, y1);
  // c.lineTo(x2, y2);

  c.closePath();
  c.stroke();
}
