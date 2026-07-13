/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */

export default  [
  {
    path: '/icons',
    component: "@/pages/Test/IconsPreview", 
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/user',
    name: 'login',
    layout: false,
    component: './User/Index',
    routes: [
      {
        path:'signIn',
        name: 'singIn',
        component: './User/Login.tsx',
      },
      {
        path:'signUp',
        name: 'singUp',
        component: './User/Register.tsx',
      },
      {
        path:'forget',
        name: 'forget',
        component: './User/Forget.tsx',
      },
      {
        path:'customer-email/verify',
        name: 'customerEmailVerify',
        component: './User/VerifyEmail.tsx',
      },
    ],
  },
  // home
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: "@/pages/Admin/Index",
  },
  // 订单
  {  
    path: '/orders',  
    name: 'orders',
    icon: 'ContainerOutlined',  
    routes: [  
      {  
        path: 'manages',  
        name: 'ordersManages',  
        component: './Orders/OrderList/Index',
      },
      {
        path: 'recallOrders',
        name: 'recallOrders',
        component: './Orders/AbandonedOrdersList/Index',
      },
      {
        path: 'recallOrders/:id',
        name: 'recallOrders',
        hideInMenu: true,
        component: './Orders/AbandonedOrdersDetail/Index',
      },
      {  
        path: ':orderId',  
        hideInMenu: true,
        component: './Orders/OrderDetail/OrderDetail', 
      },
      {  
        path: ':orderId/delivery', 
        hideInMenu: true,
        component: './Orders/OrderDetail/ManualDelivery/ManualDelivery', 
      },
      {  
        path: 'afterSales/launch/:orderId', 
        hideInMenu: true,
        component: './Orders/OrderDetail/AfterSales/AfterSales', 
      },
      {  
        path: ':orderId/refund', 
        hideInMenu: true,
        component: './Orders/OrderDetail/Refund/Refund', 
      },
      {  
        path: ':orderId/returns/:returnsId/refund', 
        hideInMenu: true,
        component: './Orders/OrderDetail/Refund/Refund', 
      },
      {  
        path: ':orderId/productsEdit', 
        hideInMenu: true,
        component: './Orders/OrderDetail/EditProduct/EditProduct', 
      },
      {
        path: 'draftOrders',
        name: 'draftOrders',
        component: './Orders/OrderDraft/OrderDraftList/Index',
      },
      {
        path: 'draftOrders/add',
        name: 'draftOrders',
        hideInMenu: true,
        component: './Orders/OrderDraft/OrderDraftAdd/OrderDraftAdd',
      },
      {
        path: 'draftOrders/edit/:draftOrderId',
        name: 'draftOrders',
        hideInMenu: true,
        component: './Orders/OrderDraft/OrderDraftEdit/OrderDraftEdit',
      },
    ]    
  },
  // 商品
  {  
      path: '/products',
      name: 'products',
      icon: 'ProductOutlined',
      routes: [
        {
          path: '/products',
          redirect: '/products/index'
        },
        {
          path: 'index',
          name: 'productsList',
          component: './Products/ProductList/Index', 
        },
        {
          path: 'migrate',
          hideInMenu: true,
          component: './Products/Migrate/Migrate', 
        },
        {
          // 创建商品
          path: 'new',
          hideInMenu: true,
          parentKeys: ['/products/index'],
          component: './Products/ProductAdd/AddNewProduct',
        },
        {  
          path: 'edit/:productId/:languageId',
          hideInMenu: true,
          parentKeys: ['/products/index'],
          component: './Products/ProductDetail/ProductDetail', 
        },
        // 变体
        {  
          path: 'edit/:productId/:languageId/variants/:variantId',
          component: './Products/ProductDetail/Variants/Index', 
        },
        // 分类
        {
          path: 'categories',
          name: 'categories',
          component: './Products/ProductCategories/Index',
        },
        {
          path: 'categories/new',
          name: 'categories',
          menu: false,
          component: './Products/ProductCategories/ProductCategoriesAdd/ProductCategoriesAdd',
        },
        {
          path: 'categories/edit/:id/:languageId',
          name: 'categories',
          menu: false,
          component: './Products/ProductCategories/ProductCategoriesEdit/ProductCategoriesEdit',
        },
        // 采购订单
        {
          path: 'purchase_orders',
          name: 'purchase',
          icon:"/icons/menu/cg.svg",
          component: './Products/PurchaseOrderIndex/Index',
        },
        {
          path: 'purchase_orders/:id',
          name: 'purchase',
          component: './Products/PurchaseOrderDetail/Index',
          menu: false,
        },
        {
          path: 'purchase_orders/new',
          name: 'purchase',
          component: './Products/PurchaseOrderNew/Index',
          menu: false,
        },
        // 库存
        {
          path: 'inventory',
          name: 'inventory',
          component: './Products/Inventory/Index',
        },
        {
          path: 'transfers',
          name: 'transfers',
          component: './Products/Transfers/BlankPage',
        },
        // 礼品卡
        {
          path: 'gift-cards',
          name: 'giftCards',
          component: './Products/GiftCardsIndex/Index',
        },
        {
          path: 'gift-cards/new',
          name: 'giftCards',
          hideInMenu: true,
          parentKeys: ['/products/gift-cards'],
          component: './Products/GiftCardsNew/Index',
        },
        {
          path: 'gift-cards-product/new',
          name: 'giftCardsProduct',
          hideInMenu: true,
          parentKeys: ['/products/gift-cards-product'],
          component: './Products/GiftCardsProductNew/Index',
        }
      ]
  },
  // 客户
  {
    name: 'customers',
    path: '/customer',
    icon: 'UserOutlined',
    routes: [
      {
        path: 'blankPage',
        name: 'blankPage',
        menu: false,
        component: './Customer/CustomerManagement/BlankPage',
      },
      {
        path: 'management',
        name: 'customerManages',
        component: './Customer/CustomerManagement/CustomerManagement',
      },
      {
        path: 'management/subdivision/create/:id',
        name: 'customerManages',
        hideInMenu: true,
        component: './Customer/CustomerManagement/SubdivisionCreate/SubdivisionCreate',
      },
      {
        path: 'management/:customerId',
        name: 'customerManages',
        menu: false,
        component: './Customer/CustomerManagement/CustomerDetail/CustomerDetail',
      },
      {
        path: 'management/operate/add',
        name: 'customerManages',
        menu: false,
        component: './Customer/CustomerManagement/CustomerAdd/CustomerAdd',
      },
      {
        path: 'persona/list',
        name: 'segments',
        component: './Customer/Subdivide/Subdivide',
      },
      {
        path: 'persona/detail',
        name: 'segments',
        hideInMenu: true,
        parentKeys: ['/customer/persona/list'],
        component: './Customer/Subdivide/SubdivideAdd/SubdivideAdd',
      },

      {
        path: 'persona/all',
        name: 'segments',
        hideInMenu: true,
        parentKeys: ['/customer/persona/list'],
        component: './Customer/Subdivide/ClientPortrait/ClientPortrait',
      },
      
      
    ],
  },
  // 折扣
  {
    path: '/discount' ,
    name: 'discounts',
    icon: 'TagOutlined',
    routes:[
      {
        path: '/discount',
        redirect: '/discount/index'
      },
      {
        path: 'index',
        name: 'discountPromotion',
        component: './Discount/Index/Index'
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: './Discount/Coupon/Coupon'
      },
    ]
  },
  // 营销
  {
    path: 'marketing',
    name: 'marketing',
    icon: 'BlockOutlined',
    routes:[
      {
        path: 'overview',
        name: 'shopMarketing',
        component: './Discount/Discount'
      },
      {
        path: 'campaigns',
        name: 'campaigns',
        component: './Discount/Discount'
      },
      {
        path: 'automation',
        name: 'automation',
        component: './Discount/Discount'
      }
    ]
  },
  //分析
  {
    path: 'analyse',
    name: 'analytics',
    icon: 'PieChartOutlined',
    routes: [
      {
        path: 'center',
        name: 'dataAnalyse',
        component: './Analyse/Center/Center'
      },
      {
        path: 'reports',
        name: 'reports',
        component: './Analyse/Report/Report'
      },
      {
        path: 'reports/:classification/:detail',
        hideInMenu: true,
        component: './Analyse/Report/Detail/Detail'
      },
      {
        path: 'realtime',
        name: 'realtimeAnalyse',
        component:'./Analyse/Report/Report'
      },
      {
        path: 'batch',
        hideInMenu: true,
        component:'./Analyse/Batch/Batch'
      }
    ]
  },
  {
    path: 'app-store',
    name: 'appStore',
    component: './AppStore/AppStore/AppStore',
    // component: './Products/Inventory/BlankPage',
  },
  {
    path: 'app-store/custom-app',
    hideInMenu: true,
    component: './AppStore/AppStore/CustomApp/CustomApp',
    // component: './Products/Inventory/BlankPage',
  },
  {
    path: 'app-store/custom-app-config/:id',
    hideInMenu: true,
    component: './AppStore/AppStore/CustomAppConfig/CustomAppConfig',
    // component: './Products/Inventory/BlankPage',
  },
  {
    path: 'app-store/custom-app-config/setting/:id',
    hideInMenu: true,
    component: './AppStore/AppStore/CustomAppConfig/AppSetting/AppSetting',
  },
  {
    path: 'app-store/custom-app-config-setting',
    hideInMenu: true,
    component: './AppStore/AppStore/CustomAppConfigSetting/CustomAppConfigSetting',
  },
  {
    path: 'channel',
    name: 'channel',
    // component: './Products/Inventory/BlankPage',
  },
  {
    path: 'website',
    name: 'website',
    icon: 'ShopOutlined',
    // component: './Products/Inventory/Index',
    routes:[
      {
        path: 'shopSetting',
        name: 'shopSetting',
        component: './Channel/OnlineStore/ShopSetting/ShopSetting',
      },
      {
        path: 'articles',
        name: 'articles',
        component: './Channel/OnlineStore/Articles/Articles',
      },
      {
        path: 'articles/new',
        hideInMenu: true,
        component: './Channel/OnlineStore/Articles/New/NewArticles',
      },
      {
        path: 'articles/edit/:id/:languagesId',
        hideInMenu: true,
        component: './Channel/OnlineStore/Articles/Edit/EditArticles',
      },
      {
        path: 'blogs',
        name: 'articles',
        parentKeys: ['/website/articles'],
        hideInMenu: true,
        component: './Channel/OnlineStore/Blogs/Index/Blogs',
      },
      {
        path: 'blogs/new',
        name: 'articles',
        parentKeys: ['/website/articles'],
        hideInMenu: true,
        component: './Channel/OnlineStore/Blogs/New/CreateBlogs',
      },
      {
        path: 'blogs/:id/:languagesId',
        name: 'articles',
        parentKeys: ['/website/articles'],
        hideInMenu: true,
        component: './Channel/OnlineStore/Blogs/Edit/EditBlogs',
      },
      {
        path: 'articles-comment',
        name: 'articles',
        parentKeys: ['/website/articles'],
        hideInMenu: true,
        component: './Channel/OnlineStore/ArticlesComment/Index/ArticlesComment',
      },
      {
        path: 'page',
        name: 'customPage',
        component: './Channel/OnlineStore/CustomPage/CustomPage',
      },
      {
        path: 'page/new',
        hideInMenu: true,
        component: './Channel/OnlineStore/CustomPage/New/NewPage',
      },
      {
        path: 'page/edit',
        hideInMenu: true,
        component: './Channel/OnlineStore/CustomPage/Edit/EditPage',
      },
      {
        path: 'navList',
        name: 'navList',
        component: './Channel/OnlineStore/NavList/NavList',
      },
      {
        path: 'navList/add',
        hideInMenu: true,
        component: './Channel/OnlineStore/NavList/New/NewNavgate',
      },
      {
        path: 'navList/:id/:languagesId',
        hideInMenu: true,
        component: './Channel/OnlineStore/NavList/NavgateDetail/NavgateDetail',
      },
      {
        path: 'preferences',
        name: 'preferences',
        component: './Channel/OnlineStore/Preferences/Index/Preferences',
      },
      {
        path: 'preferences/robot',
        name: 'preferences',
        hideInMenu: true,
        component: './Channel/OnlineStore/Preferences/Robot/Index',
      },
    ]
    // component: './Products/Inventory/BlankPage',
  },
  // 店铺------------------------------
  // 商户申请
  {
    path: '/stores/merchantApplication',
    menuRender: false,
    component: './Stores/MerchantApplication/MerchantApplication',
  },
  {
    path: '/stores/merchantCertification',
    menuRender: false,
    component: './Stores/MerchantApplication/MerchantCertification',
  },
  {
    path: '/stores/create',
    menuRender: false,
    component: './Stores/Create',
  },
  {
    path: '/stores/list',
    name: 'storesManages',
    icon: 'ShopOutlined',
    component: './Stores/StoresManagement/Index',
  },
  {
    path: '/stores/billing-cost',
    name: 'billingCost',
    icon: 'ProfileOutlined',
    routes: [
      {
        path:'',
        redirect: '/Stores/billing-cost/bills',
      },
      {
        path: 'bills',
        name: 'billsManages',
        component: './Stores/BillingCost/BillManagement/BillManagement',
      },
      {
        path: 'payment',
        name: 'payment',
        component: './Stores/BillingCost/Payment/Index/Payment',
      },
      {
        path: 'withdrawal',
        name: 'withdrawal',
        component: './Stores/BillingCost/Withdrawal/Index/Withdrawal',
      },
      {
        path: 'withdrawal/add',
        name: 'withdrawal',
        hideInMenu: true,
        component: './Stores/BillingCost/Withdrawal/CreateWithdrawal/CreateWithdrawal',
      },
    ]
  },
  {
    path: '/stores/data',
    name: 'dataManages',
    icon: 'DashboardOutlined',
    component: './Stores/DataManagement/DataManagement',
  },
  // 账户管理
  {
    path: '/stores/account',
    icon: 'UserSwitchOutlined',
    component: './Stores/AccountManagement/AccountManagement',
    menuRender: false,
    hideInMenu: true,
  },
  {
    path: '/stores-subscriptions/list/paid',
    menuRender: false,
    component: './stores-subscriptions/list/Paid',
  },
  // 消息-----------------------------
  {
    path: '/inner-msg/index',
    name: 'innerMsg',
    icon: 'MessageOutlined',
    component: './Message/InnerMsg/Index',
  },
  {
    path: '/inner-msg/subscribeMsg',
    name: 'messageManagement',
    icon: 'MessageOutlined',
  },
  // 渠道板块 --- 自建
  {
    path: 'channels/line',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/tiktok',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/whatsapp',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/google',
    routes: [
      {
        path: '',
        component: './Channel/Google/Index/Index',
      },
      {
        path: 'google-domain',
        component: './Channel/Google/DomainVerification/DomainVerification',
      },
      {
        path: 'google-data-tracking',
        component: './Channel/Google/DataTracking/DataTracking',
      },
    ]
  },
  {
    path: 'channels/telegram',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/pinterest',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/live',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/microsoft',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/marketplace',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/buy_button',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/wechat_official',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/post',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/mc',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/pos',
    component: './Channel/Mount/Mount',
  },
  {
    path: 'channels/facebook',
    routes: [
      {
        path: '',
        component: './Channel/FaceBook/Index/Index',
      },
      {
        path: '/channels/facebook/settings/website',
        component: './Channel/FaceBook/Website/Website',
      },
      {
        path: '/channels/facebook/settings/tracking',
        component: './Channel/FaceBook/Tracking/Tracking',
      },
      {
        path: '/channels/facebook/settings/social',
        component: './Channel/FaceBook/Social/Social',
      }
    ]
  },
  // 设置
  {
    path: 'settings',
    name: 'settings',
    icon: 'SettingOutlined',
    hideChildrenInMenu:true,
    hideInMenu: true,
    routes: [
      {
        path: '',
        redirect: '/settings/index',
      },
      {
        path: 'index',
        parentKeys: ['/settings'],
        hideInMenu: true,
        component: './Settings/Index/Index',
      },
      {
        path: 'bill',
        component: './Settings/Bill'
      },
      {
        path:"base",
        parentKeys: ['/settings'],
        component:"./Settings/Base/Base"
      },
      {
        path:"payments",
        component:"./Settings/Collection/Collection"
      },
      // matacart账户
      {
        path:"payments/mcpayment",
        menuRender: false,
        headerRender: false,
        component:"./Settings/Collection/OpenService/OpenService"
      },
      // matacart账户管理系统
      {
        path:"payments/mcpayment/main",
        menuRender: false,
        component:"./Settings/Collection/AccountManagement/AccountManagement"
      },
      // -------------------
      {
        path:"payments/thirdCreditCard",
        component:"./Settings/Collection/ThirdCreditCollection/ThirdCreditCollection"
      },
      {
        path:"payments/thirdCreditCard/add",
        component:"./Settings/Collection/ThirdCreditCollection/ThirdCreditCollectionAdd/ThirdCreditCollectionAdd"
      },
      {
        path:"payments/thirdCreditCard/detail",
        component:"./Settings/Collection/ThirdCreditCollection/ThirdCreditCollectionDetail/ThirdCreditCollectionDetail"
      },
      {
        path:"payments/edit",
        component:"./Settings/Collection/AddManualCollection/AddManualCollection"
      },
      {
        path:"payments/edit/:id",
        component:"./Settings/Collection/ManualCollectionDetail/ManualCollectionDetail"
      },
      {
        path:"payments/other",
        component:"./Settings/Collection/OtherCollection/OtherCollection"
      },
      {
        path:"payments/other/add",
        component:"./Settings/Collection/OtherCollection/OtherCollectionAdd/OtherCollectionAdd"
      },
      {
        path:"payments/other/detail",
        component:"./Settings/Collection/OtherCollection/OtherCollectionDetail/OtherCollectionDetail"
      },
      // 发货与配送
      {
        path:"delivery",
        component:"./Settings/ShippingAndDistribution/Index/ShippingAndDistribution"
      },
      // 自定义运费
      {
        path:"logistics/add/custom",
        component:"./Settings/ShippingAndDistribution/AddCustomLogistics/AddCustomLogistics"
      },
      // 通用运费
      {
        path:"logistics/edit/common",
        component:"./Settings/ShippingAndDistribution/EditCustomLogistics/EditCustomLogistics"
      },
      // 仓库地址
      {
        path:"location",
        component:"./Settings/WarehouseAddress/WarehouseAddress"
      },
      {
        path:"location/detail/:id",
        component:"./Settings/WarehouseAddress/WarehouseAddressDetail/WarehouseAddressDetail"
      },
      // 税费
      {
        path:"taxes",
        component:"./Settings/Taxes/Taxes"
      },
      // 语言
      {
        path:"lang",
        component:"./Settings/ShopLang/Language"
      },
      {
        path:"customer",
        component:"./Settings/Customer/Customer"
      },
      // 管理员和权限
      {
        path:"adminpermission",
        component:"./Settings/AdministratorsPermissions/AdministratorsPermissions"
      },
      {
        path:"adminpermission/add",
        component:"./Settings/AdministratorsPermissions/AdministratorsPermissionsAdd/AdministratorsPermissionsAdd"
      },

      {
        path:"fileManage",
        component:"./Settings/FileManage/FileManage"
      },
      // 通知
      {
        path:"notice",
        component:"./Settings/Notification/Index/Notification"
      },
      // 域名
      {
        path:"domain",
        component:"./Settings/Domain/Domain"
      },
      {
        path:"domain/manage",
        component:"./Settings/Domain/DomainManage/DomainManage"
      },
      {
        path:"domain/add-domain",
        component:"./Settings/Domain/DomainManage/AddDomain"
      },
      {
        path:"redirection",
        component:"./Settings/Domain/Redirection/Redirection"
      },
      {
        path:"settle",
        component:"./Settings/Settle/Index/Settle"
      },
      {
        path:"additional/country",
        component:"./Settings/Additional/Country/Index"
      },
      {
        path: 'package',
        component: './Settings/Package'
      },
      {
        path:"rules",
        component:"./Settings/Rules/Rules"
      },
      {
        path:"operationLog",
        component:"./Settings/OperationLog/OperationLog"
      },
      {
        path:"metafields",
        component:"./Settings/Metafields/Metafields"
      },
      {
        path:"giftCards",
        component:"./Settings/GiftCards/GiftCards"
      },
      {
        path:"brand",
        component:"./Settings/Brand/Brand"
      },
      {
        path:"markets",
        component:"./Settings/Markets/Markets"
      },
    ]
  },
  // 结账编辑器
  {
    path:"settings/settle/checkout-editor/:profileId",
    layout: false,
    component:"./Settings/Settle/CheckoutEditor/CheckoutEditor"
  },
  // 通知邮件编辑器
  {
    path:"settings/noticeEmail/:key",
    layout: false,
    component:"./Settings/Notification/NoticeEmail/NoticeEmail"
  },
  // 主题编辑
  {
    path: 'theme',
    icon: 'SettingOutlined',
    hideInMenu: true,
    layout: false,
    component: './Theme/Index/Index',
    routes:[
      {
        path: 'editor/:templateId/:versionId/:languageId/:mode',
        component: './Theme/Design/Index/Editor',
      },
      {
        path: 'codeEditor/:id/:templateId/:versionId/:languageId/:mode',
        component: './Theme/CodeEditor/CodeEditor',
      },
      {
        path: 'langFieldEdit/:templateId/:versionId/:languageId/:mode',
        hideInMenu: true,
        component: './Theme/LangEditor/LangEditor',
      },
    ]
  },
  // 主题模板风格
  {
    path: 'theme/styles/:templateId/:styleId',
    hideInMenu: true,
    menuRender: false,
    layout: false,
    component: './Theme/Styles/Styles',
  },
  // 404
  {
    path: '*',
    layout: false,
    component: './404',
  },
  // stock-page --- 智能库存管理系统
  {
    path:"/stock-page",
    layout: false,
    component:"./StockPage/App",
    routes:[
      {
        path:"",
        redirect:"/stock-page/overflow",
      },
      {
        path:"/stock-page/overflow",
        name:"概览",
        icon: 'AppstoreOutlined',
        component:"./StockPage/page/overflow/Index"
      },
      {
        path:"/stock-page/product-list",
        name:"商品",
        icon: 'ShoppingOutlined',
        component:"./StockPage/page/product/Index",
      },
      {
        path:"/stock-page/stock",
        name:"库存",
        icon: 'HomeOutlined',
        routes:[
          {
            path:"/stock-page/stock/warning",
            name:"库存预警",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/stock/taking",
            name:"库存盘点",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/stock/transfer",
            name:"库存调拨",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/stock/adjustment",
            name:"库存调整",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/stock/serial-number",
            name:"序列号",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/stock/share",
            name:"库存共享",
            component:"./StockPage/page/overflow/Index",
          }
        ]
      },
      {
        path:"/stock-page/purchase",
        name:"采购",
        icon: 'ShoppingCartOutlined',
        routes:[
          {
            path:"/stock-page/purchase/list",
            name:"采购列表",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/purchase/return-list",
            name:"采购退货",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/purchase/provider-manage",
            name:"供应商管理",
            component:"./StockPage/page/overflow/Index",
          }
        ]
      },
      {
        path:"/stock-page/analysis",
        name:"分析",
        icon: 'PieChartOutlined',
        routes:[
          {
            path:"/stock-page/analysis/stock",
            name:"库存分析",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/analysis/layering",
            name:"ABC分析",
            component:"./StockPage/page/overflow/Index",
          },
          {
            path:"/stock-page/analysis/out-of-stock",
            name:"供应商缺货报告",
            component:"./StockPage/page/overflow/Index",
          }
        ]
      },
      {
        path:"/stock-page/config",
        name:"设置",
        icon: 'SettingOutlined',
        component:"./StockPage/page/settings/Index"
      }
    ]
  }
];



