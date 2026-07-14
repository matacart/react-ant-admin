import { makeAutoObservable } from "mobx";

interface OrderDraftListType {
    data:any[],
    total:number
}

class OrderDraftList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = "2"

    setLanguages(res:string){
        this.languages = res
    }

    // 草稿单列表
    orderDraftList:OrderDraftListType = {
        data: [],
        total: 0,
    }
    setOrderDraftList(value:OrderDraftListType){
        this.orderDraftList = value
    }
}

export default new OrderDraftList();
