import { makeAutoObservable } from "mobx";

interface Domain{
  domain_name:string;
}

class domain {
    constructor() {
      makeAutoObservable(this)
    }

    domain:Domain = {
      domain_name: ""
    }

    setDomain(res:any){
        this.domain = res
    }
}

export default new domain();