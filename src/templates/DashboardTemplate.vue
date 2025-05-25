<template>
  <div class="dashboard-template">
    <!-- 面包屑 -->
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in config.breadcrumb" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-container">
      <a-row :gutter="16">
        <a-col v-for="stat in config.stats" :key="stat.key" :span="6">
          <a-card>
            <a-statistic
              :title="stat.title"
              :value="stat.value"
              :precision="stat.precision"
              :value-style="{ color: stat.color }"
            >
              <template #prefix>
                <component :is="stat.icon" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card :title="config.leftChart.title">
            <div class="chart-placeholder">
              {{ config.leftChart.type }} 图表区域
            </div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :title="config.rightChart.title">
            <div class="chart-placeholder">
              {{ config.rightChart.type }} 图表区域
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <a-card :title="config.table.title">
        <a-table
          :columns="config.table.columns"
          :data-source="tableData"
          :pagination="false"
        />
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      breadcrumb: ['首页', '数据看板'],
      stats: [
        { key: 'users', title: '总用户数', value: 1128, color: '#3f8600', icon: ArrowUpOutlined },
        { key: 'orders', title: '订单数', value: 893, color: '#cf1322', icon: ArrowDownOutlined },
        { key: 'revenue', title: '收入', value: 112893, precision: 2, color: '#3f8600', icon: ArrowUpOutlined },
        { key: 'conversion', title: '转化率', value: 85.2, color: '#3f8600', icon: ArrowUpOutlined }
      ],
      leftChart: { title: '访问趋势', type: '折线图' },
      rightChart: { title: '用户分布', type: '饼图' },
      table: {
        title: '最新订单',
        columns: [
          { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
          { title: '用户', dataIndex: 'user', key: 'user' },
          { title: '金额', dataIndex: 'amount', key: 'amount' },
          { title: '状态', dataIndex: 'status', key: 'status' }
        ]
      }
    })
  }
})

const tableData = ref([
  { orderNo: 'ORD001', user: '张三', amount: '¥299', status: '已完成' },
  { orderNo: 'ORD002', user: '李四', amount: '¥199', status: '进行中' }
])
</script>

<style scoped>
.dashboard-template {
  padding: 24px;
  background: #f0f2f5;
}

.breadcrumb-container,
.stats-container,
.charts-container,
.table-container {
  margin-bottom: 24px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  color: #999;
}
</style>