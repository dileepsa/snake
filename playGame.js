const { Box } = require('./box.js');
const { Snake } = require('./snake.js');
const { Food } = require('./food.js');

const { stdout, stdin } = require('process');
const EventEmitter = require('events');
const HIDDEN_CURSOR = '\x1B[?25l';

const resetScreen = () => {
  stdout.clearScreenDown();
  stdout.cursorTo(0, 0);
};

const setupScreen = () => {
  stdout.cursorTo(0, 0);
  stdout.write(HIDDEN_CURSOR);
  stdout.clearScreenDown();
};

const setEvents = (snake) => {
  const upKey = '\x1B[A';
  const leftKey = '\x1B[D';
  const downKey = '\x1B[B';
  const rightKey = '\x1B[C';
  const events = new EventEmitter();

  events.on(leftKey, () => snake.move(-1, 0));
  events.on(rightKey, () => snake.move(1, 0));
  events.on(upKey, () => snake.move(0, -1));
  events.on(downKey, () => snake.move(0, 1));
  return events
};

const playGame = (events, key, box, snake, food) => {
  snake.eraseSnake();
  events.emit(key.toString());
  if (snake.hasEaten(food.getPositions())) {
    food.drawFood(box.getBox());
  }

  if (snake.isTouched(box.getBox())) {
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

  const food = new Food(57, 13);
  food.drawFood(box.getBox());

  const events = setEvents(snake);
  stdin.setRawMode(true);

  stdin.on('data', (key) => {
    playGame(events, key, box, snake, food);
  })
};

main();
