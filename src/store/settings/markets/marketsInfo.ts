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

export interface CountryType{
    code:string,
    name:string,
}

export interface MarketsInfoType {
    marketId:string,
    marketName:string,
    homeMarket:boolean,
    active:boolean,
    storeCurrency:string,
    domainLanguage:DomainLanguageType,
    deliveryStatistic:{
        deliveryPlanNum:number,
    }
    priceRuleInfo:{
        baseCurrency:string,
        autoExchangeRate:number,
        autoExchangeUpdateTime:string
    }
    countryList:CountryType[],
    urlPreview:UrlType[]
}


// 默认市场信息
const defaultMarketsInfo = (): MarketsInfoType => ({
    marketId: "",
    marketName: "",
    homeMarket: false,
    active: true,
    storeCurrency:"",
    domainLanguage: { 
        mainDomain: "", 
        marketLanguageList: [] 
    },
    priceRuleInfo:{
        baseCurrency:"",
        autoExchangeRate:0,
        autoExchangeUpdateTime:""
    },
    deliveryStatistic:{
        deliveryPlanNum:0,
    },
    countryList:[],
    urlPreview:[]
});

class MarketsInfo {

    constructor() {
      makeAutoObservable(this)
    }

    refreshKey = false;
    // 刷新
    refresh(){
        this.refreshKey = !this.refreshKey;
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
        this.refreshKey = false;
    }
}

export default new MarketsInfo();
