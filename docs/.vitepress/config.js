import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "前端开发笔记",
    description: "系统化的前端开发知识体系与实战经验分享",
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '前端开发', link: '/frontend/' },
            { text: '关于', link: '/about/' }
        ],
        sidebar: {
            '/frontend/': [
                {
                    text: '前端开发',
                    items: [
                        { text: '介绍', link: '/frontend/' },
                        {
                            text: 'HTML',
                            items: [
                                { text: '基本结构', link: '/frontend/html/structure' },
                                { text: '常用标签', link: '/frontend/html/tags' },
                                { text: '表单控件', link: '/frontend/html/forms' },
                                { text: '语义化标签', link: '/frontend/html/semantic' },
                                { text: '媒体标签', link: '/frontend/html/media' },
                                { text: '可访问性', link: '/frontend/html/accessibility' }
                            ]
                        },
                        {
                            text: 'CSS',
                            items: [
                                { text: '选择器', link: '/frontend/css/selectors' },
                                { text: '盒模型', link: '/frontend/css/box-model' },
                                { text: '定位', link: '/frontend/css/position' },
                                { text: '浮动', link: '/frontend/css/float' },
                                { text: 'Flex 布局', link: '/frontend/css/flex' },
                                { text: 'Grid 布局', link: '/frontend/css/grid' },
                                { text: '媒体查询', link: '/frontend/css/media-queries' },
                                { text: '动画', link: '/frontend/css/animation' },
                                { text: 'SASS/SCSS 基础', link: '/frontend/css/sass' },
                                { text: '层叠与继承', link: '/frontend/css/cascade' },
                                { text: 'BEM 命名规范', link: '/frontend/css/bem' }
                            ]
                        },
                        {
                            text: 'JavaScript',
                            items: [
                                { text: '变量与数据类型', link: '/frontend/javascript/variables' },
                                { text: '运算符与表达式', link: '/frontend/javascript/operators' },
                                { text: '流程控制与函数', link: '/frontend/javascript/control-flow' },
                                { text: '作用域与闭包', link: '/frontend/javascript/scope' },
                                { text: '原型与继承机制', link: '/frontend/javascript/prototype' },
                                { text: '事件机制', link: '/frontend/javascript/events' },
                                { text: '异步编程', link: '/frontend/javascript/async' },
                                { text: 'DOM 与 BOM 操作', link: '/frontend/javascript/dom' },
                                { text: '模块化发展史与标准', link: '/frontend/javascript/modules' },
                                { text: '错误处理机制', link: '/frontend/javascript/error-handling' }
                            ]
                        },
                        {
                            text: 'Vue',
                            items: [
                                { text: '模板语法与指令系统', link: '/frontend/vue/template' },
                                { text: '响应式系统与 Ref/Reactive', link: '/frontend/vue/reactive' },
                                { text: '组件化开发', link: '/frontend/vue/components' },
                                { text: '生命周期钩子', link: '/frontend/vue/lifecycle' },
                                { text: '路由与动态路由', link: '/frontend/vue/router' },
                                { text: '状态管理（Pinia）', link: '/frontend/vue/pinia' },
                                { text: 'Composition API 与 Setup 语法糖', link: '/frontend/vue/composition' },
                                { text: 'Vue DevTools 与调试技巧', link: '/frontend/vue/devtools' }
                            ]
                        },
                        {
                            text: 'Node.js',
                            items: [
                                { text: '环境搭建与运行机制', link: '/frontend/node/environment' },
                                { text: '模块系统', link: '/frontend/node/modules' },
                                { text: '文件系统模块', link: '/frontend/node/fs' },
                                { text: 'HTTP 模块与服务器', link: '/frontend/node/http' },
                                { text: 'NPM 与包管理工具', link: '/frontend/node/package-manager' },
                                { text: 'Express 构建 API', link: '/frontend/node/express' },
                                { text: '中间件机制', link: '/frontend/node/middleware' }
                            ]
                        },
                        {
                            text: '前端工程化',
                            items: [
                                { text: '模块化方案与构建工具', link: '/frontend/engineering/build-tools' },
                                { text: '开发与生产环境配置', link: '/frontend/engineering/environment' },
                                { text: '代码规范与自动化校验', link: '/frontend/engineering/code-quality' },
                                { text: '持续集成与部署', link: '/frontend/engineering/cicd' },
                                { text: '包管理与依赖分析', link: '/frontend/engineering/dependencies' },
                                { text: 'Monorepo 工程管理', link: '/frontend/engineering/monorepo' }
                            ]
                        },
                        {
                            text: 'Git',
                            items: [
                                { text: '基本操作与命令', link: '/frontend/git/basic' },
                                { text: '分支管理与合并策略', link: '/frontend/git/branch' },
                                { text: '多人协作与代码审查', link: '/frontend/git/collaboration' },
                                { text: '版本回退与历史查看', link: '/frontend/git/history' }
                            ]
                        },
                        {
                            text: '性能优化',
                            items: [
                                { text: '加载优化', link: '/frontend/performance/loading' },
                                { text: '渲染优化', link: '/frontend/performance/rendering' },
                                { text: '缓存策略', link: '/frontend/performance/caching' },
                                { text: '前端监控体系', link: '/frontend/performance/monitoring' },
                                { text: '关键渲染路径优化', link: '/frontend/performance/critical-path' },
                                { text: '代码分割与懒加载', link: '/frontend/performance/code-splitting' }
                            ]
                        },
                        {
                            text: '数据结构与算法',
                            items: [
                                { text: '基本数据结构', link: '/frontend/algorithm/data-structures' },
                                { text: '常见算法', link: '/frontend/algorithm/algorithms' },
                                { text: '算法思维与刷题技巧', link: '/frontend/algorithm/skills' },
                                { text: '时间与空间复杂度分析', link: '/frontend/algorithm/complexity' }
                            ]
                        },
                        {
                            text: '网络基础与前端安全',
                            items: [
                                { text: 'HTTP与HTTPS基础', link: '/frontend/network/http-and-https' },
                                { text: '网络底层协议基础', link: '/frontend/network/network-protocols' },
                                { text: '跨域与资源安全', link: '/frontend/network/cross-origin-and-security' },
                                { text: '前端攻击与防御机制', link: '/frontend/network/web-attacks-defense' },
                                { text: '用户身份认证机制', link: '/frontend/network/authentication-mechanisms' },
                                { text: 'CORS原理与配置详解', link: '/frontend/network/cors-detail' },
                                { text: 'XSS跨站脚本攻击详解', link: '/frontend/network/xss-detail' }
                            ]
                        },
                        {
                            text: '浏览器',
                            items: [
                                { text: '浏览器渲染原理', link: '/frontend/browser/rendering' },
                                { text: '事件循环与任务队列机制', link: '/frontend/browser/event-loop' },
                                { text: '存储机制对比', link: '/frontend/browser/storage' },
                                { text: '重排与重绘机制', link: '/frontend/browser/reflow-repaint' }
                            ]
                        },
                        {
                            text: 'SEO',
                            items: [
                                { text: 'SEO 教程概览', link: '/frontend/seo/' },
                                { text: 'SEO 基础知识', link: '/frontend/seo/basic' },
                                { text: '关键词研究', link: '/frontend/seo/keyword-research' },
                                { text: '站内优化', link: '/frontend/seo/on-page-seo' },
                                { text: '技术SEO', link: '/frontend/seo/technical-seo' },
                                { text: '站外优化', link: '/frontend/seo/off-page-seo' },
                                { text: '数据分析与SEO工具', link: '/frontend/seo/analytics-tools' },
                                { text: '高级策略与SEO趋势', link: '/frontend/seo/advanced-strategies' },
                                { text: '实战项目与案例分析', link: '/frontend/seo/case-studies' }
                            ]
                        }
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/yourusername' }
        ],
        footer: {
            message: '用❤️分享前端技术',
            copyright: 'Copyright <a href="https://heshuyue.com/" target="_blank">何书悦</a> © 2024-present'
        }
    }
}) 