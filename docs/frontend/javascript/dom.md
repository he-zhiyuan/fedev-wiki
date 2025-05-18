# JavaScript DOM 与 BOM 操作

## 引言

在前端开发的世界中，DOM（文档对象模型）和BOM（浏览器对象模型）就像是连接JavaScript与网页的桥梁。通过它们，我们能够实现对页面元素的访问和操作，创造出丰富的交互体验。无论是简单的内容更新，还是复杂的动态效果，都离不开DOM和BOM的支持。今天，让我们一起揭开这个前端开发核心技能的面纱，学习如何让网页"活"起来！

## DOM 基础

DOM是Web开发的核心概念，它让JavaScript能够与HTML页面进行交互。

### 什么是 DOM

```javascript
// DOM将HTML文档表示为树形结构
// 例如这个HTML:
// <html>
//   <body>
//     <h1>我的标题</h1>
//     <p>我的段落</p>
//   </body>
// </html>

// 可以通过DOM访问:
document.querySelector('h1').textContent = '新标题';
```

DOM（Document Object Model）是HTML和XML文档的编程接口。它将网页表示为节点树，每个节点代表文档的一部分（如元素、属性或文本）。通过DOM，JavaScript可以改变文档的结构、样式和内容。

### DOM 树结构

```javascript
// DOM树可视化
document                        // 根节点
  └── html (documentElement)    // 根元素
       ├── head                 // 头部元素
       │    ├── title           // 标题元素
       │    │    └── 文本节点    // "我的网页"
       │    └── meta            // 元信息元素
       └── body                 // 主体元素
            ├── h1              // 标题元素
            │    └── 文本节点    // "欢迎!"
            └── p               // 段落元素
                 └── 文本节点    // "这是内容"
```

DOM树反映了HTML文档的层级结构。根节点是`document`对象，代表整个文档。树中的每个分支都以节点结束，每个节点包含不同的数据或功能。

### 节点类型

```javascript
// 常见节点类型
console.log(document.nodeType);                // 9 (Document节点)
console.log(document.documentElement.nodeType); // 1 (Element节点)
console.log(document.doctype.nodeType);        // 10 (DocumentType节点)
console.log(document.createTextNode('').nodeType); // 3 (Text节点)
```

DOM定义了多种节点类型，最常见的包括：
- 元素节点（1）：如`<div>`、`<p>`等HTML标签
- 文本节点（3）：元素内的文本内容
- 注释节点（8）：HTML注释
- 文档节点（9）：整个文档（`document`对象）
- 文档类型节点（10）：`<!DOCTYPE>`声明

### DOM 接口

```javascript
// 常用DOM接口
// Node - 所有节点的基本接口
let node = document.body;

// Element - 所有元素的基本接口
let element = document.createElement('div');

// HTMLElement - HTML元素的接口
let htmlElement = document.querySelector('div');
```

DOM提供了多种接口（JavaScript对象），用于访问和操作文档：
- Node：所有DOM节点都实现的基本接口
- Element：所有元素的基本接口
- HTMLElement：所有HTML元素的接口
- Document：文档节点的接口
- EventTarget：提供事件处理能力的接口

## 节点操作

DOM提供了丰富的API来操作节点，实现对页面的动态修改。

### 节点查找

```javascript
// 通过ID查找
let element = document.getElementById('myId');

// 通过类名查找
let elements = document.getElementsByClassName('myClass');

// 通过标签名查找
let paragraphs = document.getElementsByTagName('p');

// 使用CSS选择器查找（返回第一个匹配）
let firstElement = document.querySelector('#myId .someClass');

// 使用CSS选择器查找（返回所有匹配）
let allElements = document.querySelectorAll('.someClass');

// 关系导航
let parent = element.parentNode;
let children = element.childNodes;
let firstChild = element.firstChild;
let lastChild = element.lastChild;
let nextSibling = element.nextSibling;
let previousSibling = element.previousSibling;
```

DOM提供多种方法来查找元素，从选择单个元素到选择一组元素，从精确匹配到模糊查询，几乎涵盖所有查找需求。

