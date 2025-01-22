import { getStoreInfo, setStoreInfo } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

class baseInfoStore{

    constructor() {
        makeAutoObservable(this)
    }

    id:string = "";

    storeLogo:string = "";

    setStoreLogo(storeLogo:string){
        this.storeLogo = storeLogo;
    }

    storeName:string = "";

    setStoreName(storeName:string){
        this.storeName = storeName;
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
        await getStoreInfo(cookie.load("domain")?.id).then(obj=>{
            console.log(obj)
            this.id = obj.id;
            this.storeStauts = obj.status;
            this.storeLogo = obj.store_logo;
            this.storeName = obj.store_name;

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