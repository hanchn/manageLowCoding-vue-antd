<template>
  <div class="list-template">
    <!-- 面包屑 -->
    <a-breadcrumb class="mb-4">
      <a-breadcrumb-item>{{ props.breadcrumb.parent }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ props.breadcrumb.current }}</a-breadcrumb-item>
    </a-breadcrumb>
    
    <!-- 搜索表单 -->
    <a-form layout="inline" class="search-form mb-4">
      <template v-for="(field, index) in props.searchFields" :key="index">
        <a-form-item :label="field.label">
          <component :is="field.type" v-bind="field.props" />
        </a-form-item>
      </template>
      <a-form-item>
        <a-space>
          <a-button type="primary">查询</a-button>
          <a-button>重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    
    <!-- 表格工具栏 -->
    <div class="table-toolbar mb-4">
      <a-space>
        <a-button type="primary">新增</a-button>
        <a-button>导出</a-button>
      </a-space>
    </div>
    
    <!-- 数据表格 -->
    <a-table
      :columns="props.tableColumns"
      :data-source="props.tableData"
      :pagination="props.pagination"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a>编辑</a>
            <a>删除</a>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  // 面包屑配置
  breadcrumb: {
    type: Object,
    default: () => ({
      parent: '系统管理',
      current: '用户列表'
    })
  },
  // 搜索字段配置
  searchFields: {
    type: Array,
    default: () => []
  },
  // 表格列配置
  tableColumns: {
    type: Array,
    default: () => []
  },
  // 表格数据
  tableData: {
    type: Array,
    default: () => []
  },
  // 分页配置
  pagination: {
    type: Object,
    default: () => ({
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true
    })
  }
})
</script>

<style scoped>
.list-template {
  padding: 24px;
  background: #fff;
  border-radius: 2px;
}

.mb-4 {
  margin-bottom: 16px;
}

.search-form {
  padding: 24px;
  background: #fafafa;
  border-radius: 2px;
}
</style>