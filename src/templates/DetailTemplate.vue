<template>
  <div class="detail-template">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in config.breadcrumb" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 详情标题 -->
    <div class="detail-header">
      <h2>{{ config.title }}</h2>
    </div>

    <!-- 详情内容 -->
    <div class="detail-content">
      <template v-for="(section, sectionIndex) in config.sections" :key="sectionIndex">
        <a-card 
          :title="section.title" 
          :bordered="false"
          class="detail-section"
        >
          <a-descriptions :column="{ xs: 1, sm: 2, md: 3 }">
            <template v-for="(item, itemIndex) in section.items" :key="itemIndex">
              <a-descriptions-item :label="item.label">
                <template v-if="item.tag">
                  <a-tag :color="item.tag.color">{{ item.value }}</a-tag>
                </template>
                <template v-else>
                  {{ item.value }}
                </template>
              </a-descriptions-item>
            </template>
          </a-descriptions>
        </a-card>
      </template>
    </div>

    <!-- 操作按钮 -->
    <div class="detail-actions" v-if="config.actions && config.actions.length > 0">
      <a-space>
        <template v-for="action in config.actions" :key="action.key">
          <a-button 
            :type="action.type" 
            @click="handleActionClick(action.key)"
          >
            {{ action.text }}
          </a-button>
        </template>
      </a-space>
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
      breadcrumb: ['首页', '详情页面'],
      // 详情标题
      title: '基础详情页',
      // 详情区块配置
      sections: [
        {
          title: '基本信息',
          items: [
            { label: '名称', value: '示例名称' },
            { label: '编号', value: 'NO.12345' },
            { label: '状态', value: '正常', tag: { color: 'green' } },
            { label: '创建时间', value: '2023-01-01 12:00:00' }
          ]
        },
        {
          title: '详细信息',
          items: [
            { label: '描述', value: '这是一段详细描述文本，可以很长...' },
            { label: '备注', value: '备注信息' }
          ]
        }
      ],
      // 操作按钮配置
      actions: [
        { key: 'edit', type: 'primary', text: '编辑' },
        { key: 'back', type: 'default', text: '返回' }
      ]
    })
  }
})

// 操作按钮点击处理
const handleActionClick = (key) => {
  console.log('操作按钮点击:', key)
}
</script>

<style scoped>
.detail-template {
  padding: 24px;
  background: #fff;
}

.breadcrumb-container {
  margin-bottom: 16px;
}

.detail-header {
  margin-bottom: 24px;
}

.detail-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-actions {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>