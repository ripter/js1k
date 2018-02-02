// Apple Watch screen size!
const WIDTH = 312;
const HEIGHT = 390;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const CAVE_WIDTH = 200;
const CAVE_HEIGHT = CAVE_WIDTH + 25;
const CAVE_WIDTH_CENTER = CAVE_WIDTH/2;
const CAVE_HEIGHT_CENTER = CAVE_HEIGHT/2;
const FRAME_RATE = 250;

console.log('Coin Miner 2018');
let lastTimestamp = -FRAME_RATE;

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

function renderCave(time) {
  c.beginPath();

  let i = randomNumber(8, 4);
  while (i--) {
    renderCaveWall();
  }

  c.fillStyle = '#000';
  c.fill();
  c.closePath();
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
