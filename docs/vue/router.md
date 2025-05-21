# Vue Router：构建单页应用的导航系统

## 引言

还记得以前的网站是怎么工作的吗？点击一个链接，整个页面刷新，然后加载新内容。而现在的网站，尤其是像Gmail、掘金这样的应用，切换内容时页面不会刷新，体验更加流畅。这种神奇的体验背后，就是前端路由的功劳。今天，我们一起来探索Vue Router，学习如何构建流畅的单页应用导航系统。

## 路由基础配置：让应用拥有多个"页面"

### Vue Router 是什么？为什么需要它？

Vue Router是Vue.js官方的路由管理器。它允许你在不重新加载页面的情况下更改浏览器中显示的内容，为单页应用(SPA)提供了核心功能。简单来说，它就是让你的Vue应用具备多页面的能力，同时保持单页应用的高效性能。

### 安装与基本设置

首先，我们需要安装Vue Router：

```bash
# npm方式
npm install vue-router@4 # 适用于Vue 3
# 或者
npm install vue-router@3 # 适用于Vue 2

# yarn方式
yarn add vue-router@4
```

然后，创建一个基本的路由配置：

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 1. 定义路由配置
const routes = [
  {
    path: '/',           // URL路径
    name: 'Home',        // 路由名称（可选但推荐）
    component: Home      // 对应的组件
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

// 2. 创建路由实例
const router = createRouter({
  // 使用HTML5历史模式
  history: createWebHistory(),
  routes
})

// 3. 导出路由
export default router
```

最后，在Vue应用中挂载路由：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建Vue应用并使用路由
const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 路由模式选择：Hash vs History

Vue Router提供了两种模式：

**Hash模式**：使用URL的hash（#）部分模拟完整URL
```
https://example.com/#/about
```

```javascript
import { createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
```

**History模式**：使用HTML5 History API，URL看起来更自然
```
https://example.com/about
```

```javascript
import { createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})
```

对比：
- Hash模式兼容性更好，无需服务器配置
- History模式URL更美观，但需要服务器正确配置，否则会出现404错误

### 动态路由参数：实现个性化页面

当你需要根据参数显示不同内容时，可以使用动态路由：

```javascript
const routes = [
  // 用户详情页，:id是动态参数
  { 
    path: '/user/:id', 
    component: UserDetail 
  }
]
```

在组件中访问这个参数：

```javascript
// UserDetail.vue
export default {
  created() {
    // 方法1：通过this.$route
    console.log(this.$route.params.id)
    
    // 方法2：在setup中使用（Vue3 Composition API）
    const route = useRoute()
    console.log(route.params.id)
  }
}
```

这样，访问`/user/123`和`/user/456`会显示不同的用户信息，但使用同一个组件。

### 嵌套路由：构建复杂页面结构

有时一个页面包含多个子区域，每个子区域可能需要独立的路由控制：

```javascript
const routes = [
  { 
    path: '/user/:id', 
    component: User,
    // 嵌套路由
    children: [
      { path: '', component: UserHome },        // /user/123
      { path: 'profile', component: UserProfile }, // /user/123/profile
      { path: 'posts', component: UserPosts }    // /user/123/posts
    ]
  }
]
```

在父组件中，需要放置一个`<router-view>`来显示子路由内容：

```vue
<!-- User.vue -->
<template>
  <div>
    <h2>User {{ $route.params.id }}</h2>
    
    <!-- 子路由内容将在这里显示 -->
    <router-view></router-view>
  </div>
</template>
```

## 路由导航与控制：在应用中自由穿梭

### 声明式导航：使用router-link组件

最简单的导航方式是使用`<router-link>`组件：

```vue
<template>
  <nav>
    <!-- 普通链接 -->
    <router-link to="/">首页</router-link>
    
    <!-- 带参数的链接 -->
    <router-link to="/user/123">用户123</router-link>
    
    <!-- 使用命名路由 -->
    <router-link :to="{ name: 'About' }">关于我们</router-link>
    
    <!-- 带查询参数 -->
    <router-link :to="{ path: '/search', query: { q: 'vue' }}">
      搜索Vue
    </router-link>
  </nav>
  
  <!-- 路由匹配的组件会渲染在这里 -->
  <router-view></router-view>
</template>
```

`<router-link>`会被渲染为`<a>`标签，但它会拦截点击事件，避免页面刷新。

### 编程式导航：通过代码控制跳转

有时你需要在JavaScript代码中触发导航，比如表单提交后：

```javascript
// 选项式API
export default {
  methods: {
    // 基本导航
    goToHome() {
      this.$router.push('/')
    },
    
    // 带参数导航
    goToUser(userId) {
      this.$router.push(`/user/${userId}`)
    },
    
    // 使用对象语法
    goToSearch() {
      this.$router.push({
        path: '/search',
        query: { q: 'vue router' }
      })
    },
    
    // 替换当前历史记录
    replaceCurrentPage() {
      this.$router.replace('/new-page')
    },
    
    // 后退
    goBack() {
      this.$router.go(-1)
    }
  }
}

// Composition API (Vue 3)
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    function goToHome() {
      router.push('/')
    }
    
    return { goToHome }
  }
}
```

`push`和`replace`的区别：
- `push`会添加新的历史记录
- `replace`会替换当前的历史记录（点击后退不会回到替换前的页面）

### 获取路由参数与查询参数

从URL获取信息有多种方式：

```javascript
// 获取动态路由参数
// 例如 /user/123
this.$route.params.id // '123'

