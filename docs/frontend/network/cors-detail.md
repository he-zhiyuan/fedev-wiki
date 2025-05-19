# CORS 跨域资源共享：前端开发者必知的浏览器安全机制

## 引言

想象一下，你正在开发一个前端应用，需要从另一个域名的服务器获取数据。你信心满满地写下了fetch请求代码，但浏览器控制台却出现了一个让人困惑的错误：

```
Access to fetch at 'https://api.example.com' from origin 'https://myapp.com' has been blocked by CORS policy
```

别担心！这不是你的代码出了问题，而是浏览器的安全机制在保护用户。这个机制就是我们今天要讲的主角：CORS（跨域资源共享）。

CORS就像是网络世界的海关检查站，它确保不同"国家"（域名）之间的资源交流是安全且经过授权的。掌握CORS不仅能帮你解决开发中的跨域问题，还能让你更深入地理解Web安全的核心原则。

## CORS 基本概念：为什么会有跨域限制？

### 同源策略：浏览器的安全基石

在Web世界中，"同源策略"是一项重要的安全机制，它限制了来自不同源的文档或脚本如何与当前页面交互。

两个URL被认为是"同源"需要满足三个条件：
- 相同的协议（如都是https）
- 相同的域名（如都是example.com）
- 相同的端口（如都是443）

```javascript
// 以下URL与 https://example.com/page.html 的同源比较
https://example.com/other.html        // ✓ 同源
http://example.com/page.html          // ✗ 协议不同
https://api.example.com/data.json     // ✗ 子域名不同
https://example.com:8080/page.html    // ✗ 端口不同
```

没有同源策略，恶意网站可能会读取你在其他网站的个人信息、银行数据，甚至可以执行操作冒充你的身份！

### 为什么需要跨域？

现代Web应用往往是分布式的：
- 前端应用部署在CDN或静态服务器上
- API服务部署在专用的应用服务器上
- 静态资源（图片、字体等）可能存储在专门的对象存储服务

```
用户 --> 前端网站 (www.myapp.com)
                 |
                 ↓
            API服务器 (api.myapp.com)
                 |
                 ↓
            数据库服务器
```

这种架构下，前端和后端通常位于不同域名，必然需要跨域请求。

## CORS 工作机制：浏览器与服务器的协商过程

### CORS请求类型：简单请求vs预检请求

CORS将跨域请求分为两类：

#### 简单请求

满足以下条件的请求被视为"简单请求"：
1. 请求方法是GET、POST或HEAD
2. 仅设置了安全的头部字段（如Accept、Content-Type等）
3. Content-Type仅限于：
   - text/plain
   - multipart/form-data
   - application/x-www-form-urlencoded

```javascript
// 简单请求示例
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});
```

简单请求的处理流程：
1. 浏览器直接发送请求，并在请求头中添加`Origin`字段
2. 服务器检查`Origin`并决定是否允许该来源
3. 服务器返回响应，包含CORS相关的头部
4. 浏览器检查这些头部，判断是否允许前端代码访问响应

#### 预检请求

不满足简单请求条件的请求会触发"预检"机制：

```javascript
// 需要预检的请求示例
fetch('https://api.example.com/data', {
  method: 'PUT', // 非简单方法
  headers: {
    'Content-Type': 'application/json', // 需预检的Content-Type
    'X-Custom-Header': 'value' // 自定义头部
  },
  body: JSON.stringify({name: '小明'})
});
```

预检请求的处理流程：
1. 浏览器先发送一个OPTIONS请求（预检请求）
2. 预检请求询问服务器是否允许实际请求
3. 服务器返回预检响应，说明允许的方法、头部等
4. 如果预检通过，浏览器才发送实际请求
5. 服务器处理实际请求并返回响应

以下是一个预检请求的示例：

```http
OPTIONS /data HTTP/1.1
Host: api.example.com
Origin: https://myapp.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, X-Custom-Header
```

预检请求就像先派代表去询问："我能用PUT方法访问你的资源吗？我能带上这些自定义头部吗？"

## CORS 响应头详解：如何配置服务器

服务器通过一系列响应头来告诉浏览器它的跨域策略：

### Access-Control-Allow-Origin：允许哪些来源

这个头部指定哪些域名可以访问资源：

```http
// 允许特定域名
Access-Control-Allow-Origin: https://myapp.com

// 允许所有域名（不推荐用于需要身份验证的API）
Access-Control-Allow-Origin: *
```

注意事项：
- 这个头部只能设置一个具体的域名或`*`通配符
- 如果需要支持多个域名，服务器需要动态设置这个值

