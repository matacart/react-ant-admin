import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface AreaPlan{
    shippingRegionSeq:string,
    shippingName:string,
    shippingAreas:any[],
    isDefault:boolean,
    addressType:number,
    // deliveryAddressSeq:string,
    deliveryPlans:any[],
}

export interface ProductGroup{
    groupName:string,
    deliveryLocationGroupSeq:string,
    deliveryLocationSeqs:string[],
    defaultTag:boolean,
    areaPlanList:AreaPlan[]

    // 标识
    key?:string,
    // 是否改变
    change?:boolean,
}

interface DeliveryLocationGroup{
    groupName:string,
    defaultTag:boolean,
    deliveryLocationSeqs:string[],
}

export interface LocationType{
    id:string,
    name:string,
}


class GeneralFreight {
    constructor() {
        makeAutoObservable(this)
    }

    language = cookie.load("shop_lang") || '2'
    setLanguage(res:string){
        this.language = res
    }
    // 刷新商品分组
    productGroupRefresh = 0;
    triggerProductGroupRefresh(){
        this.productGroupRefresh = this.productGroupRefresh + 1;
    }

    // 仓库列表
    locationList:Record<string, LocationType> = {}
    setLocationList(value:Record<string, LocationType>){
        this.locationList = value
    }

    countryList:any[] = []
    setCountryList(value:any[]){
        this.countryList = value
    }

    // 商品分组
    productGroupList:ProductGroup[] = []
    setProductGroupList(value:ProductGroup[]){
        this.productGroupList = value
    }

    // 创建配送分组
    createDeliveryLocationGroup:ProductGroup[] = []
    setCreateDeliveryLocationGroup(value:ProductGroup[]){
        this.createDeliveryLocationGroup = value
    }
    // 更新配送分组
    updateDeliveryLocationGroupSeqs:string[] = []
    setUpdateDeliveryLocationGroupSeqs(value:string[]){
        this.updateDeliveryLocationGroupSeqs = value
    }
    get updateDeliveryLocationGroup(): ProductGroup[] {
        const groupMap = new Map(
            this.productGroupList.map(g => [g.deliveryLocationGroupSeq, g])
        );
        return this.updateDeliveryLocationGroupSeqs.map(seq => groupMap.get(seq)).filter((g): g is ProductGroup => g !== undefined);
    }
    // 删除配送分组
    deleteDeliveryLocationGroupSeqs:string[] = []
    setDeleteDeliveryLocationGroupSeqs(value:string[]){
        this.deleteDeliveryLocationGroupSeqs = value
    }

    resSetProductGroup(){
        this.productGroupList = [];
        this.createDeliveryLocationGroup = [];
        this.updateDeliveryLocationGroupSeqs = [];
        this.deleteDeliveryLocationGroupSeqs = [];
    }

    reset(){
        this.language = cookie.load("shop_lang") || '2';
        this.productGroupList = [];
        this.productGroupRefresh = 0;
        this.createDeliveryLocationGroup = [];
        this.updateDeliveryLocationGroupSeqs = [];
        this.deleteDeliveryLocationGroupSeqs = [];
    }

}

export default new GeneralFreight()
