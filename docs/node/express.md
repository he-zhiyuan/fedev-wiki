# Express框架：10分钟搭建你的Node.js Web应用

## 引言

还记得我们上一篇文章中使用原生Node.js HTTP模块创建Web服务器的过程吗？虽然Node.js的HTTP模块功能强大，但直接使用它构建复杂应用会面临很多挑战：路由管理繁琐、中间件实现复杂、错误处理分散...这就像是用汇编语言编写应用程序，虽然理论上可行，但效率低下。而Express框架的出现，就像是给了我们一门高级语言，大大简化了Web应用的开发流程。

Express是目前最流行的Node.js Web应用框架，它提供了一套简洁而灵活的API，帮助开发者快速构建各种Web应用和API服务。无论你是想创建一个博客、电商网站，还是开发RESTful API，Express都能胜任。今天，让我们一起探索这个强大的框架，看看它如何让Web开发变得如此简单！

## Express基础：快速入门

### 安装Express

首先，我们需要创建一个新的Node.js项目并安装Express：

```bash
# 创建项目目录
mkdir my-express-app
cd my-express-app

# 初始化package.json
npm init -y

# 安装Express
npm install express
```

### 创建第一个Express应用

让我们创建一个最简单的Express应用，保存为`app.js`：

```javascript
// 引入Express模块
const express = require('express');

// 创建Express应用实例
const app = express();

// 定义一个路由处理GET请求
app.get('/', (req, res) => {
  res.send('你好，这是我的第一个Express应用！');
});

// 监听3000端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器已启动，访问 http://localhost:${PORT}`);
});
```

运行这个应用：

```bash
node app.js
```

现在，打开浏览器访问`http://localhost:3000`，你应该能看到"你好，这是我的第一个Express应用！"的消息。

### Express与原生HTTP模块对比

让我们比较一下使用Express和原生HTTP模块的代码差异：

**原生HTTP模块：**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('你好，这是一个原生HTTP服务器！');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('页面不存在');
  }
});

server.listen(3000, () => {
  console.log('服务器已启动，访问 http://localhost:3000');
});
```

**Express框架：**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('你好，这是一个Express服务器！');
});

app.use((req, res) => {
  res.status(404).send('页面不存在');
});

app.listen(3000, () => {
  console.log('服务器已启动，访问 http://localhost:3000');
});
```

可以看到，即使是这个简单的例子，Express代码也更加简洁明了。随着应用复杂度增加，Express的优势会更加明显。

## 路由系统：构建应用骨架

路由是Web应用的核心部分，它定义了应用如何响应客户端对特定端点的请求。

### 基本路由

Express提供了简洁的路由语法：

```javascript
// GET请求路由
app.get('/hello', (req, res) => {
  res.send('你好，欢迎访问！');
});

// POST请求路由
app.post('/users', (req, res) => {
  res.send('创建新用户');
});

// PUT请求路由
app.put('/users/:id', (req, res) => {
  res.send(`更新用户${req.params.id}`);
});

// DELETE请求路由
app.delete('/users/:id', (req, res) => {
  res.send(`删除用户${req.params.id}`);
});
```

### 路由参数

路由参数是URL中的动态部分，通过`:参数名`来定义：

```javascript
app.get('/users/:userId/posts/:postId', (req, res) => {
  // 获取路由参数
  const userId = req.params.userId;
  const postId = req.params.postId;
  
  res.send(`获取用户${userId}的文章${postId}`);
});
```

### 查询字符串

查询字符串是URL中?后面的参数，如`/search?q=express&limit=10`：

```javascript
app.get('/search', (req, res) => {
  // 获取查询参数
  const query = req.query.q;
  const limit = req.query.limit || 10;
  
  res.send(`搜索关键词: ${query}, 限制结果数: ${limit}`);
});
```

### 路由模块化

随着应用规模扩大，可以将路由分组到独立的文件中：

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// 定义用户相关路由
router.get('/', (req, res) => {
  res.send('获取所有用户');
});

