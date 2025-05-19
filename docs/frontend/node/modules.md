# Node.js模块系统：CommonJS与ESM完全指南

## 引言

你是否曾经好奇，为什么在浏览器中使用JavaScript需要通过`<script>`标签引入所有代码，而在Node.js中却可以优雅地通过`require`或`import`来组织代码？这一切都归功于Node.js强大的模块系统！

在早期的JavaScript开发中，代码组织是一个巨大的挑战。随着代码量增加，全局变量污染、依赖管理混乱等问题层出不穷。Node.js的出现改变了这一切，它引入了模块化编程的概念，让我们能够将代码分割成独立、可重用的单元。这不仅提高了代码的可维护性，还建立了庞大的npm生态系统，使开发者能够站在巨人的肩膀上构建应用。

今天，让我们深入了解Node.js的两大模块系统：传统的CommonJS和现代的ES Modules，看看它们如何改变了JavaScript的开发方式。

## CommonJS：Node.js的传统模块系统

### 什么是CommonJS？

CommonJS是Node.js最初采用的模块规范，它定义了模块的导出、导入和管理机制。在CommonJS中，每个文件都被视为一个独立的模块，拥有自己的作用域，模块内部的变量、函数和类都是私有的，除非明确导出。

### 导出模块：module.exports与exports

在CommonJS中，我们可以通过`module.exports`或`exports`对象来导出模块内容：

```javascript
// 方式1：使用module.exports导出单个对象
module.exports = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

// 方式2：直接导出函数
module.exports = function(a, b) {
  return a + b;
};

// 方式3：使用exports对象添加多个导出项
exports.add = function(a, b) {
  return a + b;
};

exports.subtract = function(a, b) {
  return a - b;
};
```

**注意事项：** `exports`是`module.exports`的引用，直接替换`exports`会切断这种引用关系。因此，不能这样写：

```javascript
// ❌ 错误写法：这会切断exports与module.exports的引用关系
exports = {
  add: function(a, b) {
    return a + b;
  }
};
// 此时外部依然无法访问add函数
```

正确的做法是，要么使用`module.exports`直接赋值，要么给`exports`的属性赋值：

```javascript
// ✅ 正确写法1：
module.exports = {
  add: function(a, b) {
    return a + b;
  }
};

// ✅ 正确写法2：
exports.add = function(a, b) {
  return a + b;
};
```

### 导入模块：require函数

在CommonJS中，我们使用`require()`函数来导入模块：

```javascript
// 导入核心模块
const fs = require('fs');
const path = require('path');

// 导入本地模块（./ 或 ../ 开头的路径）
const myModule = require('./myModule');
const config = require('../config');

// 导入npm安装的模块
const express = require('express');
const axios = require('axios');
```

`require()`函数的寻找模块的规则如下：

1. 如果是核心模块（如`fs`、`path`等），直接返回内置模块
2. 如果路径以`./`或`../`开头，则尝试按照文件路径查找
   - 首先查找确切的文件名
   - 然后尝试添加.js、.json、.node扩展名
   - 最后查找同名目录下的index.js、index.json或index.node
3. 如果不是路径也不是核心模块，则在node_modules目录中查找

### 模块缓存机制

Node.js会缓存已加载的模块，这意味着无论一个模块被`require`多少次，它只会在第一次加载时执行，之后都返回缓存结果：

```javascript
// moduleA.js
console.log('moduleA被加载了！');
module.exports = { name: 'moduleA' };

// app.js
const moduleA1 = require('./moduleA'); // 输出：moduleA被加载了！
const moduleA2 = require('./moduleA'); // 没有输出，使用缓存

console.log(moduleA1 === moduleA2); // 输出：true
```

如果需要每次都获取新实例，可以导出一个工厂函数：

```javascript
// moduleB.js
module.exports = function() {
  return {
    name: 'moduleB',
    createdAt: new Date()
  };
};

// app.js
const createModuleB = require('./moduleB');
const instance1 = createModuleB();
const instance2 = createModuleB();

console.log(instance1 === instance2); // 输出：false
```

