# Sass

[中文文档入口](https://sass.bootcss.com/documentation.html)

Sass 是一种 CSS 的预编译语言。它提供了 变量（variables）、嵌套（nested rules）、 混合（mixins）、 函数（functions）等功能，并且完全兼容 CSS 语法。Sass 能够帮助复杂的样式表更有条理， 并且易于在项目内部或跨项目共享设计。

## 编写一个 BEM Mixin

```scss
$block-sel: "-" !default;
$element-sel: "__" !default;
$modifier-sel: "--" !default;
$namespace: "jspao" !default;

// block
@mixin b($block) {
  $B: $namespace + $block-sel + $block;
  .#{$B} {
    @content;
  }
}

// element
@mixin e($element) {
  $selector: &;
  @at-root {
    #{$selector + $element-sel + $element} {
      @content;
    }
  }
}

// modifier
@mixin m($modifier) {
  $selector: &;
  @at-root {
    #{$selector + $modifier-sel + $modifier} {
      @content;
    }
  }
}
```

使用方式

```scss
@include b("wrap") {
  position: relative;
  overflow: hidden;
  height: 100%;
  background-color: white;
  @include e("body") {
    display: flex;
    flex-flow: row;
    width: 100%;
    height: calc(100% - 56px);
  }
  @include e("side") {
    position: relative;
  }
  @include e("menu") {
    position: relative;
    width: 200px;
    height: calc(100% - 50px);
  }
  @include e("content") {
    flex: auto;
    background-color: #f6f7f9;
  }
  @include m("shadow") {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  }
}
```

HTML 对照

```html
<div class="yzp-wrap">
  <div class="yzp-wrap--shadow">AppHead</div>
  <div class="yzp-wrap__body">
    <div class="yzp-wrap__side">
      <div class="yzp-wrap__menu">SideMenu</div>
    </div>
    <div class="yzp-wrap__content">
      <div class="p-24">AppMain</div>
    </div>
  </div>
</div>
```
