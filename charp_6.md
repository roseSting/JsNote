# object

```javascript
let person = new Object();
person.name = "Nicholas";
person.age = 29;

// 等同于：

let person = {
    name: "Nicholas",
    age: 29
}

console.log(perosn["name"]); //中括号内使用属性名的字符串形式
console.log(perosn.name); //同上一行的作用相同

// 通过变量访问属性
let propertyName = "name";
console.log(person[propertyName]);
perosn["first name"] = "Nicholas"; //first name中间有一个空格，不能使用点语法来访问，要使用中括号语法。
```

```javascript
let perosn = {
    "name": "Nicholas", //属性可以是字符串
    "age": 29,
    5: true //数值属性会自动转换为字符串
}
```

```javascript
function displayInfo(args) {
    let output = "";

    if (typeof args.name == "string") {
        output += "Name: " + args.name + "\n";
    }

    if (typeof args.age == "number") {
        output += "Age: " + args.age + "\n";
    }

    alert(output);
}

//给函数传递大量参数
displayInfo({
    name: "Nicholas",
    age: 29
})

displayInfo({
    name: "Greg"
})
```

# Array

```javascript
let color = new Array();
let color = new Array(20); //创建一个初始length为20的数组。

let colors = new Array(3);
let colors = new Array("Grey"); //创建一个只包含一个元素，即字符串"Grey"的数组。
let colors = Array(3); //也可以省略new

//数组字面量
let colors = ["red", "blue", "green"]; //创建一个包含3个元素的数组
```

**与对象一样，在使用数组字面量表示法创建数组不会调用Array构造函数。**

from()用于将类数组结构转换为数组实例。

```javascript
//字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ['M', 'a', 't', 't']

//可以使用from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4);
const s = new Set().add(1).add(2).add(3).add(4);

Array.from(m); // [Array(2), Array(2)]
Array.from(s); //[1, 2, 3, 4]

//Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1); //[1, 2, 3, 4]
alert(a1 === a2); //false

//可以使用任何可迭代对象
const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}

console.log(Array.from(iter)); //[1, 2, 3, 4]

//arguments对象可以被轻松地转换为数组
function getArgsArray() {
    return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); //[1, 2, 3, 4]

//from()也能转换带有必要属性的自定义对象
const arrayLikeObject = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
};
console.log(Array.from(arrayLikeObject)); //[1, 2, 3, 4]

第二个参数： 作用类似于数组的map() 方法， 用来对每个元素进行处理， 将处理后的值放入返回的数组。
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x ** 2); //[1, 4, 9, 16]

第三个参数： 用于指定映射函数中this的值。
const a3 = Array.from(a1, function(x) {
    return x ** this.exponent
}, {
    exponent: 2
}); //[1, 4, 9, 16]
```

Array.of()可以吧一组参数转换为数组。用于替换之前的 `Array.prototype.slice.call(arguments)` .

```javascript
console.log(Array.of(1, 2, 3, 4)); //[1, 2, 3, 4]
console.log(Array.of(undefined)); //[undefined]
```

### 数组空位

```javascript
const options = [, , , , , ]; //创建包含5个元素的数组
console.log(options.length);
console.log(options); //[empty × 5]

const options = [1, , , , 5];
//es6新增方法把空位当成存在的元素，只不过值为undefined
for (const option of options) {
    console.log(option === undefined);
}

for (const [index, value] of options.entries()) {
    alert(value);
}

//map()会跳过空位置
console.log(options.map(() => 6)); // [6, empty × 3, 6]

//join()空位置为空字符串
console.log(options.join('-')); //1----5
```

### 数组索引

```javascript
let colors = ["red", "blue", "green"];
colors[3] = "brown"; //自动扩展到该索引值加1
colors.length = 2; //通过length添加或删除元素
colors[2]; //undefined
colors.length = 4;
colors[3]; //undefined   大于元素数的值，添加的新元素都将以undefined填充。
colors[colors.length] = "black"; //添加一种颜色
colors[colors.length] = "brown";
```

### 检测数组

