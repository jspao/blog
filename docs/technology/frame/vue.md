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

## Vue VueUse onClickOutside

[VueUse onClickOutside Demo](https://vueuse.org/core/onClickOutside/#onclickoutside)

::: code-group

```vue [Template]
<template>
  <div class="f-s-c">
    <div v-if="hasEditing" ref="textContainer" :contenteditable="hasEditing" outline-none cursor-text
      @blur="inputBlur" @mousedown="handleMousedown" v-text="flowName"></div>
    <template v-else>
      <div outline-none contenteditable="false">
        <b>{{ flowName }}</b>
      </div>
    </template>
    <div class="f-c-c ml-10">
      <n-button text @click="handleEditor">
        <template #icon>
          <div class="i-ph:pencil-simple-line-light"></div>
        </template>
      </n-button>
    </div>
  </div>
</template>
```

```vue [JavaScript]
<script setup>
// 实际运用中flowName可以通过状态获取然后通过computed计算到页面中
const flowName = ref('流程名称')
const hasEditing = ref(false)
const textContainer = ref()

// 切换到编辑状态后需要阻止冒泡
const handleMousedown = (e) => {
  if (hasEditing) {
    e.stopPropagation()
  }
}

// 点击一个Dom其他地方的逻辑操作
onClickOutside(textContainer, () => {
  hasEditing.value = false
})

// 存储数据
const inputBlur = (e) => {
  $message.success('修改成功')
  flowName.value = e.target.textContent
}

// 启用编辑
const handleEditor = () => {
  hasEditing.value = true
  nextTick(() => {
    const innerContent = textContainer.value
    if (!innerContent) return
    // 选择与蓝色选区
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(innerContent)
    selection.removeAllRanges()
    selection.addRange(range)
  })
}
</script>
```

:::
