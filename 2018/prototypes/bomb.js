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
let score = 0;
let frame = 0;
// let frame = 3;
let lastTimestamp = -FRAME_RATE;
let isKeyDown = false;
let didScore = 0;
console.log('Coin Miner 2018');

// window.pause = true;
a.addEventListener('click', (event) => {
  console.log(event);
  isKeyDown = true;
});
a.addEventListener('touchend', (event) => {
  console.log(event);
  isKeyDown = true;
});

function updateScore() {
  // reset in two frames
  if (didScore > 0) {
    didScore -= 1;
  }
  else if (didScore < 0) {
    didScore += 1;
  }

  //TODO: real score handling
  if (frame === 0 && isKeyDown) {
    // console.log('Score!')
    score += 1;
    didScore = 3; // last for 3 frames
  }
  else if (frame === 4 && isKeyDown) {
    // console.log('Score!')
    score -= 1;
    didScore = -3; // last for 3 frames
  }

  // reset isKeyDown every frame.
  // This give the user FRAME_RATE milliseconds to tap/click
  isKeyDown = false;
}


function renderScore() {
  c.font = '24px monospace';
  c.fillStyle = '#f0f0b5';

  if (didScore > 0) {
    c.fillText(`*** Collected  1¢ ***`, 3, 24);
  }
  else if (didScore < 0) {
    c.fillText(`*** Ouch! Lost 1¢ ***`, 3, 24);
  }
  else {
    c.fillText(`Coins: ${score}`, 10, 24);
  }
}

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
  c.font = `${12*scale}px serif`;
  c.fillText('💎', x - (3*scale), y + (3*scale));
}

function renderBomb() {
  const frames = [
  //  x,   y, scale
    155, 215, 1,
    155, 215 + 20, 2,
    155, 215 + 50, 4,
    140, 215 + 100, 9,
  ];
  if (frame >= frames.length) { return; }

  const index = frame * 3;
  drawBomb(frames[index], frames[index+1], frames[index+2]);
}

function drawBomb(x, y, scale) {
  c.fillStyle = '#392b1b'; // darkest
  c.font = `${12*scale}px serif`;
  c.fillText('💣', x - (3*scale), y + (3*scale));
}



// clear the screen.
function clearScreen() {
  c.fillStyle = '#725636';
  c.fillRect(0, 0, WIDTH, HEIGHT);
}

function renderCave() {
  c.beginPath();
  c.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0, 1 * Math.PI, true);
  c.rect(0, HEIGHT/2, WIDTH, HEIGHT/2);

  c.fillStyle = '#000';
  c.fill();
}

/**
 * Draws a track moving twords the camera
 */
function renderTrack() {
  const x1 = 125;
  const x2 = 190;
  const y = 215;
  let points = [
    [ 0, 0, 3, 8 ],
    [ 3, 8, 5, 16 ],
    [ 5, 16, 8, 24 ],
    [ 8, 24, 11, 32 ],
    [ 11, 32, 15, 44 ],
    [ 15, 44, 19, 58 ],
    [ 19, 58, 22, 70 ],
    [ 22, 70, 29, 90 ],
    [ 29, 90, 35, 112 ],
    [ 35, 112, 45, 140 ],
    [ 45, 140, 55, 175 ],
  ];

  // alternate rendering even/odd planks
  points = points.filter((_, index) => {
    if (frame % 2 === 0) {
      return index % 2 === 0;
    }
    return index % 2 !== 0;
  });

  // Draw each rectangle
  c.beginPath();
  points.forEach((offset) => {
    c.moveTo(x1 - offset[0], y + offset[1]);
    c.lineTo(x2 + offset[0], y + offset[1]);
    c.lineTo(x2 + offset[2], y + offset[3]);
    c.lineTo(x1 - offset[2], y + offset[3]);
    c.lineTo(x1 - offset[0], y + offset[1]);
  });
  c.fill();
  c.stroke();
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

    updateScore();
    renderTrack();

    renderCoin();
    renderBomb();

    renderScore();

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

// Start Game
tick();
