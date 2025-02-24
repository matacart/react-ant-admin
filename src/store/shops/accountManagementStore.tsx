

import { getUserInfo } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";

class accountManagementStore {
    constructor() {
      makeAutoObservable(this)
    }

    user:any = []

    // 获取店铺
    async getUser(){
        await getUserInfo().then(res=>{
            this.user = res.data
        })
    }
}

export default new accountManagementStore();

