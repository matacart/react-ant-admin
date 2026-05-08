import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


class generalFreight {
    constructor() {
        makeAutoObservable(this)
    }

    deliverys = []

    deliverysLanguage = cookie.load("shop_lang") || '2'

    setDeliverysLanguage(res:string){
        this.deliverysLanguage = res
    }

    setDeliverys(res:any){
        this.deliverys = res
    }

    reset(){
        this.deliverysLanguage = cookie.load("shop_lang") || '2'
    }

}

export default new generalFreight()