const { Box } = require('./box.js');
const { stdout, stdin } = require('process');
const EventEmitter = require('events');
const HIDDEN_CURSOR = '\x1B[?25l';

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isTouched({ x, y, height, width }) {
    if (this.x <= x) return true;
    if (this.x >= x + width) return true;
    if (this.y >= y + height) return true;
    if (this.y <= y) return true;
    return false;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  drawSnake() {
    stdout.cursorTo(this.x, this.y);
    stdout.write('🐍');
  }

  eraseSnake() {
    stdout.cursorTo(this.x, this.y);
    stdout.write(' ');
  }
}

const resetScreen = () => {
  stdout.cursorTo(70, 10);
};

const setupScreen = () => {
  stdout.cursorTo(0, 0);
  stdout.write(HIDDEN_CURSOR);
  stdout.clearScreenDown();
};

const setEvents = (snake) => {
  const upKey = 'w';
  const leftKey = 'a';
  const downKey = 's';
  const rightKey = 'd'
  const events = new EventEmitter();

  events.on(leftKey, () => snake.move(-1, 0));
  events.on(rightKey, () => snake.move(1, 0));
  events.on(upKey, () => snake.move(0, -1));
  events.on(downKey, () => snake.move(0, 1));
  return events
};

const playGame = (events, key, snake, box) => {
  snake.eraseSnake();
  events.emit(key.toString());
  if (snake.isTouched(box)) {
    stdout.write('You Died!!!!!!!!!!!!!!!!');
    resetScreen();
    process.exit(0);
  }
  snake.drawSnake();
};

const main = () => {

  setupScreen();
  const box = new Box(20, 30);
  box.drawBox();
  const snake = new Snake(51, 11);
  snake.drawSnake();
  const events = setEvents(snake);

  stdin.setRawMode(true);

  stdin.on('data', (key) => {
    playGame(events, key, snake, box);
  })
};

main();