### 节点创建

```javascript
// 创建元素节点
let div = document.createElement('div');

// 创建文本节点
let text = document.createTextNode('Hello World');

// 创建注释节点
let comment = document.createComment('这是一个注释');

// 创建文档片段（性能优化）
let fragment = document.createDocumentFragment();
for (let i = 0; i < 3; i++) {
  let li = document.createElement('li');
  li.textContent = `Item ${i+1}`;
  fragment.appendChild(li);
}
document.getElementById('myList').appendChild(fragment);
```

创建节点是动态生成内容的基础。文档片段（DocumentFragment）特别有用，它允许你在内存中构建DOM结构，然后一次性添加到文档中，避免多次重绘提高性能。

### 节点修改

```javascript
// 添加子节点
parent.appendChild(child);

// 在参考节点前插入新节点
parent.insertBefore(newNode, referenceNode);

// 替换节点
parent.replaceChild(newChild, oldChild);

// 克隆节点（传入true表示深克隆，包括所有子节点）
let clone = node.cloneNode(true);

// 使用新的解析方法（安全性更好）
parent.insertAdjacentHTML('beforeend', '<div>新内容</div>');

// 修改元素内容
element.textContent = '纯文本内容';
element.innerHTML = '<strong>HTML内容</strong>';
```

这些方法让我们能够动态地修改DOM结构，添加、移动、替换节点，或改变它们的内容。在处理HTML内容时，`insertAdjacentHTML`比`innerHTML`更高效，因为它不需要重新解析整个元素的内容。

### 节点删除

```javascript
// 移除子节点
parent.removeChild(child);

// 移除自身（较新的方法）
element.remove();

// 清空元素内容
element.innerHTML = '';
// 或
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

删除节点时要注意清理与之相关的事件监听器和引用，以避免内存泄漏。

### 属性操作

```javascript
// 获取/设置标准属性
element.id = 'newId';
let value = element.id;

// 检查、设置、移除属性
element.setAttribute('data-custom', 'value');
let attrValue = element.getAttribute('data-custom');
element.removeAttribute('data-custom');
element.hasAttribute('data-custom'); // false

// 处理类
element.className = 'class1 class2';
element.classList.add('class3');
element.classList.remove('class1');
element.classList.toggle('active');
element.classList.contains('class2'); // true

// 操作样式
element.style.color = 'red';
element.style.fontSize = '16px';
let computedStyle = window.getComputedStyle(element);
```

除了标准属性外，HTML5引入了`data-*`属性，让开发者可以在标准合规的HTML中存储自定义数据。`classList`API使类名操作更加便捷，而样式操作则允许动态改变元素的外观。

## 事件处理

事件使网页能够响应用户操作，创造交互体验。

### 事件绑定与移除

```javascript
// 方法1：DOM属性（只能添加一个）
element.onclick = function(event) {
  console.log('点击了元素');
};

// 方法2：addEventListener（推荐，可添加多个）
function handleClick(event) {
  console.log('处理点击事件');
}

element.addEventListener('click', handleClick);

// 移除事件监听
element.removeEventListener('click', handleClick);

// 方法3：HTML属性（不推荐）
// <button onclick="handleClick()">点击</button>
```

`addEventListener`方法是最推荐的事件处理方式，它支持添加多个监听器，并提供更多选项（如捕获阶段监听、只执行一次等）。

### 事件冒泡与捕获

```javascript
// 冒泡阶段监听（默认）
element.addEventListener('click', function(event) {
  console.log('冒泡阶段');
}, false);

// 捕获阶段监听
element.addEventListener('click', function(event) {
  console.log('捕获阶段');
}, true);

// 阻止冒泡
element.addEventListener('click', function(event) {
  event.stopPropagation();
  console.log('事件不会继续冒泡');
});

