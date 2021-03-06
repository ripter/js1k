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
// const FRAME_LENGTH = 8;
const FRAME_LENGTH = 10;
const FRAME_RATE = 250;
// Vanishing Point
const VPOINT = {
  X: 157,
  Y: 215,
}
const NONE = 0;
const COIN = 1;
const BOMB = 2;
const RECT_TOP = 0;
const RECT_LEFT = 1;
const RECT_BOTTOM = 2;
const RECT_RIGHT = 3;
const ITEM_X = 4;
const ITEM_Y = 5;
let score = 0;
let frame = 0;
// let frame = 1;
let lastTimestamp = -FRAME_RATE;
let isKeyDown = false;
let didScore = 0;
let lives = 3;
// let lives = 0;
let activeType = 0;
let delayTime = 0;
let canScore = false;


const FRAMES = [
  // each array is a rectangle's
  // offsets for rect, item
  // [RECT_TOP, RECT_LEFT, RECT_BOTTOM, RECT_RIGHT, ITEM_X, ITEM_Y]
  [  0,   0,  3,   8,    5,   4 ], // frame 0
  [  3,   8,  5,  16,   10,  10 ], // frame 1
  [  5,  16,  8,  24,   15,  16 ], // frame 2
  [  8,  24, 11,  32,   20,  24 ], // frame 3
  [ 11,  32, 15,  44,   25,  36 ], // frame 4
  [ 15,  44, 19,  58,   30,  48 ], // frame 5
  [ 19,  58, 22,  70,   35,  60 ], // frame 6
  [ 22,  70, 29,  90,   40,  75 ], // frame 7
  [ 29,  90, 35, 112,   45,  99 ], // frame 8
  [ 35, 112, 45, 140,   50, 122 ], // frame 9
  [ 45, 140, 55, 175,   55, 155 ], // frame 10
];

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
  if (isKeyDown && canScore && activeType === COIN) {
    score += 1;
    // draw blue flash
    c.fillStyle = 'rgba(0, 0, 255, .8)';
    c.fillRect(0, 0, WIDTH, HEIGHT);
  }
  if (isKeyDown && canScore && activeType === BOMB) {
    lives -= 1;
    // draw red flash
    c.fillStyle = 'rgba(255, 0, 0, .8)';
    c.fillRect(0, 0, WIDTH, HEIGHT);
  }

  // reset isKeyDown every frame.
  // This give the user FRAME_RATE milliseconds to tap/click
  isKeyDown = false;
  canScore = false;
}

function renderHeader() {
  c.font = '24px monospace';
  c.fillStyle = '#f0f0b5';
  let lifeText = '';

  for(var i=0; i < lives; i++) {
    lifeText += '💣';
  }

  c.fillText(`💎 ${score}`, 10, 30);
  c.fillText(lifeText, WIDTH-90, 30);
}

function renderScore() {
  c.font = '24px monospace';
  c.fillStyle = '#f0f0b5';

  c.fillText(`Coins: ${score}`, 10, 24);
}

/**
 * Renders the coin based on global frame
 */
function renderCoin() {
  if (activeType !== COIN) { return; }
  if (frame < delayTime) { return; }
  let x = 150;
  let y = 160;
  const radius = 40;
  const frames = [
  //  x,   y, scale
    155, 215, 1,
    155, 215 + 20, 2,
    150, 215 + 50, 4,
    140, 215 + 100, 9,
  ];

  // let index = (delayTime - frame) > frames.length ? frames.length : (delayTime - frame);
  let index = frame - delayTime;

  // can score on the last frame
  if (index === (frames.length/3)) {
    canScore = true;
  }

  if (index > (frames.length/3)-1) { return; }
  // console.log('index', index, 'delayTime', delayTime, 'frame', frame, 'length', frames.length);
  index *= 3;
  drawCoin(frames[index], frames[index+1], frames[index+2]);
}