router.get('/:id', (req, res) => {
  res.send(`获取用户${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('创建新用户');
});

module.exports = router;
```

然后在主文件中引入：

```javascript
// app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

// 使用用户路由模块，并添加前缀
app.use('/api/users', usersRouter);

app.listen(3000);
```

现在，`/api/users`会映射到usersRouter处理的路由，如`/api/users/123`会由`router.get('/:id')`处理。

## 中间件：Express的核心机制

中间件是Express的灵魂，它们是按顺序执行的函数，可以访问请求对象、响应对象和next中间件函数。

### 中间件工作原理

每个中间件可以：
- 执行任何代码
- 修改请求和响应对象
- 结束请求-响应周期
- 调用下一个中间件

```javascript
app.use((req, res, next) => {
  console.log('中间件被调用了！');
  // 调用下一个中间件
  next();
});
```

### 应用级中间件

应用级中间件绑定到app对象：

```javascript
// 所有请求都会经过这个中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 只对特定路径生效的中间件
app.use('/api', (req, res, next) => {
  console.log('API请求');
  next();
});
```

### 路由级中间件

路由级中间件与应用级中间件工作方式类似，但绑定到express.Router()实例：

```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router中间件');
  next();
});
```

### 错误处理中间件

错误处理中间件有四个参数(err, req, res, next)：

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});
```

要触发错误处理中间件，可以在普通中间件中调用next()并传入错误：

```javascript
app.get('/error-demo', (req, res, next) => {
  try {
    // 可能会抛出错误的代码
    throw new Error('演示错误');
  } catch (err) {
    next(err); // 将错误传递给错误处理中间件
  }
});
```

### 常用内置中间件

Express 4.x后，许多原本内置的中间件被分离成独立模块，一些常用的有：

**express.json()** - 解析JSON请求体
```javascript
app.use(express.json());
```

**express.urlencoded()** - 解析URL编码的请求体
```javascript
app.use(express.urlencoded({ extended: true }));
```

**express.static()** - 提供静态文件
```javascript
app.use(express.static('public'));
```

### 第三方中间件

有许多优秀的第三方中间件可以增强Express应用的功能：

**morgan** - HTTP请求日志记录
```javascript
const morgan = require('morgan');
app.use(morgan('dev'));
```

**cors** - 启用跨域资源共享
```javascript
const cors = require('cors');
app.use(cors());
```

**helmet** - 通过设置各种HTTP头部增强安全性
```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 构建RESTful API

RESTful API是当前最流行的API设计风格，Express非常适合构建这类API。

### 设计RESTful端点

一个典型的RESTful API遵循以下模式：

| HTTP方法 | URL路径            | 功能         |
| -------- | ------------------ | ------------ |
| GET      | /api/resources     | 获取资源列表 |
| GET      | /api/resources/:id | 获取特定资源 |
| POST     | /api/resources     | 创建新资源   |
| PUT      | /api/resources/:id | 更新整个资源 |
| PATCH    | /api/resources/:id | 部分更新资源 |
| DELETE   | /api/resources/:id | 删除资源     |

### 创建完整的CRUD API

让我们实现一个简单的用户管理API：

```javascript
const express = require('express');
const app = express();

// 解析JSON请求体
app.use(express.json());

// 模拟数据库
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
];

// GET /api/users - 获取所有用户
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/:id - 获取特定用户
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  res.json(user);
});

// POST /api/users - 创建新用户
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // 简单验证
  if (!name || !email) {
    return res.status(400).json({ message: '姓名和邮箱是必填项' });
  }
  
  // 创建新用户
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - 更新用户
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: '姓名和邮箱是必填项' });
  }
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 更新用户
  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// DELETE /api/users/:id - 删除用户
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 删除用户
  const deletedUser = users[userIndex];
  users = users.filter(u => u.id !== id);
  
  res.json(deletedUser);
});

// 处理404错误
app.use((req, res) => {
  res.status(404).json({ message: '请求的资源不存在' });
});

app.listen(3000, () => {
  console.log('API服务器已启动，访问 http://localhost:3000');
});
```

### API测试

可以使用Postman或curl测试这个API：

```bash
# 获取所有用户
curl http://localhost:3000/api/users

# 获取特定用户
curl http://localhost:3000/api/users/1

# 创建新用户
curl -X POST -H "Content-Type: application/json" -d '{"name":"王五","email":"wangwu@example.com"}' http://localhost:3000/api/users

# 更新用户
curl -X PUT -H "Content-Type: application/json" -d '{"name":"李四(已更新)","email":"lisi_updated@example.com"}' http://localhost:3000/api/users/2

# 删除用户
curl -X DELETE http://localhost:3000/api/users/1
```

## 集成数据库

在实际应用中，我们通常需要将数据存储在数据库中，而不是内存中。下面是使用MongoDB和Mongoose的简单示例：

### 连接MongoDB

首先安装Mongoose：

```bash
npm install mongoose
```

然后连接数据库：

```javascript
const mongoose = require('mongoose');

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('成功连接到MongoDB'))
.catch(err => console.error('连接MongoDB失败:', err));
```

### 定义模型和架构

```javascript
const mongoose = require('mongoose');

// 定义用户模式
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// 创建用户模型
const User = mongoose.model('User', userSchema);

module.exports = User;
```

### 使用Mongoose实现CRUD操作

```javascript
const express = require('express');
const User = require('./models/user');
const router = express.Router();

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取特定用户
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建用户
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    user.name = req.body.name;
    user.email = req.body.email;
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    await user.remove();
    res.json({ message: '用户已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

## 处理身份验证与授权

Web应用通常需要身份验证和授权功能，我们可以使用JWT(JSON Web Token)实现：

### 安装必要的包

```bash
npm install jsonwebtoken bcryptjs
```

### 用户注册与登录

```javascript
const express = require('express');
const router = express.Router();
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 密钥（在实际应用中应从环境变量获取）
const JWT_SECRET = 'your_jwt_secret';

// 用户注册
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 检查用户是否已存在
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: '用户已存在' });
    }
    
    // 创建新用户
    user = new User({ name, email });
    
    // 加密密码
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // 创建并返回JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '无效的凭据' });
    }
    
    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '无效的凭据' });
    }
    
    // 创建并返回JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

