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
// Vanishing Point
const VPOINT = {
  X: 157,
  Y: 215,
}
const NONE = 0;
const COIN = 1;
const BOMB = 2;
let score = 0;
let frame = 0;
// let frame = 4;
let lastTimestamp = -FRAME_RATE;
let isKeyDown = false;
let didScore = 0;
let lives = 3;
// let lives = 0;
let activeType = 0;
let delayTime = 0;
let canScore = false;

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

function drawPlank(p, distance) {
  const height = 10;
  const halfHeight = height/2;
  const width = 65;
  const halfWidth = width/2;
  const x1 = VPOINT.X - halfWidth; // top,left
  const x2 = VPOINT.X + halfWidth; // top,right
  // const xp1 = p[0];
  // const xp2 = p[2];
  // const topOffset = 0| (distance * 2.7) + (distance / 1.7);
  const topOffset = 0| (distance * 2.7);
  const bottomOffset = 0| topOffset + ((distance+1) * 0.8);
  console.group('plank', distance);
  // console.log('distance', [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((percent) => {
  // console.log('distance', [0.0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 0.99, 1.0].map((percent) => {
    // return 0| (distance * (percent+2.5));// + 2
    // return 0| (distance * (percent + 2.5)) + (distance / (percent + 1.5));// + 2
  // }))
  console.log('original topOffset', p[0]);
  console.log('topOffset', topOffset, p[0]);
  console.log('bottomOffset', bottomOffset, p[2]);
  console.groupEnd();


  c.beginPath();
  c.moveTo(x1 - topOffset, VPOINT.Y + p[1]); // move to top, left corner
  c.lineTo(x2 + topOffset, VPOINT.Y + p[1]); // draw line to top, right corner
  c.lineTo(x2 + bottomOffset, VPOINT.Y + p[3]); // draw line to bottom, right corner
  c.lineTo(x1 - bottomOffset, VPOINT.Y + p[3]); // draw line to bottom, left corner
  c.lineTo(x1 - topOffset, VPOINT.Y + p[1]); // draw line to top, left corner
  c.fill();
  c.stroke();
}

// Draws a coint at location and scale
function drawCoin(x, y, scale) {
  c.font = `${12*scale}px serif`;
  c.fillText('💎', x - (3*scale), y + (3*scale));
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
  [
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
  ].forEach((p, i) => {
    const height = 10;


    // hacky way to only render on frame without point the points in a var
    if (i === frame) {
      // draw plank
      c.fillStyle = 'green';
      c.strokeStyle = 'red';

      drawPlank(p, i);
      // c.beginPath();
      // c.moveTo(x1 - p[0], VPOINT.Y + p[1]); // move to top, left corner
      // c.lineTo(x2 + p[0], VPOINT.Y + p[1]); // draw line to top, right corner
      // c.lineTo(x2 + p[2], VPOINT.Y + p[3]); // draw line to bottom, right corner
      // c.lineTo(x1 - p[2], VPOINT.Y + p[3]); // draw line to bottom, left corner
      // c.lineTo(x1 - p[0], VPOINT.Y + p[1]); // draw line to top, left corner
      // c.fill();
      // c.stroke();


      let x = VPOINT.X - (p[0]/2);
      let y = VPOINT.Y + p[1] - height;
      drawBomb(x, y, i);
      // drawCoin(VPOINT.X, VPOINT.Y + p[3], i);
    }
  });



    // END DEBUG


    // Update the animation Frame
    frame += 1;
    if (frame === FRAME_LENGTH) {
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