// 阻止默认行为
link.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('链接不会被打开');
});
```

DOM事件流包含三个阶段：捕获阶段（从外到内）、目标阶段和冒泡阶段（从内到外）。了解这一机制对于处理复杂的事件交互至关重要。

### 事件委托

```javascript
// 不使用事件委托，为每个li添加事件
let items = document.querySelectorAll('#myList li');
items.forEach(item => {
  item.addEventListener('click', function() {
    console.log('点击了：' + this.textContent);
  });
});

// 使用事件委托，只在父元素上监听
document.getElementById('myList').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('点击了：' + event.target.textContent);
  }
});
```

事件委托（也称为事件代理）是一种重要的性能优化技术，它利用事件冒泡，在父元素上监听事件，而不是为每个子元素添加监听器。这对于处理大量类似元素（如列表项）或动态添加的元素特别有用。

### 常见事件类型

```javascript
// 鼠标事件
element.addEventListener('click', handleClick);
element.addEventListener('dblclick', handleDoubleClick);
element.addEventListener('mouseover', handleMouseOver);
element.addEventListener('mouseout', handleMouseOut);
element.addEventListener('mousemove', handleMouseMove);

// 键盘事件
document.addEventListener('keydown', function(event) {
  console.log('按下按键：' + event.key);
});
document.addEventListener('keyup', handleKeyUp);

// 表单事件
form.addEventListener('submit', handleSubmit);
input.addEventListener('focus', handleFocus);
input.addEventListener('blur', handleBlur);
input.addEventListener('change', handleChange);
input.addEventListener('input', handleInput);

// 窗口事件
window.addEventListener('load', handleLoad);
window.addEventListener('resize', handleResize);
window.addEventListener('scroll', handleScroll);
```

JavaScript支持多种事件类型，覆盖用户交互的各个方面。选择合适的事件类型，可以创建精确的交互响应。

## BOM 操作

BOM（Browser Object Model）提供了与浏览器交互的对象，控制浏览器窗口及其框架。

### window 对象

```javascript
// 窗口大小
let width = window.innerWidth;
let height = window.innerHeight;

// 打开新窗口
let newWindow = window.open('https://example.com', '_blank');

// 关闭窗口
newWindow.close();

// 弹出对话框
window.alert('提示信息');
let result = window.confirm('确认删除吗？');
let name = window.prompt('请输入您的名字：', '默认值');

// 全局对象
window.myGlobalVar = 100;
console.log(myGlobalVar); // 100，window是全局对象
```

`window`对象是BOM的核心，代表浏览器窗口。它不仅提供了控制窗口的方法，还作为全局对象，承载全局变量和函数。

### location 对象

```javascript
// 当前URL信息
console.log(window.location.href);    // 完整URL
console.log(location.protocol);       // 协议，如"http:"
console.log(location.host);           // 主机名+端口
console.log(location.hostname);       // 主机名
console.log(location.port);           // 端口
console.log(location.pathname);       // 路径
console.log(location.search);         // 查询字符串
console.log(location.hash);           // 片段标识符

// 导航
location.href = 'https://example.com'; // 加载新页面
location.reload();                     // 重新加载当前页面
location.assign('https://example.com'); // 加载新页面并添加历史记录
location.replace('https://example.com'); // 替换当前页面（不添加历史记录）
```

`location`对象提供了当前文档的URL信息，以及导航控制功能。它是操作浏览器地址栏的主要接口。

### history 对象

```javascript
// 历史记录导航
history.back();        // 返回上一页
history.forward();     // 前进到下一页
history.go(-2);        // 后退两页
history.go(1);         // 前进一页

// HTML5历史API
history.pushState({page: 1}, "标题1", "/page1"); // 添加历史记录
history.replaceState({page: 2}, "标题2", "/page2"); // 替换当前历史记录

// 监听历史变化
window.addEventListener('popstate', function(event) {
  console.log('当前状态:', event.state);
});
```

`history`对象管理浏览器的历史记录。HTML5引入的History API允许在不重新加载页面的情况下更改URL，这是单页应用（SPA）的基础技术之一。

### navigator 对象

```javascript
// 浏览器信息
console.log(navigator.userAgent);   // 用户代理字符串
console.log(navigator.language);    // 浏览器语言
console.log(navigator.platform);    // 操作系统平台
console.log(navigator.onLine);      // 是否在线

