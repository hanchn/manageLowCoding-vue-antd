import { 
  TableOutlined,
  DashboardOutlined,
  FormOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

export const templateList = [
  {
    type: 'TableListTemplate',
    label: '表格列表模板',
    icon: TableOutlined,
    description: '包含搜索、表格、分页的标准列表页面',
    defaultProps: {
      config: {
        breadcrumb: ['系统管理', '用户列表'],
        searchFields: [
          {
            key: 'username',
            label: '用户名',
            type: 'input',
            placeholder: '请输入用户名'
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
          },
          {
            key: 'createTime',
            label: '创建时间',
            type: 'date',
            placeholder: '请选择日期'
          }
        ],
        toolbarButtons: [
          { key: 'add', type: 'primary', text: '新增用户' },
          { key: 'export', type: 'default', text: '导出数据' },
          { key: 'import', type: 'default', text: '导入数据' }
        ],
        columns: [
          { title: '用户名', dataIndex: 'username', key: 'username' },
          { title: '邮箱', dataIndex: 'email', key: 'email' },
          { title: '手机号', dataIndex: 'phone', key: 'phone' },
          { title: '状态', dataIndex: 'status', key: 'status' },
          { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
          { title: '操作', key: 'action', fixed: 'right', width: 150 }
        ],
        rowActions: [
          { key: 'edit', text: '编辑' },
          { key: 'delete', text: '删除' },
          { key: 'detail', text: '详情' }
        ]
      }
    }
  },
  {
    type: 'DashboardTemplate',
    label: '数据看板模板',
    icon: DashboardOutlined,
    description: '包含统计卡片、图表、数据表格的仪表板页面',
    defaultProps: {
      config: {
        breadcrumb: ['首页', '数据看板'],
        stats: [
          { key: 'users', title: '总用户数', value: 1128, color: '#3f8600' },
          { key: 'orders', title: '订单数', value: 893, color: '#cf1322' },
          { key: 'revenue', title: '收入', value: 112893, precision: 2, color: '#3f8600' },
          { key: 'conversion', title: '转化率', value: 85.2, color: '#3f8600' }
        ],
        leftChart: { title: '访问趋势', type: '折线图' },
        rightChart: { title: '用户分布', type: '饼图' },
        table: {
          title: '最新订单',
          columns: [
            { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
            { title: '用户', dataIndex: 'user', key: 'user' },
            { title: '金额', dataIndex: 'amount', key: 'amount' },
            { title: '状态', dataIndex: 'status', key: 'status' }
          ]
        }
      }
    }
  },
  {
    type: 'FormTemplate',
    label: '表单页面模板',
    icon: FormOutlined,
    description: '包含各种表单控件的标准表单页面',
    defaultProps: {
      config: {
        breadcrumb: ['系统管理', '新增用户'],
        title: '用户信息表单',
        submitText: '保存',
        resetText: '重置',
        fields: [
          { key: 'username', label: '用户名', type: 'input', placeholder: '请输入用户名', required: true },
          { key: 'email', label: '邮箱', type: 'input', placeholder: '请输入邮箱', required: true },
          { key: 'phone', label: '手机号', type: 'input', placeholder: '请输入手机号' },
          { 
            key: 'role', 
            label: '角色', 
            type: 'select', 
            placeholder: '请选择角色',
            options: [
              { label: '管理员', value: 'admin' },
              { label: '普通用户', value: 'user' }
            ]
          },
          { key: 'birthday', label: '生日', type: 'date', placeholder: '请选择生日' },
          { key: 'avatar', label: '头像', type: 'upload', placeholder: '点击上传头像' },
          { key: 'description', label: '个人简介', type: 'textarea', placeholder: '请输入个人简介', rows: 4 }
        ]
      }
    }
  }
]