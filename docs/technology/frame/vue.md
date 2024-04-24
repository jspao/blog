# Vue 2 & Vue 3

## Vue3 Case iframe 监听

::: code-group

```vue [Template]
<template>
  <n-spin :show="loading" description="公网地址正在加载中,请耐心等待...">
    <iframe ref="iframeRef" class="cus-iframe" :src="iframeUrl" frameborder="0"></iframe>
  </n-spin>
</template>
```

```vue [JavaScript]
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  iframe: {
    type: String,
    default: "",
  },
});

const loading = ref(false);
const iframeUrl = ref(null);
const iframeRef = ref(null);

function closeLoading() {
  loading.value = false;
}

// 如果是组件形式则需要
watch(
  () => props.iframe,
  (val) => {
    iframeUrl.value = val;
  }
);

onMounted(() => {
  loading.value = true;
  if (iframeRef.attachEvent) {
    // IE
    iframeRef.attachEvent("onload", closeLoading());
  } else {
    iframeRef.onload = closeLoading();
  }
});
</script>
```

:::

## Vue Case mitt

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
