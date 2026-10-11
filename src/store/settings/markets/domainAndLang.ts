import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface MarketLanguage {
    marketId: string;
    iso: string;
    defaultLanguage: boolean;
}

class DomainAndLang{
    constructor() {
        makeAutoObservable(this)
    }

    marketLanguageList:MarketLanguage[] = [];

    setMarketLanguageList(list:MarketLanguage[]){
        this.marketLanguageList = list;
    }

    otherInfo:any = {};
    setOtherInfo(info:any){
        this.otherInfo = info;
    }

    reset(){
        this.marketLanguageList = [];
        this.otherInfo = {};
    }

}

export default new DomainAndLang();