```javascript
//判断一个对象是不是数组
if (value instanceof Array) {
    //操作数组
}
Array.isArray() //确定一个值是否为数组

if (Array.isArray(value)) {
    //操作数组
}
```

### 迭代器方法

keys()返回数组索引的迭代器。
values()返回数组元素的迭代器。
entries()返回索引/值对的迭代器。

```javascript
const a = ["foo", "bar", "baz", "qux"];

//因为这些方法都返回迭代器，所以可以将它们的内容通过Array.from()直接转换为数组实例。
const aKeys = Array.from(a.keys()); //[0, 1, 2, 3]
const aValues = Array.from(a.values()); //['foo', 'bar', 'baz', 'qux']
const aEntries = Array.from(a.entries()); //(4) [Array(2), Array(2), Array(2), Array(2)]

//Es6的解构拆分键/值对
for (const [idx, element] of a.entries()) {
    alert(idx);
    alert(element);
}
```

### 复制和填充方法

fill()使用给定值，填充一个数组。

```javascript
const zeros = [0, 0, 0, 0, 0];

//用5填充整个数组
zeros.fill(5); //[5, 5, 5, 5, 5]
zeros.fill(0); //重置

//用6填充索引大于等于3的元素
zeros.fill(6, 3); //[0, 0, 0, 6, 6]
zeros.fill(0); //重置

//用7填充索引大于等于1且小于3的元素
zeros.fill(7, 1, 3); //[0, 7, 7, 0, 0]
zeros.fill(0);

//用8填充大于等于1且小于4的元素
zeros.fill(8, -4, -1); //[0, 8, 8, 8, 0]
zeros.fill(0);

索引超出数组边界：
const zeros = [0, 0, 0, 0, 0];
//索引过低，忽略
zeros.fill(1, -10, -6); // [0, 0, 0, 0, 0]
//索引过低，忽略
zeros.fill(1, 10, 15); // [0, 0, 0, 0, 0]
//索引反向，忽略
zeros.fill(2, 4, 2); // [0, 0, 0, 0, 0]
//索引部分可用，填充可用部分
zeros.fill(4, 3, 10); // [0, 0, 0, 4, 4]
```

copyWithin(): 将指定位置的成员赋值到其他位置（会覆盖原有成员），然后返回当前数组。

```javascript
Array.prototypr.copyWithin(target, start = 0, end = this.length);
//target:从该位置开始替换数据。start：表示从该位置开始读取数据，默认为0。 end:到该位置前停止读取数据，默认等于数组长度。
let ints,
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

//从ints中复制索引0开始的内容，插入到索引5开始的位置。
ints.copyWithin(5);
console.log(ints); //[0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset(); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

//从ints中复制索引5开始的内容，插入到索引0开始的位置。
ints.copyWithin(0, 5); //[5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset(); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

//从ints中复制索引0开始到索引3结束的内容，插入到索引4开始的位置。
ints.copyWithin(4, 0, 3);
reset();

//支持负索引值，与fill()相对于数组末尾计算正向索引的过程是一样的。
ints.copyWithin(-4, -7, -3); //[0, 1, 2, 3, 4, 5, 3, 4, 5, 6]

//索引过低，忽略
ints.copyWithin(1, -15, -12); //[0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
//索引过高，忽略
ints.copyWithin(1, 12, 15); //[0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
//索引反向，忽略
ints.copyWithin(2, 4, 2); //[0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
//索引部分可用、复制、填充可用部分，忽略
ints.copyWithin(4, 7, 10); //[0, 1, 2, 3, 7, 8, 9, 7, 8, 9]
```

### 转换方法

```javascript
//toString():返回数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串。
let colors = ["red", "blue", "green"];
alert(colors.toString()); //'red,blue,green'
alert(colors);

alert(colors.valueOf()); //valueOf()返回数组本身。

let person1 = {
    toLocaleString() {
        return "Nikolaos----";
    },
    toString() {
        return "Nicholas";
    }
};

let person2 = {
    toLocaleString() {
        return "Greeen----";
    },
    toString() {
        return "Greg";
    }
};

let people = [person1, person2];
alert(people);
alert(people.toString()); //'Nicholas,Greg'
alert(people.toLocaleString()); //'Nikolaos----,Greeen----'

//join()方法接受一个参数，即字符串分隔符，返回包含所有项的字符。
colors.join(","); //'red,blue,green'
colors.join("||"); //'red||blue||green'
```

