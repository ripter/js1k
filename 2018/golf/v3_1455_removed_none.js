// window.pause = true;
/*
 * Apple Watch Game
 * When a rock appears, tap to mine it and collect the coin.
 * When a choice appears, tap left or right to take that path.
 * Try to get the most coins!
 */
// colors: http://www.color-hex.com/color-palette/43493
// projection: https://www.sitepoint.com/building-3d-engine-javascript/
var WIDTH = 312;
var HALF_WIDTH = 156;// WIDTH/2;
var HEIGHT = 390;
var HALF_HEIGHT = 195;// HEIGHT/2;
var FRAME_RATE = 250;
var GAMEOVER_X = 86;// HALF_WIDTH - 70;
var GAMEOVER_Y = 170;// HALF_HEIGHT - 25;
var HEADER_Y = 30;
var LIVES_X = 222;// WIDTH-90;
var SCORE_WIDTH = 128;// WIDTH_FLOOR*4;
var SCORE_X = 95;// 157 - 62;// VPOINT.X - 62;
var SCORE_Y = 225;// 215 + 10;// VPOINT.Y + 10;
var PLANK_X1 = 125;// 157 - 32;// VPOINT.X - WIDTH_FLOOR;
var PLANK_X2 = 189;// 157 + 32;// VPOINT.X + WIDTH_FLOOR;
var PLANK_Y = 215;// VPOINT.Y;
var PLANK_X = 157;// VPOINT.X;
var COIN = '💎';
var BOMB = '💣';
var RECT_TOP = 0;
var RECT_LEFT = 1;
var RECT_BOTTOM = 2;
var RECT_RIGHT = 3;
var ITEM_X = 4;
var ITEM_Y = 5;
var FRAMES = [
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

var lastTimestamp = -FRAME_RATE;
var isKeyDown = false;
var currentItem = COIN;
var score = 0; // player score
var lives = 3;
var frame = 0; // current frame1


// console.log('Coin Miner 2018');
['click', 'touchend'].forEach((eventName) => {
  b.addEventListener(eventName, (event) => {
    if ( frame >= 8 ) {
      isKeyDown = true;
    }
  });
});

/**
 * Game Loop.
 * Self calling.
 * @param  {Number} [timestamp=0] [description]
 */
function tick(timestamp = 0) {
  timestamp = 0 | timestamp; // round to milliseconds
  var diff = 0| (timestamp - lastTimestamp);
  var points = FRAMES[frame];

  if (diff >= FRAME_RATE) {
    lastTimestamp = timestamp;

    //
    // draw "dirt" over the entire screen to clear it.
    c.fillStyle = '#725636'; // brown dirt
    c.fillRect(0, 0, WIDTH, HEIGHT);

    //
    // cut out a hole for the cave and path from the dirt.
    c.fillStyle = '#000';
    c.beginPath();
    c.arc(HALF_WIDTH, HALF_HEIGHT, HALF_WIDTH, 0, Math.PI, true);
    c.rect(0, HALF_HEIGHT, WIDTH, HALF_HEIGHT);
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
    // draw planks
    c.lineWidth = 1;
    // draw up to 4 plans with fading opacity
    [frame-4, frame-2, frame, frame+2].forEach((distance, i) => {
      if (!FRAMES[distance]) { return; }
      var point = FRAMES[distance];
      c.strokeStyle = `rgba(255, 255, 255, ${i*.25})`;
      c.fillStyle = `rgba(57, 43, 27, ${i*.25})`;

      c.beginPath();
      c.moveTo(PLANK_X1 - point[RECT_TOP],    PLANK_Y + point[RECT_LEFT]); // move to top, left corner
      c.lineTo(PLANK_X2 + point[RECT_TOP],    PLANK_Y + point[RECT_LEFT]); // draw line to top, right corner
      c.lineTo(PLANK_X2 + point[RECT_BOTTOM], PLANK_Y + point[RECT_RIGHT]); // draw line to bottom, right corner
      c.lineTo(PLANK_X1 - point[RECT_BOTTOM], PLANK_Y + point[RECT_RIGHT]); // draw line to bottom, left corner
      c.lineTo(PLANK_X1 - point[RECT_TOP],    PLANK_Y + point[RECT_LEFT]); // draw line to top, left corner
      c.fill();
      c.stroke();
    });


    //
    // render the score/lives
    c.font = '24px serif';
    c.fillStyle = '#f0f0b5'; // light sand color
    c.fillText(`${COIN} ${score}`, 10, HEADER_Y);
    c.fillText(BOMB.repeat(lives), LIVES_X, HEADER_Y);


    //
    // Draw game over
    if (lives <= 0) {
      c.fillText(`Game Over`, GAMEOVER_X, GAMEOVER_Y);
    }


    //
    // Draw the item (Coin/Bomb)
    c.font = `${12*frame}px serif`;
    c.fillText(currentItem, PLANK_X - points[ITEM_X], PLANK_Y + points[ITEM_Y]);


    //
    // Draw the score box
    // That tells the user where the item needs to be in order to collect it.
    c.strokeStyle = 'rgba(255, 255, 255, .75)';
    c.lineWidth = 10;
    c.strokeRect(SCORE_X, SCORE_Y, SCORE_WIDTH, SCORE_WIDTH);


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
