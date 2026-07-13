import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


class abandonedOrderList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = cookie.load("shop_lang") || '2';

    setLanguages(res:string){
        this.languages = res
    }




    // 搜索关键词
    keyword = "";
    setKeyword(res:string){
        this.keyword = res
    }

    orderIds:React.Key[] = [];
    setOrderIds(res:React.Key[]){
        this.orderIds = res
    }

    // 重置
    reset(){
        this.languages = cookie.load("shop_lang") || '2';
        this.keyword = ""
    }
}

export default new abandonedOrderList();