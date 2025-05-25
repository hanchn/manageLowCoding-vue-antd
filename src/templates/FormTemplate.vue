<template>
  <div class="form-template">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in config.breadcrumb" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 表单标题 -->
    <div class="form-header">
      <h2>{{ config.formTitle }}</h2>
    </div>

    <!-- 表单内容 -->
    <div class="form-container">
      <a-form 
        :model="formData" 
        layout="vertical"
        class="form-content"
      >
        <template v-for="item in config.formItems" :key="item.key">
          <a-form-item 
            :label="item.label"
            :name="item.key"
            :rules="item.rules"
          >
            <!-- 输入框 -->
            <a-input 
              v-if="item.type === 'input'"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder"
              allow-clear
            />
            
            <!-- 文本域 -->
            <a-textarea
              v-else-if="item.type === 'textarea'"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder"
              :rows="4"
              allow-clear
            />
            
            <!-- 选择器 -->
            <a-select
              v-else-if="item.type === 'select'"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder"
              :options="item.options"
              allow-clear
              style="width: 100%"
            />
            
            <!-- 日期选择器 -->
            <a-date-picker
              v-else-if="item.type === 'date'"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder"
              style="width: 100%"
            />
            
            <!-- 单选框组 -->
            <a-radio-group
              v-else-if="item.type === 'radio'"
              v-model:value="formData[item.key]"
            >
              <a-radio 
                v-for="option in item.options" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </a-radio>
            </a-radio-group>
            
            <!-- 复选框组 -->
            <a-checkbox-group
              v-else-if="item.type === 'checkbox'"
              v-model:value="formData[item.key]"
              :options="item.options"
            />
          </a-form-item>
        </template>
        
        <!-- 表单按钮 -->
        <div class="form-buttons">
          <a-space>
            <template v-for="button in config.buttons" :key="button.key">
              <a-button 
                :type="button.type" 
                @click="handleButtonClick(button.key)"
              >
                {{ button.text }}
              </a-button>
            </template>
          </a-space>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps } from 'vue'

// 定义props
const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => ({
      // 面包屑配置
      breadcrumb: ['首页', '表单页面'],
      // 表单标题
      formTitle: '基础表单',
      // 表单项配置
      formItems: [
        { 
          key: 'name',
          label: '名称',
          type: 'input',
          placeholder: '请输入名称',
          rules: [{ required: true, message: '请输入名称' }]
        }
      ],
      // 按钮配置
      buttons: [
        { key: 'submit', type: 'primary', text: '提交' },
        { key: 'cancel', type: 'default', text: '取消' }
      ]
    })
  }
})

// 表单数据
const formData = reactive({})

// 按钮点击处理
const handleButtonClick = (key) => {
  console.log('按钮点击:', key, formData)
  
  if (key === 'submit') {
    // 提交表单逻辑
    console.log('提交表单数据:', formData)
  } else if (key === 'cancel') {
    // 取消操作
    console.log('取消操作')
  }
}
</script>

<style scoped>
.form-template {
  padding: 24px;
  background: #fff;
}

.breadcrumb-container {
  margin-bottom: 16px;
}

.form-header {
  margin-bottom: 24px;
}

.form-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

.form-container {
  max-width: 800px;
}

.form-content {
  padding: 24px;
  background: #fafafa;
  border-radius: 2px;
}

.form-buttons {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>