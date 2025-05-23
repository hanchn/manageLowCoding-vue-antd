<template>
  <div class="components-list">
    <h3>页面模板</h3>
    <div class="component-item" 
         v-for="item in componentList" 
         :key="item.type"
         draggable="true"
         @dragstart="handleDragStart($event, item)">
      <a-card hoverable>
        <template #cover>
          <component :is="item.icon" />
        </template>
        <a-card-meta :title="item.label" />
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { componentList } from '../config/componentConfig'

const emit = defineEmits(['dragstart'])

const handleDragStart = (e, component) => {
  emit('dragstart', e, component)
}
</script>

<style scoped>
.components-list {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  background: #fafafa;
}

.components-list h3 {
  margin-bottom: 16px;
  padding-left: 8px;
  border-left: 4px solid #1890ff;
  font-size: 16px;
}

.component-item {
  margin-bottom: 16px;
  cursor: move;
  transition: all 0.3s;
}

.component-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.ant-card {
  border-radius: 4px;
}

.ant-card-cover {
  padding: 16px;
  text-align: center;
  background: #f5f5f5;
}

.ant-card-cover .anticon {
  font-size: 24px;
  color: #1890ff;
}
</style>