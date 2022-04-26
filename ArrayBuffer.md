```js
const buf = new ArrayBuffer(16);  //在内存中分配16字节
buf.byteLength;
```
ArrayBuffer一经创建就不能再调整大小。
```js
const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4,12);   //slice()复制其全部或部分到一个新的实例中。
alert(buf2.byteLength);  // 8
```