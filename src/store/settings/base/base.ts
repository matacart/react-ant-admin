import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies'


interface StoreInfo{
    store_name:string;
    store_logo:string;
    data_scope:string;
    timezone:string;
    status:string;
    service_email:string;
    merchant_email:string;
    product_type:string;
    email_verify_status:number;
    orders_prefix:string;
}

class Base{

    constructor() {
        makeAutoObservable(this)
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    statusEdit = false;

    id:string = "";

    storeInfo:StoreInfo = {
        data_scope: "0",
        store_name: "",
        store_logo: "",
        timezone: "",
        status: "",
        orders_prefix: "",
        product_type: "",
        service_email: "",
        merchant_email: "",
        email_verify_status: 0
    }

    setStoreInfo(storeInfo:StoreInfo){
        this.storeInfo = storeInfo;
    }
    
}

export default new Base();
