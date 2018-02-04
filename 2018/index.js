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
  let planks = TRACK_PLANKS.filter((_, index) => {
    if (frame % 2 === 0) {
      return index % 2 === 0;
    }
    return index % 2 !== 0;
  });
  c.beginPath();
  // Left rail
  // c.moveTo(125, 215);
  // c.lineTo(70, HEIGHT);
  // Left rail
  // c.moveTo(190, 215);
  // c.lineTo(245, HEIGHT);
  // draw all the planks
  planks.forEach((plank) => drawSquare(plank));
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
    clearScreen();
    // c.drawImage(elRefrence, -159, -60);

    c.strokeStyle = 'red';
    c.fillStyle = 'orange';

    c.strokeStyle = '#392b1b';
    c.fillStyle = '#392b1b';// '#7c8485';
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



//
// Data
//
const TRACK_PLANKS = [
  [ // 0
    125 - 0, 215 + 0,
    190 + 0, 215 + 0,
    190 + 3, 215 + 8,
    125 - 3, 215 + 8,
  ],
  [ // 1
    125 - 3, 215 + 8,
    190 + 3, 215 + 8,
    190 + 5, 215 + 16,
    125 - 5, 215 + 16,
  ],
  [ // 2
    125 - 5, 215 + 16,
    190 + 5, 215 + 16,
    190 + 8, 215 + 24,
    125 - 8, 215 + 24,
  ],
  [ // 3
    125 - 8, 215 + 24,
    190 + 8, 215 + 24,
    190 + 11, 215 + 32,
    125 - 11, 215 + 32,
  ],
  [ // 4
    125 - 11, 215 + 32,
    190 + 11, 215 + 32,
    190 + 15, 215 + 44,
    125 - 15, 215 + 44,
  ],
  [ // 5
    125 - 15, 215 + 44,
    190 + 15, 215 + 44,
    190 + 19, 215 + 58,
    125 - 19, 215 + 58,
  ],
  [ // 6
    125 - 19, 215 + 58,
    190 + 19, 215 + 58,
    190 + 22, 215 + 70,
    125 - 22, 215 + 70,
  ],
  [ // 7
    125 - 22, 215 + 70,
    190 + 22, 215 + 70,
    190 + 29, 215 + 90,
    125 - 29, 215 + 90,
  ],
  [ // 8
    125 - 29, 215 + 90,
    190 + 29, 215 + 90,
    190 + 35, 215 + 112,
    125 - 35, 215 + 112,
  ],
  [ // 9
    125 - 35, 215 + 112,
    190 + 35, 215 + 112,
    190 + 45, 215 + 140,
    125 - 45, 215 + 140,
  ],
  [ // 10
    125 - 45, 215 + 140,
    190 + 45, 215 + 140,
    190 + 55, 215 + 175,
    125 - 55, 215 + 175,
  ],
];