### 栈方法

```javascript
let colors = new Array();
let count = colors.push("red", "green"); //接收人以参数，并将他们添加到数组末尾，返回数组的最新长度。
let items = colors.pop(); //pop()方法用于删除数组的最后一项，同时减少数组的length值，返回被删除的项。
```

### 队列方法

shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
unshift()向数组的开头添加一个或更多元素，并返回新的长度。

```javascript
let colors = new Array();
let count = colors.unshift("red", "green");
count = colors.unshift("black");
let item = colors.pop(); //green
```

### 排序方法

reverse()：将数组元素反向排列。
sort()：按照升序重新排列数组元素，即最小的值在前面。sort()会在每一项上调用String()转型函数，然后比较字符串来决定顺序。

```javascript
let values = [0, 1, 5, 15, 10];

function compare(value1, value2) {
    return value2 - value1;
}
values.sort(compare);
```

### 操作方法

```javascript
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]); //在现有数组全部基数上创建一个新数组。他首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组。
let colors = ["red", "green", "blue"];
let newColors = ["black", "brown"];

let moreNewColors = {
    [Symbol.isConcatSpreadable]: true,
    length: 2,
    0: "pink",
    1: "cyan"
};
```

`Symbol.isConcatSpreadable]` 阻止 `concat()` 打平参数数组。设置为true强制打平类数组对象。

```js
newColors[Symbol.isConcatSpreadable] = false;
```

强制不打平数组

```js
let colors2 = colors.concat("yellow", newColors); //['red', 'green', 'blue', 'yellow', Array(2)]
```

强制打平类数组对象

```js
let colors3 = colors.concat(moreNewColors); // ['red', 'green', 'blue', 'pink', 'cyan']
```

`slice()` 从已有的数组中返回选定的元素。参数是负数时：数值长度加上这个负值的结果确定位置。

```js
let colors = ["red", "green", "bblue", "yellow", "purple"];
colors.slice(-2, -1); //相当于
colors.slice(3, 4);
```

`splice()` : 删除前两个元素。

`splice(0,2)` : 要删除元素位置0，要删除的数量2。

`splice(2,0,"red","green")` : 从数组位置2开始插入字符串"red"和"green"。

`splice(2,1,"red","green")` : 会在位置2删除一个元素，然后从该位置开始向数组中插入"red"和"green"。

** `splice()` 始终返回从数组中被删除的元素。（如果没有删除元素，则返回空数组）**

### 搜索和位置方法

**严格相等** 

