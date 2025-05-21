# 重排与重绘：前端性能优化的必修课

## 引言

你是否曾经好奇过，为什么有些网页滚动起来如丝般顺滑，而有些却卡顿得令人抓狂？为什么有些动画效果能流畅运行，而有些却像幻灯片放映？答案往往藏在浏览器的重排（Reflow）与重绘（Repaint）机制中。作为前端开发者，理解这两个概念对于打造高性能网页体验至关重要。今天，让我们一起揭开这层神秘面纱！

## 基本概念：重排与重绘是什么？

### 什么是重排（Reflow）

重排，也称为回流，是浏览器计算页面元素位置和尺寸的过程。简单来说，当你改变了元素的尺寸、位置或者改变了页面布局，浏览器就需要重新计算元素的几何属性，这个过程就叫做重排。

想象一下，如果你去搬家，需要重新测量所有家具的尺寸，决定它们在新房间里的摆放位置，这个测量和规划的过程就像浏览器的重排。

### 什么是重绘（Repaint）

重绘是浏览器重新绘制元素外观的过程。当元素的外观（如颜色、背景、边框等）发生变化，但不影响布局时，浏览器会进行重绘。

继续搬家的比喻，如果你只是给家里的墙壁刷了新漆，或者换了窗帘的颜色，而没有移动任何家具的位置，这就像浏览器的重绘过程。

### 两者的区别

重排一定会引起重绘，而重绘不一定会引起重排。换句话说，重排的"代价"比重绘高得多：

- **重排**：改变布局、需要重新计算元素位置和尺寸
- **重绘**：仅改变外观、不影响布局

```javascript
// 引起重排的代码
element.style.width = '100px'; // 改变尺寸，触发重排
element.style.position = 'absolute'; // 改变定位方式，触发重排
document.body.appendChild(newElement); // 添加元素，触发重排

// 引起重绘的代码
element.style.color = 'red'; // 只改变颜色，仅触发重绘
element.style.backgroundColor = 'blue'; // 只改变背景色，仅触发重绘
element.style.border = '1px solid black'; // 添加边框，可能只触发重绘
```

## 触发条件：什么时候会发生重排和重绘？

### 导致重排的常见操作

1. **添加/删除可见DOM元素**：
   ```javascript
   parentNode.appendChild(newElement);
   parentNode.removeChild(existingElement);
   ```

2. **改变元素位置**：
   ```javascript
   element.style.top = '100px';
   element.style.left = '50px';
   ```

3. **改变元素尺寸**：
   ```javascript
   element.style.width = '200px';
   element.style.padding = '20px';
   ```

4. **改变元素内容**：
   ```javascript
   element.textContent = '新的内容';
   element.innerHTML = '<span>新内容</span>';
   ```

5. **改变窗口大小**（用户调整浏览器窗口）

6. **计算样式信息**：
   ```javascript
   const width = element.offsetWidth; // 读取几何属性
   const computedStyle = getComputedStyle(element); // 获取计算样式
   ```

### 导致重绘的常见操作

1. **改变元素的颜色样式**：
   ```javascript
   element.style.color = 'blue';
   element.style.backgroundColor = 'lightgray';
   ```

2. **改变元素的可见性（不影响布局）**：
   ```javascript
   element.style.visibility = 'hidden'; // 不会触发重排，元素仍占据空间
   ```

3. **改变背景图片**：
   ```javascript
   element.style.backgroundImage = 'url("new-image.jpg")';
   ```

4. **改变文字样式（不改变尺寸）**：
   ```javascript
   element.style.fontWeight = 'bold';
   element.style.fontStyle = 'italic';
   ```

### 影响范围

重排的影响范围可能很广：

- **局部重排**：只影响部分元素（如修改了某个div的内部结构）
- **全局重排**：影响整个文档（如修改了body的宽度）

```javascript
// 局部重排示例
const div = document.getElementById('local-container');
div.style.width = '300px'; // 可能只影响这个div及其子元素

// 全局重排示例
document.body.style.width = '80%'; // 可能导致整个页面重新布局
```

## 性能影响：为什么要关注重排与重绘？

### 重排与重绘的性能消耗

浏览器渲染页面的主要步骤是：

