import { action, makeAutoObservable, observable } from "mobx";
import { useRef } from "react";

interface conditionType{
    keyword:string,
    searchType:string,
    sortationId:string,
    startPrice:number,
    endPrice:number,
}

interface sortConditionType{
    sortField:string,
    sortType:string
}

class categoriesList {

    constructor() {
        makeAutoObservable(this)
    }

    // 语言
    languagesId = "1";

    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 排序
    sortCondition:sortConditionType = {
        sortField:"",
        sortType:""
    }

    setSortCondition = (value:sortConditionType)=>{
        this.sortCondition = value;
    }

    // 筛选结果数量
    count = 0
    setCount = (value: number) => {
        this.count = value;
    }
}
export default new categoriesList();