`indexOf()` 方法从数组前头(第一项)开始向后搜索。返回元素在数组中的位置，如果没找到则返回-1。
`lastIdexOf()` 从数组末尾（最后一项）开始向前搜索。返回元素在数组中的位置，如果没找到则返回-1。
`includes()` 表示是否找到一个与指定元素匹配的项。比较第一个参数跟数组的每一项时，会使用（===）比较，两项必须严格相等。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.indexOf(4); //3 
numbers.lastIndexOf(4); //5
numbers.includes(4); //true
```

**断言函数** 

`find()` 返回第一个匹配的元素。
`findIndex()` 返回第一个匹配元素的索引。

```js
const people = [{
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];

people.find((element, index, array) => element.age < 28); //{ name: "Matt", age: 27}
people.findIndex((element, index, array) => element.age < 28); //0

const events = [2, 4, 6];
//找到匹配后，永远不会检查数组的最后一个元素
events.find((element, index, array) => {
    console.log(element);
    console.log(index);
    console.log(array);
    return element === 4;
})
```

### 迭代方法

`every()` : 每一项函数都返回true, 则这个方法返回true。
`filter()` : 函数返回true的项会组成数组之后返回。
`forEach()` : 数组每个元素都执行一次回调。没有返回值。
`map()` : 每次函数调用的结果构成的数组。
`some()` : 如果有一项函数返回true，则这个方法返回true。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let everyResult = numbers.every((item, index, array) => item > 2);
alert(everyResult); //false

let someResult = numbers.some((item, index, array) => item > 2);
alert(someResult); //true

let filterResult = numbers.filter((item, index, array) => item > 2);
alert(filterResult); //3,4,5,4,3

let mapResult = numbers.map((item, index, array) => item * 2);
alert(mapResult); //[2, 4, 6, 8, 10, 8, 6, 4, 2]

//forEach()相当于for循环遍历数组
numbers.forEach((item, index, array) => {
    //执行某些操作
    if (item === 3) {
        return;
    }
    console.log(item);
});
```

### 归并方法

reduce(): 从数组的第一项开始遍历到最后一项。
reduceRight(): 从最后一项开始遍历至第一项。

```js
let values = [1, 2, 3, 4, 5];
/**
 * prev: 上一个归并值（返回的任何值都会作为下一次调用同一个函数的第一个参数）
 * cur: 当前项
 * index: 当前项的索引
 * array: 数组本身
 */
let sum = values.reduce((prev, cur, index, array) => prev + cur);
alert(sum); //15
```

# 定型数组

### ArrayBuffer

ArrayBuffer对象代表原始的二进制数据，

```js
const buf = new ArrayBuffer(16); //在内存中分配16字节
buf.byteLength;
```

ArrayBuffer一经创建就不能再调整大小。

```js
const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12); //slice()复制其全部或部分到一个新的实例中。
alert(buf2.byteLength); // 8
```

### DataView

DataView视图用来读写复杂类型的二进制数据。

```js
const buf = new ArrayBuffer(16);

/**必须在已有的ArrayBuffer读取或写入时才能创建DataView实例。
 * DataView默认使用整个ArrayBuffer
 */
const fullDataView = new DataView(buf);
fullDataView.byteOffset; //0
fullDataView.byteLength; //16
fullDataView.buffer === buf; //true

//构造函数接收一个可选的字节偏移量和字节长度
//byteOffset=0 表示视图从缓冲起点开始
//byteLength=8 限制视图为前8个字节
const firstHalfDataView = new DataView(buf, 0, 8);
firstHalfDataView.byteOffset;
firstHalfDataView.byteLength;
firstHalfDataView.buffer === buf;

//如果不指定，则DataView会使用剩余的缓冲
//byteOffset=8表示视图从缓冲的第9个字节开始
//byteLength 未指定，默认为剩余缓冲
const secondHalfDataView = new DataView(buf, 8);
secondHalfDataView.byteOffset;
secondHalfDataView.byteLength;
secondHalfDataView.buffer === buf;
```

**ElementType** 

DataView 对存储在缓冲内的数据类型没有预设。

```js
//在内存中分配两个字节并声明一个DataView
const buf = new ArrayBuffer(2);
const view = new DataView(buf);

//说明整个缓冲确实所有二进制都是0
//检查第一个和第二个字符
view.getInt8(0);
view.getInt8(1);

//检查整个缓存
view.getInt16(0);

//将整个缓冲都设置为1；
//255 的二进制表示是11111111
view.setUint8(0, 255);

//DataView会自动将数据转换为特定的ElementType
//255的十六进制表示是0xFF
view.setUint8(0, 0xFF);

//现在，缓冲力都是1了
//如果把它当成二补数的有符号整数，则应该是-1
view.getInt16(0);
```

**字节序** 

字节序指的是计算机系统维护的一种字节顺序的约定。

```js
//在内存中分配两个字节并声明一个DataView
const buf = new ArrayBuffer(2);
const view = new DataView(buf);

//填充缓冲，让第一位和最后一位都是1
view.setUint8(0, 0x80); //设置最左边的位等于1  
view.setUint8(1, 0x01); //设置最右边的位等于1  

//缓冲内容(为方便阅读，人为加入了空格)
// 0x8  0x0  0x0  0x1
// 1000 0000 0000 0001

//按大端字节序读取 Uint16
// 0x80 是高字节， 0x01 是低字节
// 0x8001 =2^15 + 2^0 = 32768 + 1 = 32769
view.getUint16(0);

//按小端字节序读取Uint16
// 0x01是高字节， 0x80是低字节
// 0x0180 = 2^8 + 2^7 = 256 + 128 = 384
view.getUint16(0, true);

//按大端字节序写入Uint16
view.setUint16(0, 0x0004);

// 缓冲内容（为方便阅读，人为加入了空格）;
// 0x0  0x0  0x0  0x4
// 0000 0000 0000 0100
view.getUint8(0);
view.getUint8(1);

//按小端字节序写入Uint16
view.setUint16(0, 0x0002, true);

//缓冲内容（为方便阅读，人为加入了空格）
// 0x0   0x2   0x0   0x0
// 0000  0010  0000  0000
view.getUint8(0);
view.getUint8(1);
```

**边界情形** 

DataView完成读、写操作的前提是必须有充足的缓冲区，否则就会抛出RangeError:

```js
const buf = new ArrayBuffer(6);
const view = new DataView(buf);

//尝试读取部分超出缓冲范围的值
view.getInt32(4); //RangeError

//尝试读取超出缓冲范围的值
view.getInt32(8); //RangeError

//尝试读取出超出缓冲范围的值
view.getInt32(-1); //RangeError

//尝试写入超出缓冲范围的值
view.setInt32(4, 123); //RangeError
```

DataView 在写入缓冲里会尽最大努力把一个值转换为适当的类型，后备为0。如果无法转换，则抛出错误：

```js
const buf = new ArrayBuffer(1);
const view = new DataView(buf);

view.setInt8(0, 1.5);
view.getInt8(0); //1

view.setInt8(0, [4]);
view.getInt8(0); //4

view.setInt8(0, 'f');
view.getInt8(0); //0

view.setInt8(0, Symbol()); //RangeError
```

### 定型数组

创建定型数组的方式包括读取 `已有的缓冲、使用自有缓冲、填充可迭代结构` ，以及 `填充基于任意类型的定型数组` 。

```js
//创建一个12字节的缓冲
const buf = new ArrayBuffer(12);
//创建一个引用该缓冲的Int32Array
const ints = new Int32Array(buf);
//这个定型数组知道自己的每个元素需要4个字节
//因此长度为3
ints.length; //3
//创建一个长度为6的Int32Array
const ints2 = new Int32Array(6);
//每个数值使用4个字节，因此ArrayBuffer是24个字节
ints2.length; //6

//类似DataView，定型数组也有一个指向关联缓冲的引用
ints2.buffer.byteLength; //24

//创建一个包含[2,4,6,8]的Int32Array
const ints3 = new Int32Array([2, 4, 6, 8]);
ints3.length; //4
ints3.buffer.byteLength; //16
ints3[2]; //6

//通过复制ints3的值创建一个Int16Array
const ints4 = new Int16Array(ints3);
//这个新类型数组会分配自己的缓冲
//对应索引的每个值会相应地转换为新格式
ints4.length; //4
ints4.buffer.byteLength; //8
ints4[2]; //6

//基于普通数组来创建一个Int16Array
const ints5 = Int16Array.from([3, 5, 7, 9]);
ints5.length; //4
ints5.buffer.byteLength; //8
ints5[2]; //7

//基于传入的参数创建一个FloatArray
const floats = Float32Array.of(3.14, 2.718, 1.618);
floats.length; //3
floats.buffer.byteLength; //12
floats[2]; //1.6180000305175781
```

定型数组的构造函数和实例都有一个BYTES_PER_ELEMENT属性，返回该类型数组中每个元素的大小。

```js
Int16Array.BYTES_PER_ELEMENT; //2
Int32Array.BYTES_PER_ELEMENT; //4

const ints = new Int32Array(1),
    floats = new Float64Array(1);

ints.BYTES_PER_ELEMENT; //4
floats.BYTES_PER_ELEMENT; //8
```

如果定型数组没有任何值初始化，则其关联的缓冲会以0填充。

```js
const ints = new Int32Array(4);
alert(ints[0]); //0
alert(ints[1]); //0
alert(ints[2]); //0
alert(ints[3]); //0
```

**定型数组行为**

返回新数组的方法也会返回包含同样元素类型的新定型数组：

```js
const ints = new Int16Array([1, 2, 3]);
const doubleints = ints.map(x => 2 * x);
doubleints instanceof Int16Array; //true
```

定型数组有一个Symbol.iterator符号属性，因此可以通过for...of循环和扩展操作符来操作。

```js
const ints = new Int16Array([1, 2, 3]);
for (const int of ints) {
    console.log(int)
}
Math.max(...ints); //3
```

**合并、复制和修改定型数组**

set()从提供的数组或定型数组中把值复制到当前定型数组中指定的索引位置。

```js
//创建长度为8的int16数组
const container = new Int16Array(8);
//把定型数组复制为前4个值
//偏移量默认为索引0
container.set(Int8Array.of(1, 2, 3, 4));
console.log(container); //[1,2,3,4,0,0,0,0]

//把普通数组复制为后4个值
//偏移量4表示从索引4开始插入
container.set([5, 6, 7, 8], 4);
console.log(container); //[1, 2, 3, 4, 5, 6, 7, 8]

//溢出会抛出错误
container.set([5, 6, 7, 8], 7); //RangeError
```

subarray()基于从原始定型数组中复制的值返回一个新定型数组。

```js
function typedArrayConcat(typedArrayConstructor, ...typedArrays) {
    //计算所有数组中包含的元素总数
    const numElements = typedArrays.reduce((x, y) => (x.length || x) + y.length);

    //按照提供的类型创建一个数组，为所有元素留出提问
    const resultArray = new typedArrayConstructor(numElements);

    //依次转移数组
    let currentOffset = 0;
    typedArrays.map(x => {
        resultArray.set(x, currentOffset);
        currentOffset += x.length;
    });
    return resultArray;
}

const concatArray = typedArrayConcat(Int32Array, Int8Array.of(1, 2, 3), Int16Array.of(4, 5, 6), Float32Array.of(7, 8, 9));
console.log(concatArray); //[1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(concatArray instanceof Int32Array) //true
```

**上溢和下溢**

```js
//长度为2的有符号整数数组
//每个索引保存一个二补数形式的有符号整数
//范围是-128 （-1*2^7） ~127 （2^7-1）

const ints = new Int8Array(2);

//长度为2的无符号整数
//每个索引保存一个无符号整数
//范围是0~255
const unsignedInts = new Uint8Array(2);

//上溢的位不会影响相邻索引
//索引只取最低有效位上的8位
unsignedInts[1] = 256; //[0,0]
console.log(unsignedInts);
unsignedInts[1] = 511;
console.log(unsignedInts); //[0,255]

//下溢的位会被转换为其无符号的等价值
//0xFF是以二补数形式表示的-1（截取到8位）
//但255是一个无符号整数
unsignedInts[1] = -1;
console.log(unsignedInts); //[0, 255]

//上溢自动变成二补数形式
// 0x80 是无符号整数的128，是二补数形式的-128
ints[1] = 128;
console.log(ints); //[0, -128]

//下溢自动变成二补数形式
// 0xFF是无符号整数的255，是二补数形式的-1
ints[1] = 255;
console.log(ints); //[0, -1]
```

"夹板"数组类型：Unit8ClampedArray: 不允许任何方向溢出。超出255的值会被向下舍入为255，而小于0的值会被向上舍入。

```js
const clampedInts = new Unit8ClampedArray([-1, 0, 255, 256]);
console.log(clampedInts); //[0,0,255,255]
```

### Map

创建一个空映射： `const m = new Map();`

```js
//使用嵌套数组初始化映射
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"],
]);
m1.size; //3

//使用自定义迭代器初始化映射
const m2 = new Map({
    [Symbol.iterator]: function*() {
        yield ["key1", "val1"],
            yield ["key2", "val2"],
                yield ["key3", "val3"]
    }
})

m2.size; //3

//映射期待的键/值对，无论是否提供
const m3 = new Map([
    []
]);
m3.has(undefined); //true
m3.get(undefined); //undefined

const m = new Map();
//get()和has()查询，size()属性获取映射中的键值对
m.has("firstName"); //false   
m.get("firstName"); //undefined
m.size; //0

//只删除这一个键值对
m.delete("firstName"); //true

m.has("firstName"); //false
m.has("lastName"); //true

m.clear(); //清除这个映射中的所有键值对
m.has("lastName"); //false
m.size; //0

//set()方法返回映射实例
const m = new Map().set("key1", "val1");
m.set("key2", "val2").set("key3", "val1");
m.size; //3

//Map()可以使用任何类型作为键
const m = new Map();

const functionKey = function() {};
const symbolKey = Symbol();
const objectKey = new Object();

m.set(functionKey, "functionKey");
m.set(symbolKey, "symbolKey");
m.set(objectKey, "objectKey");

m.get(functionKey); //'functionKey'
m.get(symbolKey); //'symbolKey'
m.get(objectKey); //'objectKey'

//在映射中用作键值的对象及其它"集合"类型，内容和属性被修改时仍然保持不变
const m = new Map();

const objKey = {},
    objVal = {},
    arrKey = [],
    arrVal = [];
m.set(objKey, objVal).set(arrKey, arrVal);
objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo");
arrVal.push("bar");

console.log(m.get(objKey)); //{bar: 'bar'}
console.log(m.get(arrKey)); //['bar']

const a = 0 / "", //NaN
    b = 0 / "", //NaN
    pz = +0, //0
    nz = -0; //-0 
a === b; //false
pz === nz; //true
m.set(a, "foo");
m.set(pz, "bar");
m.get(b); //'foo'
m.get(nz); //'bar'
```

**顺序与迭代**

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);

