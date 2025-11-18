import component from "@/locales/bn-BD/component";
import menu from "@/locales/bn-BD/menu";
import route from "mock/route";
import { Children } from "react";
import { Link, Outlet } from '@umijs/max';
// import CangKukuCun from '../public/icons/caigoucaigoudan.svg';
// import CaiGouDan from '/icons/caigoucaigoudan.svg';


// console.log(CangKukuCun)

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

// if(!window.location.hostname.startsWith("localhost")){
//   console.log(window.location.hostname.slice(0,window.location.hostname.indexOf(".")))
// }else{
//   console.log("localhost")
// }

export default  [

  {
    path: '/icons',
    component: './Test/IconsPreview', 
  },
  {
    path: '/',
    redirect: '/home'
  },
  
  {
    path: '/user',
    name: 'login',
    layout: false,
    component: './User/index',
    routes: [
      {
        path:'signIn',
        name: 'singIn',
        component: './User/Login.tsx',
      },{
        path:'signUp',
        name: 'singUp',
        component: './User/Register.tsx',
      },{
        path:'forget',
        name: 'forget',
        component: './User/Forget.tsx',
      },
    ],
  },
  // home
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    // access: 'canAdmin',//权限
    component: './Admin/index',
  },
  // 订单
  {  
    path: '/orders',  
    name: 'orders',
    icon: 'ContainerOutlined',  
    routes: [  
      {  
        path: 'manages',  
        name: 'manages',  
        component: './Orders/OrderList/index',
      },
      {
        path: 'recallOrders',
        name: 'recallOrders',
        component: './Orders/RecallOrders/RecallOrders',
      },
      {  
        path: ':orderId',  
        name: 'orderId',
        hideInMenu: true,
        component: './Orders/OrderDetail/OrderDetail', 
      },
      {  
        path: ':orderId/delivery', 
        name: 'orderId',
        hideInMenu: true,
        component: './Orders/OrderDetail/ManualDelivery/ManualDelivery', 
      },
      {  
        path: 'afterSales/launch/:orderId', 
        name: 'orderId',
        hideInMenu: true,
        component: './Orders/OrderDetail/AfterSales/AfterSales', 
      },
      {  
        path: ':orderId/refund', 
        name: 'orderId',
        hideInMenu: true,
        component: './Orders/OrderDetail/Refund/Refund', 
      },
      {  
        path: ':orderId/returns/:returnsId/refund', 
        name: 'orderId',
        hideInMenu: true,
        component: './Orders/OrderDetail/Refund/Refund', 
      },
      {  
        path: ':orderId/productsEdit', 
        name: 'orderId',
        hideInMenu: true,
        component: './Orders/OrderDetail/EditProduct/EditProduct', 
      },
      {
        path: 'draftOrders',
        name: 'draftOrders',
        component: './Orders/OrderDraft/OrderDraft',
      },
      {
        path: 'draftOrders/add',
        name: '',
        component: './Orders/OrderDraft/OrderDraftAdd/OrderDraftAdd',
      },
      {
        path: 'draftOrders/edit/:draftOrderId',
        name: '',
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
          name: 'index',
          component: './Products/ProductList/index', 
        },
        {
          path: 'migrate',
          name: 'migrate',
          hideInMenu: true,
          component: './Products/Migrate/Migrate', 
        },
        {
          // 创建商品
          path: 'new',
          name: 'new',
          hideInMenu: true,
          parentKeys: ['/products/index'],
          component: './Products/ProductAdd/AddNewProduct',
        },
        {  
          path: 'edit/:productId/:languageId',
          name: 'edit',
          hideInMenu: true,
          parentKeys: ['/products/index'],
          component: './Products/ProductDetail/ProductDetail', 
        },
        // 变体
        {  
          path: 'edit/:productId/:languageId/variants/:variantId',
          name: '',  
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
          name: 'categories/new',
          menu: false,
          component: './Products/ProductCategories/ProductCategoriesAdd/ProductCategoriesAdd',
        },
        {
          path: 'categories/edit/:id/:languageId',
          name: 'categories/edit',
          menu: false,
          component: './Products/ProductCategories/ProductCategoriesEdit/ProductCategoriesEdit',
        },
        {
          path: 'gift-cards',
          name: 'gift-cards',
          component: './Products/GiftCards/GiftCards',
        },
        {
          path: 'gift-cards/new',
          name: 'giftCardsNew',
          hideInMenu: true,
          parentKeys: ['/products/gift-cards'],
          component: './Products/GiftCards/GiftCardsAdd/GiftCardsAdd',
        },
        {
          path: 'gift-cards-products/new',
          hideInMenu: true,
          parentKeys: ['/products/gift-cards'],
          component: './Products/GiftCards/GiftCardsProductAdd/GiftCardsProductAdd',
        }
      ]
  },
  // 客户
  {
    name: 'customer',
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
        name: 'management',
        component: './Customer/CustomerManagement/CustomerManagement',
      },
      {
        path: 'management/subdivision/create/:id',
        name: 'management/subdivision/create/:id',
        hideInMenu: true,
        component: './Customer/CustomerManagement/SubdivisionCreate/SubdivisionCreate',
      },
      {
        path: 'management/:customerId',
        name: 'management/:customerId',
        menu: false,
        component: './Customer/CustomerManagement/CustomerDetail/CustomerDetail',
      },
      {
        path: 'management/operate/add',
        name: 'management/operate/add',
        menu: false,
        component: './Customer/CustomerManagement/CustomerAdd/CustomerAdd',
      },
      {
        path: 'persona/list',
        name: 'persona/list',
        component: './Customer/Subdivide/Subdivide',
      },
      {
        path: 'persona/detail',
        name: 'personaDetail',
        hideInMenu: true,
        parentKeys: ['/customer/persona/list'],
        component: './Customer/Subdivide/SubdivideAdd/SubdivideAdd',
      },

      {
        path: 'persona/all',
        name: 'persona/all',
        hideInMenu: true,
        parentKeys: ['/customer/persona/list'],
        component: './Customer/Subdivide/ClientPortrait/ClientPortrait',
      },
      
      
    ],
  },
  
  // 折扣
  {
    path: '/discount' ,
    name: 'discount',
    icon: 'TagOutlined'
  },
  // 营销
  {
    path: 'marketing',
    name: 'marketing',
    icon: 'BlockOutlined',
    routes:[
      {
        path: 'overview',
        name: 'overview',
      },
      {
        path: 'campaigns',
        name: 'campaigns',
      },
      {
        path: 'automation',
        name: 'automation',
      }
    ]
  },
  //分析
  {
    path: 'analyse',
    name: 'analyse',
    icon: 'PieChartOutlined',
    routes: [
      {
        path: 'center',
        name: 'center',
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
        name: 'realtime',
        component:'./Analyse/Report/Report'
      },
      {
        path: 'batch',
        hideInMenu: true,
        component:'./Analyse/Batch/Batch'
      }
    ]
  },
  // 采购
  {
    path: 'purchase_orders',
    name: 'purchase_orders',
    icon:"/icons/menu/cg.svg",
    component: './Products/PurchaseOrder/Index',
  },
  {
    path: 'purchase_orders/:id',
    name: 'purchase_orders/:id',
    component: './Products/PurchaseOrder/old/OldPurchaseOrder',
    menu: false,
  },
  {
    path: 'purchase_orders/new',
    name: 'purchase_orders/new',
    component: './Products/PurchaseOrder/new/NewPurchaseOrder',
    menu: false,
  },
  // 库存
  {
    path: 'warehouse',
    name: 'warehouse',
    icon:"/icons/menu/ck.svg",
    routes:[
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
    ]
    // component: './Products/Inventory/BlankPage',
  },

  {
    path: 'app-store',
    name: 'app-store',
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
    path: 'order_invoice_customization',
    name: 'orderInvoiceCustomization',
    icon: 'PieChartOutlined',
    component: './AppStore/OrderInvoiceCustomization/OrderInvoiceCustomization',
    routes:[
      {
        path: '',
        redirect: 'orderList',
      },
      {
        path: 'orderList',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/OrderList/OrderList',
      },
      {
        path: 'orderPdfPreview/:id',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/OrderList/PrintOrderInvoice/PrintOrderInvoice',
      },
      {
        path: 'orderPdfPreview/picking/:id',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/OrderList/PrintOrderInvoicePicking/PrintOrderInvoicePicking',
      },
      {
        path: 'draftOrderList',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/DraftOrderList/DraftOrderList',
      },
      {
        path: 'orderPdfPreview/draft/:id',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/DraftOrderList/PrintOrderInvoiceDraft/PrintOrderInvoiceDraft',
      },
      {
        path: 'templateManage',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/TemplateManage/TemplateManage',
      },
      {
        path: 'basicConfig',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/BasicConfig/BasicConfig',
      },
      {
        path: 'orderPdfDownload',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/OrderPdfDownload/OrderPdfDownload',
      },
      {
        path: 'email',
        hideInMenu: true,
        component: './IFrame/OrderTicketAssistant/Email/Email',
      }
    ]
  },
  
  {
    path: 'channel',
    name: 'channel',
    component: './Products/Inventory/Index',
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
        path: 'page',
        name: 'page',
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
        component: './Channel/OnlineStore/NavList/New/NewNavList',
      },
      {
        path: 'preferences',
        name: 'preferences',
        component: './Channel/OnlineStore/Preferences/Preferences',
      },
    ]
    // component: './Products/Inventory/BlankPage',
  },

  // 店铺
  // 商户申请
  {
    path: '/stores/merchantApplication',
    menuRender: false,
    component: './Shops/merchant-application/MerchantApplication',
  },
  {
    path: '/stores/merchantCertification',
    menuRender: false,
    component: './Shops/merchant-application/MerchantCertification',
  },
  {
    path: '/stores/create',
    menuRender: false,
    component: './Shops/Create',
  },
  {
    path: '/stores/list',
    name: 'stores/list',
    icon: 'ShopOutlined',
    component: './Shops/StoresManagement/Index',
  },
  {
    path: '/stores/bills',
    name: 'stores/bills',
    icon: 'ProfileOutlined',
    component: './Shops/Bills',
  },
  {
    path: '/stores/data',
    name: 'stores/data',
    icon: 'DashboardOutlined',
    component: './Shops/Data',
  },
  // 账户管理
  {
    path: '/stores/account',
    icon: 'UserSwitchOutlined',
    component: './Shops/AccountManagement/AccountManagement',
    menuRender: false,
    hideInMenu: true,
  },


  
  // stores
  // {
  //   path: '/stores',
  //   icon: 'crown',
  //   name: 'stores',
  //   // component: './Stores/Index',
  //   routes:[
      
  //     {
  //       path: 'list',
  //       name: 'list',
  //       component: './Stores/List',
  //     },
      
  //     {
  //       path: 'subscriptions/order/paid/pre',
  //       name: 'subscriptions/order/paid/pre',
  //       component: './Stores/List',
  //     },
  //   ]
  // },
  {
    path: '/stores-subscriptions/list/paid',
    menuRender: false,
    component: './stores-subscriptions/list/Paid',
    // icon: 'crown',
    // routes:[
    //   {
    //     path: 'list/paid',
    //     component: './stores-subscriptions/list/Paid' ,
    //   }
    // ]
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
        component: './Settings/index',
      },
      
      {
        path: 'bill',
        component: './Settings/Bill'
      },
      {
        path:"base",
        name: "base",
        parentKeys: ['/settings'],
        component:"./Settings/Base/Base"
      },
      {
        path:"payments",
        name:"payments",
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
        name:"payments",
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
        name:"delivery",
        component:"./Settings/ShippingAndDistribution/ShippingAndDistribution"
      },
      // 自定义运费
      {
        path:"logistics/add/custom",
        name:"delivery",
        component:"./Settings/ShippingAndDistribution/AddCustomLogistics/AddCustomLogistics"
      },
      // 通用运费
      {
        path:"logistics/edit/custom/:id",
        name:"delivery",
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
        name:"adminpermission",
        component:"./Settings/AdministratorsPermissions/AdministratorsPermissions"
      },
      {
        path:"adminpermission/add",
        name:"adminpermission",
        component:"./Settings/AdministratorsPermissions/AdministratorsPermissionsAdd/AdministratorsPermissionsAdd"
      },

      {
        path:"fileManage",
        component:"./Settings/FileManage/FileManage"
      },
      {
        path:"notice",
        component:"./Settings/Notification/Notification"
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
        component:"./Settings/Settle/Settle"
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
  // 主题
  {
    path: 'theme',
    name: 'theme',
    icon: 'SettingOutlined',
    hideInMenu: true,
    layout: false,
    routes:[
      {
        path: 'editor',
        name: 'editor',
        component: './Theme/Editor/Editor',
      },
      {
        path: 'preview',
        name: 'preview',
        component: './Theme/View/View',
      },
      {
        path: 'codeEditor/:id/:templateId/:languagesId',
        name: 'codeEditor/:id/:templateId/:languagesId',
        component: './Theme/CodeEditor/CodeEditor',
      }
    ]
  },
  // 主题语言编辑
  {
    path: 'theme/langFieldEdit/:templateId',
    name: 'theme',
    hideInMenu: true,
    component: './Theme/LangEditor/LangEditor',
  },
  {
    path: 'theme/styles/:templateId/:styleId',
    name: 'theme/styles/:templateId/:styleId',
    hideInMenu: true,
    menuRender: false,
    layout: false,
    component: './Theme/Styles/Styles',
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: './Test/index',
  // },
  // 404
  {
    path: '*',
    layout: false,
    component: './404',
  },
];



