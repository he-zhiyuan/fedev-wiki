# 前端缓存策略：让你的网站飞起来

## 引言

你是否曾经困惑：为什么有些网站第二次访问会快很多？为什么有时候刷新页面后看到的还是旧内容？这一切的魔法，都与"缓存"有关。本文将带你深入浅出地了解前端缓存这个既简单又复杂的话题，帮助你掌握让网站性能翻倍的秘密武器！

## 什么是前端缓存？

缓存就像是浏览器的"记忆力"，它可以把网站的资源（如图片、CSS、JavaScript文件等）暂存在本地，当你再次访问同一网站时，浏览器不必再向服务器请求这些资源，直接从本地加载，大大加快了页面加载速度。

想象一下，缓存就像是你家附近开的一家便利店，而不用每次都跑到远处的大超市购物。

## 浏览器缓存机制

### 强缓存：不问服务器的缓存

强缓存是最高效的缓存方式，当命中强缓存时，浏览器直接从本地加载资源，不会向服务器发送任何请求。

```javascript
// 服务器通过设置以下响应头控制强缓存
// 设置过期时间点，但受限于客户端时间可能不准确
Expires: Wed, 21 Oct 2023 07:28:00 GMT

// 现代浏览器更常用的方式，设置过期时长
Cache-Control: max-age=3600 // 缓存1小时
```

**强缓存就像是**：老师说"这本书你拿回去，一周之内不用还"，一周内你都可以直接在家翻阅，不用跑图书馆。

### 协商缓存：先问问服务器资源变了没

当强缓存失效后，浏览器会向服务器发送请求，询问资源是否有更新。如果没有更新，服务器返回304状态码，浏览器继续使用本地缓存；如果有更新，则返回200状态码和新的资源内容。

```javascript
// 基于最后修改时间的协商缓存
// 请求头
If-Modified-Since: Sat, 29 Oct 2022 19:43:31 GMT
// 响应头
Last-Modified: Sat, 29 Oct 2022 19:43:31 GMT

// 基于内容特征值的协商缓存（更精确）
// 请求头
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
// 响应头
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

**协商缓存就像是**：你问老师"我手里的这本书是最新版吗？"，老师看了看说"是的，继续用吧"或"不是，给你新版"。

### Cache-Control 详解

Cache-Control 是现代浏览器控制缓存的主要方式，它提供了更多的缓存策略：

- `max-age=3600`：缓存内容将在3600秒后过期
- `no-cache`：每次使用缓存前必须先与服务器确认
- `no-store`：不使用任何缓存
- `private`：只能被浏览器缓存，不能被中间代理缓存
- `public`：可以被所有中间代理缓存

### ETag 与 Last-Modified 对比

- `Last-Modified`：基于文件修改时间，精度是秒，可能因为时间同步问题导致误判
- `ETag`：基于文件内容生成的唯一标识，更准确但计算成本更高

## 应用级缓存

### LocalStorage：持久存储小型数据

```javascript
// 存储数据
localStorage.setItem('username', 'zhangsan');
// 读取数据
const username = localStorage.getItem('username');
// 删除数据
localStorage.removeItem('username');
```

**特点**：
- 容量通常为5MB左右
- 数据永久保存，除非手动清除
- 只能存储字符串，存储对象需要JSON转换
- 同步操作，可能阻塞主线程

### SessionStorage：会话级存储

与LocalStorage类似，但数据只在当前会话期间有效，关闭页面后自动清除。

### IndexedDB：存储大量结构化数据

```javascript
// 简化的IndexedDB使用示例
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id' });
};

request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  objectStore.add({ id: 1, name: '张三', age: 28 });
};
```

**适用场景**：存储大量结构化数据，如离线应用数据、用户生成的内容等。

## Service Worker 缓存

Service Worker 是运行在浏览器背后的独立线程，可以实现离线缓存、推送通知等功能。

```javascript
// 注册Service Worker
navigator.serviceWorker.register('/sw.js').then(function(registration) {
  console.log('ServiceWorker注册成功:', registration.scope);
});

// sw.js文件中的缓存示例
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // 命中缓存，直接返回
      if (response) {
        return response;
      }
      // 未命中，从网络获取
      return fetch(event.request);
    })
  );
});
```

Service Worker 使渐进式Web应用（PWA）成为可能，让网站在离线状态下依然可用。

## CDN 缓存优化

CDN（内容分发网络）通过将资源分发到全球各地的服务器，使用户可以从最近的节点获取资源，大大减少了网络延迟。

**CDN缓存策略**：
1. 设置合理的Cache-Control头
2. 使用文件指纹（如`main.a2b3c4.js`）实现长效缓存
3. 适当配置CDN边缘节点的缓存过期时间

**资源指纹**是通过在文件名中加入内容哈希值，确保文件内容变化时文件名也会变化，从而实现"永久缓存"。

## 最佳实践

### 1. 合理设置缓存策略

- HTML文件：使用`no-cache`或短期缓存，确保内容及时更新
- JS/CSS文件：使用文件指纹+长效缓存（如1年）
- 图片和不常变化的资源：长效缓存

```javascript
// HTML文件
Cache-Control: no-cache

// 带有指纹的JS/CSS文件
Cache-Control: max-age=31536000

// 图片等静态资源
Cache-Control: max-age=604800
```

### 2. 避免缓存问题

**常见问题**：
- 缓存过期时间太长导致用户看不到更新内容
- 缓存策略错误导致隐私信息被保存
- 服务器和CDN缓存配置不一致

**解决方案**：
- 使用版本化URL（如添加查询参数`v=1.2.3`或文件指纹）
- 敏感内容设置为`no-store`
- 统一缓存配置并定期审查

### 3. 缓存预热技术

在预期用户访问前，提前将资源缓存到CDN或浏览器中：

```javascript
// 预加载关键资源
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="important.js" as="script">

// 预连接到重要域名
<link rel="preconnect" href="https://api.example.com">
```

## 小结

缓存是前端性能优化的重要手段，掌握缓存机制可以大幅提升用户体验。记住以下核心原则：

1. 经常变化的内容使用短期缓存或协商缓存
2. 静态资源使用长效缓存+文件指纹
3. 合理利用浏览器存储API和Service Worker实现更复杂的缓存需求

希望通过本文，你能对前端缓存有更清晰的认识，并将这些技术应用到你的项目中，让你的网站像飞一样快！

## 拓展阅读

- MDN Web Docs: [HTTP缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)
- Google Developers: [Service Worker API](https://developers.google.com/web/fundamentals/primers/service-workers)
- [使用IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)