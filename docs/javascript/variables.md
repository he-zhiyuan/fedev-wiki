# JavaScript 变量与数据类型

## 引言

在前端开发的世界里，变量和数据类型是我们必须首先掌握的基础知识。它们就像是厨师手中的食材和工具，决定了我们能做出什么样的"菜肴"。无论是简单的静态网页还是复杂的交互应用，我们都离不开对数据的操作和管理。今天，就让我们一起揭开JavaScript变量与数据类型的神秘面纱，打开编程世界的第一扇大门！

## 基础类型

JavaScript中有七种基础数据类型，它们是编程的基本构建块：

### Number（数字）
```javascript
let age = 25;        // 整数
let price = 99.99;   // 小数
let infinity = Infinity;  // 无穷大
let notANumber = NaN;     // 非数字
```
无论是整数还是小数，在JavaScript中都是Number类型。它还包括一些特殊值，如`Infinity`（无穷大）和`NaN`（Not a Number，表示无效的数学计算结果）。

### String（字符串）
```javascript
let name = "小明";            // 双引号
let message = '你好，世界！';  // 单引号
let template = `我叫${name}`; // 模板字符串，可以嵌入变量
```
字符串是文本数据。你可以用单引号、双引号或反引号（模板字符串）来创建字符串。模板字符串特别强大，它允许你在字符串中嵌入变量和表达式。

### Boolean（布尔值）
```javascript
let isLoggedIn = true;
let hasError = false;
```
布尔值只有两个可能的值：`true`（真）或`false`（假）。它们通常用于条件判断和逻辑操作。

### Null（空值）
```javascript
let emptyValue = null;
```
`null`是一个特殊值，表示"没有值"或"空"。它是一个明确的赋值，表示变量目前没有任何有效内容。

### Undefined（未定义）
```javascript
let notAssigned;  // 声明但未赋值的变量
console.log(notAssigned);  // 输出: undefined
```
当一个变量被声明但没有赋值时，它的默认值是`undefined`。这表示"变量存在，但没有值"。

### Symbol（符号）
```javascript
let uniqueKey = Symbol('描述');
```
Symbol是ES6引入的新类型，它创建唯一的、不可变的标识符，主要用于对象属性的标识。

### BigInt（大整数）
```javascript
let hugeNumber = 9007199254740991n;  // 在数字后加n表示BigInt
```
BigInt是较新的数据类型，用于表示大于Number类型能表示的范围的整数。

## 引用类型

引用类型是由多个值组成的对象，它们不是直接存储值，而是存储对值的引用（指针）：

### Object（对象）
```javascript
let person = {
  name: "小红",
  age: 22,
  greeting: function() {
    console.log("你好！");
  }
};

console.log(person.name);  // 输出: 小红
person.greeting();         // 输出: 你好！
```
对象是键值对的集合，可以存储数据和函数（方法）。它是JavaScript中最重要的数据类型之一，几乎所有其他复杂类型都基于对象。

### Array（数组）
```javascript
let fruits = ["苹果", "香蕉", "橙子"];
console.log(fruits[0]);      // 输出: 苹果
console.log(fruits.length);  // 输出: 3
```
数组是有序的元素集合，可以存储任何类型的数据。索引从0开始，通过索引可以访问特定位置的元素。

### Function（函数）
```javascript
function sayHello(name) {
  return `你好，${name}！`;
}

console.log(sayHello("小明"));  // 输出: 你好，小明！
```
函数是可以被调用执行的代码块。在JavaScript中，函数也是一种特殊的对象，可以像其他值一样传递和操作。

### Date（日期）
```javascript
let today = new Date();
console.log(today.toLocaleDateString());  // 输出当前日期
```
Date对象用于处理日期和时间，提供了丰富的方法来格式化和操作日期。

### RegExp（正则表达式）
```javascript
let pattern = /^\d{11}$/;  // 匹配11位数字
console.log(pattern.test("13912345678"));  // 输出: true
```
正则表达式是用于匹配字符串模式的强大工具，广泛应用于表单验证、数据提取等场景。

## 变量声明

在JavaScript中，有三种声明变量的方式，各有特点：

### var
```javascript
var message = "旧版变量声明";
var count = 10;
```
`var`是最早的变量声明方式。它的作用域是函数级的，可以被重复声明，也存在变量提升。

### let
```javascript
let message = "新版变量声明";
let count = 10;
```
ES6引入的`let`声明，作用域是块级的（花括号内），不能在同一作用域中重复声明，也不会像`var`那样提升。

### const
```javascript
const PI = 3.14159;
const API_URL = "https://api.example.com";
```
`const`声明常量，一旦赋值就不能改变。但如果值是对象，对象的属性仍然可以修改。

### 变量提升
```javascript
console.log(message);  // 输出: undefined
var message = "你好";

// 等同于：
var message;
console.log(message);
message = "你好";
```
使用`var`声明的变量会在代码执行前被"提升"到当前作用域的顶部，但只有声明提升，赋值不会提升。

### 暂时性死区
```javascript
console.log(message);  // 错误: Cannot access 'message' before initialization
let message = "你好";
```
使用`let`或`const`声明的变量存在"暂时性死区"，在声明前引用会导致错误，而不是像`var`那样返回`undefined`。

## 类型转换

JavaScript是弱类型语言，数据类型可以灵活转换，但也容易引发意外问题：

### 显式转换
```javascript
// 转为字符串
let num = 123;
let str = String(num);  // "123"

// 转为数字
let str2 = "456";
let num2 = Number(str2);  // 456

// 转为布尔值
let empty = "";
let bool = Boolean(empty);  // false，空字符串转为false
```
使用内置函数如`String()`、`Number()`和`Boolean()`可以明确地进行类型转换。

### 隐式转换
```javascript
let result = "5" + 3;  // "53"，数字被转为字符串
let result2 = "5" - 3;  // 2，字符串被转为数字
let result3 = "5" == 5;  // true，使用==时会进行类型转换
```
在某些操作中，JavaScript会自动转换数据类型。这种隐式转换可能导致令人困惑的结果。

### 类型判断
```javascript
// typeof 操作符
console.log(typeof 123);        // "number"
console.log(typeof "hello");    // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object"（这是JavaScript的一个历史遗留bug）
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"（数组也是对象）

// instanceof 操作符（用于检查对象）
console.log([1, 2] instanceof Array);  // true
```
`typeof`操作符可以判断大多数基本类型，而`instanceof`用于判断对象是否是某个类的实例。

### 最佳实践
1. **使用严格相等（===）比较**：它不进行类型转换，更可预测。
2. **显式转换优于隐式转换**：明确地转换类型可以减少意外。
3. **注意类型转换的陷阱**：特别是在处理用户输入时。
4. **使用适当的类型检查方法**：根据需要选择`typeof`、`instanceof`或其他方法。

## 总结与拓展

JavaScript的变量和数据类型是前端开发的基石。掌握了它们，你就能更自信地探索JavaScript的其他特性。记住，编程就像学习语言，类型是词汇，变量是载体，通过它们我们构建出丰富多彩的程序世界。

### 拓展阅读建议：
- [JavaScript的类型系统与TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [JavaScript内存管理和垃圾回收机制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
- [JavaScript的值类型vs引用类型深入理解](https://segmentfault.com/a/1190000015774465)
- [MDN: JavaScript数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

> 学习中遇到问题？别担心，每个程序员都曾是初学者。保持好奇心，多动手实践，你会越来越熟练！