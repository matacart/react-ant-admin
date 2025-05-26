import { makeAutoObservable } from "mobx";
import { getOrderLogs } from '@/services/y2/api';

interface productinfo {
  shipping_courier_name: string;
  shipping_no: string;
  quantity_shipped: number;
  remaining_quantity: number;
  attributes: any;
  final_price: number;
  product_quantity: number;
  shipped_quantity:number;
  product_price: number;
  product_id: string;
  product_name: string;
  product_image: string;
}

interface orderInfoType{
  delivery_country_code_2: string;
  delivery_country_code_3: string;
  delivery_city_id: string;
  delivery_state_id: string;
  delivery_country_id: string;
  tags: string[];
  customer_id_number: string;
  payment_start_date: string | undefined;
  payment_term: string;
  languages_id: string;
  is_same_delivery: string;
  delivery_telephone: string;
  delivery_country: string;
  delivery_postcode: string;
  delivery_state: string;
  delivery_city: string;
  delivery_street_address: string;
  delivery_suburb: string;
  delivery_company: string;
  delivery_firstname: string;
  delivery_lastname: string;
  billing_name: string;
  delivery_name: string;
  order_id: string;
  customer_id: string;
  customer_telephone: string;
  customer_email_address: string;
  payment_method: string;
  shipping_status: number;
  payment_status: number;
  order_sn: string;
}

interface customerInfo{
    order_history_count: string;
    tel?: string;
    email?: string;
    sex?: string;
    last_name?: string;
    first_name?: string;
}

interface shippedProductsGroup{
  product: any[];
  shipment: any;
}

interface remainingProductsGroup{
  shipment: any;
  product: any;
}

interface returnInProductsGroup{
  return: any;
  product: any;
}


class order{
    constructor() {
        makeAutoObservable(this)
    }
    // 状态
    refreshKey = 0
    // 状态更新
    triggerRefresh() {
      this.refreshKey += 1;
    }
    // 初始化产品数据结构
    // getInitOrder() {
    //   return {
    //     id: "",
    //     discountAmount:0,
    //     discountDesc:"",
    //     isDiscountAccumulation:0,
    //     logisticsType:"",
    //     logisticsName:"",
    //     logisticsAmount:0,
    //     isTaxe:0,
    //     paymentStatus:"0",

    //     remark: "",
    //     tags:""
    //   } as orderType;
    // }


    // orderInfo:orderType = this.getInitOrder()


    // 订单信息
    orderInfo:orderInfoType = {
      order_sn: ""
    }
    setOrderInfo(value:orderInfoType){
      this.orderInfo = value
    }

    // 商品信息
    productInfo:productinfo[] = []
    setProductInfo(value:productinfo[]){
      this.productInfo = value
    }

    // 已发货信息
    shippedProductsGroup:shippedProductsGroup[] = []
    setShippedProductsGroup(value:shippedProductsGroup[]){
      this.shippedProductsGroup = value
    }
    // 未发货产品
    remainingProductGroup:remainingProductsGroup[] = []
    setRemainingProductGroup(value:remainingProductsGroup[]){
      this.remainingProductGroup = value
    }

    returnInProductsGroup:returnInProductsGroup[] = []
    setReturnInProductsGroup(value:returnInProductsGroup[]){
      this.returnInProductsGroup = value
    }

    // 客户信息
    customerInfo:customerInfo = {}
    setCustomerInfo(value:customerInfo){
      this.customerInfo = value
    }


    // 订单总计
    orderTotal = []
    setOrderTotal(res:any){
      this.orderTotal = res
    }

    // 商家备注
    merchantNotes = []
    setMerchantNotes(res:any){
      this.merchantNotes = res
    }

    // 历史记录
    orderLog = []
    setOrderLog(res:any){
      this.orderLog = res
    }

    // 日志总数
    orderLogCount = 0
    setOrderLogCount(value:number){
      this.orderLogCount = value
    }

    // 状态初始化
    reset(){
      // this.setOrderInfo(this.getInitOrder())
      this.productInfo = []
      // this.customerInfo = {}
    }



}

export default new order()