```javascript
// Node.js动态设置Origin的示例
app.use((req, res, next) => {
  const allowedOrigins = ['https://myapp.com', 'https://admin.myapp.com'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  next();
});
```

### Access-Control-Allow-Methods：允许的HTTP方法

指定允许的HTTP请求方法：

```http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

安全建议：只开放API实际使用的方法。

### Access-Control-Allow-Headers：允许的请求头

指定允许的请求头字段：

```http
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

任何自定义头部都需要在这里列出。

### Access-Control-Expose-Headers：允许前端读取的响应头

默认情况下，前端只能访问少数几个"简单响应头"（如Content-Type）。如果需要让前端读取其他响应头，需要显式列出：

```http
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

```javascript
// 前端读取自定义响应头
fetch('https://api.example.com/data')
  .then(response => {
    // 只有在服务器允许的情况下，才能读取自定义头部
    const customValue = response.headers.get('X-My-Custom-Header');
    console.log(customValue);
  });
```

### Access-Control-Max-Age：预检请求的缓存时间

```http
Access-Control-Max-Age: 86400
```

这个头部告诉浏览器预检请求的结果可以缓存多少秒，避免每次请求都发送预检。

### Access-Control-Allow-Credentials：是否允许携带凭证

```http
Access-Control-Allow-Credentials: true
```

这个头部指定跨域请求是否可以包含用户凭证（如Cookie、HTTP认证、客户端SSL证书）。

## 带凭证的跨域请求：处理Cookie和会话

默认情况下，跨域请求不会发送Cookie等凭证信息。如果需要发送，必须同时满足：

1. 前端设置`withCredentials: true`
2. 服务器返回`Access-Control-Allow-Credentials: true`
3. 服务器的`Access-Control-Allow-Origin`不能是`*`，必须是具体的来源

```javascript
// 前端发送带凭证的请求
fetch('https://api.example.com/user-profile', {
  credentials: 'include' // 包含凭证
})
.then(response => response.json())
.then(data => console.log(data));

// 使用axios
axios.get('https://api.example.com/user-profile', {
  withCredentials: true
});
```

重要安全提示：
- 开启凭证共享增加了CSRF攻击风险
- 永远不要对不信任的域名启用`Access-Control-Allow-Credentials: true`

## 常见服务器CORS配置：实战指南

### Node.js (Express) 配置

```javascript
// 简单配置：使用cors中间件
const express = require('express');
const cors = require('cors');
const app = express();

// 允许所有域名访问
app.use(cors());

