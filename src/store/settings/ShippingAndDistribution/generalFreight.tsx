import { makeAutoObservable } from "mobx";

class generalFreight {
    constructor() {
        makeAutoObservable(this)
    }

    deliverys = []

    deliverysLanguage = "2"

    setDeliverysLanguage(res:string){
        this.deliverysLanguage = res
    }

    setDeliverys(res:any){
        this.deliverys = res
    }

}

export default new generalFreight()