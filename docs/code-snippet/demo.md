# 代码用例

记录各种组合使用的代码用例

## 【案例】iframe 监听

```vue
<template>
  <n-spin :show="loading" description="公网地址正在加载中,请耐心等待...">
    <iframe ref="iframeRef" class="cus-iframe" :src="iframeUrl" frameborder="0"></iframe>
  </n-spin>
</template>

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
