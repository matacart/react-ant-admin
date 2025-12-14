import { makeAutoObservable } from "mobx";

interface CategoriesType {
  meta_keyword: string;
  meta_title: string;
  meta_description: string;
  handle:string;
  is_share: number;
  is_sys: string;
  is_new: number;
  is_best: number;
  is_hot: number;
  is_home: number;
  pid: string;
  id: string,
  languages_id:string;
  title: string,
  content1: string,
  content: string,
  status: number;
  is_bind:number,
  sort:number;
  category_image: string | undefined;
}

class Categories{
    
    constructor() {
      makeAutoObservable(this)
    }

    // 初始化数据结构
    getInit() {
      return {
        id: "",
        languages_id:"2",
        pid:"0",
        title: "",
        content1: "",
        content: "",
        category_image:"",
        is_bind:1,
        status:1,
        is_sys:"0",
        is_home:0,
        is_hot:0,
        is_best:0,
        is_new:0,
        is_share:0,
        sort: 1,
        meta_title:"",
        meta_keyword:"",
        meta_description:"",
        handle:""
      } as CategoriesType;
    }

    // 分类
    categoriesInfo:CategoriesType = this.getInit();

    setCategoriesInfo(res:CategoriesType){
      this.categoriesInfo = res;
    }

    // 方式
    method = 0
    setMethod(res:number){
      this.method = res;
    }

    // 重置状态
    reset() {
      this.categoriesInfo = {...this.getInit()};
      this.method = 0;
    }
    
}

export default new Categories();