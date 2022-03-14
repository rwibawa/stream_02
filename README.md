# stream_02
Learn about nodejs streams.
* [node js streams - everything you need to know](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)
* [Web Streams API](https://nodejs.org/api/webstreams.html)

## 1. Setup
```bash
$ nvm use 16.13.0
Now using node v16.13.0 (64-bit)

$ vi createbigfile.js
$ node createbigfile.js 
$ ll
total 427M
drwxr-xr-x 1 LGS-NET+WRY 4096    0 Mar  6 17:34 ./
drwxr-xr-x 1 LGS-NET+WRY 4096    0 Mar  6 17:25 ../
-rw-r--r-- 1 LGS-NET+WRY 4096 427M Mar  6 17:34 big.file
```

## 2. File streams
### 2.1. Without _streams_
```bash
$ node server01.js
$ curl localhost:8001
```
There is about 400MB memory usage without using streams:
![400MB memory usage](img/server01_400MB-memory-usage.jpg)

### 2.1. With _streams_
```bash
$ node server02.js
$ curl localhost:8001
```
There is very low memory usage by using streams:
![400MB memory usage](/img/server02_low-memory-usage.jpg)

## 3. Implementing streams
### 3.1. writable stream
```bash
$ vi writeable-stream01.js
$ node writable-stream.js 
lorem ipsum dolor
lorem ipsum dolor

sit amet
sit amet

the quick brown fox jumps over the lazy dog
the quick brown fox jumps over the lazy dog


$ vi writable-stream02.js
$ node writable-stream02.js
lorem
lorem
ipsum
ipsum
dolor
dolor
sit amet
sit amet
```

### 3.2. readable stream
```bash
$ vi readable-stream.js
$ node readable-stream.js 
lorem ipsum dolor sit ametthe quick brown fox jumps over a lazy dog
```

### 3.3. transform stream
```bash
$ vi transform-stream01.js
$ node transform-stream01.js 
ABCDEFGHIJKLMNOPQRSTUVWXYZ


lorem ipsum dolor sit amet
lorem ipsum dolor sit amet

B
B


$ node transform-stream02.js
the quick brown fox jumps over the lazy dog
THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
lorem ipsum dolor sit amet
LOREM IPSUM DOLOR SIT AMET

$ node transform-stream03.js 
Debugger attached.
a, b, c, d
{"a":" b"," c":" d"}
lorem, ipsum, dolor, sit, amet
{"lorem":" ipsum"," dolor":" sit"}

$ node transform-stream04.js big.file 
$ ll
total 429M
-rw-r--r-- 1 LGS-NET+WRY 4096 427M Mar  6 17:48 big.file
-rw-r--r-- 1 LGS-NET+WRY 4096 1.9M Mar  7 23:31 big.file.gz

$ node transform-stream05.js big.file
..................................................................................................................................................................................................................................Done
$ ll
total 429M
-rw-r--r-- 1 LGS-NET+WRY 4096 427M Mar  6 17:48 big.file
-rw-r--r-- 1 LGS-NET+WRY 4096 1.9M Mar  7 23:36 big.file.zz

$ node transform-stream06.js big.file
....................................................................... .
...............................................................................................................................................  .
..........Done
$ ll
total 429M
-rw-r--r-- 1 LGS-NET+WRY 4096 427M Mar  6 17:48 big.file
-rw-r--r-- 1 LGS-NET+WRY 4096 1.9M Mar  7 23:42 big.file.zz

```

### 3.4 Encryption/Decryptions streams
#### Encryption stream:
```js
const crypto = require('crypto');
// ...

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher('aes192', 'a_secret'))
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.zz'))
  .on('finish', () => console.log('Done'));
```

#### Decryption stream:
```js
fs.createReadStream(file)
  .pipe(crypto.createDecipher('aes192', 'a_secret'))
  .pipe(zlib.createGunzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on('finish', () => console.log('Done'));
```

## 4. Web Streams API
```bash
$ nvm use 16.13.0
$ git init

$ vi server03.js
```

`package.json`
```json
{
  "type": "module"
}
```

```bash
$ node server03.js 
(node:54072) ExperimentalWarning: stream/web is an experimental feature. This feature could changea 
t any time
(Use `node --trace-warnings ...` to show where the warning was created)
1037.4095001220703
2050.895499944687
3054.0045001506805
4055.3447999954224
5064.183300018311

$ node server04.js
A
(node:52716) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

$ node server05.js 
(node:37228) ExperimentalWarning: stream/web is an experimental feature. This feature could changea 
t any time
(Use `node --trace-warnings ...` to show where the warning was created)
1043.9137001037598
2047.7787001132965
3054.7079000473022
4063.8859000205994
5070.898300170898
6084.602500200272
7096.156300067902
8102.378200054169

$ node server06.js
(node:63360) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
{ value: 1043.735899925232, done: false }

```