# JavaScript 控制流

## 引言

控制流是程序的灵魂，它决定了代码的执行路径和顺序。就像导航系统指引我们在城市中穿行，控制流语句帮助我们的程序做出决策、重复执行任务和处理异常情况。无论是简单的用户交互还是复杂的数据处理，掌握JavaScript的控制流结构都是成为优秀前端开发者的必经之路。今天，让我们一起探索这些强大而灵活的控制机制！

## 条件语句

条件语句让程序能够根据不同条件执行不同的代码块，实现"如果...那么..."的逻辑判断。

### if...else 语句
```javascript
let hour = new Date().getHours();

if (hour < 12) {
  console.log("上午好！");
} else if (hour < 18) {
  console.log("下午好！");
} else {
  console.log("晚上好！");
}
```
这是最基本的条件结构。如果第一个条件为真，执行第一个代码块；否则检查下一个条件，依此类推。

### switch 语句
```javascript
let day = new Date().getDay();
let dayName;

switch (day) {
  case 0:
    dayName = "星期日";
    break;
  case 1:
    dayName = "星期一";
    break;
  case 2:
    dayName = "星期二";
    break;
  // ... 其他日期
  default:
    dayName = "未知日期";
}

console.log(`今天是 ${dayName}`);
```
当有多个可能的值需要比较时，`switch`语句比多个`if-else`更清晰。别忘了`break`语句，否则执行会"穿透"到下一个case。

### 三元运算符
```javascript
let age = 20;
let status = age >= 18 ? "成年" : "未成年";
console.log(status);  // 输出: "成年"
```
三元运算符是`if-else`的简短形式，适合简单条件判断。它的结构是`条件 ? 真值 : 假值`。

### 短路求值
```javascript
// AND短路求值
let username = "";
let displayName = username || "游客";  // 如果username为空，使用"游客"

// OR短路求值
let isAdmin = true;
isAdmin && console.log("显示管理员面板");  // 只有当isAdmin为true时才执行
```
逻辑运算符`&&`和`||`具有短路特性，可以用于条件执行或默认值设置。

### 空值合并
```javascript
let count = null;
let defaultCount = count ?? 10;  // 如果count为null或undefined，使用10
console.log(defaultCount);  // 输出: 10
```
`??`运算符是ES2020引入的，专门处理`null`或`undefined`值，与`||`不同，它不会对其他假值（如`0`或`""`）生效。

## 循环结构

循环让我们能够重复执行代码，处理数组、列表或任何需要迭代的内容。

### for 循环
```javascript
// 基本for循环
for (let i = 0; i < 5; i++) {
  console.log(`第 ${i + 1} 次循环`);
}
```
传统`for`循环由三部分组成：初始化、条件和更新表达式。当条件为真时，循环继续执行。

### while 循环
```javascript
let count = 0;
while (count < 5) {
  console.log(`第 ${count + 1} 次循环`);
  count++;
}
```
`while`循环在条件为真时重复执行代码块。确保在循环内更新条件相关变量，否则会造成无限循环。

### do...while 循环
```javascript
let i = 0;
do {
  console.log(`第 ${i + 1} 次循环`);
  i++;
} while (i < 5);
```
与`while`不同，`do...while`循环保证至少执行一次循环体，再检查条件。

### for...in 循环
```javascript
let person = {
  name: "小明",
  age: 25,
  job: "程序员"
};

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
```
`for...in`循环遍历对象的可枚举属性。注意它也会遍历原型链上的属性，所以通常搭配`hasOwnProperty`使用。

### for...of 循环
```javascript
let colors = ["红", "绿", "蓝"];

for (let color of colors) {
  console.log(color);
}
```
ES6引入的`for...of`循环，用于遍历可迭代对象（如数组、字符串、Map、Set等），直接获取值而非索引。

### Array 循环方法
```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach：遍历数组
numbers.forEach(num => console.log(num * 2));

// map：创建新数组
let doubled = numbers.map(num => num * 2);

// filter：筛选元素
let evens = numbers.filter(num => num % 2 === 0);

// reduce：累积计算
let sum = numbers.reduce((total, num) => total + num, 0);
```
数组提供了多种函数式方法进行迭代操作，这些方法更具表达力，也更符合现代JavaScript的编程风格。

## 跳转语句

跳转语句可以改变代码的执行流程，实现更灵活的控制。

### break 语句
```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;  // 当i等于5时跳出循环
  }
  console.log(i);
}
// 输出: 1 2 3 4
```
`break`语句会立即终止最内层的循环或`switch`语句。

