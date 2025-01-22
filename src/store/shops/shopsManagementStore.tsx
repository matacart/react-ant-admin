

import { getDomainList } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";

class shopsManagementStore {
    constructor() {
      makeAutoObservable(this)
    }

    domainList:any = []

    // 获取店铺
    getShops(){
        getDomainList().then(res=>{
            console.log(res)
            this.domainList = res.data
        })
    }
}

export default new shopsManagementStore();