// 获取查询参数
// 例如 /search?q=vue&page=1
this.$route.query.q    // 'vue'
this.$route.query.page // '1'

// 获取当前完整路径
this.$route.fullPath // '/search?q=vue&page=1'

// 监听参数变化
watch: {
  '$route.params.id'(newId) {
    console.log('用户ID变成了:', newId)
    this.fetchUserData(newId)
  }
}

// 在Vue 3 Composition API中
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

setup() {
  const route = useRoute()
  console.log(route.params.id)
  
  // 监听参数变化
  onBeforeRouteUpdate((to, from) => {
    if (to.params.id !== from.params.id) {
      fetchUserData(to.params.id)
    }
  })
}
```

## 路由守卫机制：控制用户访问权限

路由守卫是路由跳转过程中的"检查点"，允许你控制导航流程，比如权限验证、登录状态检查等。

### 全局前置守卫：导航发生前触发

```javascript
router.beforeEach((to, from, next) => {
  // to：即将进入的目标路由
  // from：当前要离开的路由
  // next：函数，控制导航行为
  
  // 检查用户是否已登录
  const isAuthenticated = localStorage.getItem('token')
  
  // 如果要访问需要登录的页面，但用户未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 重定向到登录页
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    // 允许导航
    next()
  }
})
```

`next()`有多种调用方式：
- `next()`：继续导航
- `next(false)`：取消导航
- `next('/')`或`next({ path: '/' })`：重定向到其他路由
- `next(error)`：终止导航并传递错误

### 全局后置守卫：导航完成后触发

```javascript
router.afterEach((to, from) => {
  // 没有next参数，因为导航已经完成
  
  // 可以用于设置页面标题
  document.title = to.meta.title || '默认标题'
  
  // 或者发送页面访问统计
  sendAnalytics(to.fullPath)
})
```

### 路由独享守卫：针对特定路由的守卫

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      // 只检查这个路由的权限
      if (isAdmin()) {
        next()
      } else {
        next('/403')
      }
    }
  }
]
```

### 组件内守卫：在组件内定义的守卫

```javascript
export default {
  // 进入组件前调用
  beforeRouteEnter(to, from, next) {
    // 此时组件实例还未创建，不能使用this
    // 可以通过传回调给next访问组件实例
    next(vm => {
      // vm是组件实例
      vm.fetchData()
    })
  },
  
  // 路由更新但组件被复用时调用
  beforeRouteUpdate(to, from, next) {
    // 可以访问组件实例this
    this.id = to.params.id
    this.fetchData()
    next()
  },
  
  // 离开组件前调用
  beforeRouteLeave(to, from, next) {
    // 通常用于提示用户未保存的更改
    if (this.hasUnsavedChanges) {
      const confirm = window.confirm('有未保存的更改，确定离开吗？')
      if (confirm) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
```