// 或者自定义配置
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 针对特定路由配置
app.get('/api/public-data', cors(), (req, res) => {
  res.json({ message: '这是公开数据' });
});
```

### Nginx配置

```nginx
server {
    listen 80;
    server_name api.myapp.com;

    location / {
        # 允许的源，可以是具体域名
        add_header 'Access-Control-Allow-Origin' 'https://myapp.com';
        
        # 允许的请求方法
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        
        # 允许的头部
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        
        # 允许凭证
        add_header 'Access-Control-Allow-Credentials' 'true';
        
        # 预检请求缓存时间
        add_header 'Access-Control-Max-Age' 86400;
        
        # 处理OPTIONS预检请求
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://myapp.com';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        
        # 代理到实际的应用服务器
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## CORS错误诊断与排查：常见问题解决

### 常见CORS错误及解决方案

1. **"已被CORS策略阻止"错误**

错误信息：
```
Access to fetch at 'https://api.example.com/data' from origin 'https://myapp.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

解决方法：
- 确保服务器返回了正确的`Access-Control-Allow-Origin`头部
- 检查域名拼写（包括协议、子域名、端口）是否完全匹配

2. **预检请求失败**

错误信息：
```
Access to fetch at 'https://api.example.com/data' from origin 'https://myapp.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
```

解决方法：
- 当使用`credentials: 'include'`时，服务器不能设置`Access-Control-Allow-Origin: *`
- 服务器必须指定确切的域名并返回`Access-Control-Allow-Credentials: true`

3. **请求头不被允许**

错误信息：
```
Access to fetch at 'https://api.example.com/data' from origin 'https://myapp.com' has been blocked by CORS policy: Request header field X-Custom-Header is not allowed by Access-Control-Allow-Headers in preflight response.
```

解决方法：
- 在服务器的`Access-Control-Allow-Headers`中添加相应的头部

### 使用开发者工具调试

Chrome/Edge开发者工具：
1. 打开Network标签页
2. 查找失败的请求
3. 查看Request Headers中的Origin
4. 查看Response Headers中的CORS相关头部
5. 如有预检请求，查找OPTIONS请求

![Chrome开发者工具中的CORS错误](https://developer.chrome.com/docs/devtools/network/imgs/cors-error-status.png)

## CORS安全最佳实践：保护你的API

### 1. 明确指定允许的域名

```javascript
// 不推荐（除非是完全公开的API）
res.header('Access-Control-Allow-Origin', '*');

// 推荐
const allowedOrigins = ['https://myapp.com', 'https://admin.myapp.com'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.header('Access-Control-Allow-Origin', origin);
}
```

### 2. 限制HTTP方法

只允许API真正需要的HTTP方法：

```javascript
res.header('Access-Control-Allow-Methods', 'GET, POST');
```

### 3. 谨慎处理凭证请求

只对真正需要的可信域名开放：

```javascript
// 检查是否是受信任的来源
if (req.headers.origin === 'https://trusted-app.com') {
  res.header('Access-Control-Allow-Credentials', 'true');
}
```

### 4. 设置合理的预检缓存时间

```javascript
// 开发环境可以设短一点，频繁更改配置不会有缓存问题
res.header('Access-Control-Max-Age', '5'); // 5秒

// 生产环境可以设长一点，减少预检请求次数
res.header('Access-Control-Max-Age', '86400'); // 1天
```

## 前端框架中的CORS处理：实用技巧

### React项目中的CORS处理

#### 开发环境：使用代理

在`package.json`中添加：

```json
{
  "proxy": "https://api.example.com"
}
```

然后请求本地URL，Create React App会自动代理到目标服务器：

```javascript
// 原本请求：https://api.example.com/users
// 现在请求本地，会被代理到API服务器
fetch('/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### 使用axios设置defaults

```javascript
import axios from 'axios';

// 创建一个自定义实例
const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true, // 如果需要携带凭证
  headers: {
    'Content-Type': 'application/json'
  }
});

// 使用实例
api.get('/users')
  .then(response => console.log(response.data));
```

### Vue项目中的CORS处理

在`vue.config.js`中配置开发服务器代理：

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

然后在代码中请求本地路径：

```javascript
// 会被代理到 https://api.example.com/users
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 特殊场景CORS解决方案

### 跨域文件上传

文件上传时需要特别注意CORS配置：

```javascript
// 前端代码
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData,
  // 不要设置Content-Type，让浏览器自动处理
  // 需要设置credentials如果要携带cookie
  credentials: 'include'
})
.then(response => response.json())
.then(data => console.log('上传成功:', data))
.catch(error => console.error('上传失败:', error));
```

服务器需要配置：
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods: POST`
- 如果有自定义头部，需要允许
- 如果需要携带凭证，设置`Access-Control-Allow-Credentials: true`

### 处理第三方API

当调用不受你控制的第三方API时，可以考虑：

1. **代理服务器**：在你的服务器上创建一个代理接口

```javascript
// 客户端代码
fetch('/api/proxy/third-party-data')
  .then(response => response.json());

// 服务器代码
app.get('/api/proxy/third-party-data', async (req, res) => {
  try {
    // 服务器向第三方API发请求
    const response = await fetch('https://third-party-api.com/data');
    const data = await response.json();
    // 返回给客户端
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '无法获取第三方数据' });
  }
});
```

2. **JSONP**：仅适用于GET请求的旧方法

```javascript
function jsonpCallback(data) {
  console.log('收到数据:', data);
}

// 创建script标签
const script = document.createElement('script');
script.src = 'https://third-party-api.com/data?callback=jsonpCallback';
document.body.appendChild(script);
```

## 总结

CORS是现代Web开发中不可避免的话题，掌握它是每个前端开发者的必备技能：

- CORS是浏览器的安全机制，用于控制跨域资源访问
- 简单请求直接发送，复杂请求需要先发送预检请求
- 服务器通过特定的HTTP头部告诉浏览器其CORS策略
- 处理凭证请求需要额外的安全考虑
- 开发过程中可以使用代理服务器简化CORS问题

记住，CORS问题总是可以解决的，关键是理解背后的原理和正确配置服务器。这不仅能解决眼前的跨域问题，还能帮助你构建更安全的Web应用！

## 拓展阅读

- [MDN CORS文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [CORS规范详解](https://www.w3.org/TR/cors/)
- [Express CORS中间件](https://github.com/expressjs/cors)
- [使用代理解决CORS问题](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

希望这篇文章对你有所帮助！记得在实际项目中多练习，很快你就能熟练处理各种跨域场景了。 