m.entries === m[Symbol.iterator]; //true

for (let pair of m.entries()) {
    console.log(pair);
}

for (let pair of m[Symbol.iterator]()) {
    console.log(pair);
}

//直接对映射实例使用扩展操作,把映射转换为数组 s
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);

console.log([...m]);

m.forEach((val, key) => console.log(`${key} -> ${val}`));
```

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);

//keys()和values()分别返回插入顺序生成的键和值得迭代器
for (let key of m.keys()) {
    console.log(key);
}

for (let value of m.values()) {
    console.log(value);
}
```

```js
const m1 = new Map([
    ["key1", "val1"]
]);

//作为键的字符串原始值时不能修改的
for (let key of m1.keys()) {
    key = "newKey";
    console.log(key); //key1
    console.log(m1.get("key1")); //val1
}

const keyObj = {
    id: 1
};

const m = new Map([
    [keyObj, "val1"]
]);

//修改了作为键的对象的属性，但对象在映射内部仍然引用相同的值
for (let key of m.keys()) {
    key.id = "newKey";
    console.log(key); //{id: 'newKey'}
    console.log(m.get(keyObj)); //val1
}

console.log(keyObj); //{id: 'newKey'}
```

### weakMap

实例化一个空的WeakMap `const m = new WeakMap()` ; 

