import { makeAutoObservable } from "mobx";

interface rulesType {
    content:string
}

class rules {
    constructor() {
      makeAutoObservable(this)
    }

    languagesId = "2"

    setLanguagesId(res:string){
        this.languagesId = res
    }

    // Shipping Policy 发货政策
    shippingPolicy:rulesType = {
        content:""
    }
    setShippingPolicy(res:any){
        this.shippingPolicy = res
    }

    // 服务条款
    termsofUse:rulesType = {
        content:""
    }
    setTermsofUse(res:any){
        this.termsofUse = res
    }

    // 隐私政策
    privacyPolicy:rulesType = {
        content:""
    }
    setPrivacyPolicy(res:any){
        this.privacyPolicy = res
    }

    // 退货政策
    returnPolicy:rulesType = {
        content:""
    }
    setReturnPolicy(res:any){
        this.returnPolicy = res
    }
}

export default new rules();