import { makeAutoObservable } from "mobx";

interface DomainType{
  domain_primary:string;
  handle:string;
}

class Domain {
    constructor() {
      makeAutoObservable(this)
    }

    domain:DomainType = {
      domain_primary: "",
      handle:"",
    }

    setDomain(res:DomainType){
        this.domain = res
    }
}

export default new Domain();