### 模块的循环依赖

当两个模块相互引用对方时，会产生循环依赖。Node.js通过返回"未完成"的模块来解决这个问题：

```javascript
// a.js
console.log('a.js开始加载');
const b = require('./b');
console.log('在a.js中，b.done =', b.done);
module.exports = { done: true };
console.log('a.js结束加载');

// b.js
console.log('b.js开始加载');
const a = require('./a');
console.log('在b.js中，a.done =', a.done);
module.exports = { done: true };
console.log('b.js结束加载');

// main.js
console.log('main.js开始加载');
const a = require('./a');
console.log('在main.js中，a.done =', a.done);
```

执行`node main.js`的输出：

```
main.js开始加载
a.js开始加载
b.js开始加载
在b.js中，a.done = undefined
b.js结束加载
在a.js中，b.done = true
a.js结束加载
在main.js中，a.done = true
```

注意：循环依赖通常是设计问题的征兆，应尽量避免。

## ES Modules：JavaScript的标准模块系统

ES Modules(ESM)是ECMAScript官方的模块系统，也是JavaScript语言标准的一部分。从Node.js v12开始逐步支持ESM，现在已经可以在生产环境中使用。

### 在Node.js中启用ESM

有几种方式可以在Node.js中使用ESM：

1. 将文件扩展名改为`.mjs`
2. 在package.json中设置`"type": "module"`
3. 在特定项目的package.json中使用`"type": "commonjs"`回退到CommonJS（当父目录设置为module时）

```json
// package.json
{
  "name": "my-esm-project",
  "version": "1.0.0",
  "type": "module"
}
```

### 导出模块：export关键字

ESM使用`export`关键字导出模块内容：

```javascript
// 命名导出
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 或者集中导出
function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

export { multiply, divide };

// 导出时重命名
export { multiply as mul, divide as div };

// 默认导出
export default function(a, b) {
  return a + b;
}
```

与CommonJS不同，ESM支持"默认导出"和"命名导出"两种方式，并且可以在同一个模块中同时使用。

### 导入模块：import关键字

ESM使用`import`关键字导入模块：

```javascript
// 导入默认导出
import add from './math.js';

// 导入命名导出
import { subtract, multiply } from './math.js';

// 导入时重命名
import { subtract as sub, multiply as mul } from './math.js';

// 导入所有命名导出
import * as math from './math.js';

// 同时导入默认导出和命名导出
import add, { subtract, multiply } from './math.js';

// 动态导入（返回Promise）
import('./math.js')
  .then(math => {
    console.log(math.add(1, 2));
  })
  .catch(err => {
    console.error('模块加载失败', err);
  });

// 使用await动态导入（在async函数内）
async function loadMath() {
  const math = await import('./math.js');
  return math.add(1, 2);
}
```

### ESM的特性

ESM与CommonJS相比有几个重要特性：

1. **静态结构**：ESM的`import`和`export`是静态的，这允许静态分析、树摇（tree-shaking）和更好的IDE支持
2. **异步加载**：ESM模块可以异步加载，而CommonJS是同步的
3. **实时绑定**：ESM导出的是绑定，而不是值的拷贝
4. **默认严格模式**：所有ESM模块自动运行在严格模式下
5. **顶层this为undefined**：在ESM中，顶层的`this`是`undefined`，而不是全局对象

#### 实时绑定示例

```javascript
// counter.js (ESM)
export let count = 0;
export function increment() {
  count++;
}

// app.js (ESM)
import { count, increment } from './counter.js';
console.log(count); // 输出：0
increment();
console.log(count); // 输出：1，因为导入的是绑定，而不是值的拷贝
```

如果使用CommonJS，结果会不同：

```javascript
// counter.js (CommonJS)
let count = 0;
function increment() {
  count++;
}
module.exports = { count, increment };

// app.js (CommonJS)
const { count, increment } = require('./counter');
console.log(count); // 输出：0
increment();
console.log(count); // 输出：0，因为导入的是值的拷贝
```

## CommonJS与ESM的互操作性

