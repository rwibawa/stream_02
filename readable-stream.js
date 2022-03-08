const { Readable } = require('stream');

const inStream = new Readable({
  read() {}
})

inStream.push('lorem ipsum dolor sit amet');
inStream.push('the quick brown fox jumps over a lazy dog');

inStream.push(null); // No more data

inStream.pipe(process.stdout);