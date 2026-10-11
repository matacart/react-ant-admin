import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface PriceRule {
    baseCurrency: string;
    storeCurrency: string;
    useLocalCurrency: boolean;
}



class ProductAndPricing{
    constructor() {
        makeAutoObservable(this)
    }

    priceRule:PriceRule = {
        baseCurrency: "",
        storeCurrency: "",
        useLocalCurrency: false
    };

    setPriceRule(rule:PriceRule){
        this.priceRule = rule;
    }


    reset(){
    }

}

export default new ProductAndPricing();
