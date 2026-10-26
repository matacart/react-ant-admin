import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

class ShippingDistribution {
    constructor() {
        makeAutoObservable(this)
    }

    languagesId:string = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value
    }
}

export default new ShippingDistribution();
