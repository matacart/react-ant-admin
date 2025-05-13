import { makeAutoObservable } from "mobx";

class orderDraftList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = "2"

    setLanguages(res:string){
        this.languages = res
    }

    // 草稿单列表
    orderDraftList = []
    setOrderDraftList(value:any){
        this.orderDraftList = value
    }

    // 重置
}

export default new orderDraftList();