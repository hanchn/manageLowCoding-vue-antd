<template>
  <div class="property-panel">
    <div class="header">
      <h3>属性配置</h3>
    </div>
    
    <div v-if="!component" class="empty-state">
      <div class="empty-icon">⚙️</div>
      <p>请选择模板进行配置</p>
    </div>
    
    <div v-else class="property-content">
      <a-collapse v-model:activeKey="activeKeys" ghost>
        <!-- 面包屑配置 -->
        <a-collapse-panel key="breadcrumb" header="面包屑配置">
          <div class="property-group">
            <label>面包屑路径</label>
            <div v-for="(item, index) in localConfig.breadcrumb" :key="index" class="breadcrumb-item">
              <a-input 
                v-model:value="localConfig.breadcrumb[index]" 
                placeholder="面包屑文本"
                @change="handleConfigChange"
              />
              <a-button 
                type="text" 
                danger 
                size="small"
                @click="removeBreadcrumb(index)"
              >
                删除
              </a-button>
            </div>
            <a-button type="dashed" block @click="addBreadcrumb">
              + 添加面包屑
            </a-button>
          </div>
        </a-collapse-panel>

        <!-- 搜索字段配置 (表格模板) -->
        <a-collapse-panel 
          v-if="component.type === 'TableListTemplate'" 
          key="searchFields" 
          header="搜索字段配置"
        >
          <div class="property-group">
            <div v-for="(field, index) in localConfig.searchFields" :key="index" class="field-item">
              <a-card size="small" :title="`字段 ${index + 1}`">
                <template #extra>
                  <a-button type="text" danger size="small" @click="removeSearchField(index)">
                    删除
                  </a-button>
                </template>
                
                <a-form layout="vertical" size="small">
                  <a-form-item label="字段标签">
                    <a-input v-model:value="field.label" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="字段类型">
                    <a-select v-model:value="field.type" @change="handleConfigChange">
                      <a-select-option value="input">输入框</a-select-option>
                      <a-select-option value="select">选择器</a-select-option>
                      <a-select-option value="date">日期选择</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="占位符">
                    <a-input v-model:value="field.placeholder" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item v-if="field.type === 'select'" label="选项配置">
                    <div v-for="(option, optIndex) in field.options || []" :key="optIndex" class="option-item">
                      <a-input 
                        v-model:value="option.label" 
                        placeholder="选项文本"
                        style="margin-bottom: 8px"
                        @change="handleConfigChange"
                      />
                      <a-input 
                        v-model:value="option.value" 
                        placeholder="选项值"
                        @change="handleConfigChange"
                      />
                      <a-button 
                        type="text" 
                        danger 
                        size="small"
                        @click="removeOption(field, optIndex)"
                      >
                        删除
                      </a-button>
                    </div>
                    <a-button type="dashed" block @click="addOption(field)">
                      + 添加选项
                    </a-button>
                  </a-form-item>
                </a-form>
              </a-card>
            </div>
            <a-button type="dashed" block @click="addSearchField">
              + 添加搜索字段
            </a-button>
          </div>
        </a-collapse-panel>

        <!-- 表格列配置 (表格模板) -->
        <a-collapse-panel 
          v-if="component.type === 'TableListTemplate'" 
          key="tableColumns" 
          header="表格列配置"
        >
          <div class="property-group">
            <div v-for="(column, index) in localConfig.columns" :key="index" class="column-item">
              <a-card size="small" :title="`列 ${index + 1}`">
                <template #extra>
                  <a-button 
                    v-if="column.key !== 'action'" 
                    type="text" 
                    danger 
                    size="small" 
                    @click="removeColumn(index)"
                  >
                    删除
                  </a-button>
                </template>
                
                <a-form layout="vertical" size="small">
                  <a-form-item label="列标题">
                    <a-input v-model:value="column.title" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item v-if="column.key !== 'action'" label="数据字段">
                    <a-input v-model:value="column.dataIndex" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="列宽度">
                    <a-input-number v-model:value="column.width" @change="handleConfigChange" />
                  </a-form-item>
                </a-form>
              </a-card>
            </div>
            <a-button type="dashed" block @click="addColumn">
              + 添加表格列
            </a-button>
          </div>
        </a-collapse-panel>

        <!-- 表单项配置 (表单模板) -->
        <a-collapse-panel 
          v-if="component.type === 'FormTemplate'" 
          key="formItems" 
          header="表单项配置"
        >
          <div class="property-group">
            <div v-for="(item, index) in localConfig.formItems" :key="index" class="form-item">
              <a-card size="small" :title="'表单项' + (index + 1)">
                <template #extra>
                  <a-button type="text" danger size="small" @click="removeFormItem(index)">
                    删除
                  </a-button>
                </template>
                
                <a-form layout="vertical" size="small">
                  <a-form-item label="字段名">
                    <a-input v-model:value="item.name" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="标签文本">
                    <a-input v-model:value="item.label" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="组件类型">
                    <a-select v-model:value="item.type" @change="handleConfigChange">
                      <a-select-option value="input">输入框</a-select-option>
                      <a-select-option value="textarea">文本域</a-select-option>
                      <a-select-option value="select">下拉选择</a-select-option>
                      <a-select-option value="radio">单选框</a-select-option>
                      <a-select-option value="checkbox">复选框</a-select-option>
                      <a-select-option value="date">日期选择</a-select-option>
                      <a-select-option value="number">数字输入</a-select-option>
                      <a-select-option value="switch">开关</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="占位文本">
                    <a-input v-model:value="item.placeholder" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="是否必填">
                    <a-switch v-model:checked="item.required" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item v-if="['select', 'radio', 'checkbox'].includes(item.type)" label="选项配置">
                    <div v-for="(option, optIndex) in item.options || []" :key="optIndex" class="option-item">
                      <a-input 
                        v-model:value="option.label" 
                        placeholder="选项文本"
                        style="margin-bottom: 8px"
                        @change="handleConfigChange"
                      />
                      <a-input 
                        v-model:value="option.value" 
                        placeholder="选项值"
                        @change="handleConfigChange"
                      />
                      <a-button 
                        type="text" 
                        danger 
                        size="small"
                        @click="removeItemOption(item, optIndex)"
                      >
                        删除
                      </a-button>
                    </div>
                    <a-button type="dashed" block @click="addItemOption(item)">
                      + 添加选项
                    </a-button>
                  </a-form-item>
                </a-form>
              </a-card>
            </div>
            <a-button type="dashed" block @click="addFormItem">
              + 添加表单项
            </a-button>
          </div>
        </a-collapse-panel>

        <!-- 统计卡片配置 (仪表板模板) -->
        <a-collapse-panel 
          v-if="component.type === 'DashboardTemplate'" 
          key="stats" 
          header="统计卡片配置"
        >
          <div class="property-group">
            <div v-for="(stat, index) in localConfig.stats" :key="index" class="stat-item">
              <a-card size="small" :title="`统计 ${index + 1}`">
                <template #extra>
                  <a-button type="text" danger size="small" @click="removeStat(index)">
                    删除
                  </a-button>
                </template>
                
                <a-form layout="vertical" size="small">
                  <a-form-item label="标题">
                    <a-input v-model:value="stat.title" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="数值">
                    <a-input-number v-model:value="stat.value" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="颜色">
                    <a-input v-model:value="stat.color" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="图标">
                    <a-input v-model:value="stat.icon" @change="handleConfigChange" />
                  </a-form-item>
                </a-form>
              </a-card>
            </div>
            <a-button type="dashed" block @click="addStat">
              + 添加统计卡片
            </a-button>
          </div>
        </a-collapse-panel>

        <!-- 详情项配置 (详情模板) -->
        <a-collapse-panel 
          v-if="component.type === 'DetailTemplate'" 
          key="detailItems" 
          header="详情项配置"
        >
          <div class="property-group">
            <div v-for="(item, index) in localConfig.detailItems" :key="index" class="detail-item">
              <a-card size="small" :title="`详情项 ${index + 1}`">
                <template #extra>
                  <a-button type="text" danger size="small" @click="removeDetailItem(index)">
                    删除
                  </a-button>
                </template>
                
                <a-form layout="vertical" size="small">
                  <a-form-item label="标签">
                    <a-input v-model:value="item.label" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="字段名">
                    <a-input v-model:value="item.field" @change="handleConfigChange" />
                  </a-form-item>
                  <a-form-item label="展示类型">
                    <a-select v-model:value="item.type" @change="handleConfigChange">
                      <a-select-option value="text">文本</a-select-option>
                      <a-select-option value="date">日期</a-select-option>
                      <a-select-option value="image">图片</a-select-option>
                      <a-select-option value="tag">标签</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item v-if="item.type === 'tag'" label="标签颜色">
                    <a-input v-model:value="item.color" @change="handleConfigChange" />
                  </a-form-item>
                </a-form>
              </a-card>
            </div>
            <a-button type="dashed" block @click="addDetailItem">
              + 添加详情项
            </a-button>
          </div>
        </a-collapse-panel>
      </a-collapse>

      <!-- 导出代码按钮 -->
      <div class="export-section">
        <a-button type="primary" block @click="exportCode">
          导出 Vue 代码
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, h } from 'vue'
import { Modal } from 'ant-design-vue'

