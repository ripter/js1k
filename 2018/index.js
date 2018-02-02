// Apple Watch screen size!
const WIDTH = 312;
const HEIGHT = 390;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const CAVE_WIDTH = 200;
const CAVE_HEIGHT = CAVE_WIDTH + 25;
const CAVE_WIDTH_CENTER = CAVE_WIDTH/2;
const CAVE_HEIGHT_CENTER = CAVE_HEIGHT/2;

console.log('Coin Miner 2018');
clearScreen();
// let lastTimestamp = 0;

void function tick(timestamp = 0) {
  // const diff = 0| (timestamp - lastTimestamp);
  // update the lastTimestamp now that we have the diff
  // lastTimestamp = timestamp;
  timestamp = 0 | timestamp; // round to milliseconds
  console.log('tick', timestamp);

  renderCave(timestamp);

  // allow pausing for debugging.
  if (!window.pause){
    // window.requestAnimationFrame(tick);
  }
}();


// clear the screen.
function clearScreen() {
  c.fillStyle = '#000';
  c.fillRect(0, 0, WIDTH, HEIGHT);
}

function renderCave(time) {
  c.strokeStyle = 'rgb(255, 125, 0)';

  let i = randomNumber(16);
  while (i--) {
    renderCaveWall();
  }

  c.stroke();
}

function renderCaveWall() {
  const x = CENTER_X - CAVE_WIDTH_CENTER;
  const y = CENTER_Y - CAVE_HEIGHT_CENTER;
  const degree = randomNumber(360);

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
