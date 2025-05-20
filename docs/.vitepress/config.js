import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "前端开发笔记",
    description: "系统化的前端开发知识体系与实战经验分享",
    ignoreDeadLinks: true,
    themeConfig: {
        search: {
            provider: 'local'
        },
        nav: [
            { text: '首页', link: '/' },
            { text: 'HTML', link: '/html/' },
            { text: 'CSS', link: '/css/' },
            { text: 'JavaScript', link: '/javascript/' },
            { text: 'Vue', link: '/vue/' },
            { text: 'More', link: '/content.html' },
            { text: '关于', link: '/about/' },
        ],
        sidebar: {
            // '/': [
            //     {
            //         text: '前端开发',
            //         items: [
            //             // { text: '介绍', link: '/frontend/' },
            //             {
            //                 text: 'HTML',
            //                 items: [
            //                     { text: '基本结构', link: '/html/structure' },
            //                     { text: '常用标签', link: '/html/tags' },
            //                     { text: '表单控件', link: '/html/forms' },
            //                     { text: '语义化标签', link: '/html/semantic' },
            //                     { text: '媒体标签', link: '/html/media' },
            //                     { text: '可访问性', link: '/html/accessibility' }
            //                 ]
            //             },
            //             {
            //                 text: 'CSS',
            //                 items: [
            //                     { text: '选择器', link: '/css/selectors' },
            //                     { text: '盒模型', link: '/css/box-model' },
            //                     { text: '定位', link: '/css/position' },
            //                     { text: '浮动', link: '/css/float' },
            //                     { text: 'Flex 布局', link: '/css/flex' },
            //                     { text: 'Grid 布局', link: '/css/grid' },
            //                     { text: '媒体查询', link: '/css/media-queries' },
            //                     { text: '动画', link: '/css/animation' },
            //                     { text: 'SASS/SCSS 基础', link: '/css/sass' },
            //                     { text: '层叠与继承', link: '/css/cascade' },
            //                     { text: 'BEM 命名规范', link: '/css/bem' }
            //                 ]
            //             },
            //             {
            //                 text: 'JavaScript',
            //                 items: [
            //                     { text: '变量与数据类型', link: '/javascript/variables' },
            //                     { text: '运算符与表达式', link: '/javascript/operators' },
            //                     { text: '流程控制与函数', link: '/javascript/control-flow' },
            //                     { text: '作用域与闭包', link: '/javascript/scope' },
            //                     { text: '原型与继承机制', link: '/javascript/prototype' },
            //                     { text: '事件机制', link: '/javascript/events' },
            //                     { text: '异步编程', link: '/javascript/async' },
            //                     { text: 'DOM 与 BOM 操作', link: '/javascript/dom' },
            //                     { text: '模块化发展史与标准', link: '/javascript/modules' },
            //                     { text: '错误处理机制', link: '/javascript/error-handling' }
            //                 ]
            //             },
            //             {
            //                 text: 'Vue',
            //                 items: [
            //                     { text: '模板语法与指令系统', link: '/vue/template' },
            //                     { text: '响应式系统与 Ref/Reactive', link: '/vue/reactive' },
            //                     { text: '组件化开发', link: '/vue/components' },
            //                     { text: '生命周期钩子', link: '/vue/lifecycle' },
            //                     { text: '路由与动态路由', link: '/vue/router' },
            //                     { text: '状态管理（Pinia）', link: '/vue/pinia' },
            //                     { text: 'Composition API 与 Setup 语法糖', link: '/vue/composition' },
            //                     { text: 'Vue DevTools 与调试技巧', link: '/vue/devtools' }
            //                 ]
            //             },
            //             {
            //                 text: 'Node.js',
            //                 items: [
            //                     { text: '环境搭建与运行机制', link: '/node/environment' },
            //                     { text: '模块系统', link: '/node/modules' },
            //                     { text: '文件系统模块', link: '/node/fs' },
            //                     { text: 'HTTP 模块与服务器', link: '/node/http' },
            //                     { text: 'NPM 与包管理工具', link: '/node/package-manager' },
            //                     { text: 'Express 构建 API', link: '/node/express' },
            //                     { text: '中间件机制', link: '/node/middleware' }
            //                 ]
            //             },
            //             {
            //                 text: '前端工程化',
            //                 items: [
            //                     { text: '模块化方案与构建工具', link: '/engineering/build-tools' },
            //                     { text: '开发与生产环境配置', link: '/engineering/environment' },
            //                     { text: '代码规范与自动化校验', link: '/engineering/code-quality' },
            //                     { text: '持续集成与部署', link: '/engineering/cicd' },
            //                     { text: '包管理与依赖分析', link: '/engineering/dependencies' },
            //                     { text: 'Monorepo 工程管理', link: '/engineering/monorepo' }
            //                 ]
            //             },
            //             {
            //                 text: 'Git',
            //                 items: [
            //                     { text: '基本操作与命令', link: '/git/basic' },
            //                     { text: '分支管理与合并策略', link: '/git/branch' },
            //                     { text: '多人协作与代码审查', link: '/git/collaboration' },
            //                     { text: '版本回退与历史查看', link: '/git/history' }
            //                 ]
            //             },
            //             {
            //                 text: '性能优化',
            //                 items: [
            //                     { text: '加载优化', link: '/performance/loading' },
            //                     { text: '渲染优化', link: '/performance/rendering' },
            //                     { text: '缓存策略', link: '/performance/caching' },
            //                     { text: '前端监控体系', link: '/performance/monitoring' },
            //                     { text: '关键渲染路径优化', link: '/performance/critical-path' },
            //                     { text: '代码分割与懒加载', link: '/performance/code-splitting' }
            //                 ]
            //             },
            //             {
            //                 text: '数据结构与算法',
            //                 items: [
            //                     { text: '基本数据结构', link: '/algorithm/data-structures' },
            //                     { text: '常见算法', link: '/algorithm/algorithms' },
            //                     { text: '算法思维与刷题技巧', link: '/algorithm/skills' },
            //                     { text: '时间与空间复杂度分析', link: '/algorithm/complexity' }
            //                 ]
            //             },
            //             {
            //                 text: '网络基础与前端安全',
            //                 items: [
            //                     { text: 'HTTP与HTTPS基础', link: '/network/http-and-https' },
            //                     { text: '网络底层协议基础', link: '/network/network-protocols' },
            //                     { text: '跨域与资源安全', link: '/network/cross-origin-and-security' },
            //                     { text: '前端攻击与防御机制', link: '/network/web-attacks-defense' },
            //                     { text: '用户身份认证机制', link: '/network/authentication-mechanisms' },
            //                     { text: 'CORS原理与配置详解', link: '/network/cors-detail' },
            //                     { text: 'XSS跨站脚本攻击详解', link: '/network/xss-detail' }
            //                 ]
            //             },
            //             {
            //                 text: '浏览器',
            //                 items: [
            //                     { text: '浏览器渲染原理', link: '/browser/rendering' },
            //                     { text: '事件循环与任务队列机制', link: '/browser/event-loop' },
            //                     { text: '存储机制对比', link: '/browser/storage' },
            //                     { text: '重排与重绘机制', link: '/browser/reflow-repaint' }
            //                 ]
            //             },
            //             {
            //                 text: 'SEO',
            //                 items: [
            //                     { text: 'SEO 教程概览', link: '/seo/' },
            //                     { text: 'SEO 基础知识', link: '/seo/basic' },
            //                     { text: '关键词研究', link: '/seo/keyword-research' },
            //                     { text: '站内优化', link: '/seo/on-page-seo' },
            //                     { text: '技术SEO', link: '/seo/technical-seo' },
            //                     { text: '站外优化', link: '/seo/off-page-seo' },
            //                     { text: '数据分析与SEO工具', link: '/seo/analytics-tools' },
            //                     { text: '高级策略与SEO趋势', link: '/seo/advanced-strategies' },
            //                     { text: '实战项目与案例分析', link: '/seo/case-studies' }
            //                 ]
            //             },
            //             {
            //                 text: '软技能',
            //                 items: [
            //                     { text: '基础', link: '/soft-skills/soft-skills-soft-skills-foundation' },
            //                     { text: '实用指南', link: '/soft-skills/soft-skills-soft-skills-practical-guide' },
            //                     { text: '高级技能', link: '/soft-skills/soft-skills-soft-skills-advanced' },
            //                     { text: '影响力与领导力', link: '/soft-skills/soft-skills-influence-leadership' },
            //                     { text: '技术与软技能平衡', link: '/soft-skills/soft-skills/balancing-tech-and-soft-skills' }
            //                 ]
            //             }
            //         ]
            //     }
            // ],
            '/html/': [
                {
                    text: 'HTML',
                    items: [
                        { text: '概览', link: '/html/' },
                        { text: '基本结构', link: '/html/structure' },
                        { text: '常用标签', link: '/html/tags' },
                        { text: '表单控件', link: '/html/forms' },
                        { text: '语义化标签', link: '/html/semantic' },
                        { text: '媒体标签', link: '/html/media' },
                        { text: '可访问性', link: '/html/accessibility' }
                    ]
                },
            ],
            '/css/': [
                {
                    text: 'CSS',
                    items: [
                        { text: '概览', link: '/css/' },
                        { text: '选择器', link: '/css/selectors' },
                        { text: '盒模型', link: '/css/box-model' },
                        { text: '定位', link: '/css/position' },
                        { text: '浮动', link: '/css/float' },
                        { text: 'Flex 布局', link: '/css/flex' },
                        { text: 'Grid 布局', link: '/css/grid' },
                        { text: '媒体查询', link: '/css/media-queries' },
                        { text: '动画', link: '/css/animation' },
                        { text: 'SASS/SCSS 基础', link: '/css/sass' },
                        { text: '层叠与继承', link: '/css/cascade' },
                        { text: 'BEM 命名规范', link: '/css/bem' }
                    ]
                },
            ],
            'javascript/': [
                {
                    text: 'JavaScript',
                    items: [
                        { text: '概览', link: '/javascript/' },
                        { text: '变量与数据类型', link: '/javascript/variables' },
                        { text: '运算符与表达式', link: '/javascript/operators' },
                        { text: '流程控制与函数', link: '/javascript/control-flow' },
                        { text: '作用域与闭包', link: '/javascript/scope' },
                        { text: '原型与继承机制', link: '/javascript/prototype' },
                        { text: '事件机制', link: '/javascript/events' },
                        { text: '异步编程', link: '/javascript/async' },
                        { text: 'DOM 与 BOM 操作', link: '/javascript/dom' },
                        { text: '模块化发展史与标准', link: '/javascript/modules' },
                        { text: '错误处理机制', link: '/javascript/error-handling' }
                    ]
                },
            ],
            '/vue/': [
                {
                    text: 'Vue',
                    items: [
                        { text: '概览', link: '/vue/' },
                        { text: '模板语法与指令系统', link: '/vue/template' },
                        { text: '响应式系统与 Ref/Reactive', link: '/vue/reactive' },
                        { text: '组件化开发', link: '/vue/components' },
                        { text: '生命周期钩子', link: '/vue/lifecycle' },
                        { text: '路由与动态路由', link: '/vue/router' },
                        { text: '状态管理（Pinia）', link: '/vue/pinia' },
                        { text: 'Composition API 与 Setup 语法糖', link: '/vue/composition' },
                        { text: 'Vue DevTools 与调试技巧', link: '/vue/devtools' }
                    ]
                },
            ],
            '/node/': [
                {
                    text: 'Node.js',
                    items: [
                        { text: '概览', link: '/node/' },
                        { text: '环境搭建与运行机制', link: '/node/environment' },
                        { text: '模块系统', link: '/node/modules' },
                        { text: '文件系统模块', link: '/node/fs' },
                        { text: 'HTTP 模块与服务器', link: '/node/http' },
                        { text: 'NPM 与包管理工具', link: '/node/package-manager' },
                        { text: 'Express 构建 API', link: '/node/express' },
                        { text: '中间件机制', link: '/node/middleware' }
                    ]
                },
            ],
            '/engineering/': [
                {
                    text: '前端工程化',
                    items: [
                        { text: '概览', link: '/engineering/' },
                        { text: '模块化方案与构建工具', link: '/engineering/build-tools' },
                        { text: '开发与生产环境配置', link: '/engineering/environment' },
                        { text: '代码规范与自动化校验', link: '/engineering/code-quality' },
                        { text: '持续集成与部署', link: '/engineering/cicd' },
                        { text: '包管理与依赖分析', link: '/engineering/dependencies' },
                        { text: 'Monorepo 工程管理', link: '/engineering/monorepo' }
                    ]
                },
            ],
            '/git/': [
                {
                    text: 'Git',
                    items: [
                        { text: '概览', link: '/git/' },
                        { text: '基本操作与命令', link: '/git/basic' },
                        { text: '分支管理与合并策略', link: '/git/branch' },
                        { text: '多人协作与代码审查', link: '/git/collaboration' },
                        { text: '版本回退与历史查看', link: '/git/history' }
                    ]
                },
            ],
            '/performance/': [
                {
                    text: '性能优化',
                    items: [
                        { text: '概览', link: '/performance/' },
                        { text: '加载优化', link: '/performance/loading' },
                        { text: '渲染优化', link: '/performance/rendering' },
                        { text: '缓存策略', link: '/performance/caching' },
                        { text: '前端监控体系', link: '/performance/monitoring' },
                        { text: '关键渲染路径优化', link: '/performance/critical-path' },
                        { text: '代码分割与懒加载', link: '/performance/code-splitting' }
                    ]
                },
            ],
            '/algorithm/': [
                {
                    text: '数据结构与算法',
                    items: [
                        { text: '概览', link: '/algorithm/' },
                        { text: '基本数据结构', link: '/algorithm/data-structures' },
                        { text: '常见算法', link: '/algorithm/algorithms' },
                        { text: '算法思维与刷题技巧', link: '/algorithm/skills' },
                        { text: '时间与空间复杂度分析', link: '/algorithm/complexity' }
                    ]
                },
            ],
            '/network/': [
                {
                    text: '网络基础与前端安全',
                    items: [
                        { text: '概览', link: '/network/' },
                        { text: 'HTTP与HTTPS基础', link: '/network/http-and-https' },
                        { text: '网络底层协议基础', link: '/network/network-protocols' },
                        { text: '跨域与资源安全', link: '/network/cross-origin-and-security' },
                        { text: '前端攻击与防御机制', link: '/network/web-attacks-defense' },
                        { text: '用户身份认证机制', link: '/network/authentication-mechanisms' },
                        { text: 'CORS原理与配置详解', link: '/network/cors-detail' },
                        { text: 'XSS跨站脚本攻击详解', link: '/network/xss-detail' }
                    ]
                },
            ],
            '/browser/': [
                {
                    text: '浏览器',
                    items: [
                        { text: '概览', link: '/browser/' },
                        { text: '浏览器渲染原理', link: '/browser/rendering' },
                        { text: '事件循环与任务队列机制', link: '/browser/event-loop' },
                        { text: '存储机制对比', link: '/browser/storage' },
                        { text: '重排与重绘机制', link: '/browser/reflow-repaint' }
                    ]
                },
            ],
            '/seo/': [
                {
                    text: 'SEO',
                    items: [
                        { text: '概览', link: '/seo/' },
                        { text: 'SEO 教程概览', link: '/seo/' },
                        { text: 'SEO 基础知识', link: '/seo/basic' },
                        { text: '关键词研究', link: '/seo/keyword-research' },
                        { text: '站内优化', link: '/seo/on-page-seo' },
                        { text: '技术SEO', link: '/seo/technical-seo' },
                        { text: '站外优化', link: '/seo/off-page-seo' },
                        { text: '数据分析与SEO工具', link: '/seo/analytics-tools' },
                        { text: '高级策略与SEO趋势', link: '/seo/advanced-strategies' },
                        { text: '实战项目与案例分析', link: '/seo/case-studies' }
                    ]
                },
            ],
            'soft-skills': [
                {
                    text: '软技能',
                    items: [
                        { text: '概览', link: '/soft-skills/' },
                        { text: '基础', link: '/soft-skills/frontend-soft-skills-foundation' },
                        { text: '实用指南', link: '/soft-skills/frontend-soft-skills-practical-guide' },
                        { text: '高级技能', link: '/soft-skills/frontend-soft-skills-advanced' },
                        { text: '影响力与领导力', link: '/soft-skills/frontend-influence-leadership' },
                        { text: '技术与软技能平衡', link: '/soft-skills/balancing-tech-and-soft-skills' }
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/heshuyue' },
        ],
        footer: {
            message: '用❤️分享前端技术 fedev.wiki',
            copyright: 'Copyright <a href="https://heshuyue.com/" target="_blank">何书悦</a> © 2024-present'
        }
    }
}) 