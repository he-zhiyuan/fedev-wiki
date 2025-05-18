# JavaScript 运算符与表达式：写给小白的完全指南

## 引言

还记得小学时学习的数学符号吗？加号、减号、乘号和除号，这些都是我们的老朋友了。在JavaScript中，这些符号有了新名字：**运算符**。运算符是编程语言的"动词"，它们让代码能够"做事情"。无论是计算购物车总价，判断用户是否登录，还是组合多个条件进行判断，运算符都在默默工作。作为前端开发的基础，掌握运算符就像学会使用厨师的刀具一样重要 - 没有它们，你几乎寸步难行。

本文将用最通俗的语言，带你彻底掌握JavaScript中的各类运算符，让你不仅知道"怎么用"，更明白"为什么"和"最佳实践"。

## 算术运算符：数学运算的好帮手

算术运算符可能是你接触的第一批JavaScript运算符，它们让我们能进行基本的数学计算。

### 加减乘除：最常见的四大运算

```javascript
// 加法运算
let price = 99;
let tax = 7;
let total = price + tax; // 结果: 106
console.log(`商品总价: ¥${total}`); // 商品总价: ¥106

// 减法运算
let budget = 1000;
let expense = 650;
let remaining = budget - expense; // 结果: 350
console.log(`剩余预算: ¥${remaining}`); // 剩余预算: ¥350

// 乘法运算
let quantity = 5;
let unitPrice = 20;
let subtotal = quantity * unitPrice; // 结果: 100
console.log(`小计: ¥${subtotal}`); // 小计: ¥100

// 除法运算
let totalDistance = 240;
let days = 3;
let dailyAverage = totalDistance / days; // 结果: 80
console.log(`日均行走: ${dailyAverage}公里`); // 日均行走: 80公里
```

### 取余（%）：计算余数的工具

取余运算符（%）返回除法后的余数，这在判断偶数/奇数、循环操作时特别有用。

```javascript
// 判断奇偶数
let number = 15;
let remainder = number % 2;
console.log(remainder); // 结果: 1 (奇数)

// 实用场景：轮播图循环显示
let slides = 5; // 有5张幻灯片
let currentPosition = 7; // 当前是第7次点击"下一张"
let actualSlide = currentPosition % slides; // 结果: 2 (表示应该显示第3张幻灯片)
console.log(`显示第${actualSlide + 1}张幻灯片`); // 显示第3张幻灯片
```

### 自增自减：计数器的好助手

自增（++）和自减（--）让变量值加1或减1，非常适合计数场景。

```javascript
// 自增 (++)
let visitors = 0;
visitors++; // 等同于 visitors = visitors + 1
console.log(`访问人数: ${visitors}`); // 访问人数: 1

// 自减 (--)
let countdown = 10;
countdown--; // 等同于 countdown = countdown - 1
console.log(`倒计时: ${countdown}秒`); // 倒计时: 9秒

// 前置与后置的区别
let a = 5;
let b = a++; // 后置: 先赋值后自增
console.log(a, b); // 6, 5

let c = 5;
let d = ++c; // 前置: 先自增后赋值
console.log(c, d); // 6, 6
```

### 幂运算（**）：计算乘方

```javascript
// 计算乘方
let base = 2;
let exponent = 3;
let result = base ** exponent; // 等同于 Math.pow(2, 3)
console.log(`${base}的${exponent}次方 = ${result}`); // 2的3次方 = 8
```

## 比较运算符：做决策的基础

比较运算符用于比较值，返回布尔值（true或false），是条件语句的基础。

### 相等比较（==）与严格相等（===）：最容易混淆的运算符

```javascript
// 相等比较 (==): 仅比较值，会进行类型转换
console.log(5 == "5"); // true，因为字符串"5"会被转换为数字5

// 严格相等 (===): 同时比较值和类型
console.log(5 === "5"); // false，因为类型不同（一个是数字，一个是字符串）

// 为什么要优先使用===？看看下面的例子
console.log(0 == ""); // true，这可能导致意外行为
console.log(0 === ""); // false，类型安全，避免隐式转换带来的问题
```

### 大小比较：比大小

```javascript
let age = 18;

// 大于 (>)
console.log(age > 16); // true，表示年龄大于16岁

// 小于 (<)
console.log(age < 21); // true，表示年龄小于21岁

// 大于等于 (>=)
console.log(age >= 18); // true，表示年龄大于或等于18岁

// 小于等于 (<=)
console.log(age <= 20); // true，表示年龄小于或等于20岁
```

### 不等比较（!=和!==）：检查不同

```javascript
// 不相等 (!=): 值不相等（进行类型转换）
console.log(5 != "6"); // true，因为5和6不相等

// 严格不相等 (!==): 值或类型不相等
console.log(5 !== "5"); // true，因为类型不同
```

## 逻辑运算符：组合条件的能手

逻辑运算符用于组合多个条件，让我们能够进行复杂的逻辑判断。

### 与运算（&&）：所有条件都必须为真

想象一下判断一个人是否能看R级电影：必须年满18岁**并且**有有效身份证。

```javascript
let age = 19;
let hasID = true;

// 只有两个条件都为true，结果才为true
let canWatchRMovie = age >= 18 && hasID;
console.log(`能否观看限制级电影: ${canWatchRMovie}`); // 能否观看限制级电影: true

// 如果任一条件为false，结果都为false
let youngAge = 16;
let canYoungWatch = youngAge >= 18 && hasID;
console.log(`年轻人能否观看: ${canYoungWatch}`); // 年轻人能否观看: false
```

### 或运算（||）：至少一个条件为真

想象一下判断是否符合优惠条件：学生**或者**老人可以享受折扣。

