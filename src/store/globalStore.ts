import { action, makeAutoObservable, observable } from "mobx";
import cookie from 'react-cookies';

// 全局状态
class GlobalStore {

    constructor() {
        makeAutoObservable(this)
    }
    
    // 刷新头部
    headRefresh = false;
    setHeadRefresh(value:boolean){
        this.headRefresh = value;
    }

    platformCategory = []
    // getPlatformCategory(){
    //     getPlatformCategorySelect("1").then((res:any) => {
    //         this.platformCategory = res.data
    //         // console.log(res)
    //     })
    // }
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
}

export default new GlobalStore();
