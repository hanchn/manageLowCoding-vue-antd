<template>
  <div class="table-list-template">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in config.breadcrumb" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="search-container">
      <a-form 
        :model="searchForm" 
        layout="inline"
        class="search-form"
      >
        <template v-for="field in config.searchFields" :key="field.key">
          <a-form-item :label="field.label">
            <!-- 输入框类型 -->
            <a-input 
              v-if="field.type === 'input'"
              v-model:value="searchForm[field.key]"
              :placeholder="field.placeholder"
              allow-clear
            />
            <!-- 选择器类型 -->
            <a-select
              v-else-if="field.type === 'select'"
              v-model:value="searchForm[field.key]"
              :placeholder="field.placeholder"
              :options="field.options"
              allow-clear
              style="min-width: 200px"
            />
            <!-- 日期选择器类型 -->
            <a-date-picker
              v-else-if="field.type === 'date'"
              v-model:value="searchForm[field.key]"
              :placeholder="field.placeholder"
              style="width: 200px"
            />
          </a-form-item>
        </template>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>

    <!-- 表格工具栏 -->
    <div class="table-toolbar">
      <a-space>
        <template v-for="button in config.toolbarButtons" :key="button.key">
          <a-button 
            :type="button.type" 
            @click="handleToolbarClick(button.key)"
          >
            {{ button.text }}
          </a-button>
        </template>
      </a-space>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <a-table
        :columns="config.columns"
        :data-source="tableData"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <!-- 自定义列渲染 -->
        <template #bodyCell="{ column, record }">
          <!-- 操作列 -->
          <template v-if="column.key === 'action'">
            <a-space>
              <template v-for="action in config.rowActions" :key="action.key">
                <a @click="handleRowAction(action.key, record)">{{ action.text }}</a>
              </template>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue'

// 定义props
const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => ({
      // 面包屑配置
      breadcrumb: ['首页', '列表页面'],
      // 搜索字段配置
      searchFields: [
        { 
          key: 'keyword',
          label: '关键词',
          type: 'input',
          placeholder: '请输入关键词'
        }
      ],
      // 工具栏按钮配置
      toolbarButtons: [
        { key: 'add', type: 'primary', text: '新增' },
        { key: 'export', type: 'default', text: '导出' }
      ],
      // 表格列配置
      columns: [
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '操作', key: 'action', fixed: 'right', width: 120 }
      ],
      // 行操作配置
      rowActions: [
        { key: 'edit', text: '编辑' },
        { key: 'delete', text: '删除' }
      ]
    })
  }
})

// 搜索表单数据
const searchForm = reactive({})

// 表格数据
const tableData = ref([])
const loading = ref(false)
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true
})

// 搜索方法
const handleSearch = () => {
  pagination.current = 1
  fetchData()
}

// 重置方法
const handleReset = () => {
  // 重置表单
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = undefined
  })
  // 重置分页并搜索
  pagination.current = 1
  fetchData()
}

// 工具栏按钮点击
const handleToolbarClick = (key) => {
  console.log('工具栏按钮点击:', key)
}

// 行操作点击
const handleRowAction = (key, record) => {
  console.log('行操作点击:', key, record)
}

// 表格变化（分页、排序、筛选）
const handleTableChange = (pag, filters, sorter) => {
  console.log('表格变化:', pag, filters, sorter)
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  fetchData()
}

// 获取数据方法
const fetchData = () => {
  loading.value = true
  // 这里模拟异步请求
  setTimeout(() => {
    tableData.value = [
      { id: 1, name: '示例数据1' },
      { id: 2, name: '示例数据2' }
    ]
    pagination.total = 2
    loading.value = false
  }, 500)
}

// 初始化
fetchData()
</script>

<style scoped>
.table-list-template {
  padding: 24px;
  background: #fff;
}

.breadcrumb-container {
  margin-bottom: 16px;
}

.search-container {
  margin-bottom: 16px;
  padding: 24px;
  background: #fafafa;
  border-radius: 2px;
}

.table-toolbar {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-container {
  margin-bottom: 16px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}
</style>