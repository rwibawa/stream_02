import {
  ReadableStream,
  TransformStream,
} from 'node:stream/web';

// Causes the readableStream.locked to be true while the pipe operation is active.
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

const transformedStream = stream.pipeThrough(transform);

for await (const chunk of transformedStream)
  console.log(chunk);