export default {
  lang: "zh",
  title: "技术博客",
  description: "项目，经验，代码片段",
  base: "/",
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],
  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local",
    },
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    outline: {
      level: "deep",
      label: "当前页目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    editLink: {
      pattern: "https://git.quickjs.cn:8443/yzp/yzp-fe-wiki/-/tree/master/docs/:path",
      text: "错误修正及完善",
    },
    footer: {
      message: "一个真实程序员的工作与生活",
      copyright: "© 2024 jspao.com",
    },
    nav: [
      { text: "技术栈", link: "/technology/vue", activeMatch: "/technology/" },
      { text: "工具使用", link: "/tools/git", activeMatch: "/tools/" },
      {
        text: "常用第三方入口",
        items: [
          { text: "微信公众平台", link: "https://mp.weixin.qq.com/" },
          { text: "JSON格式化", link: "https://www.sojson.com/" },
          { text: "在线工具", link: "https://tool.lu/" },
          { text: "Vue3官网", link: "https://cn.vuejs.org/api/" },
          { text: "VueUse官网", link: "https://vueuse.org/guide/" },
          { text: "NaiveUI官网", link: "https://www.naiveui.com/zh-CN/os-theme/components/button" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "" }],
    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: [
          {
            text: "使用指南",
            collapsed: false,
            items: [
              { text: "快速开始", link: "getting-started" },
              { text: "如何优雅的编写内容?", link: "markdown" },
            ],
          },
        ],
      },
      "/technology/": {
        base: "/technology/",
        items: [
          {
            text: "常用技术栈",
            collapsed: false,
            items: [
              { text: "Vue", link: "vue" },
              { text: "NaiveUI", link: "naiveui" },
              { text: "NestJS", link: "nestjs" },
              { text: "Nuxt", link: "nuxtjs" },
              { text: "Electron", link: "electronjs" },
            ],
          },
        ],
      },
      "/code-snippet/": {
        base: "/code-snippet/",
        items: [
          {
            text: "代码片段",
            collapsed: false,
            items: [
              { text: "JavaScript", link: "js" },
              { text: "CSS", link: "css" },
              { text: "HTML", link: "html" },
              { text: "Demo", link: "demo" },
            ],
          },
        ],
      },
      "/tools/": {
        base: "/tools/",
        items: [
          {
            text: "工具使用",
            collapsed: false,
            items: [
              { text: "包管理工具", link: "package" },
              { text: "Git", link: "git" },
              { text: "pm2", link: "pm2" },
              { text: "nvm", link: "nvm" },
              { text: "VSCode", link: "vscode" },
              { text: "Linux", link: "linux" },
              { text: "Docker", link: "docker" },
            ],
          },
        ],
      },
    },
  },
};
