import { makeAutoObservable } from "mobx";

interface productinfo {
  final_price: number;
  product_quantity: number;
  product_price: number;
  id: string;
  product_name: string;
  product_image: string;
}

interface orderInfoType{
  payment_method: ReactNode;
  shipping_status: any;
  payment_status: any;
  order_sn: string;
}

interface customerInfo{
    tel?: string;
    email?: string;
    sex?: string;
    last_name?: string;
    first_name?: string;
}


class order{
    constructor() {
        makeAutoObservable(this)
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

    // 客户信息
    customerInfo:customerInfo = {}

    setCustomerInfo(value:customerInfo){
      this.customerInfo = value
    }


    // 收货地址
    deliveryAddress = {}

    setDeliveryAddress(res:any){
      this.deliveryAddress = res
    }

    // 账单地址
    billingAddress = {}
    setBillingAddress(res:any){
      this.billingAddress = res
    }

    // 订单总计
    orderTotal = []

    setOrderTotal(res:any){
      this.orderTotal = res
    }

    // 历史记录
    historyStatus = []

    setHistoryStatus(res:any){
      this.historyStatus = res
    }

    // 状态初始化
    reset(){
      // this.setOrderInfo(this.getInitOrder())
      this.productInfo = []
      this.deliveryAddress = {}
      // this.customerInfo = {}
    }

}

export default new order()

