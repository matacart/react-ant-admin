import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface Country {
    countryCnName: string;
    countryCode: string;
    currency: string;
}

class Markets {

    constructor() {
      makeAutoObservable(this)
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 市场ID
    marketId = "";
    setMarketId(value:string){
        this.marketId = value;
    }

    marketName = "";
    setMarketName(value:string){
        this.marketName = value;
    }

    countryList:Country[] = [];
    setCountryList(value:Country[]){
        this.countryList = value;
    }

    reset(){
        this.languagesId = cookie.load("shop_lang") || '2'
        this.marketId = "";
        this.marketName = "";
        this.countryList = [];
    }
}

export default new Markets();
