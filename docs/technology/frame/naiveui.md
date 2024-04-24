# NaiveUI

NaiveUI 特殊场景记录，Naive UI 是一个 Vue3 的组件库。【[传送门](https://www.naiveui.com/zh-CN/os-theme/components/button)】

## h 函数内组件插槽用法

```js
import { h } from "vue";
import { NButton } from "naive-ui";

export default {
  render() {
    return h(
      NButton,
      {},
      {
        default: () => "Click me!",
        namedSlot: () => h("span", "This is a named slot"),
      }
    );
  },
};
```

## h 函数内组件中使用自定义指令

- `withDirectives` 只能在 `render` 或 `setup` 函数中使用
- 允许将指令应用于 `VNode`
- 返回一个包含应用指令的 ` VNode`

```js
// 使用前需要先调用vue内部方法
import { withDirectives, resolveDirective } from "vue";
// 业务代码：基于n-table组件
const tabCol = [
  // ...
  {
    title: "操作",
    key: "action",
    width: 200,
    fixed: "right",
    render(row, index) {
      return [h(NButton, { text: true, type: "primary", onClick: () => onEdit(row) }, { default: () => "编辑" }), withDirectives(h(NDivider, { vertical: true }, null), [[resolveDirective("permission"), ["user:editpassword"]]]), withDirectives(h(NButton, { text: true, type: "primary", onClick: () => onPassword(row) }, { default: () => "密码" }), [[resolveDirective("permission"), ["user:editpassword"]]]), h(NDivider, { vertical: true }, null), h(NButton, { text: true, type: "error", onClick: () => onDelete(row) }, { default: () => "删除" })];
    },
  },
];
```

## n-tree 组件实例

::: code-group

```vue [Vue]
<template>
  <n-card>
    <n-tree block-line expand-on-click :on-load="handleLoad" :data="treeData" key-field="id" label-field="name" :render-prefix="renderPrefix" :render-suffix="renderSuffix" />
  </n-card>
</template>
```

```js [JavaScript]
import { NButton, NSpace } from "naive-ui";
import TheIcon from "@/components/icon/TheIcon.vue";

// 节点前缀的渲染函数
function renderPrefix({ option }) {
  return h(TheIcon, { size: 16, icon: option.icon || "tabler:help-small" });
}

// 节点后缀的渲染函数
function renderSuffix({ option }) {
  return h(
    NSpace,
    {},
    {
      default: () => [
        h(
          NButton,
          { text: true, type: "primary", onClick: (e) => onAdd(e, 1, option).stop() },
          {
            default: () => "新增文件",
          }
        ),
      ],
    }
  );
}

// 树结构数据
const treeData = ref([]);

// 懒加载
const handleLoad = (node) => {
  return new Promise(async (resolve) => {
    const { result } = await readResourceListApi({ id: node.id });
    node.children = result.map((item) => {
      item.children = undefined;
      item.isLeaf = false;
      return item;
    });
    resolve();
  });
};

// api
async function getList() {
  treeData.value = [];
  try {
    const { result } = await readResourceListApi();
    treeData.value = result.map((item) => ({ ...item, children: undefined, isLeaf: false }));
  } catch (error) {}
}

function onAdd(e, type, option) {
  e.stopPropagation();
}

onMounted(async () => {
  await getList();
});
```

:::
