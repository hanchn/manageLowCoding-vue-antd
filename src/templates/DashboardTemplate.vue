<template>
  <div class="dashboard-template">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in config.breadcrumb" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-container">
      <a-row :gutter="16">
        <a-col 
          v-for="stat in config.stats" 
          :key="stat.key" 
          :xs="24" 
          :sm="12" 
          :md="12" 
          :lg="6"
        >
          <a-card class="stat-card" :bordered="false">
            <div class="stat-content">
              <div class="stat-title">{{ stat.title }}</div>
              <div class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
      <a-row :gutter="16">
        <a-col 
          v-for="chart in config.charts" 
          :key="chart.key" 
          :span="24"
        >
          <a-card :title="chart.title" :bordered="false" class="chart-card">
            <div class="chart-placeholder">
              <div class="chart-mock-content">
                <div v-if="chart.type === 'line'" class="mock-line-chart">
                  <div 
                    v-for="(item, index) in chart.data" 
                    :key="index"
                    class="mock-line-bar"
                    :style="{ height: `${item.value / 10}px` }"
                  ></div>
                </div>
                <div v-else-if="chart.type === 'pie'" class="mock-pie-chart">
                  <div class="mock-pie-center"></div>
                </div>
                <div v-else class="mock-bar-chart">
                  <div 
                    v-for="(item, index) in chart.data" 
                    :key="index"
                    class="mock-bar"
                    :style="{ height: `${item.value / 10}px` }"
                  ></div>
                </div>
              </div>
              <div class="chart-mock-label">图表数据可视化区域</div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义props
const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => ({
      // 面包屑配置
      breadcrumb: ['首页', '仪表盘'],
      // 统计卡片配置
      stats: [
        { key: 'users', title: '用户总数', value: 1280, color: '#1890ff' },
        { key: 'orders', title: '订单总数', value: 5680, color: '#52c41a' },
        { key: 'sales', title: '销售额', value: 12800, color: '#faad14' },
        { key: 'visits', title: '访问量', value: 8560, color: '#722ed1' }
      ],
      // 图表配置
      charts: [
        { 
          key: 'trend', 
          title: '趋势图', 
          type: 'line',
          data: [
            { month: '1月', value: 320 },
            { month: '2月', value: 450 },
            { month: '3月', value: 520 },
            { month: '4月', value: 390 },
            { month: '5月', value: 680 },
            { month: '6月', value: 720 }
          ]
        }
      ]
    })
  }
})
</script>

<style scoped>
.dashboard-template {
  padding: 24px;
  background: #fff;
}

.breadcrumb-container {
  margin-bottom: 16px;
}

.stats-container {
  margin-bottom: 24px;
}

.stat-card {
  margin-bottom: 16px;
  height: 120px;
  display: flex;
  align-items: center;
}

.stat-content {
  text-align: center;
}

.stat-title {
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 30px;
  font-weight: 500;
}

.chart-card {
  margin-bottom: 24px;
  min-height: 360px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chart-mock-content {
  width: 100%;
  height: 240px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 20px;
}

.mock-line-chart, .mock-bar-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

.mock-line-bar, .mock-bar {
  width: 30px;
  background: #1890ff;
  border-radius: 3px 3px 0 0;
  transition: all 0.3s;
}

.mock-line-bar {
  background: #1890ff;
  opacity: 0.7;
}

.mock-bar {
  background: #52c41a;
}

.mock-pie-chart {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(
    #1890ff 0% 25%,
    #52c41a 25% 50%,
    #faad14 50% 75%,
    #722ed1 75% 100%
  );
  position: relative;
}

.mock-pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
}

.chart-mock-label {
  margin-top: 16px;
  color: #8c8c8c;
  font-size: 14px;
}
</style>