现代Node.js应用可能同时包含CommonJS和ESM模块，了解它们的互操作方法很重要。

### 在ESM中导入CommonJS模块

ESM可以导入CommonJS模块，遵循以下规则：

1. CommonJS的`module.exports`会被视为默认导出
2. 如果`module.exports`是对象，其属性也会作为命名导出提供

```javascript
// math.cjs (CommonJS)
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// app.mjs (ESM)
// 作为默认导出导入
import math from './math.cjs';
console.log(math.add(1, 2)); // 输出：3

// 或作为命名导出导入
import { add, subtract } from './math.cjs';
console.log(add(1, 2)); // 输出：3
```

### 在CommonJS中导入ESM模块

CommonJS不能直接同步导入ESM模块，因为ESM是异步加载的。需要使用动态导入：

```javascript
// math.mjs (ESM)
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// app.cjs (CommonJS)
// ❌ 不能直接使用require
// const math = require('./math.mjs'); // 错误！

// ✅ 使用动态导入
(async () => {
  const math = await import('./math.mjs');
  console.log(math.add(1, 2)); // 输出：3
})();
```

### 模块混合使用的最佳实践

1. **尽量选择一种模块系统** - 在一个项目中尽量统一使用一种模块系统
2. **使用明确的文件扩展名** - 使用`.mjs`表示ESM，`.cjs`表示CommonJS
3. **考虑渐进迁移** - 如果要将CommonJS项目迁移到ESM，可以逐步进行
4. **使用兼容性包装** - 某些情况下，可以创建兼容层来处理模块系统差异

## 包管理器与模块解析

### package.json中的模块相关字段

`package.json`文件中有几个重要字段与模块系统相关：

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "type": "module",          // 指定默认模块系统（"module"或"commonjs"）
  "main": "dist/index.js",   // CommonJS入口点
  "module": "dist/index.mjs", // ESM入口点（一些打包工具使用）
  "exports": {               // 现代入口点定义
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./utils": {
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.js"
    }
  },
  "imports": {               // 包作用域导入映射
    "#internal": "./src/internal.js"
  }
}
```

- **type**: 指定项目使用的默认模块系统（"module"或"commonjs"）
- **main**: 传统的包入口点，主要用于CommonJS
- **module**: 用于ESM的入口点（非标准，但被许多工具支持）
- **exports**: 精确控制包可以导出的内容和如何导出
- **imports**: 定义包作用域内的导入路径别名

### 模块解析算法

Node.js使用复杂的算法来解析模块标识符。简化版本如下：

1. **核心模块**：如`fs`、`path`等，直接从Node.js内部加载
2. **文件模块**：以`/`、`./`或`../`开头的相对或绝对路径
   - 首先尝试确切的文件名
   - 然后尝试添加扩展名（`.js`、`.mjs`、`.cjs`、`.json`等）
   - 如果是目录，查找package.json的main字段
   - 如果没有package.json或main字段，尝试加载`index.js`等
3. **包模块**：从`node_modules`目录查找
   - 从当前目录的`node_modules`开始
   - 如果没有找到，继续向上层目录查找，直到文件系统根目录

### 子路径导出与导入

Node.js 12.7.0引入了"子路径导出"功能，允许精确控制模块的公共API：

```json
{
  "name": "my-library",
  "exports": {
    ".": "./lib/index.js",
    "./utils": "./lib/utils.js",
    "./utils/*": "./lib/utils/*.js"
  }
}
```

使用时：

```javascript
import myLib from 'my-library';
import { sortBy } from 'my-library/utils';
import { formatDate } from 'my-library/utils/date';
```

这样可以防止用户依赖包的内部结构，使库作者能够在不破坏兼容性的情况下重构代码。

## 模块系统最佳实践

### 结构化项目目录

一个组织良好的Node.js项目可能有如下结构：

```
my-project/
├── node_modules/
├── src/
│   ├── index.js      # 主入口点
│   ├── config.js     # 配置
│   ├── utils/        # 通用工具函数
│   │   ├── index.js
│   │   ├── logger.js
│   │   └── helpers.js
│   ├── models/       # 数据模型
│   ├── controllers/  # 控制器
│   └── services/     # 业务逻辑
├── tests/            # 测试文件
├── package.json
└── README.md
```

### 创建可维护的模块

1. **单一职责原则**：每个模块应该只有一个职责
2. **适当的粒度**：避免过大或过小的模块
3. **明确的接口**：为模块提供清晰的公共API
4. **文档注释**：使用JSDoc或类似工具为导出的函数和类添加文档
5. **避免副作用**：模块加载时避免执行有副作用的代码

### 使用模块组织技术

1. **桶（Barrel）导出**：使用索引文件整合和重新导出模块

```javascript
// src/utils/index.js - 桶（Barrel）文件
export { default as logger } from './logger.js';
export { default as config } from './config.js';
export * from './helpers.js';

