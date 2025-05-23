<template>
  <div class="low-code-editor">
    <a-layout style="height: 100vh;">
      <!-- 左侧组件库 -->
      <a-layout-sider width="280" style="background: #fff">
        <ComponentList @dragstart="handleDragStart" />
      </a-layout-sider>
      
      <!-- 中间画布区域 -->
      <a-layout-content style="padding: 24px; background: #fff">
        <div class="canvas-container"
             @dragover.prevent
             @drop="handleDrop">
          <template v-if="state.canvasComponents.length === 0">
            <div class="empty-tip">
              拖拽模板到此处开始编辑
            </div>
          </template>
          <template v-else>
            <div class="canvas-component-wrapper"
                 :class="{ active: state.selectedIndex === 0 }"
                 @click="handleSelectComponent(0)">
              <component 
                :is="state.canvasComponents[0].type"
                v-bind="state.canvasComponents[0].props" 
              />
            </div>
          </template>
        </div>
      </a-layout-content>
      
      <!-- 右侧属性配置面板 -->
      <a-layout-sider width="300" style="background: #fff">
        <property-panel 
          :component="selectedComponent" 
          @update:component="handleComponentUpdate" 
        />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { Modal } from 'ant-design-vue'
import ComponentList from '../components/ComponentList.vue'
import PropertyPanel from '../components/PropertyPanel.vue'
import { componentList } from '../config/componentConfig'

// 使用reactive统一管理状态
const state = reactive({
  canvasComponents: [], // 画布组件列表
  selectedIndex: -1,    // 当前选中的组件索引
})

// 计算当前选中的组件
const selectedComponent = computed(() => 
  state.selectedIndex >= 0 ? state.canvasComponents[state.selectedIndex] : null
)

// 拖拽开始
const handleDragStart = (e, component) => {
  e.dataTransfer.setData('componentType', component.type)
}

// 处理拖拽放置
const handleDrop = async (e) => {
  const componentType = e.dataTransfer.getData('componentType')
  const component = componentList.find(c => c.type === componentType)
  
  if (component) {
    if (state.canvasComponents.length > 0) {
      // 使用 ant-design-vue 的模态框进行确认
      const result = await new Promise(resolve => {
        Modal.confirm({
          title: '替换确认',
          content: '拖入新模板将会替换当前页面内容，是否继续？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
      
      if (!result) return
    }
    
    // 清空现有组件，添加新模板
    state.canvasComponents = [{
      type: component.type,
      props: { ...component.defaultProps }
    }]
    state.selectedIndex = 0
  }
}

// 选择组件
const handleSelectComponent = (index) => {
  state.selectedIndex = index
}

// Add this new method to handle component updates
const handleComponentUpdate = (updatedComponent) => {
  if (state.selectedIndex >= 0) {
    state.canvasComponents[state.selectedIndex] = updatedComponent
  }
}
</script>

<style scoped>
.low-code-editor {
  background: #f0f2f5;
}

.canvas-container {
  min-height: calc(100vh - 48px);
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.canvas-component-wrapper {
  position: relative;
  padding: 12px;
  margin: 12px 0;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}

.canvas-component-wrapper:hover {
  border-color: #1890ff;
}

.canvas-component-wrapper.active {
  border: 1px solid #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.canvas-component-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  transition: all 0.3s;
}

.canvas-component-wrapper:hover::before {
  background: rgba(24, 144, 255, 0.04);
}

.empty-tip {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
  border: 2px dashed #eee;
  border-radius: 4px;
}
</style>