// 地理位置API
navigator.geolocation.getCurrentPosition(function(position) {
  console.log('纬度:', position.coords.latitude);
  console.log('经度:', position.coords.longitude);
});

// 其他现代API
if (navigator.clipboard) {
  navigator.clipboard.writeText('复制的文本');
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}
```

`navigator`对象包含浏览器的信息和身份，以及越来越多的浏览器API入口，如地理位置、剪贴板、服务工作线程等。

### screen 对象

```javascript
// 屏幕信息
console.log(screen.width);      // 屏幕宽度
console.log(screen.height);     // 屏幕高度
console.log(screen.availWidth); // 可用宽度（不包括任务栏）
console.log(screen.availHeight); // 可用高度
console.log(screen.colorDepth); // 颜色深度
console.log(screen.orientation.type); // 屏幕方向
```

`screen`对象提供有关用户屏幕的信息，对于响应式设计和优化用户体验很有帮助。

## 定时器

JavaScript提供了多种方法来管理代码的定时执行，实现动画和延迟操作。

### setTimeout 与 clearTimeout

```javascript
// 延迟执行一次
let timeoutId = setTimeout(function() {
  console.log('3秒后执行一次');
}, 3000);

// 取消定时器
clearTimeout(timeoutId);

// 使用箭头函数和参数
setTimeout((name) => {
  console.log(`你好，${name}！`);
}, 1000, '小明');
```

`setTimeout`用于在指定的毫秒数后执行一次函数。它返回一个ID，可以用`clearTimeout`取消执行。

### setInterval 与 clearInterval

```javascript
// 重复执行
let count = 0;
let intervalId = setInterval(function() {
  console.log(`这是第${++count}次执行`);
  if (count >= 5) {
    clearInterval(intervalId); // 5次后停止
  }
}, 1000);

// 取消重复执行
clearInterval(intervalId);
```

`setInterval`用于按照固定的时间间隔重复执行函数，直到被`clearInterval`取消或窗口关闭。

### requestAnimationFrame

```javascript
// 基本用法
function animate() {
  // 更新动画
  element.style.left = (parseInt(element.style.left) || 0) + 1 + 'px';
  
  // 如果还需要继续动画，再次请求
  if (parseInt(element.style.left) < 300) {
    requestAnimationFrame(animate);
  }
}

// 开始动画
let animationId = requestAnimationFrame(animate);

// 取消动画
cancelAnimationFrame(animationId);
```

`requestAnimationFrame`是专为动画设计的定时方法，它会在浏览器下一次重绘之前调用指定函数。与`setTimeout`相比，它有以下优势：
- 浏览器会优化，使动画更平滑
- 在不可见的标签页中会暂停，节省CPU
- 会自动适应显示器的刷新率

## 总结与拓展

DOM和BOM是JavaScript与网页交互的核心接口，掌握它们对于前端开发至关重要。从基本的元素查找和操作，到复杂的事件处理和浏览器控制，这些API为我们提供了构建动态交互网页的所有工具。

虽然原生DOM操作强大而灵活，但在实际项目中，我们通常会使用jQuery、React、Vue等库和框架来简化DOM操作，提高开发效率。不过，理解底层的DOM和BOM仍然是成为优秀前端开发者的基础。

### 拓展阅读建议：
- [虚拟DOM及其性能优势](https://reactjs.org/docs/faq-internals.html)
- [Shadow DOM和Web组件](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
- [响应式设计与DOM操作](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Responsive/responsive_design_building_blocks)
- [浏览器渲染原理与性能优化](https://developers.google.com/web/fundamentals/performance/rendering)
- [MDN: DOM操作介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: 浏览器API](https://developer.mozilla.org/zh-CN/docs/Web/API)
- [JavaScript事件循环与异步DOM更新](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

> 记住，无论多么复杂的前端应用，其核心仍然是基于DOM的操作和交互。掌握这些基础知识，你就握有了前端开发的"万能钥匙"！