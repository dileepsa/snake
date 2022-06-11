const { stdout } = require('process');

class Box {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  hollowRow() {
    return `*${' '.repeat(this.width - 2)}*`;
  }

  row() {
    return '*'.repeat(this.width);
  }

  drawRow(lineNumber) {
    stdout.cursorTo(this.x, this.y + lineNumber);
    let row = this.hollowRow();
    if (lineNumber === 0 || lineNumber === this.height - 1) {
      row = this.row();
    }
    stdout.write(row);
  }

  drawBox() {
    for (let lineNumber = 0; lineNumber < this.height; lineNumber++) {
      this.drawRow(lineNumber);
    }
  }
};

module.exports = { Box }