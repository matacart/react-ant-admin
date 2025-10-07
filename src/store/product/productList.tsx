import { action, makeAutoObservable, observable } from "mobx";
import { useRef } from "react";

// 引入mobx
// https://blog.csdn.net/qq_53123067/article/details/129707090?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171694792616800197099744%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171694792616800197099744&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-129707090-null-null.142^v100^pc_search_result_base9&utm_term=mobx&spm=1018.2226.3001.4187


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

class productList {

    constructor() {
        makeAutoObservable(this)
    }

    languagesId = '2';

    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 状态切换
    @observable flag:string|undefined = '';
    @action setFlag = (flag: string|undefined) => {
        this.flag = flag;
    }
    // 精选
    isAlliance:string|undefined = ''
    setIsAlliance = (value: string|undefined) => {
        this.isAlliance = value;
    }
    isHosted:string|undefined = ''
    setIsHosted = (value: string|undefined) => {
        this.isHosted = value;
    }



    // productList -- 选中产品id
    productList = []

    setProductList = (value: any) => {
        this.productList = value;
    }

    // 全选
    allSelected = false
    setAllSelected = (value: boolean) => {
        this.allSelected = value;
    }

    // 条件
    condition:conditionType = {
        keyword:"",
        searchType: "",
        sortationId: "",
        startPrice: 0,
        endPrice: 0
    }

    setCondition = (value: any) => {
        this.condition = value;
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

    //导入状态
    task = {
        status:"",
        isBackstage:false,
        failed_count:0,
        success_count:0,
        total_count:0
    }
    setTask = (value: any) => {
        this.task = value;
    }

    // 导出状态
    exportTask = {
        status:"",
    }
    setExportTask = (value: any) => {
        this.exportTask = value;
    }
}
export default new productList();