### continue 语句
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // 跳过当前迭代
  }
  console.log(i);
}
// 输出: 1 2 4 5
```
`continue`语句跳过当前迭代，直接进入下一轮循环。

### return 语句
```javascript
function isEven(num) {
  if (num % 2 === 0) {
    return true;  // 如果是偶数，立即返回true并结束函数
  }
  return false;  // 否则返回false
}
```
`return`语句立即结束函数执行并返回指定值。它是函数控制流中最常用的跳转语句。

### throw 语句
```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为零！");  // 抛出错误
  }
  return a / b;
}
```
`throw`语句抛出一个异常，中断正常的程序流程，通常与`try...catch`结合使用。

### 标签语句
```javascript
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop;  // 跳出外层循环
    }
    console.log(`i=${i}, j=${j}`);
  }
}
```
标签可以和`break`或`continue`一起使用，用于控制跳出或继续哪个嵌套循环。这在多层循环中非常有用。

## 异常处理

异常处理机制让我们能够优雅地应对程序运行中的错误，保证程序的健壮性。

### try...catch...finally
```javascript
try {
  // 尝试执行可能出错的代码
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  // 捕获并处理错误
  console.error("发生错误:", error.message);
} finally {
  // 无论是否有错误都会执行
  console.log("操作完成，进行清理工作");
}
```
`try`块包含可能出错的代码，`catch`块捕获并处理异常，`finally`块无论如何都会执行，通常用于清理资源。

### Error 对象
```javascript
// 创建自定义错误
let error = new Error("发生了一个错误");
console.log(error.message);  // "发生了一个错误"
console.log(error.stack);    // 错误堆栈跟踪信息
```
JavaScript提供了内置的`Error`对象及其子类（如`SyntaxError`、`TypeError`等），用于表示不同类型的错误。

### 自定义错误
```javascript
// 创建自定义错误类型
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// 使用自定义错误
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("用户名不能为空");
  }
}
```
通过继承`Error`类，我们可以创建自定义错误类型，使错误处理更具语义和针对性。

### 异常传播
```javascript
function a() {
  b();
}

function b() {
  c();
}

function c() {
  throw new Error("在c中发生错误");
}

try {
  a();  // 错误从c传播到b，再到a，最后被这里捕获
} catch (error) {
  console.error(error.message);
}
```
未捕获的异常会沿着调用栈向上传播，直到被捕获或导致程序崩溃。

### 异步错误处理
```javascript
// Promise错误处理
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('获取数据失败:', error));

// async/await错误处理
async function fetchData() {
  try {
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}
```
异步操作的错误处理需要特殊方式：Promise使用`.catch()`，而async/await则可以使用传统的try/catch结构。

## 高阶控制模式

除了基本控制结构，JavaScript还提供了一些高级控制流模式，能够处理更复杂的场景。

### 递归
```javascript
// 计算阶乘
function factorial(n) {
  if (n <= 1) {
    return 1;  // 基本情况
  }
  return n * factorial(n - 1);  // 递归调用
}

console.log(factorial(5));  // 输出: 120
```
递归是函数调用自身的过程，适合解决具有自相似结构的问题，如树遍历、排序等。

### 迭代器
```javascript
// 自定义迭代器
function createRangeIterator(start, end) {
  let current = start;
  return {
    next() {
      return current <= end ? 
        { value: current++, done: false } :
        { done: true };
    }
  };
}

const iterator = createRangeIterator(1, 3);
console.log(iterator.next());  // {value: 1, done: false}
console.log(iterator.next());  // {value: 2, done: false}
console.log(iterator.next());  // {value: 3, done: false}
console.log(iterator.next());  // {done: true}
```
迭代器是一种访问集合元素的接口，允许逐个访问元素而不暴露底层数据结构。

### 生成器
```javascript
// 使用生成器创建范围
function* rangeGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;  // 每次产出一个值并暂停
  }
}

const range = rangeGenerator(1, 3);
console.log(range.next());  // {value: 1, done: false}
console.log(range.next());  // {value: 2, done: false}
console.log(range.next());  // {value: 3, done: false}
console.log(range.next());  // {value: undefined, done: true}
```
生成器是ES6引入的特性，通过`function*`和`yield`关键字简化迭代器的创建，让异步控制流更加优雅。

### 状态机
```javascript
// 简单的交通灯状态机
class TrafficLight {
  constructor() {
    this.states = ['红', '绿', '黄'];
    this.currentState = 0;
  }
  
  change() {
    this.currentState = (this.currentState + 1) % this.states.length;
    return this.states[this.currentState];
  }
  
  getCurrentState() {
    return this.states[this.currentState];
  }
}

const light = new TrafficLight();
console.log(light.getCurrentState());  // "红"
console.log(light.change());  // "绿"
console.log(light.change());  // "黄"
```
状态机是一种控制模式，通过明确定义的状态转换来控制程序行为，特别适用于UI交互和游戏逻辑。

### Promise 链控制
```javascript
// Promise链式调用
function step1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('步骤1完成');
      resolve('步骤1结果');
    }, 1000);
  });
}

function step2(result) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('步骤2完成，使用' + result);
      resolve('步骤2结果');
    }, 1000);
  });
}

step1()
  .then(result => step2(result))
  .then(finalResult => console.log('所有步骤完成，最终结果：' + finalResult))
  .catch(error => console.error('发生错误:', error));
```
Promise链提供了一种优雅的方式来处理异步操作序列，避免回调地狱，使代码更加清晰可读。

## 总结与拓展

JavaScript的控制流结构丰富多样，从基本的条件和循环到高级的异步控制，为我们提供了处理各种编程场景的强大工具。掌握这些结构不仅能让你的代码更加高效、可读，还能帮助你写出更加健壮和优雅的前端应用。

### 拓展阅读建议：
- [函数式编程中的控制流模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functional_programming)
- [异步编程深入：从回调到Promise再到async/await](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous)
- [响应式编程与事件流控制](https://cn.rx.js.org/manual/overview.html)
- [JavaScript设计模式中的控制流应用](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
- [MDN: 循环与迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)

> 记住，编程就像讲故事——控制流是你的故事线，决定情节如何展开。多练习不同控制结构的组合使用，你会发现编程的无限可能！