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

export interface ProductGroupDetail{
    name:string,
    productGroupSeq:string,
    type:string,
}

interface ProductType{
    productId:string,
    title:string,
    productGroupSeq:string,
    productGroupName:string,
    image:string,
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



class CustomFreight {
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
    // 商品分组详情
    productGroupDetail:ProductGroupDetail = {
        name: "",
        productGroupSeq: "",
        type: ""
    }
    setProductGroupDetail(value:ProductGroupDetail){
        this.productGroupDetail = value
    }
    // 新增商品
    createdProduct:ProductType[] = [];
    setCreatedProduct(value:ProductType[]){
        this.createdProduct = value
    }
    // 删除商品ID
    deletedProductIds:string[] = [];
    setDeletedProductIds(value:string[]){
        this.deletedProductIds = value
    }

    // 商品分组
    productGroupList:ProductGroup[] = []
    setProductGroupList(value:ProductGroup[]){
        this.productGroupList = value
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
        
        this.productGroupRefresh = 0;
        this.productGroupList = [];
        this.language = cookie.load("shop_lang") || '2'

        // 变更记录
        this.createdProduct = [];
        this.deletedProductIds = [];

        this.createDeliveryLocationGroup = [];
        this.updateDeliveryLocationGroup = [];
        this.deleteDeliveryLocationGroupSeqs = [];
    }

}

export default new CustomFreight()
