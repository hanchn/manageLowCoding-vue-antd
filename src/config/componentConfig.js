import { 
  ShopOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue'

export const componentList = [
  {
    type: 'dashboard-template',
    label: '数据看板模板',
    icon: DashboardOutlined,
    defaultProps: {
      title: '数据看板',
      layout: [
        {
          type: 'a-row',
          children: [
            {
              type: 'a-col',
              span: 6,
              children: {
                type: 'a-card',
                title: '总用户数',
                value: '1,234',
                trend: '+12%'
              }
            },
            {
              type: 'a-col',
              span: 6,
              children: {
                type: 'a-card',
                title: '活跃用户',
                value: '934',
                trend: '+8%'
              }
            }
          ]
        },
        {
          type: 'a-table',
          columns: [
            { title: '用户名', dataIndex: 'name' },
            { title: '注册时间', dataIndex: 'registerTime' },
            { title: '最后登录', dataIndex: 'lastLogin' }
          ]
        }
      ]
    }
  },
  {
    type: 'user-management-template',
    label: '用户管理模板',
    icon: UserOutlined,
    defaultProps: {
      searchForm: {
        type: 'a-form',
        items: [
          { label: '用户名', name: 'username', type: 'input' },
          { label: '状态', name: 'status', type: 'select' }
        ]
      },
      table: {
        columns: [
          { title: '用户名', dataIndex: 'username' },
          { title: '邮箱', dataIndex: 'email' },
          { title: '角色', dataIndex: 'role' },
          { title: '状态', dataIndex: 'status' }
        ]
      }
    }
  },
  {
    type: 'product-list-template',
    label: '商品列表模板',
    icon: ShopOutlined,
    defaultProps: {
      filterForm: {
        type: 'a-form',
        items: [
          { label: '商品名称', name: 'name', type: 'input' },
          { label: '分类', name: 'category', type: 'select' },
          { label: '状态', name: 'status', type: 'select' }
        ]
      },
      table: {
        columns: [
          { title: '商品名称', dataIndex: 'name' },
          { title: '价格', dataIndex: 'price' },
          { title: '库存', dataIndex: 'stock' },
          { title: '状态', dataIndex: 'status' }
        ]
      }
    }
  },
  {
    type: 'settings-template',
    label: '系统设置模板',
    icon: SettingOutlined,
    defaultProps: {
      tabs: [
        {
          key: 'basic',
          tab: '基本设置',
          content: {
            type: 'a-form',
            items: [
              { label: '系统名称', name: 'systemName', type: 'input' },
              { label: '系统Logo', name: 'logo', type: 'upload' },
              { label: '系统描述', name: 'description', type: 'textarea' }
            ]
          }
        },
        {
          key: 'security',
          tab: '安全设置',
          content: {
            type: 'a-form',
            items: [
              { label: '密码策略', name: 'passwordPolicy', type: 'select' },
              { label: '登录验证', name: 'loginVerification', type: 'checkbox' }
            ]
          }
        }
      ]
    }
  }
]

export const templateList = [
  {
    type: 'user-list',
    label: '用户列表模板',
    icon: UserOutlined,
    component: 'ListTemplate',
    defaultProps: {
      breadcrumb: {
        parent: '系统管理',
        current: '用户列表'
      },
      searchFields: [
        {
          label: '用户名',
          type: 'a-input',
          props: {
            placeholder: '请输入用户名',
            allowClear: true
          }
        },
        {
          label: '手机号',
          type: 'a-input',
          props: {
            placeholder: '请输入手机号',
            allowClear: true
          }
        },
        {
          label: '状态',
          type: 'a-select',
          props: {
            placeholder: '请选择状态',
            options: [
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]
          }
        }
      ],
      tableColumns: [
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '手机号', dataIndex: 'phone', key: 'phone' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        { title: '操作', key: 'action' }
      ],
      tableData: []
    }
  },
  {
    type: 'product-list',
    label: '商品列表模板',
    icon: ShopOutlined,
    component: 'ListTemplate',
    defaultProps: {
      breadcrumb: {
        parent: '商品管理',
        current: '商品列表'
      },
      searchFields: [
        {
          label: '商品名称',
          type: 'a-input',
          props: {
            placeholder: '请输入商品名称',
            allowClear: true
          }
        },
        {
          label: '商品分类',
          type: 'a-select',
          props: {
            placeholder: '请选择分类',
            options: [
              { label: '电子产品', value: 1 },
              { label: '服装', value: 2 },
              { label: '食品', value: 3 }
            ]
          }
        }
      ],
      tableColumns: [
        { title: '商品名称', dataIndex: 'name', key: 'name' },
        { title: '分类', dataIndex: 'category', key: 'category' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '库存', dataIndex: 'stock', key: 'stock' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        { title: '操作', key: 'action' }
      ],
      tableData: []
    }
  }
]