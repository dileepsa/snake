const { stdout } = require('process');

const FOOD = '🍔';

const randomNumber = (limit) => {
  return Math.floor(Math.random() * limit);
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawFood({ x, y, height, width }) {
    const startPoint = { x, y };
    this.x = startPoint.x + 1 + randomNumber(width - 5);
    this.y = startPoint.y + 1 + randomNumber(height - 10);
    stdout.cursorTo(this.x, this.y);
    stdout.write(FOOD);
  }
};

module.exports = { Food }
