const { stdout } = require('process');

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
    stdout.write('🐸');
  }

  eraseSnake() {
    stdout.cursorTo(this.x, this.y);
    stdout.write(' ');
  }

  hasEaten({ x, y }) {
    return this.x === x && this.y === y;
  }
};

module.exports = { Snake };
