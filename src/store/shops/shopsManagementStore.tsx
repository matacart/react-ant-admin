

import { makeAutoObservable } from "mobx";


export interface domainType{
    default_currency:string;
    default_lang:string;
    default_lang_name:string;
    domain_name:string;
    id:string;
    package_id:string;
    package_name:string;
    second_domain:string;
    status:string;
    store_logo:string;
    store_name:string;
    timezone:string;
}

interface roleType{
    label:string;
    value:string;
}

class shopsManagementStore {
    constructor() {
      makeAutoObservable(this)
    }

    enableCount:string = '0';

    setEnalbeCount(value:string){
        this.enableCount = value
    };

    domainList:domainType[] = []

    setDomainList(value:domainType[]){
        this.domainList = value
    }

    employee = "";
    setEmployee(value:string){
        this.employee = value
    }

    role:roleType = {
        label: "",
        value: ""
    };
    setRole(value:roleType){
        this.role = value
    }

    reset(){
        this.employee = "";
        this.role = {
            label: "",
            value: ""
        };
    }

    // // 获取店铺
    // async getShops(){
    //     let result;
    //     await getDomainList().then(res=>{
    //         this.domainList = res.data
    //         result = res.data
    //     })
    //     return result
    // }
}

export default new shopsManagementStore();

