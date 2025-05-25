<template>
  <div class="component-list">
    <div class="header">
      <h3>页面模板</h3>
      <p class="description">拖拽模板到画布开始编辑</p>
    </div>
    
    <div class="template-categories">
      <div class="category">
        <h4>常用模板</h4>
        <div class="template-grid">
          <div
            v-for="template in templateList"
            :key="template.type"
            class="template-item"
            draggable="true"
            @dragstart="handleDragStart($event, template)"
          >
            <div class="template-icon">
              <component :is="template.icon" />
            </div>
            <div class="template-info">
              <div class="template-name">{{ template.label }}</div>
              <div class="template-desc">{{ template.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { templateList } from '../config/templateConfig'

const emit = defineEmits(['dragstart'])

const handleDragStart = (e, template) => {
  emit('dragstart', e, template)
}
</script>

<style scoped>
.component-list {
  height: 100vh;
  padding: 16px;
  background: #fafafa;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
}

.header {
  margin-bottom: 24px;
  text-align: center;
}

.header h3 {
  margin: 0 0 8px 0;
  color: #262626;
  font-size: 16px;
  font-weight: 600;
}

.description {
  margin: 0;
  color: #8c8c8c;
  font-size: 12px;
}

.category h4 {
  margin: 0 0 16px 0;
  color: #595959;
  font-size: 14px;
  font-weight: 500;
}

.template-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s;
}

.template-item:hover {
  border-color: #1890ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

.template-item:active {
  cursor: grabbing;
}

.template-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  color: #1890ff;
  font-size: 16px;
}

.template-info {
  flex: 1;
  min-width: 0;
}

.template-name {
  margin-bottom: 4px;
  color: #262626;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

.template-desc {
  color: #8c8c8c;
  font-size: 11px;
  line-height: 1.4;
  word-break: break-all;
}
</style>