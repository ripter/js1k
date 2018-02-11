// window.pause = true;
/*
 * Apple Watch Game
 * When a rock appears, tap to mine it and collect the coin.
 * When a choice appears, tap left or right to take that path.
 * Try to get the most coins!
 */
// colors: http://www.color-hex.com/color-palette/43493
// projection: https://www.sitepoint.com/building-3d-engine-javascript/
const WIDTH = 312;
const WIDTH_FLOOR = 32;
const HEIGHT = 390;
const FRAME_LENGTH = 10;
const FRAME_RATE = 250;
// Vanishing Point
const VPOINT = {
  X: 157,
  Y: 215,
}
const NONE = false;
const COIN = '💎';
const BOMB = '💣';
const RECT_TOP = 0;
const RECT_LEFT = 1;
const RECT_BOTTOM = 2;
const RECT_RIGHT = 3;
const ITEM_X = 4;
const ITEM_Y = 5;

let lastTimestamp = -FRAME_RATE;
let isKeyDown = false;

let currentItem = COIN;
let score = 0; // player score
let lives = 3;
let frame = 0; // current frame1
// let frame = 9;

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

// console.log('Coin Miner 2018');

['click', 'touchend'].forEach((eventName) => {
  b.addEventListener(eventName, (event) => {
    if ( frame >= 7 ) {
      isKeyDown = true;
    }
  });
});


function drawPlank(points) {
  const x1 = VPOINT.X - WIDTH_FLOOR; // top,left
  const x2 = VPOINT.X + WIDTH_FLOOR; // top,right
  c.beginPath();
  c.moveTo(x1 - points[RECT_TOP], VPOINT.Y + points[RECT_LEFT]); // move to top, left corner
  c.lineTo(x2 + points[RECT_TOP], VPOINT.Y + points[RECT_LEFT]); // draw line to top, right corner
  c.lineTo(x2 + points[RECT_BOTTOM], VPOINT.Y + points[RECT_RIGHT]); // draw line to bottom, right corner
  c.lineTo(x1 - points[RECT_BOTTOM], VPOINT.Y + points[RECT_RIGHT]); // draw line to bottom, left corner
  c.lineTo(x1 - points[RECT_TOP], VPOINT.Y + points[RECT_LEFT]); // draw line to top, left corner
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
  const points = FRAMES[frame];
  let x, y;
  // console.log('tick', diff);

  if (diff >= FRAME_RATE) {
    // console.log('%cframe', 'color: #ddd;', frame);
    lastTimestamp = timestamp;


    //
    // draw "dirt" over the entire screen to clear it.
    c.fillStyle = '#725636'; // brown dirt
    c.fillRect(0, 0, WIDTH, HEIGHT);

    //
    // cut out a hole for the cave and path from the dirt.
    c.fillStyle = '#000';
    c.beginPath();
    c.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0, 1 * Math.PI, true);
    c.rect(0, HEIGHT/2, WIDTH, HEIGHT/2);
    c.fill();


    //
    // Check for Score/Game Over
    // Collect if the key is down on the last frame.
    if (isKeyDown && frame === FRAMES.length-1) {
      if (currentItem === COIN) {
        score += 1;
        c.fillStyle = 'rgba(0, 0, 255, .8)'; // Blue Score Flash
      }
      else if (currentItem === BOMB) {
        lives -= 1;
        c.fillStyle = 'rgba(255, 0, 0, .8)'; // Red Fail Flash
      }
      c.fillRect(0, 0, WIDTH, HEIGHT);
    }


    //
    // render the score/lives
    c.font = '24px monospace';
    c.fillStyle = '#f0f0b5'; // light sand color
    c.fillText(`${COIN} ${score}`, 10, 30);
    c.fillText(BOMB.repeat(lives), WIDTH-90, 30);

    // Draw game over
    if (lives <= 0) {
      c.fillText(`Game Over`, WIDTH/2 - 70, HEIGHT/2 - 25);
      currentItem = NONE;
    }



    //
    // draw planks
    c.fillStyle = '#392b1b';
    c.lineWidth = 1;
    // draw up to 4 plans with fading opacity
    [frame-4, frame-2, frame, frame+2].forEach((distance, i) => {
      if (!FRAMES[distance]) { return; }
      c.strokeStyle = `rgba(255, 255, 255, ${i*.25})`;
      drawPlank(FRAMES[distance]);
    });



    //
    // Draw the item (Coin/Bomb)
    if (currentItem !== NONE) {
      c.font = `${12*frame}px serif`;
      c.fillText(
        currentItem,
        VPOINT.X - points[ITEM_X],
        VPOINT.Y + points[ITEM_Y]);
    }



    //
    // Draw the score box
    // That tells the user where the item needs to be in order to collect it.
    c.strokeStyle = 'rgba(255, 255, 255, .75)';
    c.lineWidth = 10;
    c.strokeRect(
      VPOINT.X - 62,
      VPOINT.Y + 10,
      WIDTH_FLOOR*4,  // width
      WIDTH_FLOOR*4); // height


    // Update the animation Frame
    frame += 1;
    if (frame === FRAMES.length) {
      // reset the loop values
      frame = 0;
      currentItem = (Math.random() > .5) ? COIN : BOMB;
      isKeyDown = false;
    }
  }

  // allow pausing for debugging.
  if (lives > 0 && !window.pause){
    window.requestAnimationFrame(tick);
  }
};

// Start Game
tick();
