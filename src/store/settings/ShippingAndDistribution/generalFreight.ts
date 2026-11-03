import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface DeliveryPlan{
    deliveryId:string,
    deliveryName:string,
    deliveryDescription:string,
}

export interface AreaPlan{
    shippingRegionSeq:string,
    shippingName:string,
    shippingAreas:any[],
    isDefault:boolean,
    addressType:number,
    deliveryAddressSeq:string,
    deliveryPlans:DeliveryPlan[],
}

export interface ProductGroup{
    groupName:string,
    deliveryLocationGroupSeq:string,
    deliveryLocationSeqs:string[],
    defaultTag:boolean,
    areaPlanList:AreaPlan[],
    isNew?:boolean,
}

export interface LocationType{
    id:string,
    name:string,
}

export interface ChangeDeliveryLocationGroup{
    groupName:string,
    deliveryLocationSeqs:string[],
    deliveryLocationGroupSeq:string,
    defaultTag:boolean,
    isNew?:boolean,
    areaPlansSetDetail:{
        createdAreaPlans:AreaPlan[],
        updatedAreaPlans:AreaPlan[],
        deletedAreaPlans:string[],
    }
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

    // 区域计划 -- 删除
    delAreaPlanList(deliveryLocationGroupSeq:string,shippingRegionSeq:string){
        const productGroup = this.productGroupList.find((item)=>item.deliveryLocationGroupSeq===deliveryLocationGroupSeq)
        if(productGroup){
            productGroup.areaPlanList = productGroup.areaPlanList.filter((item)=>item.shippingRegionSeq!==shippingRegionSeq)
        }
    }
    // 区域计划 -- 新增
    addAreaPlanList(deliveryLocationGroupSeq:string,areaPlan:AreaPlan){
        const productGroup = this.productGroupList.find((item)=>item.deliveryLocationGroupSeq===deliveryLocationGroupSeq)
        if(productGroup){
            productGroup.areaPlanList = [...(productGroup.areaPlanList || []), areaPlan]
        }
    }
    // 区域计划 -- 更新
    updateAreaPlanList(deliveryLocationGroupSeq:string,areaPlan:AreaPlan){
        const productGroup = this.productGroupList.find((item)=>item.deliveryLocationGroupSeq===deliveryLocationGroupSeq)
        if(productGroup){
            productGroup.areaPlanList = productGroup.areaPlanList.map((item)=>item.shippingRegionSeq===areaPlan.shippingRegionSeq?areaPlan:item)
        }
    }

    // // 运费配置 -- 新增
    // addDeliveryPlans(deliveryLocationGroupSeq:string,shippingRegionSeq:string,deliveryPlan:DeliveryPlan){
    //     const productGroup = this.productGroupList.find((item)=>item.deliveryLocationGroupSeq===deliveryLocationGroupSeq)
    //     const areaPlan = productGroup?.areaPlanList.find((item)=>item.shippingRegionSeq===shippingRegionSeq)
    //     if(areaPlan){
    //         areaPlan.deliveryPlans = [...(areaPlan.deliveryPlans || []), deliveryPlan]
    //     }
    // }

    // -------------
    // 变更记录
    createDeliveryLocationGroup:ChangeDeliveryLocationGroup[] = [];
    setCreateDeliveryLocationGroup(value:ChangeDeliveryLocationGroup[]){
        this.createDeliveryLocationGroup = value
    }
    updateDeliveryLocationGroup:ChangeDeliveryLocationGroup[] = [];
    setUpdateDeliveryLocationGroup(value:ChangeDeliveryLocationGroup[]){
        this.updateDeliveryLocationGroup = value
    }
    deleteDeliveryLocationGroupSeqs:string[] = [];
    setDeleteDeliveryLocationGroupSeqs(value:string[]){
        this.deleteDeliveryLocationGroupSeqs = value
    }

    reset(){
        this.language = cookie.load("shop_lang") || '2';
        this.productGroupList = [];
        this.productGroupRefresh = 0;
        // 变更记录
        this.createDeliveryLocationGroup = [];
        this.updateDeliveryLocationGroup = [];
        this.deleteDeliveryLocationGroupSeqs = [];
    }
}

export default new GeneralFreight()

