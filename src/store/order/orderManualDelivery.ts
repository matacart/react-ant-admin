import { makeAutoObservable } from "mobx";
import { FulfillmentListType } from "./order";

class OrderManualDelivery{

    constructor() {
        makeAutoObservable(this)
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