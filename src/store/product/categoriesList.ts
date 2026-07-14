import { action, makeAutoObservable, observable } from "mobx";
import cookie from 'react-cookies';


interface SortConditionType{
    sortField:string,
    sortType:string
}

class CategoriesList {

    constructor() {
        makeAutoObservable(this)
    }

    // 语言
    languagesId = cookie.load("shop_lang") || '2'

    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 排序
    sortCondition:SortConditionType = {
        sortField:"",
        sortType:""
    }

    setSortCondition = (value:SortConditionType)=>{
        this.sortCondition = value;
    }

    // 筛选结果数量
    count = 0
    setCount = (value: number) => {
        this.count = value;
    }
}
export default new CategoriesList();


