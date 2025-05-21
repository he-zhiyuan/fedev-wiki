# Vue Composition API：更灵活的组件逻辑组织方式

## 引言

当你的Vue组件变得越来越复杂时，你可能会遇到这样的问题：相关的逻辑代码分散在不同的选项中，使得代码难以理解和维护。Composition API正是为了解决这个问题而生，它让我们能够根据逻辑功能而非选项类型来组织代码。本文将用通俗易懂的语言，帮助你理解和掌握Vue 3的这个强大特性。

## Composition API 基础：认识新的代码组织方式

### Options API 与 Composition API 对比：两种思维模式

在了解Composition API前，让我们先看看传统的Options API如何组织代码：

```javascript
// Options API 示例
export default {
  // 数据
  data() {
    return {
      user: { name: '张三', age: 30 },
      searchQuery: '',
      searchResults: []
    }
  },
  // 计算属性
  computed: {
    fullName() {
      return this.user.name + '先生/女士'
    }
  },
  // 方法
  methods: {
    updateUser() {
      this.user.age++
    },
    async search() {
      this.searchResults = await api.search(this.searchQuery)
    }
  },
  // 生命周期钩子
  mounted() {
    this.search()
  }
}
```

在Options API中，代码按照选项类型（data/computed/methods等）组织。这对于简单组件很清晰，但随着组件复杂度增加，相关联的代码会分散在不同位置。

而在Composition API中，我们可以按照逻辑功能来组织代码：

```javascript
// Composition API 示例
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 用户相关逻辑
    const user = ref({ name: '张三', age: 30 })
    const fullName = computed(() => user.value.name + '先生/女士')
    function updateUser() {
      user.value.age++
    }
    
    // 搜索相关逻辑
    const searchQuery = ref('')
    const searchResults = ref([])
    async function search() {
      searchResults.value = await api.search(searchQuery.value)
    }
    
    // 生命周期
    onMounted(() => {
      search()
    })
    
    // 返回需要暴露给模板的内容
    return {
      user,
      fullName,
      updateUser,
      searchQuery,
      searchResults,
      search
    }
  }
}
```

**主要优势**：
1. **逻辑关注点分离**：相关逻辑可以集中在一起
2. **更好的代码复用**：可以轻松提取和重用逻辑
3. **更好的TypeScript支持**：提供了更自然的类型推导
4. **减小了打包体积**：通过摇树优化可以移除未使用的导入

### setup 函数：Composition API 的入口

`setup`函数是使用Composition API的入口，它在组件实例创建之前执行，因此无法使用`this`：

```javascript
export default {
  setup(props, context) {
    // props: 组件传入的属性（响应式的）
    console.log(props.title)
    
    // context: 上下文对象，包含了一些有用的属性
    const { attrs, slots, emit, expose } = context
    
    // 在这里定义响应式数据、方法、计算属性等
    
    // 必须返回一个对象，其中的属性将暴露给模板
    return {
      // 这里返回的内容可在模板中使用
    }
  }
}
```

`setup`函数接收两个参数：
- `props`：组件接收的属性，是响应式的，不能使用ES6解构（会失去响应性）
- `context`：上下文对象，包含了`attrs`、`slots`、`emit`和`expose`

### 响应式数据定义：告别data选项

在Composition API中，我们有几种方法来创建响应式数据：

**1. ref：处理基础类型**

`ref`主要用于基础类型（字符串、数字、布尔值等），但也可以用于对象：

```javascript
import { ref } from 'vue'

// 在setup中
const count = ref(0)       // 数字
const name = ref('张三')    // 字符串
const isActive = ref(true) // 布尔值

// 修改值需要使用.value
count.value++
name.value = '李四'

// ref用于对象
const user = ref({ name: '张三', age: 30 })
// 修改对象属性
user.value.age = 31
```

在模板中使用时不需要`.value`，Vue会自动解包：
```html
<template>
  <div>{{ count }}</div>  <!-- 不需要.value -->
  <div>{{ user.name }}</div>
</template>
```

**2. reactive：处理对象**

`reactive`用于创建响应式对象，它基于JavaScript的Proxy实现：

```javascript
import { reactive } from 'vue'

// 在setup中
const state = reactive({
  count: 0,
  user: {
    name: '张三',
    age: 30
  }
})

// 直接修改即可，不需要.value
state.count++
state.user.age = 31
```

