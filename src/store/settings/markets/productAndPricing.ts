import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface PriceRule {
    baseCurrency: string;
    storeCurrency: string;
    useLocalCurrency: boolean;
}


export interface Product {
    productId: string;
    title: string;
    baseCurrency: string;
    excluded: boolean;
    originalPriceMin: number;
    originalPriceMax: number;
    priceMin: number;
    priceMax: number;
}


interface CustomPrice {
    price: number;
    priceType: string;
}


export interface ProductPriceExchange {
    productId: string;
    customPriceList: CustomPrice[];
}

export interface MarketDetail {
    homeMarket: string;
}


class ProductAndPricing{
    constructor() {
        makeAutoObservable(this)
    }

    marketDetail:MarketDetail = {
        homeMarket: ""
    };
    
    setMarketDetail(detail:MarketDetail){
        this.marketDetail = detail;
    }

    priceRule:PriceRule = {
        baseCurrency: "",
        storeCurrency: "",
        useLocalCurrency: false
    };

    setPriceRule(rule:PriceRule){
        this.priceRule = rule;
    }


    excludedNum:number = 0;
    setExcludedNum(count:number){
        this.excludedNum = count;
    }
    includedNum:number = 0;
    setIncludedNum(count:number){
        this.includedNum = count;
    }
    count:number = 0;
    setCount(count:number){
        this.count = count;
    }
    productList:Product[] = [];
    setProductList(list:Product[]){
        this.productList = list;
    }

    // 更新的产品价格
    productPriceExchangeList:ProductPriceExchange[] = [];
    setProductPriceExchangeList(list:ProductPriceExchange[]){
        this.productPriceExchangeList = list;
    }


    reset(){
    }

}

export default new ProductAndPricing();
