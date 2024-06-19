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

## n-tree 懒加载实例

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

## n-table 实例

::: code-group

```vue [Vue]
<template>
  <n-data-table :remote="true" :pagination="pagination" :paginate-single-page="false" :columns="columns"
  @update:checked-row-keys="handleCheck" :loading="loading" :data="list" :row-key="(row) => row.dictCode">
    <template #empty>
      <div>
        <div>
          <img :src="nodata" alt="nodata" class="w-180px" />
        </div>
        <div class="text-center text-12 c-#00000040">
          暂无数据
        </div>
      </div>
    </template>
  </n-data-table>
</template>
```

```js [JavaScript]
// 无数据时候的占位图，图片路径自行定义
const nodata = new URL("../../../assets/common/nodata.png", import.meta.url).href;
// 分页，动态table一定要是开启remote为true
const pagination = reactive({
  pageNum: 1,
  pageSize: 15,
  itemCount: 0,
  pageSizes: [15, 30, 60, 90, 120],
  showSizePicker: true,
  onChange: (page) => {
    pagination.pageNum = page;
    getList()
  },
  onUpdatePageSize: (size) => {
    pagination.pageSize = size
    pagination.pageNum = 1
    getList()
  },
})
// 加载及数据字段
const loading = ref(false)
const list = ref([])
const selectKeys = ref([])
// 涵盖序号及选项
const columns = [
  {
    type: 'selection',
  },
  {
    title: "序号",
    key: "key",
    render: (row, index) => {
      return index + 1;
    }
  },
  {
    title: '字典标签',
    key: 'dictLabel',
    render: (row) => {
      return h(NTag, {
        bordered: false,
        type: row.listClass,
      }, {
        default: () => row.dictLabel
      })
    }
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'action',
    render(row) {
      return [
        h(NSpace, {}, {
          default: () => [
            h(NButton, { type: 'primary', strong: true, secondary: true, onClick: () => onEdit(row) }, { default: () => '编辑' }),
            h(NButton, { type: 'error', strong: true, secondary: true, onClick: () => handleDelete(row) }, { default: () => '删除' }),
          ]
        })

      ]
    }
  },
]
// 操作方法
const onEdit = async (row) => {
  showModal.value = true
  modalTitle.value = '编辑字典数据'
  const { data } = await getDictItemDetailApi(row.dictCode)
  model.value = data
}
// 删除方法
const handleDelete = async (row) => {
  let ids = row.dictCode || selectKeys.value.join(',')
  const d = $dialog.warning({
    title: '删除警告',
    content: `您确定要删除【${ids}】? 删除后将抹除该数据在系统中的记录!`,
    positiveText: '确定',
    negativeText: '取消',
    autoFocus: false,
    onPositiveClick: async () => {
      d.loading = true
      try {
        const { msg } = await deleteDictItemApi(ids)
        $message.success(msg)
        await getList()
      } catch (err) {
        d.loading = false
      }
    },
    onNegativeClick: () => {
      d.loading = false
    },
  })
}
// 选项收集函数
const handleCheck = (select) => {
  selectKeys.value = select
}
```

:::

## n-model 实例

重点是结构，自由编排内容是自由发挥的区块，其余的采用通用样式编写

::: code-group

```vue [Vue]
<template>
  <n-modal v-model:show="showModal" :trap-focus="false">
    <div class="bg-white">
      <div class="f-b-c p-16 bg-#f5f5f5">
        <div>{{ modalTitle }}</div>
        <div>
          <n-button text @click="handleClose">
            <template #icon>
              <div class="i-ph:x-light"></div>
            </template>
          </n-button>
        </div>
      </div>
      <div class="w-500 p-16">
        <!-- 自由编排内容: start -->
        <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
          <n-form-item label="字典类型" path="dictType">
            <n-input v-model:value="model.dictType" disabled placeholder="请输入字典类型" />
          </n-form-item>
          <n-form-item label="显示排序" path="dictSort">
            <n-input-number v-model:value="model.dictSort" :min="0" placeholder="请输入显示排序" />
          </n-form-item>
          <n-form-item label="备注" path="remark" :show-feedback="false">
            <n-input v-model:value="model.remark" type="textarea" placeholder="请输入备注" />
          </n-form-item>
        </n-form>
        <!-- 自由编排内容: end -->
      </div>
      <div class="f-b-c py-8 px-16 bg-#f5f5f5">
        <div></div>
        <div>
          <n-space>
            <n-button type="primary" :loading="modelLoading" @click="handleConfirm">确认</n-button>
            <n-button type="error" :loading="modelLoading" @click="handleClose">取消</n-button>
          </n-space>
        </div>
      </div>
    </div>
  </n-modal>
</template>
```

```js [JavaScript]
const showModal = ref(false)
const modalTitle = ref('新增字典数据')
const formRef = ref()
const model = ref({})
const rules = {
  dictType: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入字典类型"
  },
  // 这里有个知识点就是input-number组件的校验类型应该是number
  dictSort: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请输入显示排序"
  },
}
// model 或 单独的form提交实例
const handleConfirm = () => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      modelLoading.value = true
      try {
        const { msg } = model.value.id ? await updateAppAuthListApi(model.value) : await addAppAuthListApi(model.value)
        $message.success(msg);
        await getList()
        showModal.value = false
        modelLoading.value = false
      } catch (error) {
        modelLoading.value = false
      }
    } else {
      console.log(errors);
    }
  });
}
```

:::