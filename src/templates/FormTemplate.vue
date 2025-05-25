<template>
  <div class="form-template">
    <!-- 面包屑 -->
    <div class="breadcrumb-container">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in config.breadcrumb" :key="index">
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 表单区域 -->
    <div class="form-container">
      <a-card :title="config.title">
        <a-form
          :model="formData"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <template v-for="field in config.fields" :key="field.key">
            <a-form-item :label="field.label" :required="field.required">
              <!-- 输入框 -->
              <a-input
                v-if="field.type === 'input'"
                v-model:value="formData[field.key]"
                :placeholder="field.placeholder"
              />
              <!-- 文本域 -->
              <a-textarea
                v-else-if="field.type === 'textarea'"
                v-model:value="formData[field.key]"
                :placeholder="field.placeholder"
                :rows="field.rows || 4"
              />
              <!-- 选择器 -->
              <a-select
                v-else-if="field.type === 'select'"
                v-model:value="formData[field.key]"
                :placeholder="field.placeholder"
                :options="field.options"
              />
              <!-- 日期选择器 -->
              <a-date-picker
                v-else-if="field.type === 'date'"
                v-model:value="formData[field.key]"
                :placeholder="field.placeholder"
              />
              <!-- 上传组件 -->
              <a-upload
                v-else-if="field.type === 'upload'"
                :file-list="formData[field.key]"
                @change="handleUploadChange"
              >
                <a-button>
                  <upload-outlined />
                  {{ field.placeholder || '点击上传' }}
                </a-button>
              </a-upload>
            </a-form-item>
          </template>

          <!-- 操作按钮 -->
          <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
            <a-space>
              <a-button type="primary" @click="handleSubmit">
                {{ config.submitText || '提交' }}
              </a-button>
              <a-button @click="handleReset">
                {{ config.resetText || '重置' }}
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      breadcrumb: ['首页', '表单页面'],
      title: '基础表单',
      submitText: '提交',
      resetText: '重置',
      fields: [
        { key: 'name', label: '姓名', type: 'input', placeholder: '请输入姓名', required: true },
        { key: 'email', label: '邮箱', type: 'input', placeholder: '请输入邮箱', required: true },
        { key: 'phone', label: '手机号', type: 'input', placeholder: '请输入手机号' },
        { key: 'description', label: '描述', type: 'textarea', placeholder: '请输入描述', rows: 4 }
      ]
    })
  }
})

const formData = reactive({})

const handleSubmit = () => {
  console.log('提交表单:', formData)
}

const handleReset = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = undefined
  })
}

const handleUploadChange = (info) => {
  console.log('文件上传:', info)
}
</script>

<style scoped>
.form-template {
  padding: 24px;
  background: #f0f2f5;
}

.breadcrumb-container {
  margin-bottom: 24px;
}

.form-container {
  max-width: 800px;
}
</style>