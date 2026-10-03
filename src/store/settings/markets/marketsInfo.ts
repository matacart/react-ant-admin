import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';



interface DomainLanguageType{
    mainDomain:string,
    marketLanguageList:any[],
}

interface UrlType{
    iso:string,
    url:string,
}

export interface MarketsInfoType {
    marketId:string,
    marketName:string,
    homeMarket:boolean,
    storeCurrency:string,
    domainLanguage:DomainLanguageType,
    deliveryStatistic:{
        deliveryPlanNum:number,
    }
    urlPreview:UrlType[]
}


// 默认市场信息
const defaultMarketsInfo = (): MarketsInfoType => ({
    marketId: "",
    marketName: "",
    homeMarket: false,
    storeCurrency:"",
    domainLanguage: { 
        mainDomain: "", 
        marketLanguageList: [] 
    },
    deliveryStatistic:{
        deliveryPlanNum:0,
    },
    urlPreview:[]
});

class MarketsInfo {

    constructor() {
      makeAutoObservable(this)
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 市场列表
    marketsInfo:MarketsInfoType = defaultMarketsInfo();
    setMarketsInfo(value:MarketsInfoType){
        this.marketsInfo = value;
    }

    reset(){
        this.languagesId = cookie.load("shop_lang") || '2'
        this.marketsInfo = defaultMarketsInfo();
    }
}

export default new MarketsInfo();
