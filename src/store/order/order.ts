import { makeAutoObservable } from "mobx";

interface Productinfo {
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

interface OrderInfoType{
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

interface CustomerInfo{
    order_history_count: string;
    tel?: string;
    email?: string;
    sex?: string;
    last_name?: string;
    first_name?: string;
}

interface ShippedProductsGroup{
  product: any[];
  shipment: any;
}

interface RemainingProductsGroup{
  shipment: any;
  product: any;
  fulfillment:any;
}

interface ReturnInProductsGroup{
  return: any;
  product: any;
}

class Order{
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
    orderInfo:OrderInfoType = {
      order_sn: "",
      delivery_country_code_2: "",
      delivery_country_code_3: "",
      delivery_city_id: "",
      delivery_state_id: "",
      delivery_country_id: "",
      tags: [],
      customer_id_number: "",
      payment_start_date: undefined,
      payment_term: "",
      languages_id: "",
      is_same_delivery: "",
      delivery_telephone: "",
      delivery_country: "",
      delivery_postcode: "",
      delivery_state: "",
      delivery_city: "",
      delivery_street_address: "",
      delivery_suburb: "",
      delivery_company: "",
      delivery_firstname: "",
      delivery_lastname: "",
      billing_name: "",
      delivery_name: "",
      order_id: "",
      customer_id: "",
      customer_telephone: "",
      customer_email_address: "",
      payment_method: "",
      shipping_status: 0,
      payment_status: 0
    }


    setOrderInfo(value:OrderInfoType){
      this.orderInfo = value
    }

    // 商品信息
    productInfo:Productinfo[] = []
    setProductInfo(value:Productinfo[]){
      this.productInfo = value
    }

    // 已发货信息
    shippedProductsGroup:ShippedProductsGroup[] = []
    setShippedProductsGroup(value:ShippedProductsGroup[]){
      this.shippedProductsGroup = value
    }
    // 未发货产品
    remainingProductGroup:RemainingProductsGroup[] = []
    setRemainingProductGroup(value:RemainingProductsGroup[]){
      this.remainingProductGroup = value
    }

    // 退货中商品
    returnInProductsGroup:ReturnInProductsGroup[] = []
    setReturnInProductsGroup(value:ReturnInProductsGroup[]){
      this.returnInProductsGroup = value
    }

    // 客户信息
    customerInfo:CustomerInfo = {
      order_history_count: ""
    }
    setCustomerInfo(value:CustomerInfo){
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

export default new Order()