## 动态路由高级应用：灵活的权限控制

### 路由元信息：为路由添加自定义数据

路由元信息(meta)可以附加任何自定义数据，常用于权限控制、页面标题等：

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: { 
      requiresAuth: true,
      role: 'admin',
      title: '管理后台'
    }
  }
]
```

使用元信息：

```javascript
router.beforeEach((to, from, next) => {
  // 检查权限
  if (to.meta.requiresAuth) {
    // 验证逻辑...
  }
  
  // 设置标题
  document.title = to.meta.title || '默认标题'
  
  next()
})
```

### 动态添加和移除路由

有时你需要根据用户权限动态添加路由，比如根据用户角色：

```javascript
// 基础路由（所有用户都能访问）
const baseRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]

// 管理员路由
const adminRoutes = [
  { 
    path: '/admin', 
    component: Admin,
    children: [
      { path: 'users', component: UserManagement },
      { path: 'settings', component: SystemSettings }
    ]
  }
]

// 创建路由实例（初始只包含基础路由）
const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes
})

// 登录成功后根据角色添加路由
function addUserRoutes(role) {
  if (role === 'admin') {
    // 动态添加管理员路由
    adminRoutes.forEach(route => {
      router.addRoute(route)
    })
  }
  
  // 添加通配符路由（放在最后）
  router.addRoute({ 
    path: '/:pathMatch(.*)*', 
    component: NotFound 
  })
}

// 使用示例
login().then(user => {
  addUserRoutes(user.role)
  // 注意：需要手动导航，因为路由是异步添加的
  router.replace(router.currentRoute.value.fullPath)
})
```

在Vue Router 4中，你也可以移除路由：

```javascript
// 方式1：通过名称移除
router.removeRoute('AdminDashboard')

