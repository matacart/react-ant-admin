import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


export interface MarketType {
    marketId:number,
    homeMarket:boolean,
    marketName:string,
}

class MarketsList {

    constructor() {
      makeAutoObservable(this)
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 市场列表
    marketList:MarketType[] = [];
    setMarketList(value:MarketType[]){
        this.marketList = value;
    }


    reset(){
        this.languagesId = cookie.load("shop_lang") || '2'
        this.marketList = [];
    }
}

export default new MarketsList();