// 使用桶导出
import { logger, config, formatDate } from './utils';
```

2. **动态导入优化**：使用动态导入懒加载大型模块

```javascript
async function processImage(path) {
  // 只在需要时才加载大型库
  const jimp = await import('jimp');
  const image = await jimp.read(path);
  // 处理图片...
  return image;
}
```

### 错误处理与模块加载

```javascript
// 安全地加载可能不存在的模块
let optionalModule;
try {
  optionalModule = require('some-optional-module');
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err; // 重新抛出非模块缺失错误
  }
  // 提供后备实现
  optionalModule = {
    someFunction: () => {
      console.log('使用后备实现');
    }
  };
}
```

### 模块中的环境配置

```javascript
// config.js
const config = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    debug: true
  },
  production: {
    apiUrl: 'https://api.example.com',
    debug: false
  },
  test: {
    apiUrl: 'http://localhost:3001/api',
    debug: true
  }
};

// 使用环境变量选择配置
const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
```

## 常见问题与解决方案

### "Cannot use import statement outside a module"

这个错误表示你在CommonJS环境中使用了ES Modules语法。解决方法：

1. 将文件扩展名改为`.mjs`
2. 在package.json中设置`"type": "module"`
3. 使用动态导入：`(async () => { await import('./module.js'); })()`

### "SyntaxError: Unexpected token 'export'"

与上述错误类似，但在浏览器或旧版Node.js中可能遇到。解决方法：

1. 确认Node.js版本支持ES Modules（v12+推荐）
2. 使用转译工具如Babel将ESM转换为CommonJS

### 循环依赖问题

```
(node:12345) Warning: Accessing non-existent property 'xxx' of module exports inside circular dependency
```

这表示遇到了循环依赖问题。解决方法：

1. 重构代码，消除循环依赖
2. 将共享代码提取到第三个模块
3. 使用依赖注入模式
4. 在引用前检查对象是否存在

### 模块不能找到

```
Error: Cannot find module 'some-module'
```

可能的原因和解决方法：

1. 模块未安装，运行`npm install some-module`
2. 模块名称拼写错误
3. 路径错误，检查相对路径是否正确
4. Node.js版本不兼容，检查包的引擎要求

## 总结与展望

Node.js的模块系统彻底改变了JavaScript的开发方式，使其从简单的脚本语言发展为构建复杂应用的强大工具。我们在本文中学习了：

- CommonJS和ES Modules的基本语法与使用
- 两种模块系统的优缺点和主要区别
- 如何在项目中混合使用两种模块系统
- 模块解析机制和package.json配置
- 模块化编程的最佳实践

随着JavaScript生态系统的不断发展，ES Modules已经成为标准，并被浏览器和Node.js支持。在新项目中，建议优先考虑使用ES Modules，以获得更好的性能、静态分析和未来兼容性。

### 进一步学习

1. 深入了解打包工具（如Webpack、Rollup等）对模块的处理方式
2. 探索TypeScript的模块和命名空间系统
3. 学习微前端架构中的模块联邦（Module Federation）
4. 研究动态导入和代码分割在性能优化中的应用

通过掌握Node.js的模块系统，你已经为构建可维护、高效的JavaScript应用奠定了坚实的基础！

> 注：本文档会持续更新，欢迎关注！