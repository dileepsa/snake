const { stdout, stdin } = require('process');
stdin.setEncoding('utf-8')
stdin.setRawMode(true);

// stdin.on('data', (data) => {
//   keys.push(data);
// })

// stdin.on('close', () => {
//   console.log('Stream closed');
// })


// stdin.on('keypress', (str, key) => {
//   if (key.ctrl && key.name === 'c') {
//     process.exit();
//   } else {
//     console.log(`You pressed the "${str}" key`);
//     console.log();
//     console.log(key);
//     console.log();
//   }
// });

// const { stdout, stdin } = process;
// const CTRL_C = 3;
// const keys = [];
// const main = () => {

//   const upKey = '\x1B[A';
//   const leftKey = '\x1B[D';
//   const downKey = '\x1B[B';
//   const rightKey = '\x1B[C'
//   stdin.setRawMode(true);
//   stdin.on('data', (buffer) => {
//     console.log(buffer);
//     keys.push(buffer.toString());
//     if (buffer[0] === CTRL_C) process.exit(0);
//   })
// };

// setTimeout(() => {
//   console.log(keys);
//   process.exit();
// }, 20000);

// main();

// const { stdout, stdin } = process;
const keys = [];
const main = () => {
  stdin.setRawMode(true);
  stdin.on('data', (key) => {
    keys.push(key);
    if (key === 'q') {
      process.exit(0)
    }
  })

  setTimeout(() => {
    console.log(keys);
  }, 5000);
}

main();