**3. 响应式工具函数**

Vue 3提供了多个响应式工具函数：

```javascript
import { ref, reactive, toRefs, readonly, computed, watchEffect } from 'vue'

// 在setup中
const state = reactive({ count: 0, name: '张三' })

// toRefs：解构reactive对象同时保持响应性
const { count, name } = toRefs(state)
count.value++ // 仍然是响应式的

// readonly：创建只读数据
const readonlyState = readonly(state)
// readonlyState.count++ // 这会产生警告

// isRef/isReactive/isReadonly：检查数据类型
console.log(isRef(count)) // true
```

### 生命周期钩子：重命名和使用方式

在Composition API中，生命周期钩子需要从Vue导入，并以`on`开头命名：

```javascript
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated,
  onBeforeUnmount, 
  onUnmounted, 
  onActivated, 
  onDeactivated,
  onErrorCaptured
} from 'vue'

export default {
  setup() {
    // 可以多次调用同一个钩子
    onMounted(() => {
      console.log('组件挂载完成')
    })
    
    onMounted(() => {
      console.log('这也会在挂载时执行')
    })
    
    onBeforeUnmount(() => {
      console.log('组件即将卸载')
    })
  }
}
```

注意：没有与`beforeCreate`和`created`对应的组合式API钩子，因为`setup`函数本身就相当于这两个钩子。

### 计算属性与监听器：响应式的衍生状态

**计算属性**：使用`computed`创建

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const firstName = ref('张')
    const lastName = ref('三')
    
    // 计算属性
    const fullName = computed(() => {
      return firstName.value + lastName.value
    })
    
    // 可写的计算属性
    const fullName2 = computed({
      get: () => firstName.value + lastName.value,
      set: (newValue) => {
        [firstName.value, lastName.value] = newValue.split(' ')
      }
    })
    
    return { firstName, lastName, fullName, fullName2 }
  }
}
```

**监听器**：使用`watch`和`watchEffect`

```javascript
import { ref, watch, watchEffect } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const name = ref('张三')
    
    // watch：指定要监听的数据源
    watch(count, (newValue, oldValue) => {
      console.log(`count从${oldValue}变为${newValue}`)
    })
    
    // 监听多个数据源
    watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
      console.log('数据变化了')
    })
    
    // watchEffect：自动收集依赖
    watchEffect(() => {
      console.log(`count: ${count.value}, name: ${name.value}`)
      // 这个函数中使用的任何响应式数据变化时，都会重新执行
    })
    
    return { count, name }
  }
}
```

`watch`与`watchEffect`的区别：
- `watch`需要明确指定监听的数据源
- `watchEffect`会自动追踪函数内使用的所有响应式数据
- `watch`可以访问变化前后的值，而`watchEffect`不行
- `watch`默认是懒执行的，而`watchEffect`在创建时会立即执行一次

## `<script setup>` 语法糖：更简洁的Composition API

Vue 3.2引入了`<script setup>`语法糖，让Composition API的使用更加简洁。

### 基本用法：摆脱return语句

使用`<script setup>`后，我们不再需要`setup`函数和返回语句：

```vue
<script setup>
import { ref, computed } from 'vue'

// 直接定义响应式数据
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 定义方法
function increment() {
  count.value++
}

// 无需return，所有顶层变量自动暴露给模板
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
```

所有定义在`<script setup>`中的顶层变量、函数和导入，都会自动暴露给模板，不需要手动返回。

### defineProps 与 defineEmits：组件通信

在`<script setup>`中，我们使用编译宏`defineProps`和`defineEmits`来声明props和emits：

```vue
<script setup>
// 声明props（不需要导入）
const props = defineProps({
  title: String,
  likes: { type: Number, default: 0 },
  isPublished: Boolean,
  author: Object,
  callback: Function,
  contactsPromise: Promise
})

// 使用props
console.log(props.title)

// 声明emits
const emit = defineEmits(['update', 'delete'])

// 调用emit
function handleUpdate() {
  emit('update', { id: 1, text: '新内容' })
}
</script>
```

这些编译宏是由Vue编译器直接处理的，不需要导入。

使用TypeScript时，可以使用类型标注：

```vue
<script setup lang="ts">
// 使用类型声明
const props = defineProps<{
  title: string
  likes?: number
  isPublished: boolean
}>()

