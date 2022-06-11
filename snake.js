const { Box } = require('./box.js');
const { stdout } = require('process');

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
  stdout.cursorTo(60, 10)
};

const main = () => {
  const box = new Box(50, 10, 10, 30);
  box.drawBox();
  const snake = new Snake(51, 11);
  snake.drawSnake();
  setTimeout(() => {
    snake.eraseSnake();
    snake.move(0, 1);
    snake.drawSnake();
    resetCursor();
  }, 3000)
};

main();