### 创建认证中间件

```javascript
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

// 认证中间件
function auth(req, res, next) {
  // 获取token
  const token = req.header('x-auth-token');
  
  // 检查token是否存在
  if (!token) {
    return res.status(401).json({ message: '无访问权限，缺少token' });
  }
  
  try {
    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 将用户ID添加到请求对象
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: '无效的token' });
  }
}

module.exports = auth;
```

### 保护路由

```javascript
const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const User = require('./models/user');

// 获取当前用户信息（需要认证）
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

## 应用部署与最佳实践

### 环境变量配置

使用`dotenv`包管理环境变量：

```bash
npm install dotenv
```

创建`.env`文件：

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your_secret_key
NODE_ENV=development
```

在应用中加载：

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
```

### 安全最佳实践

1. **使用Helmet设置安全相关的HTTP头**

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

2. **限制请求速率防止暴力攻击**

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

// 创建限流器
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100个请求
  message: '请求过多，请稍后再试'
});

// 应用到所有API路由
app.use('/api/', apiLimiter);

// 针对特定路由使用更严格的限制
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 5, // 每小时5次登录尝试
  message: '登录尝试过多，请稍后再试'
});

app.use('/api/auth/login', loginLimiter);
```

3. **数据验证**

```bash
npm install joi
```

```javascript
const Joi = require('joi');

// 用户注册验证
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  
  return schema.validate(data);
};

router.post('/register', (req, res) => {
  // 验证请求数据
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  // 继续处理请求...
});
```

### 项目结构建议

一个典型的Express项目可以按以下方式组织：

```
my-express-app/
├── config/             # 配置文件
│   └── db.js           # 数据库配置
├── controllers/        # 控制器（业务逻辑）
│   └── userController.js
├── middleware/         # 中间件
│   ├── auth.js
│   └── errorHandler.js
├── models/             # 数据模型
│   └── User.js
├── routes/             # 路由定义
│   ├── api/
│   │   └── users.js
│   └── index.js
├── utils/              # 工具函数
│   └── logger.js
├── .env                # 环境变量
├── .gitignore
├── app.js              # 应用入口
├── package.json
└── README.md
```

## 总结与拓展

Express是Node.js生态系统中最受欢迎的Web框架之一，它简洁而不失灵活性，适合构建各种Web应用。在本文中，我们学习了：

- Express的基础概念和快速入门
- 路由系统的使用和组织
- 中间件的工作原理和常用中间件
- 如何构建RESTful API
- 数据库集成方法
- 认证与授权的实现
- 应用部署与最佳实践

当你对Express有了基本了解后，可以进一步探索这些相关内容：

1. **Express生态系统中的其他框架**：
   - NestJS - 结合了Angular思想的Node.js框架
   - Fastify - 专注于性能的Web框架
   - Koa - 由Express团队开发的下一代Web框架

2. **深入学习中间件设计模式**：这是Express的核心概念，理解它有助于写出更优雅的代码。

3. **模板引擎与服务端渲染**：Express可以轻松集成模板引擎，如EJS、Pug等。

4. **WebSocket与实时应用**：结合Socket.io构建聊天应用等。

5. **微服务架构**：如何将Express应用拆分为微服务。

无论你是构建个人博客、企业API还是电商网站，Express都能成为你可靠的选择。希望本文能为你的Node.js开发之旅提供一个良好的起点！

> 注：本文档会持续更新，欢迎关注！ 