import { makeAutoObservable } from "mobx";

interface variants{
    
}

interface productinfo {
    variants: any;
    vid?: string;
    sku_id?:string;
    cost_price: number;
    // group_id: "0",
    product_id:string;
    proudct_imgage:string;
    product_model:string;
    product_name:string;
    product_price:number; //特价
    product_quantity: number;
    product_source: string;
    final_price:number; //最终价
    attributes:any;
    // 折扣信息
    product_discount_amount: string;
    product_discount_description: string;
    product_discount_type: string;
    product_discount_type_from: string;

   
}

interface orderInfo{
    id?:string;
    remark:string;
    productTotal:number;
    orderTotal:number;
    orderDiscount: number;
    orderDiscountDesc: string;
    paymentTerm:string;
    paymentStartDate:string;

    shippingId:string;
    shippingMethod:string;
    shippingTotal:number;
    shippingModuleCode:string | null;
    
    paymentMethod:string;
    paymentMethodNo:string;
    ordersStatus:string;

    isTaxe: number;
    tags: string;

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

    // 上一个草稿单id
    prevDraftId:string = "";
    setPrevDraftId(prevDraftId:string){
        this.prevDraftId = prevDraftId
    }
    nextDraftId:string = "";
    setNextDraftId(nextDraftId:string){
        this.nextDraftId = nextDraftId
    }

    orderInfo:orderInfo = {
        orderDiscount: 0,
        orderDiscountDesc: "",
        productTotal: 0,
        orderTotal: 0,
        paymentTerm: "",
        // 付款期限
        paymentStartDate: "",
        shippingId: "",
        shippingMethod: "",
        shippingTotal: 0,
        shippingModuleCode: null,
        paymentMethod: "",
        paymentMethodNo: "",
        ordersStatus:"0",
        remark: "",

        isTaxe: 0,
        isDiscountAccumulation: 1,
        // 
        tags:"",
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
            orderDiscount: 0,
            orderDiscountDesc: "",
            productTotal: 0,
            orderTotal: 0,
            paymentTerm: "",
            // 付款期限
            paymentStartDate: "",

            shippingId:"",
            shippingMethod: "",
            shippingTotal: 0,
            shippingModuleCode: null,
            paymentMethod: "",
            paymentMethodNo: "",
            ordersStatus:"0",
            remark: "",

            tags:"",
        };
        this.productInfo = [];
        this.customerInfo = null;
        this.receiverInfo = null;
        this.payBillInfo = null;

        this.customerAddressList = []
    }
}

export default new orderDraft()