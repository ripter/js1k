/*
 * Apple Watch Game
 * When a rock appears, tap to mine it and collect the coin.
 * When a choice appears, tap left or right to take that path.
 * Try to get the most coins!
 */
// colors: http://www.color-hex.com/color-palette/43493
// projection: https://www.sitepoint.com/building-3d-engine-javascript/
var HEIGHT = 390;
var WIDTH = 312;
var SCORE_Y = 225;// 215 + 10;// VPOINT.Y + 10;
var PLANK_Y = 215;// VPOINT.Y;
var HALF_HEIGHT = 195;// HEIGHT/2;
var PLANK_X2 = 189;// 157 + 32;// VPOINT.X + WIDTH_FLOOR;
var HALF_WIDTH = 156;// WIDTH/2;
var SCORE_WIDTH = 128;// WIDTH_FLOOR*4;
var PLANK_X1 = 125;// 157 - 32;// VPOINT.X - WIDTH_FLOOR;
var SCORE_X = 95;// 157 - 62;// VPOINT.X - 62;
var HEADER_Y = 30;
var COIN = '💎';
var BOMB = '💣';
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

var lastTimestamp = -HALF_WIDTH;
var currentItem = COIN;
var lives = 3;
var isKeyDown = false;
var score = 0; // player score
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
void function tick(timestamp) {
  // timestamp = 0 | timestamp; // round to milliseconds
  // var diff = 0| (timestamp - lastTimestamp);
  var points = FRAMES[frame];

  // limit by frame rate (uglified as HALF_WIDTH)
  // and only run if still alive.

  if ((timestamp - lastTimestamp) >= HALF_WIDTH) {
    lastTimestamp = timestamp;

    //
    // draw "dirt" over the entire screen to clear it.
    c.fillStyle = '#753'; // brown dirt
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
        c.fillStyle = '#00F8'; // Blue Score Flash
      }
      else if (currentItem === BOMB) {
        lives -= 1;
        c.fillStyle = '#F008'; // Red Fail Flash
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
      var opacity = (63*i).toString(16)[0];
      c.strokeStyle = '#FFF' + opacity;
      c.fillStyle = '#753' + opacity;

      c.beginPath();
      c.moveTo(PLANK_X1 - point[0], PLANK_Y + point[1]); // move to top, left corner
      c.lineTo(PLANK_X2 + point[0], PLANK_Y + point[1]); // draw line to top, right corner
      c.lineTo(PLANK_X2 + point[2], PLANK_Y + point[3]); // draw line to bottom, right corner
      c.lineTo(PLANK_X1 - point[2], PLANK_Y + point[3]); // draw line to bottom, left corner
      c.lineTo(PLANK_X1 - point[0], PLANK_Y + point[1]); // draw line to top, left corner
      c.fill();
      c.stroke();
    });


    //
    // render the score/lives
    c.font = '24px serif';
    c.fillStyle = '#ffb'; // light sand color
    c.fillText(COIN + score, 10, HEADER_Y);
    c.fillText(BOMB.repeat(lives), SCORE_Y, HEADER_Y);


    //
    // Draw game over
    if (lives <= 0) {
      c.fillText('Game Over', SCORE_X, HALF_WIDTH);
    }


    //
    // Draw the item (Coin/Bomb)
    c.font = 12*frame + 'px serif';
    c.fillText(currentItem, HALF_WIDTH - points[4], PLANK_Y + points[5]);


    //
    // Draw the score box
    // That tells the user where the item needs to be in order to collect it.
    c.strokeStyle = '#FFFA';
    c.lineWidth = 10;
    c.strokeRect(SCORE_X, SCORE_Y, SCORE_WIDTH, SCORE_WIDTH);


    // Update the animation Frame
    frame += 1;
    if (frame === FRAMES.length) {
      // reset the loop values
      frame = 0;
      currentItem = (Math.random() < .5) ? BOMB : COIN;
      isKeyDown = false;
    }
  }

  if (lives > 0){
    window.requestAnimationFrame(tick);
  }
}(0);
