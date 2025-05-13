

import { getDomainList } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";

class shopsManagementStore {
    constructor() {
      makeAutoObservable(this)
    }

    domainList:any = []

    // 获取店铺
    async getShops(){
        let result;
        await getDomainList().then(res=>{
            this.domainList = res.data
            result = res.data
        })
        return result
    }
}

export default new shopsManagementStore();

