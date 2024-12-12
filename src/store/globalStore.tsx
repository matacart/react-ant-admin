import { getCategoryList, getCategorySelect, getPlatformCategorySelect } from "@/services/y2/api";
import { action, makeAutoObservable, observable } from "mobx";
import cookie from 'react-cookies';



class globalStore {

    constructor() {
        makeAutoObservable(this)
    }

    @observable platformCategory = []

    getPlatformCategory(){
        getPlatformCategorySelect("1").then((res:any) => {
            this.platformCategory = res.data
            // console.log(res)
        })
    }
    // 语言
    categorylist = [];
    setCategoryList(category:any) {
        this.categorylist = category;
    }
    // 转树形结构
    buildTree(data:any, parentId = '0') {
        return data.filter((item:any) => item.pid === parentId).map((item:any) => ({
            ...item,
            value: item.id,
            title:item.category_name,
            children: this.buildTree(data, item.id),
        }));
    }
    // 分类
    async getCategory(){
        let tempList:any = [];
        await getCategorySelect().then(res=>{
            tempList = (this.buildTree(res.data));
        })
        return tempList;
    }
}

export default new globalStore();