const props = defineProps({
  component: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:component'])

const activeKeys = ref(['breadcrumb'])
const localConfig = ref({})

// 监听组件变化，更新本地配置
watch(() => props.component, (newComponent) => {
  if (newComponent) {
    localConfig.value = JSON.parse(JSON.stringify(newComponent.props.config))
    
    // 初始化各种配置项，确保它们存在
    if (newComponent.type === 'TableListTemplate') {
      if (!localConfig.value.searchFields) localConfig.value.searchFields = []
      if (!localConfig.value.columns) localConfig.value.columns = []
      if (!localConfig.value.rowActions) localConfig.value.rowActions = []
      if (!localConfig.value.toolbarButtons) localConfig.value.toolbarButtons = []
    } else if (newComponent.type === 'FormTemplate') {
      if (!localConfig.value.formItems) localConfig.value.formItems = []
    } else if (newComponent.type === 'DashboardTemplate') {
      if (!localConfig.value.stats) localConfig.value.stats = []
    } else if (newComponent.type === 'DetailTemplate') {
      if (!localConfig.value.detailItems) localConfig.value.detailItems = []
    }
    
    // 确保面包屑始终存在
    if (!localConfig.value.breadcrumb) localConfig.value.breadcrumb = []
  }
}, { immediate: true, deep: true })

// 配置变化处理
const handleConfigChange = () => {
  if (props.component) {
    const updatedComponent = {
      ...props.component,
      props: {
        ...props.component.props,
        config: { ...localConfig.value }
      }
    }
    emit('update:component', updatedComponent)
  }
}

// 面包屑操作
const addBreadcrumb = () => {
  localConfig.value.breadcrumb.push('新面包屑')
  handleConfigChange()
}

const removeBreadcrumb = (index) => {
  localConfig.value.breadcrumb.splice(index, 1)
  handleConfigChange()
}

// 搜索字段操作
const addSearchField = () => {
  localConfig.value.searchFields.push({
    key: `field_${Date.now()}`,
    label: '新字段',
    type: 'input',
    placeholder: '请输入'
  })
  handleConfigChange()
}

const removeSearchField = (index) => {
  localConfig.value.searchFields.splice(index, 1)
  handleConfigChange()
}

// 选项操作
const addOption = (field) => {
  if (!field.options) field.options = []
  field.options.push({
    label: '新选项',
    value: `option_${Date.now()}`
  })
  handleConfigChange()
}

const removeOption = (field, index) => {
  field.options.splice(index, 1)
  handleConfigChange()
}

// 表格列操作
const addColumn = () => {
  const newColumn = {
    title: '新列',
    dataIndex: `field_${Date.now()}`,
    key: `field_${Date.now()}`
  }
  
  // 如果存在操作列，则在操作列前添加新列
  const actionColumnIndex = localConfig.value.columns.findIndex(col => col.key === 'action')
  if (actionColumnIndex > -1) {
    localConfig.value.columns.splice(actionColumnIndex, 0, newColumn)
  } else {
    localConfig.value.columns.push(newColumn)
  }
  
  handleConfigChange()
}

const removeColumn = (index) => {
  localConfig.value.columns.splice(index, 1)
  handleConfigChange()
}

// 表单项操作
const addFormItem = () => {
  localConfig.value.formItems.push({
    name: `field_${Date.now()}`,
    label: '新表单项',
    type: 'input',
    placeholder: '请输入',
    required: false
  })
  handleConfigChange()
}

const removeFormItem = (index) => {
  localConfig.value.formItems.splice(index, 1)
  handleConfigChange()
}

const addItemOption = (item) => {
  if (!item.options) item.options = []
  item.options.push({
    label: '新选项',
    value: `option_${Date.now()}`
  })
  handleConfigChange()
}

const removeItemOption = (item, index) => {
  item.options.splice(index, 1)
  handleConfigChange()
}

// 统计卡片操作
const addStat = () => {
  localConfig.value.stats.push({
    key: `stat_${Date.now()}`,
    title: '新统计',
    value: 0,
    color: '#1890ff',
    icon: 'bar-chart'
  })
  handleConfigChange()
}

const removeStat = (index) => {
  localConfig.value.stats.splice(index, 1)
  handleConfigChange()
}

// 详情项操作
const addDetailItem = () => {
  localConfig.value.detailItems.push({
    label: '新详情项',
    field: `field_${Date.now()}`,
    type: 'text'
  })
  handleConfigChange()
}

const removeDetailItem = (index) => {
  localConfig.value.detailItems.splice(index, 1)
  handleConfigChange()
}

// 导出代码
const exportCode = () => {
  const code = generateVueCode()
  Modal.info({
    title: '导出的 Vue 代码',
    content: h('pre', { style: 'max-height: 400px; overflow: auto; background: #f5f5f5; padding: 16px; border-radius: 4px;' }, code),
    width: 800
  })
}

// 生成 Vue 代码
const generateVueCode = () => {
  const componentName = props.component.type
  const config = JSON.stringify(localConfig.value, null, 2)
  
  return ()`<template>
  <${componentName} :config="config" />
</template>

<script setup>
import ${componentName} from '@/templates/${componentName}.vue'

const config = ${config}
</script>`
}
</script>

<style scoped>
.property-panel {
  height: 100vh;
  padding: 16px;
  background: #fafafa;
  border-left: 1px solid #e8e8e8;
  overflow-y: auto;
}

.header h3 {
  margin: 0 0 16px 0;
  color: #262626;
  font-size: 16px;
  font-weight: 600;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  text-align: center;
  color: #8c8c8c;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.property-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.property-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.field-item,
.column-item,
.stat-item,
.form-item,
.detail-item {
  margin-bottom: 16px;
}

.option-item {
  margin-bottom: 12px;
  padding: 8px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  position: relative;
}

.option-item .ant-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

.export-section {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px dashed #d9d9d9;
}
</style>