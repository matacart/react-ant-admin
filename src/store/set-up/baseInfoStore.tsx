import { getStoreInfo, setStoreInfo } from "@/services/y2/api";
import { message } from "antd";
import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

class baseInfoStore{

    constructor() {
        makeAutoObservable(this)
    }

    // 
    statusEdit = false;


    // info

    id:string = "";

    storeLogo:string = "";

    setStoreLogo(storeLogo:string){
        this.storeLogo = storeLogo;
    }

    storeName:string = "";

    setStoreName(storeName:string){
        this.storeName = storeName;
    }

    merchantEmail:string = "";

    setMerchantEmail(merchantEmail:string){
        this.merchantEmail = merchantEmail;
    }

    serviceEmail:string = "";

    setServiceEmail(serviceEmail:string){
        this.serviceEmail = serviceEmail;
    }

    productType:string = "";

    setProductType(productType:string){
        this.productType = productType;
    }

    timezone:string = "";

    setTimeZone(timezone:string){
        this.timezone = timezone;
    }

    ordersPrefix:string = "";

    setOrdersPrefix(ordersPrefix:string){
        this.ordersPrefix = ordersPrefix;
    }

    storeStauts:string = "1";

    setStoreStauts(storeStauts:string){
        this.storeStauts = storeStauts;
    }


    // 获取
    async getStore(){
        console.log(cookie.load("domain"))
        if(cookie.load("domain") === "undefined"){
            message.error("请先创建店铺");
            history.back();
            return false;
        }

        await getStoreInfo(cookie.load("domain")?.id).then(obj=>{
            console.log(obj)
            this.id = obj.id;
            this.storeStauts = obj.status;
            this.storeLogo = obj.store_logo;
            this.storeName = obj.store_name;
            this.merchantEmail = obj.merchant_email;
            this.serviceEmail = obj.service_email;
            this.productType = obj.product_type;
            this.timezone = obj.timezone;

            this.ordersPrefix = obj.orders_prefix;
        })
        return true;
        
    }
    // 更新
    async setStore(){
        const result = await setStoreInfo(this)
        return result
    }
}

export default new baseInfoStore();