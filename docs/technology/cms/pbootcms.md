# PbootCMS

[官网入口](https://www.pbootcms.com/)

PbootCMS 是全新内核且永久开源免费的 PHP 企业网站开发建设管理系统，是一套高效、简洁、 强悍的可免费商用的 PHP CMS 源码，能够满足各类企业网站开发建设的需要。系统采用简单到想哭的模板标签，只要懂 HTML 就可快速开发企业网站。

## 剔除 url 后的 /

路径：\core\basic

1. 找到 Url.php 文件
2. 删除 $suffix = ''; 后的 / 即可

## sitemap 剔除部分菜单路径

路径：\apps\home\model\SitemapModel.php

1. 找到代码 `a.status=1` 所在行
2. 下行添加 `a.scode<>16` 16 为后台的栏目ID，即表示ID为16的文章不生成sitemap
3. 