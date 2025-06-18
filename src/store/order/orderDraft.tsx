import { makeAutoObservable } from "mobx";

interface productinfo {
    product_cost_price: number;
    // group_id: "0",
    product_id:string;
    proudct_imgage:string;
    product_model:string;
    product_name:string;
    product_price:number;
    product_quantity: number;
    product_source: string;
    final_price:number;
    attributes:any;
    // 折扣信息
    product_discount_amount: string;
    product_discount_description: string;
    product_discount_type: string;
    product_discount_type_from: string;

   
}

interface orderInfo{
    id?:string;
    orderDiscount: number;
    orderDiscountDesc: string;
    logisticsName: string;
    paymentStatus: string;
    paymentMethod: string;
    isTaxe: number;
    logisticsAmount: number;
    logisticsType: string;
    remark:string;
    tags:any;
    // 
    deferredPayment:boolean;
    isDiscountAccumulation:number;
}

interface customerInfo{
    id:string;
    country:string;
    countryCode:string;
    countryCode2:string;
    province:string; 
    provinceCode:string;
    city:string;
    cityCode:string;
    company:string;
    firstName:string;
    lastName:string;
    name:string;
    mobile:string;
    email:string;
    postcode:string;
    suburb:string;
    address:string;
}


interface receiverInfo{
    receiverId:string;
    receiverAddress:string;
    receiverAddressAdd:string;
    receiverCountry:string;
    receiverCountryCode:string;
    receiverCountryCode2:string;
    receiverCountryCode3:string;
    receiverProvince:string;
    receiverProvinceCode:string;
    receiverCity:string;
    receiverCityCode:string;
    receiverCompany:string;
    receiverFirstName:string;
    receiverLastName:string;
    receiverMobile:string;
    receiverName:string;
    receiverPostcode:string;
}

interface payBillInfo{
    payBillId:string;
    payBillName:string,
    payBillFirstName:string,
    payBillLastName:string,
    payBillMobile:string,
    payBillCompany:string,
    payBillCountryCode2:string,
    payBillCountryCode3:string,
    payBillCountryCode:string,
    payBillCountry:string,
    payBillProvinceCode:string,
    payBillProvince:string,
    payBillCityCode:string,
    payBillCity:string,
    payBillPostcode:string,
    payBillAddressAdd:string,
    payBillAddress:string,
    is_same_delivery:string
}


class orderDraft{
    constructor() {
        makeAutoObservable(this)
    }

    orderInfo:orderInfo = {
        orderDiscount: 0,
        orderDiscountDesc: "",
        logisticsName: "",
        paymentStatus: "0",
        paymentMethod: "0",
        isTaxe: 0,
        logisticsAmount: 0,
        logisticsType: "",
        isDiscountAccumulation: 1,
        // 
        tags: [],
        remark: "",
        // 
        deferredPayment: false,
    }

    setOrderInfo(value:orderInfo){
        this.orderInfo = value
    }

    productInfo:productinfo[] = []

    setProductInfo(value:productinfo[]){
        this.productInfo = value
    }

    customerInfo:customerInfo | null = null

    setCustomerInfo(value:customerInfo | null){
        this.customerInfo = value
    }

    receiverInfo:receiverInfo | null = null
    setReceiverInfo(value:receiverInfo | null){
        this.receiverInfo = value
    }

    payBillInfo:payBillInfo | null = null
    setPayBillInfo(value:payBillInfo | null){
        this.payBillInfo = value
    }

    // 客户历史地址
    customerAddressList:[] = []

    setCustomerAddressList(value){
        this.customerAddressList = value
    }

    // 重置
    reset(){
        this.orderInfo = {
            logisticsName: "",
            paymentStatus: "0",
            paymentMethod: "0",
            isTaxe: 0,
            logisticsAmount: 0,
            logisticsType: "",
            discountAmount: 0,
            discountDesc: "",
            isDiscountAccumulation:1,
            tags: [],
            remark: "",
            deferredPayment: false
        };
        this.productInfo = [];
        this.customerInfo = null;
        this.receiverInfo = null;
        this.payBillInfo = null;

        this.customerAddressList = []
    }
}

export default new orderDraft()