import { makeAutoObservable } from "mobx";
import { reset } from '@/services/y2/api';


interface categories{
    title?:string,
}

// 2024-11-29
class editCategories {
    constructor() {
      makeAutoObservable(this)
    }

    id = "";

    categoriesData:categories = {}

    setCategoriesData(value:any) {
      this.categoriesData = value;
    }

    setId(value:string){
        this.id = value;
    }

    languages = "2";

    title:string = "";

    content:string = "";
    // 父分类id --一级为0
    categoryPid = "0";

    status:number = 1;


    setTitle(value:string) {
      this.title = value;
    }
    setContent(value:string){
        this.content = value
    }

    coverImg:string = "";
    setCoverImg(value:string) {
      this.coverImg = value;
    }
    setCategoryPid(value:string) {
      this.categoryPid = value;
    }

    // 排序
    // sort: 1
    // seo设置
    metaTitle = "";
    metaKeyword = "";
    metaDescription = "";
    productUrl = "";
    setMetaTitle(value: string) {
      this.metaTitle = value;
    }

    setMetaKeyword(value: string) {
      this.metaKeyword = value;
    }
    setMetaDescription(value: string) {
      this.metaDescription = value;
    }

    setProductUrl(value: string) {
      this.productUrl = value;
    }


    reset() {
      this.title = "";
      this.categoryPid = "0";
      this.coverImg = "";
      this.content = "";
      this.languages = "2";
      this.metaTitle = "";
      this.metaKeyword = "";
      this.metaDescription = "";
      this.productUrl = "";
    }
    
}

export default new editCategories();