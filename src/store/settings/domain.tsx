import { makeAutoObservable } from "mobx";

class domain {
    constructor() {
      makeAutoObservable(this)
    }

    domain = {}

    setDomain(res:any){
        this.domain = res
    }
}

export default new domain();