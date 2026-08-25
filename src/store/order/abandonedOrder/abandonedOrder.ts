import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface OrderProductItemType{
    title:string,
    images:string[],
    attributes:any[],
    productPrice:number,
    productSource:number,
    finalPrice:number,
    productNum:number
}

interface PriceSetInfoType{
    subtotalInfo:{
        productNum:string
    }
}

interface BuyerInfoType{
    buyerNick:string,
    buyerEmail:string,
}

interface AbandonedOrderDataType{
    abandonedOrderSeq:string,
    abandonedOrderPaymentUrl:string,
    sellerRemark:string,
    createTime:string,
    checkoutsToken:string,
    orderProductItems:OrderProductItemType[],
    priceSetInfo:PriceSetInfoType,
    buyerInfo:BuyerInfoType,
    payBillInfo:any|null,
    receiverInfo:any|null,
}

interface scrollDataType{
    previousDataList:any[],
    nextDataList:any[]
}




class AbandonedOrder{
    constructor() {
        makeAutoObservable(this)
    }

    languages = cookie.load("shop_lang") || '2';

    setLanguages(res:string){
        this.languages = res
    }

    serviceEmail = ""
    setServiceEmail(value:string){
        this.serviceEmail = value
    }

    abandonedOrderData:AbandonedOrderDataType = {
        abandonedOrderSeq: "",
        abandonedOrderPaymentUrl: "",
        sellerRemark: "",
        createTime: "",
        checkoutsToken: "",
        orderProductItems: [],
        priceSetInfo: {
            subtotalInfo: {
                productNum: ""
            }
        },
        payBillInfo:null,
        receiverInfo:null,
        buyerInfo: {
            buyerNick: "",
            buyerEmail: ""
        }
    }
    setAbandonedOrderData(value:AbandonedOrderDataType){
        this.abandonedOrderData = value
    }

    scrollData:scrollDataType = {
        previousDataList: [],
        nextDataList: []
    }
    setScrollData(value:scrollDataType){
        this.scrollData = value
    }

    // 重置
    reset(){
        this.languages = cookie.load("shop_lang") || '2';
        this.serviceEmail = "";
    }
}

export default new AbandonedOrder();