// 方式2：保存添加路由返回的函数，调用它移除
const removeRoute = router.addRoute(newRoute)
removeRoute() // 移除刚添加的路由
```

## 路由过渡与性能优化：提升用户体验

### 路由切换动画：平滑过渡

使用Vue的`<transition>`组件可以为路由切换添加动画：

```vue
<template>
  <!-- name属性定义过渡名称，用于CSS类名 -->
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<style>
/* 定义进入和离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

如果需要根据路由不同使用不同动画，可以使用动态过渡名：

```vue
<template>
  <transition :name="transitionName">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'fade'
    }
  },
  watch: {
    '$route'(to, from) {
      // 根据路由深度决定使用不同动画
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>
```

### 路由懒加载：提升首屏加载速度

对于大型应用，把所有组件打包到一起会导致很大的文件体积。使用动态导入(Dynamic Import)可以实现路由懒加载：

```javascript
const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue') // 动态导入，返回Promise
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]
```

这样，每个组件会被分割成独立的小文件，只有在路由访问时才会下载，大大提高了首屏加载速度。

你还可以使用webpack的命名chunk功能给这些文件命名：

```javascript
{
  path: '/user',
  // 使用注释为chunk命名
  component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
}
```

### 组件缓存：避免重复渲染

使用`<keep-alive>`组件可以缓存不活动的组件实例，避免重新渲染：

```vue
<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>
```

也可以有选择地缓存特定组件：

```vue
<template>
  <keep-alive :include="['Home', 'About']">
    <router-view></router-view>
  </keep-alive>
</template>
```

被缓存的组件不会重新执行`created`或`mounted`生命周期，但会触发`activated`和`deactivated`钩子：

```javascript
export default {
  name: 'Home',
  activated() {
    console.log('组件被激活')
    // 可以在这里刷新部分数据
  },
  deactivated() {
    console.log('组件被停用')
    // 可以在这里做一些清理工作
  }
}
```

## 实战最佳实践：构建企业级应用

### 路由组织结构：保持代码整洁

随着应用复杂度增加，路由配置可能变得庞大。一个好的实践是模块化路由配置：

```
src/
  router/
    index.js           # 主路由文件
    routes/
      home.js          # 首页相关路由
      user.js          # 用户相关路由
      admin.js         # 管理员相关路由
      product.js       # 产品相关路由
```

```javascript
// router/routes/admin.js
export default [
  {
    path: '/admin',
    component: () => import('@/views/admin/Index.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      // 子路由...
    ]
  }
]

// router/index.js
import homeRoutes from './routes/home'
import userRoutes from './routes/user'
import adminRoutes from './routes/admin'
import productRoutes from './routes/product'

const routes = [
  ...homeRoutes,
  ...userRoutes,
  ...adminRoutes,
  ...productRoutes,
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
```

### 路由鉴权：保护你的应用

一个完整的鉴权方案通常包括：

1. 路由元信息标记需要认证的路由
2. 全局前置守卫检查认证状态
3. 登录/注销逻辑处理

```javascript
// 简单的鉴权系统
router.beforeEach(async (to, from, next) => {
  // 获取用户信息
  const store = useStore()
  const isLoggedIn = store.getters.isLoggedIn
  const userRole = store.state.user?.role
  
  // 如果路由需要认证
  if (to.meta.requiresAuth) {
    // 用户未登录
    if (!isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    // 检查角色权限
    if (to.meta.role && to.meta.role !== userRole) {
      next({ path: '/403' }) // 无权限
      return
    }
  }
  
  // 如果是登录页，且用户已登录，跳转到首页
  if (to.path === '/login' && isLoggedIn) {
    next({ path: '/' })
    return
  }
  
  // 允许访问
  next()
})
```

### 路由与埋点统计：用户行为分析

跟踪用户在应用中的导航可以提供宝贵的用户行为数据：

```javascript
// 全局后置钩子用于统计
router.afterEach((to, from) => {
  // 发送页面访问数据到分析服务
  // 可以使用谷歌分析、百度统计等
  if (typeof _hmt !== 'undefined') {  // 百度统计
    _hmt.push(['_trackPageview', to.fullPath])
  }
  
  if (typeof gtag !== 'undefined') {  // Google Analytics
    gtag('config', 'GA-XXXXXXXXX', {
      'page_path': to.fullPath
    })
  }
})
```

## 常见错误与解决方案

### 1. 路由模式导致的404错误

**问题**：使用history模式后，刷新页面出现404错误。

**解决方案**：
- 配置服务器将所有请求重定向到index.html
- Nginx示例配置：
```
location / {
  try_files $uri $uri/ /index.html;
}
```

### 2. 路由参数变化但组件不更新

**问题**：如从`/user/1`跳转到`/user/2`，组件没有重新渲染。

**解决方案**：
- 使用`watch`监听`$route`变化
- 使用路由守卫`beforeRouteUpdate`响应变化
- 给`<router-view>`添加`:key="$route.fullPath"`强制更新

### 3. 懒加载导致的加载延迟

**问题**：路由懒加载在网络较慢时导致明显的白屏。

**解决方案**：
- 使用路由过渡动画掩盖加载延迟
- 添加加载指示器：
```javascript
// 显示全局loading状态
router.beforeEach(() => {
  startLoading()
  return true
})

router.afterEach(() => {
  stopLoading()
})
```

## 总结与拓展阅读

Vue Router是构建单页应用的强大工具，通过本文你已经了解了：
- 基本路由配置与导航方法
- 动态路由和嵌套路由的使用
- 路由守卫进行权限控制
- 路由懒加载优化性能
- 实际应用中的最佳实践

随着你的应用变得更复杂，你可能需要进一步探索：
1. 使用Vue Router与Vuex/Pinia结合管理状态
2. 实现更复杂的权限控制系统
3. 服务端渲染(SSR)环境下的路由处理
4. 微前端架构中的路由整合

无论应用规模大小，良好的路由设计都能让你的Vue应用更易于维护和扩展。尝试从小型项目开始实践，逐步掌握这些概念，最终你将能够构建出结构清晰、用户体验出色的单页应用。

> 注：本文档会持续更新，欢迎关注！ 