1. 解析HTML构建DOM树
2. 解析CSS构建CSSOM树
3. 将DOM树和CSSOM树结合形成渲染树
4. 布局（重排）：计算元素的位置和尺寸
5. 绘制（重绘）：将元素绘制到屏幕上

在这个过程中，重排和重绘是最耗费性能的环节：

- **重排**：需要重新计算布局，非常耗费CPU资源
- **重绘**：需要重新绘制像素，消耗GPU资源

### 频繁操作的危害

频繁触发重排和重绘会导致页面渲染性能下降，用户体验变差：

```javascript
// 错误示范：连续多次修改导致多次重排
const element = document.getElementById('example');
element.style.width = '100px';      // 触发一次重排
element.style.height = '100px';     // 又触发一次重排
element.style.marginTop = '20px';   // 又触发一次重排
element.style.marginLeft = '20px';  // 又触发一次重排
```

### 浏览器优化策略

现代浏览器很聪明，会对重排和重绘进行优化：

1. **渲染队列**：浏览器会将修改操作放入队列，在一定时间或数量后批量执行
2. **隐藏元素的变化**：对于`display: none`的元素，其变化不会立即触发重排和重绘

但是，某些操作会强制浏览器立即执行队列中的操作：

```javascript
// 这些属性读取会强制浏览器执行渲染队列
element.offsetWidth;
element.offsetHeight;
element.getBoundingClientRect();
getComputedStyle(element);
```

## 优化方法：如何减少重排与重绘？

### 合理批量 DOM 操作

将多次DOM操作合并为一次：

```javascript
// 优化前：多次修改导致多次重排
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '20px';

// 优化后：使用CSS类一次性修改
// 在CSS文件中定义：
// .new-style { width: 100px; height: 100px; margin: 20px; }
element.classList.add('new-style');

// 或者使用style属性一次性修改
element.style.cssText = 'width: 100px; height: 100px; margin: 20px;';
```

### 使用文档片段

对于需要添加多个元素的情况，使用文档片段可以减少重排次数：

```javascript
// 优化前：每次添加都会触发重排
for (let i = 0; i < 1000; i++) {
  const child = document.createElement('div');
  child.textContent = `Item ${i}`;
  container.appendChild(child); // 每次都触发重排
}

// 优化后：使用文档片段
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const child = document.createElement('div');
  child.textContent = `Item ${i}`;
  fragment.appendChild(child); // 不会触发重排
}
container.appendChild(fragment); // 只触发一次重排
```

### CSS 合成层优化

使用特定的CSS属性可以创建新的合成层，避免影响其他元素：

```css
/* 创建新的合成层，使动画不影响其他元素布局 */
.animated-element {
  transform: translateZ(0); /* 或 will-change: transform */
  animation: slide 1s infinite;
}
```

### 避免触发同步布局

避免在修改DOM后立即读取布局信息：

```javascript
// 错误示范：强制同步布局
element.style.width = '500px'; // 写操作
console.log(element.offsetWidth); // 读操作，强制浏览器执行重排
element.style.height = '200px'; // 又一次写操作
console.log(element.offsetHeight); // 又一次读操作，再次强制重排

// 优化方式：先读后写
// 先进行所有的读操作
const width = element.offsetWidth;
const height = element.offsetHeight;

// 再进行所有的写操作
element.style.width = '500px';
element.style.height = '200px';
```

## 常见误区：避开这些性能陷阱

### 误用 offset/scroll 系列属性

频繁读取这些会触发强制同步布局的属性是常见的性能陷阱：

```javascript
// 错误示范：在循环中反复读取几何属性
for (let i = 0; i < 1000; i++) {
  const height = element.offsetHeight; // 每次都强制重排
  element.style.marginTop = height + 'px';
}

// 优化方式：缓存几何属性值
const height = element.offsetHeight; // 只触发一次重排
for (let i = 0; i < 1000; i++) {
  element.style.marginTop = height + 'px';
}
```

### 动画与过渡的优化

使用合适的属性实现动画可以大大提升性能：

```css
/* 不推荐：触发重排的动画 */
@keyframes bad-animation {
  from { width: 100px; height: 100px; }
  to { width: 200px; height: 200px; }
}

/* 推荐：只触发合成层的动画 */
@keyframes good-animation {
  from { transform: scale(1); }
  to { transform: scale(2); }
}
```

