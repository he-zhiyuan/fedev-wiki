# Vue 生命周期钩子：组件从出生到消亡的旅程

## 引言

你是否好奇过，当你在页面上看到一个Vue组件时，它是如何被创建、更新和销毁的？每一个Vue组件都有自己的"生命历程"，而生命周期钩子就像是这段旅程中的路标，让我们能够在组件的特定时刻执行代码。这篇文章将用通俗易懂的语言，帮助你理解Vue组件的生命周期，即使你是刚入门的新手也能轻松掌握。

## 生命周期概述：组件的一生是怎样的？

### 组件生命周期简介

想象一下，Vue组件就像一个人的一生：出生、成长、变化，最后离开。在这个过程中，Vue提供了一系列的"钩子函数"，让我们可以在特定时刻执行代码：

1. **创建阶段**：组件实例被创建
2. **挂载阶段**：组件被插入到DOM中
3. **更新阶段**：组件的数据变化，导致重新渲染
4. **卸载阶段**：组件从DOM中移除

![Vue生命周期图示](https://v2.cn.vuejs.org/images/lifecycle.png)

### Vue2 与 Vue3 生命周期钩子对比

Vue3对生命周期钩子进行了一些调整和重命名：

| Vue2                      | Vue3                      | 说明                    |
| ------------------------- | ------------------------- | ----------------------- |
| beforeCreate / created    | 依然可用 / setup()        | 组件创建前后            |
| beforeMount / mounted     | 不变                      | 组件挂载前后            |
| beforeUpdate / updated    | 不变                      | 组件更新前后            |
| beforeDestroy / destroyed | beforeUnmount / unmounted | 组件卸载前后            |
| activated / deactivated   | 不变                      | keep-alive组件激活/停用 |
| errorCaptured             | 不变                      | 捕获后代组件错误        |

除了名称变化外，Vue3还引入了Composition API，提供了一套新的生命周期钩子函数。

### 生命周期钩子执行顺序

Vue组件生命周期钩子的执行顺序如下：

1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate (当数据变化时)
6. updated (更新完成后)
7. beforeUnmount (卸载前)
8. unmounted (卸载后)

### 父子组件生命周期关系

当一个页面包含父子组件时，它们的生命周期是交错执行的：

**加载顺序**：
1. 父组件 beforeCreate
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 beforeCreate
5. 子组件 created
6. 子组件 beforeMount
7. 子组件 mounted
8. 父组件 mounted

**更新顺序**：
1. 父组件 beforeUpdate
2. 子组件 beforeUpdate
3. 子组件 updated
4. 父组件 updated

**销毁顺序**：
1. 父组件 beforeUnmount
2. 子组件 beforeUnmount
3. 子组件 unmounted
4. 父组件 unmounted

记住这个规律："父组件先创建，子组件先完成"。

## Options API 生命周期：传统方式的生命周期钩子

### beforeCreate / created

这是组件实例刚刚被创建时的钩子：

```javascript
export default {
  beforeCreate() {
    // 实例创建前
    console.log('组件创建前，数据观察和事件配置还未初始化')
    // 此时无法访问 data 和 methods
  },
  created() {
    // 实例创建后
    console.log('组件创建完成，可以访问data和methods了')
    // 常用于：初始化数据、发起网络请求
    this.fetchInitialData()
  }
}
```

**最佳使用场景**：
- `created`：进行API调用获取初始数据
- `created`：设置组件内的初始状态
- `created`：可以访问响应式数据，但还无法访问DOM

### beforeMount / mounted

这是组件即将被挂载到DOM时的钩子：

```javascript
export default {
  beforeMount() {
    // DOM挂载前
    console.log('组件即将挂载到DOM上')
    // 最后一次修改数据的机会，此时还无法访问DOM
  },
  mounted() {
    // DOM挂载后
    console.log('组件已挂载到DOM上，可以访问DOM了')
    // 常用于：访问DOM、第三方库初始化、添加DOM事件监听
    this.$nextTick(() => {
      // 确保整个视图都已渲染完成
      this.initChart()
    })
  }
}
```

**最佳使用场景**：
- `mounted`：初始化需要访问DOM的第三方库（如图表、地图）
- `mounted`：添加事件监听器
- `mounted`：操作DOM元素

### beforeUpdate / updated

这是组件数据变化，导致DOM重新渲染时的钩子：

```javascript
export default {
  beforeUpdate() {
    // 数据变化，DOM更新前
    console.log('数据变化导致虚拟DOM重新渲染，真实DOM更新前')
    // 可以进一步修改数据，不会导致重复更新
  },
  updated() {
    // DOM更新后
    console.log('虚拟DOM已重新渲染，真实DOM已更新')
    // 注意：应避免在此钩子中修改数据，可能导致无限循环
  }
}
```

**最佳使用场景**：
- `updated`：更新依赖于DOM的第三方库状态
- `beforeUpdate`：在DOM更新前访问现有的DOM，如获取滚动位置

### beforeUnmount / unmounted (Vue3) 或 beforeDestroy / destroyed (Vue2)

这是组件即将被销毁时的钩子：

```javascript
export default {
  beforeUnmount() { // Vue2中为beforeDestroy
    // 组件卸载前
    console.log('组件即将从DOM上移除')
    // 常用于：清理工作，如清除定时器、移除事件监听器
    this.clearAllTimers()
    document.removeEventListener('click', this.documentClickHandler)
  },
  unmounted() { // Vue2中为destroyed
    // 组件卸载后
    console.log('组件已从DOM上移除')
    // 组件的所有指令已被解绑，事件监听器已被移除
  }
}
```

**最佳使用场景**：
- `beforeUnmount`：清理定时器和事件监听器
- `beforeUnmount`：销毁第三方库实例（如地图、图表）
- `beforeUnmount`：取消未完成的网络请求

## Composition API 生命周期：Vue3的新方式

Vue3引入了Composition API，提供了一种新的组织组件逻辑的方式，包括生命周期钩子：

```javascript
import { ref, onBeforeMount, onMounted, onBeforeUpdate, 
         onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default {
  setup() {
    // 注意：setup相当于beforeCreate和created的结合
    console.log('setup执行，组件初始化中')
    
    const count = ref(0)
    
    // 挂载阶段
    onBeforeMount(() => {
      console.log('组件即将挂载')
    })
    
    onMounted(() => {
      console.log('组件已挂载')
      // 可以访问DOM
    })
    
    // 更新阶段
    onBeforeUpdate(() => {
      console.log('组件即将更新')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    // 卸载阶段
    onBeforeUnmount(() => {
      console.log('组件即将卸载')
      // 清理工作
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
    
    return { count }
  }
}
```

你可能注意到，Composition API中没有`beforeCreate`和`created`钩子。这是因为`setup`函数本身就在这两个钩子的位置执行，所以不需要单独提供这两个钩子。

### 其他Composition API生命周期钩子

```javascript
import { onActivated, onDeactivated, onErrorCaptured, 
         onRenderTracked, onRenderTriggered } from 'vue'

export default {
  setup() {
    // keep-alive组件激活/停用
    onActivated(() => {
      console.log('keep-alive组件被激活')
    })
    
    onDeactivated(() => {
      console.log('keep-alive组件被停用')
    })
    
    // 错误处理
    onErrorCaptured((err, instance, info) => {
      console.log('捕获到后代组件错误')
      // 返回false可以阻止错误继续向上传播
      return false
    })
    
    // 调试相关（仅开发模式有效）
    onRenderTracked((e) => {
      console.log('组件渲染被跟踪，依赖项：', e)
    })
    
    onRenderTriggered((e) => {
      console.log('组件重新渲染被触发，触发者：', e)
    })
  }
}
```

## 特殊生命周期钩子：处理特殊情况

### keep-alive相关钩子：缓存组件的生命周期

Vue提供了`<keep-alive>`组件用于缓存组件状态，避免重新渲染。当组件被包裹在`<keep-alive>`中时，会触发额外的生命周期钩子：

```javascript
export default {
  // 选项式API
  activated() {
    // 组件被激活（显示）时调用
    console.log('组件从缓存中被激活')
    // 适合处理：更新可能已过时的数据
    this.refreshData()
  },
  deactivated() {
    // 组件被停用（隐藏）时调用
    console.log('组件被停用，放入缓存')
    // 适合处理：暂停耗费资源的任务
    this.pauseExpensiveTasks()
  }
}

// 组合式API
import { onActivated, onDeactivated } from 'vue'

export default {
  setup() {
    onActivated(() => {
      console.log('组件从缓存中被激活')
    })
    
    onDeactivated(() => {
      console.log('组件被停用，放入缓存')
    })
  }
}
```

这些钩子在路由组件使用`<keep-alive>`时特别有用，可以在组件重新显示时刷新数据，而不必完全重新创建组件。

### errorCaptured：捕获后代组件的错误

`errorCaptured`钩子可以捕获后代组件抛出的错误，非常适合实现统一的错误处理：

```javascript
export default {
  // 选项式API
  errorCaptured(error, instance, info) {
    // error: 错误对象
    // instance: 发生错误的组件实例
    // info: 错误来源信息
    console.error('捕获到错误:', error, info)
    
    // 处理错误，如显示错误消息
    this.errorMessage = `应用发生错误: ${error.message}`
    
    // 返回false阻止错误继续向上传播
    return false
  }
}

// 组合式API
import { onErrorCaptured, ref } from 'vue'

export default {
  setup() {
    const errorMessage = ref('')
    
    onErrorCaptured((error, instance, info) => {
      errorMessage.value = `应用发生错误: ${error.message}`
      return false
    })
    
    return { errorMessage }
  }
}
```

### serverPrefetch：服务端渲染数据预取

在服务端渲染(SSR)场景下，`serverPrefetch`钩子用于在服务器端预取数据，确保组件首次渲染时已包含所需数据：

```javascript
export default {
  // 选项式API
  async serverPrefetch() {
    // 在服务器端渲染期间调用
    // 返回一个Promise，服务器会等待Promise解析后再渲染
    return this.fetchData()
  },
  methods: {
    async fetchData() {
      this.data = await api.getData()
    }
  }
}

// 组合式API
import { ref } from 'vue'

export default {
  async setup() {
    const data = ref(null)
    
    async function fetchData() {
      data.value = await api.getData()
    }
    
    // 在服务器端渲染期间调用
    if (import.meta.env.SSR) {
      await fetchData()
    } else {
      // 客户端渲染时也调用，避免"水合"后数据不一致
      fetchData()
    }
    
    return { data }
  }
}
```

## 生命周期最佳实践：写出高质量的代码

### 资源创建与清理：避免内存泄漏

遵循"在哪里创建，就在哪里清理"的原则：

```javascript
export default {
  data() {
    return {
      timer: null,
      mapInstance: null
    }
  },
  mounted() {
    // 创建资源
    this.timer = setInterval(() => {
      this.updateData()
    }, 1000)
    
    // 初始化第三方库
    this.mapInstance = new MapLibrary('#map')
  },
  beforeUnmount() {
    // 清理资源
    clearInterval(this.timer)
    
    // 销毁第三方库实例
    if (this.mapInstance) {
      this.mapInstance.destroy()
      this.mapInstance = null
    }
  }
}
```

### 数据获取策略：何时加载数据最合适

根据不同场景选择合适的数据加载时机：

1. **created/setup**：适合获取不依赖DOM的数据，可以更早开始加载
```javascript
export default {
  created() {
    // 尽早开始加载数据，不需要等待DOM渲染
    this.fetchUserProfile()
  }
}
```

2. **mounted**：适合获取依赖DOM的数据
```javascript
export default {
  mounted() {
    // 需要访问DOM元素的尺寸来加载合适的图片
    const containerWidth = this.$refs.container.clientWidth
    this.fetchImagesBasedOnWidth(containerWidth)
  }
}
```

3. **activated**：适合刷新可能过期的数据
```javascript
export default {
  activated() {
    // 组件从缓存中激活时刷新数据
    const currentTime = Date.now()
    if (currentTime - this.lastFetchTime > 60000) {
      // 数据超过1分钟，刷新
      this.refreshData()
      this.lastFetchTime = currentTime
    }
  }
}
```

### DOM操作时机：避免操作未就绪的DOM

始终在`mounted`钩子中操作DOM，并使用`$nextTick`确保DOM已完全更新：

```javascript
export default {
  mounted() {
    // DOM已挂载，但可能还在等待子组件或异步组件
    this.$nextTick(() => {
      // 此时整个视图已渲染完成
      this.initializeCarousel()
    })
  },
  methods: {
    updateContent() {
      this.content = newContent
      
      // 当数据变化导致DOM更新时，使用$nextTick等待DOM更新完成
      this.$nextTick(() => {
        // 此时DOM已更新
        this.updateCarousel()
      })
    }
  }
}
```

### 避免常见的生命周期错误

1. **在`updated`钩子中修改导致更新的数据**：
```javascript
// ❌ 错误：可能导致无限循环
updated() {
  this.counter++ // 会触发新的更新，从而再次调用updated
}

// ✅ 正确：使用条件限制
updated() {
  if (this.needsUpdate) {
    this.needsUpdate = false
    this.counter++
  }
}
```

2. **在错误的钩子中进行操作**：
```javascript
// ❌ 错误：在created中访问DOM
created() {
  // 此时DOM还不存在
  const width = this.$el.clientWidth // 会报错
}

// ✅ 正确：在mounted中访问DOM
mounted() {
  const width = this.$el.clientWidth // 正常工作
}
```

3. **忘记清理资源**：
```javascript
// ❌ 错误：创建了监听器但未清理
mounted() {
  window.addEventListener('resize', this.handleResize)
}

// ✅ 正确：记得清理
mounted() {
  window.addEventListener('resize', this.handleResize)
},
beforeUnmount() {
  window.removeEventListener('resize', this.handleResize)
}
```

## 总结：掌握生命周期的艺术

Vue的生命周期钩子为我们提供了在组件生命周期的关键时刻执行代码的能力。理解并正确使用这些钩子，可以让你的组件行为更可预测，代码更加清晰。

**关键记忆点**：
- **创建阶段**(`beforeCreate`/`created`)：初始化数据、发起API请求
- **挂载阶段**(`beforeMount`/`mounted`)：访问和操作DOM、初始化第三方库
- **更新阶段**(`beforeUpdate`/`updated`)：响应数据变化
- **卸载阶段**(`beforeUnmount`/`unmounted`)：清理资源、移除事件监听器
- **特殊钩子**：处理缓存组件(`activated`/`deactivated`)、错误捕获(`errorCaptured`)等

无论是使用选项式API还是组合式API，正确理解生命周期钩子的执行时机和用途，都能帮助你写出更好的Vue应用。开始在你的项目中有意识地应用这些知识吧！

> 注：本文档会持续更新，欢迎关注！