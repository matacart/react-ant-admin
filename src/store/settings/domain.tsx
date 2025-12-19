import { makeAutoObservable } from "mobx";

interface Domain{
  domain_primary:string;
  handle:string;
}

class domain {
    constructor() {
      makeAutoObservable(this)
    }

    domain:Domain = {
      domain_primary: "",
      handle:"",
    }

    setDomain(res:any){
        this.domain = res
    }
}

export default new domain();