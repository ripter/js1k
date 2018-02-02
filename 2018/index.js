console.log('Coin Miner 2018');
/*
 * Apple Watch Game
 * When a rock appears, tap to mine it and collect the coin.
 * When a choice appears, tap left or right to take that path.
 * Try to get the most coins!
 */
const WIDTH = 312;
const HEIGHT = 390;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const CAVE_WIDTH = 200;
const CAVE_HEIGHT = CAVE_WIDTH + 30;
const CAVE_WIDTH_CENTER = CAVE_WIDTH/2;
const CAVE_HEIGHT_CENTER = CAVE_HEIGHT/2;
const FRAME_RATE = 250;

let lastTimestamp = -FRAME_RATE;

/*
 * TODO:
 *  handle taps/clicks
 *  Render left/right choices
 *  Render ore
 *  Render Coin
 *  Render Score
 *  ✅ Render Cave
 */

function tick(timestamp = 0) {
  timestamp = 0 | timestamp; // round to milliseconds
  const diff = 0| (timestamp - lastTimestamp);
  // console.log('tick', diff);

  if (diff >= FRAME_RATE) {
    lastTimestamp = timestamp;

    // c.save();
    clearScreen();
    renderCave();
    // c.restore();
  }

  // allow pausing for debugging.
  if (!window.pause){
    window.requestAnimationFrame(tick);
  }
};
tick();


// clear the screen.
function clearScreen() {
  c.fillStyle = '#725636';
  c.fillRect(0, 0, WIDTH, HEIGHT);
}

// Render a 'cave' by carving out a rough opening in the rock.
// The clear screen makes the entire screen "rock"
// So to render the cave, we render empty space on top.
function renderCave(time) {
  let degree = 0;
  let i = randomNumber(16, 4);

  c.beginPath();
  while (i--) {
    degree += randomNumber(25);
    renderCaveWall(degree);
  }
  c.closePath();

  c.fillStyle = '#000';
  c.fill();
}

// Rendering the cave walls by cutting out chuncks of rotated walls.
function renderCaveWall(degree) {
  const x = CENTER_X - CAVE_WIDTH_CENTER;
  const y = CENTER_Y - CAVE_HEIGHT_CENTER;

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
