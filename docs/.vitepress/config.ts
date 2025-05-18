import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "我的博客",
    description: "使用 VitePress 构建的个人博客",
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '文章', link: '/articles/' },
            { text: '关于', link: '/about/' }
        ],
        sidebar: {
            '/articles/': [
                {
                    text: '文章列表',
                    items: [
                        { text: '第一篇', link: '/articles/first' }
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/yourusername' }
        ]
    }
}) 