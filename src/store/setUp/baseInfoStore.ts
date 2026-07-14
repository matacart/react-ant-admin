import { setStoreInfo } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";


interface StoreInfoType{}

class BaseInfoStore{

    constructor() {
        makeAutoObservable(this)
    }

    statusEdit = false;

    id:string = "";

    // storeInfo
    storeInfo:any = {}

    setStoreInfo(storeInfo:any){
        this.storeInfo = storeInfo;
    }
    
    // 获取
    // async getStore(){
    //     if(cookie.load("domain") === "undefined"){
    //         message.error("请先创建店铺");
    //         history.back();
    //         return false;
    //     }
    //     await getStoreInfo().then(res=>{
    //         if(res.code == 0){
    //             this.id = res.data.id;
    //             this.storeStauts = res.data.status;
    //             this.storeLogo = res.data.store_logo;
    //             this.storeName = res.data.store_name;
    //             this.merchantEmail = res.data.merchant_email;
    //             this.serviceEmail = res.data.service_email;
    //             this.productType = res.data.product_type;
    //             this.timezone = res.data.timezone;
    //             this.ordersPrefix = res.data.orders_prefix;
    //         }
    //     })
    //     return true;
    // }
    // 更新
    async setStore(){
        const result = await setStoreInfo(this)
        return result
    }
}

export default new BaseInfoStore();
