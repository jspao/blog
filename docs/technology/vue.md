# Vue

## UnoCSS

## 事件总线 mitt

`eventBus` 替代品 `mitt`

`on` 方法添加事件，`off` 方法移除，`clear` 清空所有

```js
// @/utils/bus.js
import mitt from "mitt";
const emitter = mitt();
export default emitter;

// vue components
import emitter from "@/utils/bus";

// 监听指定事件
emitter.on("foo", (e) => console.log("foo", e));

// 监听所有事件
emitter.on("*", (type, e) => console.log(type, e));

// 触发事件
emitter.emit("foo", { a: "b" });

// 清除所有事件
emitter.all.clear();

// 监听函数
function onFoo() {}
emitter.on("foo", onFoo); // 监听
emitter.off("foo", onFoo); // 移除
```
