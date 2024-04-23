# 搭建 Vitepress 文档

本文记录，利用 vitepress 从 0 开始搭建的步骤，最终部署到 Github Pages。

[官方文档](https://vitepress.dev/zh/guide/what-is-vitepress)

## VitePress 是什么？

VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## 准备工作

1. 安装`nodejs`，[官网入口](https://nodejs.org)，建议下载 LTS 版本（稳定版）
2. 安装`pnpm`，[中文官网入口](https://www.pnpm.cn)，[英文官网入口](https://pnpm.io/)，根据自己语言喜好选择

## 安装 VitePress

[官方步骤入口](https://vitepress.dev/zh/guide/getting-started)

```sh
pnpm add -D vitepress
```

安装完成后，还需要执行一次安装向导

```sh
pnpm vitepress init
```

将需要回答几个简单的问题：

```sh
# 欢迎来到VitePress
┌  Welcome to VitePress!
│  # 在哪里初始化项目
◇  Where should VitePress initialize the config?
│  ./docs
│  # 网站标题
◇  Site title:
│  My Awesome Project
│  # 网站描述
◇  Site description:
│  A VitePress Site
│  # 主题
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs) # 默认主题
│  ○ Default Theme + Customization # 默认主题 + 自定义
│  ○ Custom Theme # 自定义主题
└
```

执行完向导以后，即可启动项目

```sh
pnpm docs:dev
```

项目启动以后可以根据官网进行个性化配置，这里就不过多赘述了。

## 部署到 Github Pages

1. 准备一个github账号
2. 准备一个github仓库，仓库名称随意，我见过的：`blog`，`Notes`，`doc`
3. 如果需要使用独立域名的话，可以前往对应的域名厂商注册及购买，我常用的：[阿里云](https://wanwang.aliyun.com/domain/searchresult/)，[西部数码](https://www.west.cn/services/domain/)，[Godaddy](https://dcc.godaddy.com/)