const emit = defineEmits<{
  (e: 'update', payload: { id: number, text: string }): void
  (e: 'delete', id: number): void
}>()
</script>
```

### defineExpose：暴露内部方法和属性

使用`<script setup>`的组件默认是关闭的，即父组件无法通过模板引用访问子组件的内部属性。如果需要暴露内部属性，使用`defineExpose`：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

// 暴露属性和方法给父组件
defineExpose({
  count,
  increment
})
</script>
```

父组件可以通过模板引用访问这些暴露的属性：

```vue
<template>
  <Child ref="childRef" />
  <button @click="childRef.increment()">增加子组件计数</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = ref(null)

onMounted(() => {
  console.log(childRef.value.count) // 访问子组件暴露的属性
})
</script>
```

### withDefaults：设置默认值

在使用TypeScript类型声明props时，可以使用`withDefaults`设置默认值：

```vue
<script setup lang="ts">
// 定义props类型
interface Props {
  title: string
  likes?: number
  isPublished?: boolean
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  likes: 0,
  isPublished: false
})
</script>
```

## 组合式函数：实现逻辑复用的新方式

组合式函数（Composables）是Composition API最强大的特性之一，它让我们能够提取和重用逻辑代码，而不必使用mixins或其他复杂的模式。

### 创建自定义组合式函数

组合式函数约定以"use"开头，返回需要暴露的内容：

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  // 状态
  const count = ref(initialValue)
  
  // 计算属性
  const doubleCount = computed(() => count.value * 2)
  
  // 方法
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initialValue
  }
  
  // 返回需要暴露的内容
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
```

在组件中使用：

```vue
<script setup>
import { useCounter } from './composables/useCounter'

