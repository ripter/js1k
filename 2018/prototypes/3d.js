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

window.Z = 200;
window.Y = -100;
window.X = 100;
document.addEventListener('keyup', function(event) {
  console.log('keypress', event);
  switch(event.key) {
    case 'Shift':
    case 'ArrowUp':
      window.Z += 1;
      break;
    case ' ':
    case 'ArrowDown':
      window.Z -= 1;
      break;
    case 'a':
    case 'ArrowLeft':
      window.X -= 1;
      break;
    case 'd':
    case 'ArrowRight':
      window.X += 1;
      break;
    case 'w':
      window.Y += 1;
      break;
    case 's':
      window.Y -= 1;
      break;
    default:
      // noting
  }
  console.log(`X: ${window.X}, Y: ${window.Y}, Z: ${window.Z}`);
});
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
// const DISTANCE = 100;// HEIGHT/2; // The distance between the eye and the screen.
// const DISTANCE = 200;
window.DISTANCE = 200;
const VPOINT = {
  X: 0| WIDTH/2,
  Y: 0| 165,
  Z: 0| HEIGHT/2,
};

let lastTimestamp = -FRAME_RATE;


function drawSquare(x1, y1, z1, width, height, depth) {
  const d = width / 2;

  let p1 = [x1, y1, z1];
  let p2 = [x1, y1 + HEIGHT, z1];
  let p3 = [x1 + WIDTH, y1 + HEIGHT, z1];
  let p4 = [x1 + WIDTH, y1, z1];
  // let p1 = [x1 - d, y1 - d, z1 + d];
  // let p2 = [x1 - d, y1 - d, z1 - d];
  // let p3 = [x1 + d, y1 - d, z1 - d];
  // let p4 = [x1 + d, y1 - d, z1 + d];
  // let p5 = [x1 + d, y1 + d, z1 + d];
  // let p6 = [x1 + d, y1 + d, z1 - d];
  // let p7 = [x1 - d, y1 + d, z1 - d];
  // let p8 = [x1 - d, y1 + d, z1 + d];

  c.beginPath();
  c.moveTo(p1[0], p1[1]);
  c.lineTo(p2[0], p2[1]);
  c.lineTo(p3[0], p3[1]);
  c.lineTo(p4[0], p4[1]);
  c.lineTo(p1[0], p1[1]);
  c.stroke();

  c.fillStyle = '#7c8485';
  c.fill();
}

/**
 * Game Loop.
 * Self calling.
 * @param  {Number} [timestamp=0] [description]
 */
function tick(timestamp = 0) {
  timestamp = 0 | timestamp; // round to milliseconds
  const diff = 0| (timestamp - lastTimestamp);
  // console.log('tick', diff);

  if (diff >= FRAME_RATE) {
    lastTimestamp = timestamp;
    // clearScreen();
    c.drawImage(elRefrence, -159, 0);

    c.strokeStyle = 'red';
    drawSquare(window.X, -window.Y, window.Z, 100, 100, 100);

    c.strokeStyle = 'green';
    drawGrid(100);


    // outline the UI
    c.strokeStyle = 'black';
    c.strokeRect(0, 0, WIDTH, HEIGHT);
  }

  // allow pausing for debugging.
  if (!window.pause){
    window.requestAnimationFrame(tick);
  }
};

// clear the screen.
function clearScreen() {
  c.fillStyle = '#725636';
  c.fillRect(0, 0, WIDTH, HEIGHT);
}

/**
 * Returns the point at the end of length.
 * @param  {Number} x1     [description]
 * @param  {Number} y1     [description]
 * @param  {Number} length [description]
 * @param  {Number} angle  [description]
 */
function lineAtAngle(x, y, length, angle) {
  angle *= Math.PI / 180; // convert angle to ___ format
  return {
    x: x + length * Math.cos(angle),
    y: y + length * Math.sin(angle),
  }
}


/**
 * Project a 3d object onto a 2d plane
 * https://www.sitepoint.com/building-3d-engine-javascript/
 * @param {Object} vertex - {x, y, z}
 * @return {Object} 2d point
 */
function project(vertex) {
  const r = window.DISTANCE / vertex.z;
  return {
    x: r * vertex.x,
    y: r * vertex.y,
  };
}

function drawGrid(width) {
  for(let i=1; i < (WIDTH/width); i++) {
    c.beginPath();
    c.moveTo(0, width * i);
    c.lineTo(WIDTH, width * i);
    c.moveTo(width * i, 0);
    c.lineTo(width * i, HEIGHT);
    c.stroke();
  }
}