在JavaScript中实现动画时，优先使用`requestAnimationFrame`：

```javascript
// 优化动画性能
function animate() {
  // 修改元素样式
  element.style.transform = `translateX(${position}px)`;
  position += 5;
  
  if (position < 1000) {
    requestAnimationFrame(animate); // 在下一帧继续
  }
}

requestAnimationFrame(animate); // 开始动画
```

### 事件处理中的陷阱

在滚动、调整窗口大小等高频事件中的处理需要特别小心：

```javascript
// 错误示范：未节流的滚动事件处理
window.addEventListener('scroll', function() {
  // 复杂的DOM操作，每次滚动都会执行
  updateElementPositions();
});

// 优化方式：使用节流函数
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

window.addEventListener('scroll', throttle(function() {
  updateElementPositions();
}, 100)); // 最多每100ms执行一次
```

## 实战案例：对比优化前后的性能差异

### 案例1：渲染长列表

```javascript
// 优化前：直接在循环中添加元素
console.time('未优化');
for (let i = 0; i < 5000; i++) {
  const item = document.createElement('div');
  item.className = 'list-item';
  item.textContent = `Item ${i}`;
  container.appendChild(item); // 每次都触发重排
}
console.timeEnd('未优化');
// 未优化: 约150-300ms（视浏览器和设备而定）

// 优化后：使用文档片段
console.time('优化后');
const fragment = document.createDocumentFragment();
for (let i = 0; i < 5000; i++) {
  const item = document.createElement('div');
  item.className = 'list-item';
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}
container.appendChild(fragment); // 只触发一次重排
console.timeEnd('优化后');
// 优化后: 约30-80ms（视浏览器和设备而定）
```

### 案例2：实现平滑动画

```javascript
// 优化前：改变位置属性实现动画
function animateBad() {
  let position = 0;
  const interval = setInterval(() => {
    position += 5;
    element.style.left = position + 'px'; // 触发重排
    element.style.top = position + 'px'; // 触发重排
    
    if (position >= 500) {
      clearInterval(interval);
    }
  }, 16);
}

// 优化后：使用transform和requestAnimationFrame
function animateGood() {
  let position = 0;
  
  function step() {
    position += 5;
    element.style.transform = `translate(${position}px, ${position}px)`; // 不触发重排
    
    if (position < 500) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}
```

## 测量与调试工具：如何发现性能问题？

### Chrome DevTools Performance 面板

Chrome 开发者工具中的 Performance 面板是分析重排和重绘最强大的工具：

1. 打开 Chrome DevTools (F12 或 Ctrl+Shift+I)
2. 切换到 Performance 选项卡
3. 点击录制按钮，执行你想分析的操作
4. 点击停止，查看记录结果
5. 在 "Main" 部分查找标记为 "Layout" (重排) 和 "Paint" (重绘) 的事件

### 使用 CSS Triggers 查询属性的影响

[CSS Triggers](https://csstriggers.com/) 网站列出了各种CSS属性对布局、绘制和合成的影响，是选择性能友好属性的好工具。

## 总结：构建流畅用户体验的最佳实践

重排与重绘是浏览器渲染过程中无法完全避免但可以优化的环节。通过理解它们的触发条件和影响，你可以大幅提升网页的渲染性能。

关键最佳实践：

1. **减少重排和重绘的次数**：合并多次DOM操作、使用文档片段
2. **避免强制同步布局**：先读取所有布局信息，再修改DOM
3. **使用性能友好的CSS属性**：优先使用transform和opacity而非width、height等
4. **将动画元素提升到单独的图层**：使用will-change或transform: translateZ(0)
5. **对高频事件进行节流**：特别是滚动和调整窗口大小的事件处理

牢记这些原则，你的网页将如丝般顺滑，用户体验会得到显著提升！

## 拓展阅读

1. [MDN: 渲染性能](https://developer.mozilla.org/zh-CN/docs/Web/Performance/rendering)
2. [Google Developers: 渲染性能](https://developers.google.com/web/fundamentals/performance/rendering)
3. [CSS Triggers](https://csstriggers.com/) - 查询哪些CSS属性会触发重排或重绘
4. [浏览器渲染原理与优化实践](https://juejin.im/post/5e143104e51d45414a4715f7)
5. [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) - Paul Irish 整理的会强制触发重排的操作列表