// 使用组合式函数
const { count, doubleCount, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

### 实用组合式函数示例

**1. 封装API请求逻辑**

```javascript
// useApi.js
import { ref } from 'vue'

export function useApi(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  async function fetchData() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (err) {
      error.value = err.message || '请求失败'
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, fetchData }
}
```

使用：

```vue
<script setup>
import { onMounted } from 'vue'
import { useApi } from './composables/useApi'

const { data, error, loading, fetchData } = useApi('https://api.example.com/data')

onMounted(fetchData)
</script>

<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error }}</div>
    <div v-else-if="data">
      <pre>{{ data }}</pre>
    </div>
    <button @click="fetchData" :disabled="loading">重新加载</button>
  </div>
</template>
```

**2. 监听鼠标位置**

```javascript
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  
  return { x, y }
}
```

使用：

```vue
<script setup>
import { useMouse } from './composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  <div>鼠标位置: {{ x }}, {{ y }}</div>
</template>
```

## 状态管理与组件通信：组合式API中的数据共享

### Provide/Inject：跨组件数据传递

Composition API提供了`provide`和`inject`函数，用于实现跨层级组件通信：

```javascript
// 父组件
import { provide, ref } from 'vue'

export default {
  setup() {
    const theme = ref('light')
    
    function toggleTheme() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    
    // 提供值给后代组件
    provide('theme', theme)
    provide('toggleTheme', toggleTheme)
    
    return { theme, toggleTheme }
  }
}

// 后代组件（可以是任意深度）
import { inject } from 'vue'

export default {
  setup() {
    // 注入祖先组件提供的值
    const theme = inject('theme')
    const toggleTheme = inject('toggleTheme')
    
    return { theme, toggleTheme }
  }
}
```

在`<script setup>`中使用：

```vue
<!-- 父组件 -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
</script>

<template>
  <div :class="theme">
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>
```

### 结合Pinia使用：应用级状态管理

Pinia是Vue官方推荐的状态管理库，它与Composition API结合得非常好：

```javascript
// store/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0)
  
  // 计算属性
  const doubleCount = computed(() => count.value * 2)
  
  // 方法
  function increment() {
    count.value++
  }
  
  return { count, doubleCount, increment }
})
```

在组件中使用：

```vue
<script setup>
import { useCounterStore } from '@/store/counter'
import { storeToRefs } from 'pinia'

// 使用store
const counterStore = useCounterStore()

// 解构store（使用storeToRefs保持响应性）
const { count, doubleCount } = storeToRefs(counterStore)
// 方法可以直接解构
const { increment } = counterStore
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
```

## 最佳实践：写出可维护的Composition API代码

### 代码组织方式：清晰的功能分组

按照功能逻辑组织代码，让相关的代码放在一起：

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from './composables/useApi'

// 用户相关功能
const username = ref('')
const isAdmin = ref(false)

function login() {
  // 登录逻辑
}

function logout() {
  // 登出逻辑
}

// 文章相关功能
const { data: articles, loading: articlesLoading, fetchData: fetchArticles } = useApi('/api/articles')

const filteredArticles = computed(() => {
  if (!articles.value) return []
  return articles.value.filter(article => /* 过滤逻辑 */)
})

function createArticle() {
  // 创建文章逻辑
}

// 生命周期相关
onMounted(() => {
  fetchArticles()
})
</script>
```

### 提取复用逻辑：减少重复代码

当看到相似代码重复出现时，考虑提取成组合式函数：

```javascript
// 提取前
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const searchError = ref(null)

async function search() {
  isSearching.value = true
  searchError.value = null
  try {
    searchResults.value = await api.search(searchQuery.value)
  } catch (err) {
    searchError.value = err.message
  } finally {
    isSearching.value = false
  }
}

// 提取后
import { useSearch } from './composables/useSearch'

const { query, results, isSearching, error, search } = useSearch()
```

### TypeScript类型支持：增强代码健壮性

Composition API与TypeScript结合得很好，充分利用类型系统：

```typescript
// 定义类型
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

// 使用类型
import { ref, Ref } from 'vue'

function useUsers() {
  const users: Ref<User[]> = ref([])
  const currentUser: Ref<User | null> = ref(null)
  
  async function fetchUsers(): Promise<void> {
    // 实现
  }
  
  function getUserById(id: number): User | undefined {
    return users.value.find(user => user.id === id)
  }
  
  return { users, currentUser, fetchUsers, getUserById }
}
```

### 常见错误与解决方案

**1. 响应式丢失问题**

```javascript
// ❌ 错误：解构reactive对象导致响应式丢失
const state = reactive({ count: 0, name: '张三' })
const { count, name } = state // 响应式丢失

// ✅ 解决方案1：使用toRefs
const { count, name } = toRefs(state) // 保持响应式

// ✅ 解决方案2：使用computed
const count = computed(() => state.count)
const name = computed(() => state.name)

// ✅ 解决方案3：直接使用ref替代reactive
const count = ref(0)
const name = ref('张三')
```

**2. 在setup外使用组合式API**

```javascript
// ❌ 错误：在setup或<script setup>外使用组合式API
const count = ref(0) // 在模块作用域直接使用，会报错

// ✅ 解决方案：确保在setup函数或<script setup>内使用
export default {
  setup() {
    const count = ref(0) // 正确
    return { count }
  }
}

// 或在<script setup>中
<script setup>
const count = ref(0) // 正确
</script>
```

**3. 生命周期钩子问题**

```javascript
// ❌ 错误：生命周期钩子放在条件语句内
if (condition) {
  onMounted(() => {
    // 这样可能导致难以预测的行为
  })
}

// ✅ 解决方案：确保生命周期钩子始终在顶层调用
onMounted(() => {
  if (condition) {
    // 条件逻辑放在钩子内部
  }
})
```

## 总结与展望：Composition API的未来

Composition API为Vue开发带来了全新的视角，帮助我们更好地组织和复用代码逻辑。通过本文，你已经了解了：

- Composition API的基础用法和优势
- `<script setup>`语法糖的简洁写法
- 如何创建和使用组合式函数
- 组件间通信和状态管理方法
- 最佳实践和常见错误的解决方案

随着Vue生态的发展，越来越多的库和工具支持Composition API，这种编程方式已经成为Vue 3的主要范式。无论你是新手还是有经验的开发者，掌握Composition API都会让你的Vue开发体验更上一层楼。

开始尝试使用Composition API重构你的项目，你会发现代码变得更清晰、更易维护、更容易复用。从小组件开始，逐步应用这些概念，相信你很快就能领略到它的强大之处。

> 注：本文档会持续更新，欢迎关注！