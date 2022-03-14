// This example creates a simple ReadableStream that pushes the current performance.now() timestamp once every second forever. An async iterable is used to read the data from the stream.

import {
  ReadableStream
} from 'node:stream/web';

import {
  setInterval as every
} from 'node:timers/promises';

import {
  performance
} from 'node:perf_hooks';

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  }
});

// The <ReadableStream> object supports the async iterator protocol using for await syntax.
for await (const value of stream)
  console.log(value);