import { makeAutoObservable } from "mobx";
import { FulfillmentItemType, FulfillmentListType, OrderInfoType } from "./order";
import cookie from 'react-cookies';

interface BillDetailsType{
    status:"success"|"error",
    totalAmount:number,
    paidAmount:number,
    unpaidAmount:number,
}

class OrderRefund{

    constructor() {
        makeAutoObservable(this)
    }

    // 语言id
    languages = cookie.load("shop_lang") || '2';
    setLanguages(value:string){
        this.languages = value
    }

    orderInfo:OrderInfoType = {
        bizOrderStatus: 100,
        bizPayStatus: 0,
        bizDeliveryStatus: 0,
        orderSeq: "",
        appOrderSeq: "",
        mainOrderSeq: "",
        ordersPackageList: [],
        orderRemarks: [],
        receiverInfo: null,
        payBillInfo: null,
        buyerInfo: null,
        priceSetInfo: null,
        tags: []
    }
        
    setOrderInfo(value:OrderInfoType){
        this.orderInfo = value
    }
    
    // 待处理产品
    fulfillmentItemList:FulfillmentItemType[] = []
    setFulfillmentItemList(value:FulfillmentItemType[]){
        this.fulfillmentItemList = value
    }

    // 账单明细
    billDetails:BillDetailsType|null = null
    setBillDetails(value:BillDetailsType|null){
        this.billDetails = value
    }

    // 发送支付邮件
    sendPaymentEmail = false
    setSendPaymentEmail(value:boolean){
        this.sendPaymentEmail = value
    }

    
    // 清空状态
    reset(){
        this.setOrderInfo({
            bizOrderStatus: 100,
            bizPayStatus: 0,
            bizDeliveryStatus: 0,
            orderSeq: "",
            appOrderSeq: "",
            mainOrderSeq: "",
            ordersPackageList: [],
            orderRemarks: [],
            receiverInfo: null,
            payBillInfo: null,
            buyerInfo: null,
            priceSetInfo: null,
            tags: []
        })
        this.setFulfillmentItemList([])
        this.setBillDetails(null)
        this.setSendPaymentEmail(false)
    }
}

export default new OrderRefund();