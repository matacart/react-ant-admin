# 运行
1. yarn install
2. yarn run

# 构建

1. yarn install
2. yarn build

> 测试账户 
> admin 
> admin

# 技术栈


`React`、`TS`、`mock`

`styled-component`、`scss` : css管理

`Umi/MAX 4`：框架工具库、路由、鉴权、多语言

`Mobx` 全局状态管理

`AntD`、`AntD-Pro` UI组件，框架

`Axios`、`Umi-max request`：网络请求

`tinymce`: 富文本编辑器

`react-nprogress`: 请求进度条

`dnd-kit`:拖拽

`lodash.debounce`: 防抖

`monaco-editor`: 代码编辑器


# 功能实现情况

**登录页**

- 登录
- 注册
- 忘记密码

**首页**

- 表层页面

**店铺**

- 创建店铺


**商品**

- 商品列表
    - 基本布局
    - 数据展示
    - 删除
    - Mock获取数据

- 创建商品
    - 基本布局
    - 数据放newStore
    - 提交数据

- 商品详情
    - 基本布局
    - 数据放oldStore

- 采购订单列表
    - 基本布局
    - 获取数据
    - 数据展示
    - 筛选功能

- 创建采购订单
    - 基本布局
    - 数据放purchaseOrderStore

- 采购订单详情

# 已知bug

- 多款式重复弹窗
- 域名格式校验
<!-- - access 过期处理 -->


```
/pruduct_add 

model: 123w21312
sku: 
categoryIds: 1280590815977
product_image: 213
product_video: 
additional_image: []
price: 1233
specialprice: 
start_time: 
end_time: 
quantity: 
sales_count: 0
minimum: 1
weight: 
weight_class_id: 1
languages_id: 1
title: 122
stock_status_id: 5
subtract: 1
shipping: 1
is_best: 0
is_new: 0
is_hot: 0
sort: 
is_share: 0
is_sys: 0
inquiry_status: 0
ad_waf_status: 1
ad_product_id: 
ad_product_url: 
divided_status: 0
divided_country: 
divided_url:   
group_id: 0
content1: 
content: 
product_url: 
tag: 
meta_title: 
meta_keyword: 
meta_description: 
status: 1
access_token: SlchkqRhgHQT9Lygxsr4QoT6iuYU3KzZ2vv55bn7o6uUnj7okhSh-JNAuib0ygPZzh-x5lR-uh6kuimmB4962YQupFzxmorl1GRqxIelfmr0cnTkRkap-HRJsuSeDbwlp4PsufRlcHo-m

```

### 需求

表单临时存储
中途关闭保存