```js
const key1 = {
        id: 1
    },
    key2 = {
        id: 2
    },
    key3 = {
        id: 3
    };
//使用嵌套数组初始化弱映射
const wm1 = new WeakMap([
    [key1, "val1"],
    [key2, "val2"],
    [key3, "val3"]
]);

wm1.get(key1);
wm1.get(key2);
wm1.get(key3);

//初始化是全有或全无的的操作
//只要有一个键无效就会抛出错误，导致整个初始化错误
const wm2 = new WeakMap([
    [key1, "val1"],
    ["BADKEY", "val2"],
    [key3, "val3"]
]);

//原始值可以先包装成对象再用作键
const stringKey = new String("key1");
const wm3 = new WeakMap([
    stringKey, "val1"
]);

wm3.get(stringKey);
```

使用set()添加键值对

```js
const wm = new WeakMap();
const key1 = {
        id: 1
    },
    key2 = {
        id: 2
    };

wm.has(key1); //false
wm.get(key1); //undefined

wm.set(key1, "Matt")
    .set(key2, "Frisbie");
wm.has(key1); //true 
wm.get(key1); //'Matt'

wm.delete(key1); //只删除这一个键值对

wm.has(key1); //false
wm.has(key2); //true
```

```js
//set()把多个操作连起来。
const key1 = {
        id: 1
    },
    key2 = {
        id: 2
    },
    key3 = {
        id: 3
    };

const wm = new WeakMap().set(key1, "val1");

wm.set(key2, "val2")
    .set(key3, "val3");

wm.get(key1);
wm.get(key2);
wm.get(key3);
```

