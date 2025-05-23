<template>
  <div class="props-panel" v-if="component">
    <h3>属性配置</h3>
    <a-form layout="vertical">
      <template v-for="(value, key) in component.props" :key="key">
        <a-form-item :label="key">
          <a-input :value="component.props[key]" @update:value="(val) => handlePropChange(key, val)" />
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  component: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:component'])

const handlePropChange = (key, value) => {
  if (props.component) {
    const updatedComponent = {
      ...props.component,
      props: {
        ...props.component.props,
        [key]: value
      }
    }
    emit('update:component', updatedComponent)
  }
}
</script>

<style scoped>
.props-panel {
  height: 100%;
  padding: 16px;
  background: #fafafa;
  overflow-y: auto;
}

.props-panel h3 {
  margin-bottom: 24px;
  padding-left: 8px;
  border-left: 4px solid #1890ff;
  font-size: 16px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
  padding: 8px;
  background: #fff;
  border-radius: 4px;
}

:deep(.ant-form-item-label) {
  padding-bottom: 4px;
}

:deep(.ant-form-item-label > label) {
  color: #666;
  font-size: 13px;
}

:deep(.ant-input),
:deep(.ant-select),
:deep(.ant-input-number) {
  border-radius: 4px;
}
</style>