function drawPlank(points) {
  const width = 65;
  const halfWidth = width/2;
  const x1 = VPOINT.X - halfWidth; // top,left
  const x2 = VPOINT.X + halfWidth; // top,right
  c.beginPath();
  c.moveTo(x1 - points[RECT_TOP], VPOINT.Y + points[RECT_LEFT]); // move to top, left corner
  c.lineTo(x2 + points[RECT_TOP], VPOINT.Y + points[RECT_LEFT]); // draw line to top, right corner
  c.lineTo(x2 + points[RECT_BOTTOM], VPOINT.Y + points[RECT_RIGHT]); // draw line to bottom, right corner
  c.lineTo(x1 - points[RECT_BOTTOM], VPOINT.Y + points[RECT_RIGHT]); // draw line to bottom, left corner
  c.lineTo(x1 - points[RECT_TOP], VPOINT.Y + points[RECT_LEFT]); // draw line to top, left corner
  c.fill();
  c.stroke();
}

function drawBomb(points, scale) {
  const x = VPOINT.X - points[ITEM_X];
  const y = VPOINT.Y + points[ITEM_Y];
  c.font = `${12*scale}px serif`;
  c.fillText('💣', x, y);
}

// Draws a coint at location and scale
function drawCoin(points, scale) {
  const x = VPOINT.X - points[ITEM_X];
  const y = VPOINT.Y + points[ITEM_Y];
  c.font = `${12*scale}px serif`;
  c.fillText('💎', x, y);
}

function renderBomb() {
  if (activeType !== BOMB) { return; }
  if (frame < delayTime) { return; }
  const frames = [
  //  x,   y, scale
    155, 215, 1,
    155, 215 + 20, 2,
    150, 215 + 50, 4,
    140, 215 + 100, 9,
  ];

  // let index = frame > frames.length ? frames.length : frame;
  let index = frame - delayTime;

  // can score on the last frame
  if (index === (frames.length/3)-1) {
    canScore = true;
  }

  if (index > (frames.length/3)) { return; }
  // console.log('index', index, 'delayTime', delayTime, 'frame', frame, 'length', frames.length);
  index *= 3;
  drawBomb(frames[index], frames[index+1], frames[index+2]);
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
  c.strokeStyle = '#392b1b';
  c.fillStyle = '#392b1b';
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
    console.log('%cframe', 'color: #ddd;', frame);
    lastTimestamp = timestamp;

    clearScreen();
    renderCave();
    renderTrack();
    updateScore();
    renderHeader();

    if (lives <= 0) {
      c.fillText(`Game Over`, WIDTH/2 - 70, HEIGHT/2 - 25);
    }
    else {
      // activeType is BOMB or Coin
      if (activeType) {
        // renderCoin();
        // renderBomb();
      }
      else if (Math.random() > .5) {
        activeType = COIN;
        delayTime = 0|Math.random()*3;
        console.log('set activeType = COIN', activeType, delayTime);
      }
      else {
        activeType = BOMB;
        delayTime = 0|Math.random()*3;
        console.log('set activeType = BOMB', activeType, delayTime);
      }
    }



    // DEBUG


    // draw plank
    c.fillStyle = 'green';
    c.strokeStyle = 'red';

    drawPlank(FRAMES[frame]);
    // drawBomb(FRAMES[frame], frame+1);
    drawCoin(FRAMES[frame], frame+1);


    // END DEBUG


    // Update the animation Frame
    frame += 1;
    if (frame === FRAMES.length) {
      frame = 0;
      activeType = NONE;
    }
  }

  // allow pausing for debugging.
  if (lives > 0 && !window.pause){
    window.requestAnimationFrame(tick);
  }
};

// Start Game
tick();


// Use Space key to go to next frame
window.addEventListener('keydown', (event) => {
  console.log(event);
  if (event.code === 'Space') {
    if (event.shiftKey) {
      frame -= 2;

      if (frame < 0) {
        frame = FRAME_LENGTH;
      }
    }

    console.log('skipping to frame', frame);
    requestAnimationFrame(tick);
  }
});
