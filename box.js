const { stdout } = require('process');

class Box {
  #x;
  #y;
  #height;
  #width;
  constructor(height, width) {
    this.#x = 50;
    this.#y = 10;
    this.#height = height;
    this.#width = width;
  }

  hollowRow() {
    return `*${' '.repeat(this.#width - 2)}*`;
  }

  row() {
    return '*'.repeat(this.#width);
  }

  drawRow(lineNumber) {
    stdout.cursorTo(this.#x, this.#y + lineNumber);
    let row = this.hollowRow();
    if (lineNumber === 0 || lineNumber === this.#height - 1) {
      row = this.row();
    }
    stdout.write(row);
  }

  drawBox() {
    for (let lineNumber = 0; lineNumber < this.#height; lineNumber++) {
      this.drawRow(lineNumber);
    }
  }

  getBox() {
    return { x: this.#x, y: this.#y, height: this.#height, width: this.#width };
  }
};

module.exports = { Box }
