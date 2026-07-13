import { makeAutoObservable } from "mobx";

interface orderDraftListType {
    data:any[],
    total:number
}

class orderDraftList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = "2"

    setLanguages(res:string){
        this.languages = res
    }

    // 草稿单列表
    orderDraftList:orderDraftListType = {
        data: [],
        total: 0,
    }
    setOrderDraftList(value:orderDraftListType){
        this.orderDraftList = value
    }
}

export default new orderDraftList();