**弱键**

```js
const wm = new WeakMap();
wm.set({}, "val"); //因为值没有被引用，所以键值对破坏以后，值会成为垃圾回收的对象

const wm = new WeakMap();
const container = {
    key: {}
}

wm.set(container.key, "val1"); //container维护着弱映射键的引用，因此这个对象键不会成为垃圾回收的目标
function removeReference() {
    container.key = null; //摧毁对象的最后一个引用
}
```

**不可迭代键**

因为 `WeakMap` 中的键值对任何时候都可能被销毁，所以没有必要提供迭代其键值对的能力。当然，也用不着像 `clear()` 这样一次性销毁所有的键值的方法。 `WeakMap` 确实没有这个方法。因为不可能迭代，所以也不可能在不知道对象引用的情况下从弱映射中取值。即便代码可以访问WeakMap实例，也没有办法看到其中的内容。

`WeakMap` 实例之所以限制只能用对象作为键，是为了保证只有通过键对象的引用才能取得值。如果允许原始值，那就没有办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

**使用弱映射**

***1. 私有变量***
私有变量存储在弱映射中，以对象实例为键，以私有成员的字典为值

```js
const wm = new WeakMap();

class User {
    constructor(id) {
        this.idProperty = Symbol('id');
        this.setId(id);
    }

    setPrivate(property, value) {
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }

    getPrivate(property) {
        return wm.get(this)[property];
    }

    setId(id) {
        this.setPrivate(this.idProperty, id);
    }

    getId() {
        return this.getPrivate(this.idProperty);
    }

}
return user; 
})(); 
const user = new User(123);
user.getId();   //123
user.setId(456);
user.getId();   //456


// 并不是真正私有的
console.log(wm.get(user)[user.idProperty]); //456

```

