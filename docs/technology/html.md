# HTML <Badge type="info" text="超文本标记语言" />

## 什么是 HTML？

HTML 是用来描述网页的一种语言。

- HTML 指的是超文本标记语言 (Hyper Text Markup Language)
- HTML 不是一种编程语言，而是一种标记语言 (markup language)
- 标记语言是一套标记标签 (markup tag)
- HTML 使用标记标签来描述网页

## HTML 标签

HTML 标记标签通常被称为 HTML 标签 (HTML tag)。

- HTML 标签是由尖括号包围的关键词，比如 `<html>`
- HTML 标签通常是成对出现的，比如 `<b>` 和 `</b>`
- 标签对中的第一个标签是开始标签，第二个标签是结束标签
- 开始和结束标签也被称为开放标签和闭合标签

## HTML 文档 = 网页

- HTML 文档描述网页
- HTML 文档包含 HTML 标签和纯文本
- HTML 文档也被称为网页
- Web 浏览器的作用是读取 HTML 文档，并以网页的形式显示出它们。浏览器不会显示 HTML 标签，而是使用标签来解释页面的内容：

```html
<html>
  <body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
  </body>
</html>
```

例子解释

`<html>` 与 `</html>` 之间的文本描述网页
`<body>` 与 `</body>` 之间的文本是可见的页面内容
`<h1>` 与 `</h1>` 之间的文本被显示为标题
`<p>` 与 `</p>` 之间的文本被显示为段落

## 块级元素

在 CSS 中，参与块级布局的内容被称为块级内容 **（block-level content）**。

在块级布局中，从包含块的顶部开始，盒子总是一个接着一个地垂直放置。每个盒子的左外边缘触及包含块的左边缘。块级元素总是开始在新的行/列上。在水平书写模式中，像英语或者阿拉伯语，它占据父元素（容器）的整个水平空间和等于其内容高度的垂直空间，从而创建一个“区块”。

## 行级元素

在 CSS 中，参与行内布局的内容被称为行级内容 **（inline-level content）**。默认情况下，大多数文本、替换元素以及生成的内容都是行级的。

在行内布局中，通常将文本、替换元素以及其它的行级盒分段为一堆按顺序排列的盒子来进行布局。在每个行盒中，行级盒子相互垂直或者水平对齐，具体取决于书写模式。通常，它们与文本的基线进行对齐。这可以使用 CSS 进行更改。

## BFC