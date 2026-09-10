import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface RemarkType{
  id: string;
  remark: string;
  createTime: number;
  updateTime: number;
}

interface LocationAddressType{
}

interface BuyerInfoType{
  buyerId: string;
  activated: boolean;
  loginStatus: boolean;
  buyerNick: string;
  gender: string;
  buyerPhoneAreaCode: string;
  buyerPhone: string;
  buyerEmail: string;
}

export interface ItemGroupType{
  itemList: FulfillmentItemType[];
  locationAddress:LocationAddressType;
}



export interface OrdersPackageType{
  packageSeq: string;
  appPackageSeq: string;
  sendTime:number;
  itemGroupList:ItemGroupType[];
}

export interface PriceSetInfoType{
  expressFeeInfo: {
    amountSet: {
      settleMoney: {
        amount: number;
        currencyCode: string;
      };
    };
  };
}



export interface OrderInfoType{
  orderSeq: string;
  appOrderSeq: string;
  bizOrderStatus:number;
  ordersPackageList:OrdersPackageType[];
  bizPayStatus:number;
  bizDeliveryStatus:number;
  orderRemarks:RemarkType[];
  buyerInfo:BuyerInfoType | null;
  payBillInfo:PayBillInfoType | null;
  receiverInfo:ReceiverInfoType | null;
  priceSetInfo:PriceSetInfoType | null;
  tags:string[];
}

interface ReceiverInfoType{
  deliveryType:string;
  receiverCertificatesType:string;
  receiverCertificatesNo: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverCompany: string;
  receiverAddress: string;
  receiverAddressAdd: string;
  receiverArea: string;
  receiverCity: string;
  receiverCityCode: string;
  receiverProvince: string;
  receiverProvinceCode: string;
  receiverCountry: string;
  receiverCountryCode: string;
  receiverPostcode: string;
  receiverMobile: string;
}

interface PayBillInfoType{
  sameAsReceiver: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress: string;
  billingAddressAdd: string;
  billingArea: string;
  billingCity: string;
  billingProvince: string;
  billingPostcode: string;
  billingCountry: string;
  billingMobile: string;
}

export interface FulfillmentItemType{
  groupId: string;
  title: string;
  productSku: string;
  productNum: number;
  firstImage: string;
  productPrice:number;
  productAmount:number;
  attributes:any[];
}


export interface FulfillmentListType{
  fulfillmentOrder:any;
  fulfillmentItemList:FulfillmentItemType[];
  locationAddress:LocationAddressType;
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
    refreshKey = 0;

    // 语言id
    languages = cookie.load("shop_lang") || '2';
    setLanguages(value:string){
      this.languages = value
    }
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
      bizOrderStatus: 100,
      bizPayStatus: 0,
      bizDeliveryStatus: 0,
      orderSeq: "",
      appOrderSeq: "",
      ordersPackageList: [],
      orderRemarks: [],
      receiverInfo: null,
      payBillInfo: null,
      buyerInfo: null,
      tags: [],
      priceSetInfo: null
    }

    setOrderInfo(value:OrderInfoType){
      this.orderInfo = value
    }

    // 履约单列表
    fulfillmentOrderList:FulfillmentListType[] = []
    setFulfillmentOrderList(value:FulfillmentListType[]){
      this.fulfillmentOrderList = value
    }

    // 发货单列表
    ordersPackageList:OrdersPackageType[] = []
    setOrdersPackageList(value:OrdersPackageType[]){
      this.ordersPackageList = value
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
      // this.customerInfo = {}
    }

}

export default new Order()

