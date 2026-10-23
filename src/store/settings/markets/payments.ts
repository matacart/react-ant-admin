import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface OtherInfo {
    baseCurrency:string;
    storeCurrency:string;
    useLocalCurrency:boolean;
}

export interface Payment {
    channelCode:string;
    channelName:string;
    methodCode:string;
    methodName:string;
    useMarketCurrency: boolean;
}

export interface CountryPaymentInfo {
    countryCode: string;
    countryName: string;
    paymentList: Payment[];
    systemPayment: boolean;
}

class Payments{
    constructor() {
        makeAutoObservable(this)
    }

    otherInfo:OtherInfo = {
        baseCurrency:"",
        storeCurrency:"",
        useLocalCurrency:false,
    };
    setOtherInfo(info:OtherInfo){
        this.otherInfo = info;
    }
    

    // 更新国家支付信息
    newCountryPaymentInfos:any[] = [];
    updateCountryPaymentInfos(data:any){
        const index = this.newCountryPaymentInfos.findIndex(
            (item) => item.countryCode === data.countryCode
        );
        if (index !== -1) {
            this.newCountryPaymentInfos[index] = data;
        }else{
            this.newCountryPaymentInfos.push(data);
        }
    }

    // 刷新数据
    dataKey = 0;
    refresh(){
        this.dataKey = this.dataKey + 1;
        this.newCountryPaymentInfos = [];
    }

    reset(){
        this.dataKey = 0;
        this.otherInfo = {
            baseCurrency:"",
            storeCurrency:"",
            useLocalCurrency:false,
        };
        this.newCountryPaymentInfos = [];
    }

}

export default new Payments();
