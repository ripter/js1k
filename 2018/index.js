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

// window.pause = true;

/**
 * Renders the coin based on global frame
 */
function renderCoin() {
  if (frame < 4) { return; }
  let x = 150;
  let y = 160;
  const radius = 40;
  const frames = [
  //  x,   y, scale
    157, 210, 1,
    157, 210 + 35, 2,
    157, 210 + 70, 4,
    157, 210 + 60, 7,
  ];

  let index = (frame - 4) * 3;
  drawCoin(frames[index], frames[index+1], frames[index+2]);
}

// Draws a coint at location and scale
function drawCoin(x, y, scale) {
  const radius = 10 * scale;

  c.beginPath();
  c.arc(x, y, radius, 0, 2 * Math.PI, false);
  c.strokeStyle = '#392b1b'; // darkest
  c.stroke();

  c.fillStyle = '#f0f0b5'; // lightest
  c.fill();

  c.fillStyle = '#392b1b'; // darkest
  c.font = `${12*scale}px serif`;
  c.fillText('¢', x - (3*scale), y + (3*scale));
}



/**
 * Draws a square from an array of points.
 * @param  {Array} points - Array of numbers, each pair a point. Total 8 numbers.
 */
function drawSquare(points) {
  c.moveTo(points[0], points[1]);
  c.lineTo(points[2], points[3]);
  c.lineTo(points[4], points[5]);
  c.lineTo(points[6], points[7]);
  c.lineTo(points[0], points[1]);
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
    clearScreen();
    // c.drawImage(elRefrence, -159, -60);
    renderCave();

    c.strokeStyle = '#392b1b';
    c.fillStyle = '#392b1b';
    drawTrack();

    renderCoin();

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


/**
 * Draws a track moving twords the camera
 */
function drawTrack() {
  // alternate rendering even/odd planks
  const planks = TRACK_PLANKS.filter((_, index) => {
    if (frame % 2 === 0) {
      return index % 2 === 0;
    }
    return index % 2 !== 0;
  });
  c.beginPath();
  planks.forEach((plank) => drawSquare(plank));
  c.fill();
  c.stroke();
}

//
// Data
//
// Each Array is x,y points for a rect
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



const CAVE_WIDTH = 200;
const CAVE_HEIGHT = CAVE_WIDTH + 30;
const CAVE_WIDTH_CENTER = CAVE_WIDTH/2;
const CAVE_HEIGHT_CENTER = CAVE_HEIGHT/2;
// Render a 'cave' by carving out a rough opening in the rock.
// The clear screen makes the entire screen "rock"
// So to render the cave, we render empty space on top.
function renderCave() {
  let degree = 0;
  let i = randomNumber(16, 4);

  c.beginPath();
  while (i--) {
    degree += randomNumber(25);
    renderCaveWall(degree, i);
  }
  c.closePath();

  // draw a floor
  drawSquare([
    28, 210,
    280, 210,
    280, HEIGHT,
    28, HEIGHT,
  ]);

  c.fillStyle = '#000';
  c.fill();
}

// Rendering the cave walls by cutting out chuncks of rotated walls.
function renderCaveWall(degree, depth) {
  const x = (WIDTH/2) - CAVE_WIDTH_CENTER;
  const y = (HEIGHT/2) - CAVE_HEIGHT_CENTER + (depth * 10);

  c.save();
  // How to rotate around the center: https://stackoverflow.com/a/17126036
  c.translate(x + CAVE_WIDTH_CENTER, y + CAVE_HEIGHT_CENTER);
  c.rotate(degree * Math.PI / 180);
  c.rect(-CAVE_WIDTH_CENTER, -CAVE_HEIGHT_CENTER, CAVE_WIDTH, CAVE_HEIGHT);
  c.restore();
}

function randomNumber(max = 1, min = 0) {
  return 0| Math.random() * max + min;
}



// Start Game
tick();


// DEBUG
a.addEventListener('click', (event) => {
  console.log(event);
});
