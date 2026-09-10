import { makeAutoObservable } from "mobx";
import { FulfillmentItemType, FulfillmentListType } from "./order";

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

    // // 配送信息
    // delivery:DeliveryType = {
    //     shippingId: "0",
    //     shippingNo: "",
    //     customerNotified: "0",
    //     shippingName: "",
    //     shippingUrl: ""
    // }
    // setDelivery(value:any){
    //     this.delivery = value
    // }
    // // 收货地址
    // deliveryAddress:DeliveryAddressType = {
    //     delivery_telephone: "",
    //     delivery_city_id: "",
    //     delivery_address_format_id: "",
    //     delivery_country_code_3: "",
    //     delivery_country_code_2: "",
    //     delivery_address_id: "",
    //     order_id: "",
    //     delivery_firstname: "",
    //     delivery_lastname: "",
    //     delivery_state_id: "",
    //     delivery_country_id: "",
    //     shipping_method: "",
    //     customer_telephone: "",
    //     delivery_country: "",
    //     delivery_postcode: "",
    //     delivery_state: "",
    //     delivery_city: "",
    //     delivery_street_address: "",
    //     delivery_suburb: "",
    //     delivery_company: "",
    //     delivery_name: ""
    // }
    // setDeliveryAddress(value:DeliveryAddressType){
    //     this.deliveryAddress = value
    // }
    // deliveryProductList:DeliveryProductListType[] = []
    // setDeliveryProductList(value:DeliveryProductListType[]){
    //     this.deliveryProductList = value
    // }

    // 清空状态
    reset(){
        
    }
}

export default new OrderManualDelivery();