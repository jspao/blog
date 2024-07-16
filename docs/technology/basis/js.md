# JavaScript

JavaScript（简称“JS”）是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。

## H5 Copy 功能兼容多机型

```javascript
copyText(text) {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString();
    let input = document.querySelector('#copy-input');
    if (!input) {
        input = document.createElement('input');
        input.id = "copy-input";
        input.readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
        input.style.position = "absolute";
        input.style.left = "-1000px";
        input.style.zIndex = "-1000";
        document.body.appendChild(input)
    }

    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.toast = true;
        if (this.toast) {
            setTimeout(() => {
                this.toast = false
            }, 1000);
        }
    } else {
        console.log('不兼容');
    }
    input.blur();
    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
        if (textbox.createTextRange) {//ie
            const range = textbox.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);//起始光标
            range.moveEnd('character', stopIndex - startIndex);//结束光标
            range.select();//不兼容苹果
        } else {//firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
        }
    }
}
```

## H5 场景下载图片

```javascript
downloadCode() {
    var oQrcode = document.querySelector('#qrcode')
    var url = oQrcode.src
    var a = document.createElement('a')
    var event = new MouseEvent('click')
    // 下载图名字
    a.download = '这是下载的文件名称'
    //url
    a.href = url
    //合成函数，执行下载
    a.dispatchEvent(event)
}
```

## jQuery

[官方入口](https://jquery.com/)

jQuery 是一个轻量级的 JavaScript 库，它简化了 HTML 文档的获取和操作，提供了事件处理、动画效果、Ajax 请求等功能。

## 动态将 CSS 变量设置为内联样式

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swiper Theme Color Example</title>
</head>
<body>
    <div id="mySwiper" class="swiper-container">
        <!-- Swiper content goes here -->
    </div>

    <script>
        // 选择目标元素
        var swiperContainer = document.getElementById('mySwiper');

        // 动态添加 CSS 变量
        swiperContainer.style.setProperty('--swiper-theme-color', '#ff0000'); // 红色
    </script>
</body>
</html>
```