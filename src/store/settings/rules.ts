import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface RulesType {
    content:string
}

class Rules {
    constructor() {
      makeAutoObservable(this)
    }

    languagesId = cookie.load("shop_lang") || '2'

    setLanguagesId(res:string){
        this.languagesId = res
    }

    // Shipping Policy 发货政策
    shippingPolicy:RulesType = {
        content:""
    }
    setShippingPolicy(res:any){
        this.shippingPolicy = res
    }

    // 服务条款
    termsofUse:RulesType = {
        content:""
    }
    setTermsofUse(res:any){
        this.termsofUse = res
    }

    // 隐私政策
    privacyPolicy:RulesType = {
        content:""
    }
    setPrivacyPolicy(res:any){
        this.privacyPolicy = res
    }

    // 退货政策
    returnPolicy:RulesType = {
        content:""
    }
    setReturnPolicy(res:any){
        this.returnPolicy = res
    }


    reset(){
        this.languagesId = cookie.load("shop_lang") || '2'
    }

}

export default new Rules();
