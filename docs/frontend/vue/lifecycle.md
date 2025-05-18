# Vue 生命周期钩子

## 生命周期概述
- 组件生命周期流程图
- Vue2 与 Vue3 生命周期对比
- 生命周期钩子执行顺序
- 父子组件生命周期关系
- 常见使用场景概览

## Options API 生命周期
- beforeCreate/created
- beforeMount/mounted
- beforeUpdate/updated
- beforeDestroy/destroyed(Vue2)
- beforeUnmount/unmounted(Vue3)

## Composition API 生命周期
- onBeforeMount/onMounted
- onBeforeUpdate/onUpdated
- onBeforeUnmount/onUnmounted
- onActivated/onDeactivated
- onErrorCaptured/onRenderTracked/onRenderTriggered

## 特殊生命周期钩子
- keep-alive 相关钩子
- errorCaptured 错误捕获
- serverPrefetch 服务端渲染钩子
- 自定义生命周期插件
- 组件异步加载与生命周期

## 生命周期最佳实践
- 资源创建与清理
- 数据获取策略
- DOM 操作时机
- 避免内存泄漏
- 性能优化技巧

> 注：本文档会持续更新，欢迎关注！