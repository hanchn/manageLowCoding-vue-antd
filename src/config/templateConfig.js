import { 
  TableOutlined,
  DashboardOutlined,
  FormOutlined,
  ProfileOutlined
} from '@ant-design/icons-vue'

// 模板列表配置
export const templateList = [
  {
    type: 'TableListTemplate',
    label: '表格列表页',
    icon: TableOutlined,
    description: '用于展示数据列表，支持搜索、筛选、分页等功能',
    defaultProps: {
      config: {
        breadcrumb: ['首页', '列表页面'],
        searchFields: [
          { 
            key: 'keyword',
            label: '关键词',
            type: 'input',
            placeholder: '请输入关键词'
          },
          {
            key: 'status',
            label: '状态',
            type: 'select',
            placeholder: '请选择状态',
            options: [
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]
          }
        ],
        toolbarButtons: [
          { key: 'add', type: 'primary', text: '新增' },
          { key: 'export', type: 'default', text: '导出' }
        ],
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: '名称', dataIndex: 'name', key: 'name' },
          { title: '状态', dataIndex: 'status', key: 'status' },
          { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
          { title: '操作', key: 'action', fixed: 'right', width: 120 }
        ],
        rowActions: [
          { key: 'edit', text: '编辑' },
          { key: 'delete', text: '删除' }
        ]
      }
    }
  },
  {
    type: 'FormTemplate',
    label: '表单页面',
    icon: FormOutlined,
    description: '用于数据录入，支持各种表单项，可用于创建或编辑数据',
    defaultProps: {
      config: {
        breadcrumb: ['首页', '表单页面'],
        formTitle: '基础表单',
        formItems: [
          { 
            key: 'name',
            label: '名称',
            type: 'input',
            placeholder: '请输入名称',
            rules: [{ required: true, message: '请输入名称' }]
          },
          {
            key: 'type',
            label: '类型',
            type: 'select',
            placeholder: '请选择类型',
            options: [
              { label: '类型一', value: 1 },
              { label: '类型二', value: 2 }
            ],
            rules: [{ required: true, message: '请选择类型' }]
          },
          {
            key: 'description',
            label: '描述',
            type: 'textarea',
            placeholder: '请输入描述'
          }
        ],
        buttons: [
          { key: 'submit', type: 'primary', text: '提交' },
          { key: 'cancel', type: 'default', text: '取消' }
        ]
      }
    }
  },
  {
    type: 'DashboardTemplate',
    label: '仪表盘页面',
    icon: DashboardOutlined,
    description: '数据概览页面，包含统计数据、图表等可视化内容',
    defaultProps: {
      config: {
        breadcrumb: ['首页', '仪表盘'],
        stats: [
          { key: 'users', title: '用户总数', value: 1280, color: '#1890ff' },
          { key: 'orders', title: '订单总数', value: 5680, color: '#52c41a' },
          { key: 'sales', title: '销售额', value: 12800, color: '#faad14' },
          { key: 'visits', title: '访问量', value: 8560, color: '#722ed1' }
        ],
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
      }
    }
  },
  {
    type: 'DetailTemplate',
    label: '详情页面',
    icon: ProfileOutlined,
    description: '用于展示详细信息，支持多种布局和内容展示方式',
    defaultProps: {
      config: {
        breadcrumb: ['首页', '详情页面'],
        title: '基础详情页',
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
        ]
      }
    }
  }
]