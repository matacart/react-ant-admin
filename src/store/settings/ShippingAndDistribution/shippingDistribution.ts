import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


export interface Group{
    type:string;
    areaNum:number
}

class ShippingDistribution {
    constructor() {
        makeAutoObservable(this)
    }

    languagesId:string = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value
    }

    generalFreight:Group | null = null;
    setGeneralFreight(value:Group){
        this.generalFreight = value;
    }

    customFreight:Group[] = [];
    setCustomFreight(value:Group[]){
        this.customFreight = value;
    }


}

export default new ShippingDistribution();
