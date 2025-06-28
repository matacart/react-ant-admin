import { makeAutoObservable } from "mobx";
import { data } from '@remix-run/router';

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
    // 重置
}

export default new orderDraftList();