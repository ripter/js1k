/*
 * Apple Watch Game
 * When a rock appears, tap to mine it and collect the coin.
 * When a choice appears, tap left or right to take that path.
 * Try to get the most coins!
 */
// colors: http://www.color-hex.com/color-palette/43493
// projection: https://www.sitepoint.com/building-3d-engine-javascript/
const WIDTH = 312;
const HEIGHT = 390;
const FRAME_LENGTH = 8;
const FRAME_RATE = 250;
let frame = 0;
let lastTimestamp = -FRAME_RATE;
console.log('Coin Miner 2018');


function drawTrack() {
  const left1 = [125, 215];
  const left2 = [70, HEIGHT];
  const right1 = [190, 215];
  const right2 = [245, HEIGHT];
  c.beginPath();

  // Left rail
  c.moveTo(left1[0], left1[1]);
  c.lineTo(left2[0], left2[1]);

  // Left rail
  c.moveTo(right1[0], right1[1]);
  c.lineTo(right2[0], right2[1]);


  // tracks
  const depth = 4;

  // track 0
  // for(let i=0; i < 8; i += 2) {
  //   c.moveTo(left1[0]  - (i*4),   (left1[1]  + (depth*i)) );
  //   c.lineTo(right1[0] + (i*4),   (right1[1] + (depth*i)) ); // top
  //   c.lineTo(right1[0] + ((i+1)*4), (right1[1] + (depth*(i+1))) + ((i+1)*4)); // right
  //   c.lineTo(left1[0]  - ((i+1)*4), (right1[1] + (depth*(i+1))) + ((i+1)*4)); // bottom
  //   c.lineTo(left1[0]  - (i*4),   (left1[1]  + (depth*i)) ); // left
  // }

  // track 0
  drawSquare([
    left1[0], left1[1],
    right1[0], right1[1],
    right1[0] + 4, right1[1] + 8,
    left1[0]  - 4, right1[1] + 8,
  ]);

  // track 1
  drawSquare([
    left1[0]  - 4, left1[1]  + 16,
    right1[0] + 4, right1[1] + 16,
    right1[0] + 8, right1[1] + 24,
    left1[0]  - 8, right1[1] + 24,
  ]);

  // track 2
  drawSquare([
    left1[0]  - 11, left1[1]  + 32,
    right1[0] + 11, right1[1] + 32,
    right1[0] + 15, right1[1] + 44,
    left1[0]  - 15, right1[1] + 44,
  ]);

  // track 3
  drawSquare([
    left1[0]  - 19, left1[1]  + 58,
    right1[0] + 19, right1[1] + 58,
    right1[0] + 22, right1[1] + 70,
    left1[0]  - 22, right1[1] + 70,
  ]);

  // track 4
  drawSquare([
    left1[0]  - 29, left1[1]  + 90,
    right1[0] + 29, right1[1] + 90,
    right1[0] + 35, right1[1] + 112,
    left1[0]  - 35, right1[1] + 112,
  ]);

  // track 5
  drawSquare([
    left1[0]  - 45, left1[1]  + 140,
    right1[0] + 45, right1[1] + 140,
    right1[0] + 55, right1[1] + 175,
    left1[0]  - 55, right1[1] + 175,
  ]);


  c.fill();
  c.stroke();
}


function drawSquare(points) {
  c.moveTo(points[0], points[1]);
  c.lineTo(points[2], points[3]);
  c.lineTo(points[4], points[5]);
  c.lineTo(points[6], points[7]);
  c.lineTo(points[0], points[1]);
}


//
//TEMP
const elRefrence = document.createElement('img');
// b.appendChild(elRefrence);
elRefrence.onload = function() {
  tick();
}
elRefrence.src = 'one-point-perspective-grid.jpg';
a.addEventListener('click', (event) => {
  console.log(event);
});
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
    c.drawImage(elRefrence, -159, -60);

    c.strokeStyle = 'red';
    c.fillStyle = 'orange';

    drawTrack();

    c.strokeStyle = 'green';


    // outline the UI
    c.strokeStyle = 'black';
    c.strokeRect(0, 0, WIDTH, HEIGHT);

    // Update the animation Frame
    frame += 1;
    if (frame === FRAME_LENGTH) {
      frame = 0;
    }
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
