import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface AbandonedOrderDataType{
    abandonedOrderSeq:string

}

class AbandonedOrder{
    constructor() {
        makeAutoObservable(this)
    }

    languages = cookie.load("shop_lang") || '2';

    setLanguages(res:string){
        this.languages = res
    }

    abandonedOrderData:AbandonedOrderDataType|null = null

    setAbandonedOrderData(value:AbandonedOrderDataType){
        this.abandonedOrderData = value
    }

    // 重置
    reset(){
        this.languages = cookie.load("shop_lang") || '2';
    }
}

export default new AbandonedOrder();