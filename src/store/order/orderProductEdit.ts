import { makeAutoObservable } from "mobx";
import { FulfillmentItemType, FulfillmentListType, OrderInfoType } from "./order";

class OrderRefund{

    constructor() {
        makeAutoObservable(this)
    }

    orderInfo:OrderInfoType = {
        bizOrderStatus:100,
        bizPayStatus:0,
        bizDeliveryStatus:0,
        orderSeq: "",
        appOrderSeq: "",
        ordersPackageList:[],
        orderRemarks: [],
        receiverInfo:null,
        payBillInfo:null,
        buyerInfo:null,
        priceSetInfo:null,
        tags:[]
    }
        
    setOrderInfo(value:OrderInfoType){
        this.orderInfo = value
    }
    
    // 待处理产品
    fulfillmentItemList:FulfillmentItemType[] = []
    setFulfillmentItemList(value:FulfillmentItemType[]){
        this.fulfillmentItemList = value
    }

    
    // 清空状态
    reset(){
    }
}

export default new OrderRefund();