```js
const User = (() => {

    const wm = new WeakMap();

    class User {

        constructor(id) {
            this.idProperty = Symbol('id');
            this.setId(id);
        }

        setPrivate(property, value) {
            const privateMembers = wm.get(this) || {};
            privateMembers[property] = value;
            wm.set(this, privateMembers);
        }

        getPrivate(property) {
            return wm.get(this)[property];
        }

        setId(id) {
            this.setPrivate(this.idProperty, id);
        }

        getId() {
            return this.getPrivate(this.idProperty);
        }

    }
    return User;
})();
const user = new User(123);
user.getId(); //123
user.setId(456);
user.getId(); //456
console.log(wm.get(user)[user.idProperty]); //ReferenceError
```

***dom节点元数据***

```js
const m = new Map();
const loginButton = document.querySelector('#login');

//给这个节点关联一些元素
m.set(loginButton, {disabled: true});  //dom节点删除后，由于映射还保存着按钮的引用，所以对应的DOM节点仍然会都留在内存中。除非明确将其从映射中删除或者等到映射本身被销毁。

const m = new WeakMap();
const loginButton = document.querySelector('#login');

//给这个节点关联一些元素
wm.set(loginButton, {disabled:true});  //节点从dom树中被删除后，垃圾回收可以立即释放内存
```
# set

```js
const m = new Set();   //创建一个空集合

// 使用数组初始化集合
const s1 = new Set(["val1","val2","val3"]);
s1.size;  //3

// 使用自定义迭代初始化集合
const s2 = new Set({
    [Symbol.iterator]: function*(){
        yield "val1";
        yield "val2";
        yield "val3";
    }
});
s2.size;  //3