```javascript
let isStudent = false;
let isSenior = true;

// 只要有一个条件为true，结果就为true
let hasDiscount = isStudent || isSenior;
console.log(`是否享受折扣: ${hasDiscount}`); // 是否享受折扣: true

// 只有所有条件都是false，结果才为false
let isRegularCustomer = !isStudent && !isSenior;
console.log(`是否普通客户: ${isRegularCustomer}`); // 是否普通客户: false
```

### 非运算（!）：取反

非运算符可以将布尔值反转。

```javascript
let isLoggedIn = false;
let needsToLogin = !isLoggedIn; // 取反
console.log(`需要登录: ${needsToLogin}`); // 需要登录: true

// 双重否定(!!)常用于将值转换为布尔类型
console.log(!!0); // false (0被视为假值)
console.log(!!1); // true (非0数字被视为真值)
console.log(!!""); // false (空字符串被视为假值)
console.log(!!"hello"); // true (非空字符串被视为真值)
```

### 短路运算：逻辑运算符的省力技巧

短路运算是逻辑运算符的一个重要特性，它会在得到确定结果后停止运算，这能帮我们编写更简洁的代码。

```javascript
// &&短路：如果第一个条件为false，就不会检查第二个条件
function getDogName() {
  console.log("getDogName被调用了");
  return "旺财";
}

let hasDog = false;
let dogName = hasDog && getDogName(); // getDogName不会被调用
console.log(dogName); // false

// ||短路：如果第一个条件为true，就不会检查第二个条件
let username = "小明"; // 假设用户已提供用户名
let defaultName = "游客";
let displayName = username || defaultName; // 如果username存在，就使用username
console.log(`欢迎, ${displayName}!`); // 欢迎, 小明!
```

## 其他实用运算符

### 三元运算符：简化的if-else

三元运算符是if-else的简洁形式，格式为：`条件 ? 为真时的值 : 为假时的值`。

```javascript
let age = 16;
let message = age >= 18 ? "你可以投票" : "你还不能投票";
console.log(message); // 你还不能投票

// 等价的if-else写法
let messageIfElse;
if (age >= 18) {
  messageIfElse = "你可以投票";
} else {
  messageIfElse = "你还不能投票";
}
```

### 可选链运算符（?.）：安全访问对象属性

可选链运算符让我们能安全地访问可能不存在的对象属性，避免报错。

```javascript
// 假设从API获取的用户数据可能不完整
let user = {
  name: "张三",
  // address属性不存在
};

// 不使用可选链：可能导致错误
// let city = user.address.city; // 报错：Cannot read property 'city' of undefined

// 使用可选链：安全访问
let city = user.address?.city; // 结果: undefined，不会报错
console.log(`城市: ${city || '未提供'}`); // 城市: 未提供

// 可选链也适用于方法调用
let result = user.getDetails?.(); // 如果getDetails方法存在则调用，否则返回undefined
```

### 空值合并运算符（??）：提供默认值

空值合并运算符在值为null或undefined时提供默认值。

```javascript
let username = null;
let displayName = username ?? "游客"; // 如果username为null或undefined，使用"游客"
console.log(`欢迎, ${displayName}!`); // 欢迎, 游客!

// ??与||的区别
let count = 0;
let defaultCount = 10;

// ||会将0视为假值，因此返回默认值
let result1 = count || defaultCount;
console.log(result1); // 10

// ??只在值为null或undefined时使用默认值，0是有效值
let result2 = count ?? defaultCount;
console.log(result2); // 0
```

## 常见错误与注意事项

### 1. 相等比较混淆（==与===）

```javascript
// 错误示例
if (userId == null) {
  // 问题: 这会同时检查null和undefined，可能不是你想要的行为
}

// 正确示例
if (userId === null) {
  // 明确检查是否为null
}

// 另一个正确示例：如果需要同时检查null和undefined
if (userId == null) {
  // 等同于 userId === null || userId === undefined
}
```

### 2. 运算符优先级问题

```javascript
// 错误示例
let result = 2 + 3 * 5; // 期望: 25，实际: 17

// 正确示例：使用括号明确运算顺序
let result = (2 + 3) * 5; // 结果: 25
```

### 3. 短路评估引起的意外行为

```javascript
// 错误示例
function processUser(user) {
  let name = user && user.name; // 如果user是0或空字符串，会返回user而不是undefined
}

// 正确示例
function processUser(user) {
  let name = user?.name; // 只在user为null或undefined时返回undefined
}
```

### 4. 自增/自减位置的影响

```javascript
// 容易混淆的例子
let a = 1;
let b = a++;
console.log(a, b); // 2, 1 - 可能不是期望的结果

// 避免在复杂表达式中使用自增/自减
let c = 1;
let d = ++c + c++; // 避免这种写法
```

## 总结

JavaScript运算符就像编程语言中的乐高积木，掌握了它们，你就能构建各种各样的逻辑。从基本的算术计算到复杂的条件判断，运算符无处不在。

随着你的编程旅程继续，你会发现这些基础运算符在各种框架和库中都扮演着重要角色。比如React的条件渲染经常使用&&和三元运算符，而可选链运算符则在处理API数据时非常有用。

最重要的是，理解运算符不仅是知道如何使用它们，还要明白它们背后的工作原理。这会让你编写出更可靠、更可维护的代码。

## 拓展阅读

1. [MDN Web Docs: 表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)
2. [JavaScript 运算符优先级表](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
3. [现代JavaScript教程：逻辑运算符](https://zh.javascript.info/logical-operators)

---

练习是掌握知识的最佳方式。尝试编写一些使用不同运算符的小程序，比如简单的计算器、登录表单验证或购物车计算。只有通过实践，这些概念才能真正成为你的工具箱中的得力助手。 