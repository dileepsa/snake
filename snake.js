const { Box } = require('./box.js');
const { stdout, stdin } = require('process');
const EventEmitter = require('events');

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isDied(boxX, boxY, height, width) {
    if (this.x < boxX) return true;
    if (this.x > boxX + width) return true;
    if (this.y > boxY + height) return true;
    if (this.y < boxY) return true;
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

const resetCursor = () => {
  stdout.cursorTo(70, 10);
};

const main = () => {
  const box = new Box(50, 10, 10, 30);
  box.drawBox();
  const snake = new Snake(51, 11);
  snake.drawSnake();
  const upKey = 'w';
  const leftKey = 'a';
  const downKey = 's';
  const rightKey = 'd'
  const eventEmitter = new EventEmitter();

  eventEmitter.on(leftKey, () => snake.move(-1, 0));
  eventEmitter.on(rightKey, () => snake.move(1, 0));
  eventEmitter.on(upKey, () => snake.move(0, -1));
  eventEmitter.on(downKey, () => snake.move(0, 1));

  stdin.setRawMode(true);

  stdin.on('data', (key) => {
    snake.eraseSnake();
    eventEmitter.emit(key.toString());
    if (snake.isDied(50, 10, 10, 30)) {
      stdout.write('You Died!!!!!!!!!!!!!!!!');
      resetCursor();
      process.exit();
    }
    snake.drawSnake();
  })
};

main();
