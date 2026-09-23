import { makeAutoObservable } from "mobx";
import { FulfillmentListType, OrderInfoType } from "./order";


interface DeliveryType {
}


class OrderManualDelivery{

    constructor() {
        makeAutoObservable(this)
    }

    // 刷新状态
    refreshKey = 0;
    // 状态更新
    triggerRefresh() {
      this.refreshKey += 1;
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

    // 发货产品
    fulfillmentItem:FulfillmentListType = {
        fulfillmentOrder: null,
        fulfillmentItemList: [],
        locationAddress: {}
    }
    setFulfillmentItem(value:FulfillmentListType){
        this.fulfillmentItem = value
    }

    // 清空状态
    reset(){
        
    }
}

export default new OrderManualDelivery();