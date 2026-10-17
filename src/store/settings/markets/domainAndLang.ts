import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface MarketLanguage {
    marketId: string;
    iso: string;
    defaultLanguage: boolean;
}


export interface OtherInfo {
    configType: number;
    configValue: string;
    marketType: number;
    mainDomain: string;
}

class DomainAndLang{
    constructor() {
        makeAutoObservable(this)
    }

    marketLanguageList:MarketLanguage[] = [];

    setMarketLanguageList(list:MarketLanguage[]){
        this.marketLanguageList = list;
    }

    otherInfo:OtherInfo = {
        configType: 1,
        configValue:'',
        marketType:1,
        mainDomain:'',
    };
    setOtherInfo(info:OtherInfo){
        this.otherInfo = info;
    }

    reset(){
        this.marketLanguageList = [];
        this.otherInfo = {
            configType: 1,
            configValue:'',
            marketType:1,
            mainDomain:'',
        };
    }

}

export default new DomainAndLang();
