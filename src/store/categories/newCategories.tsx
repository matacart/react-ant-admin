import { makeAutoObservable } from "mobx";
import { reset } from '@/services/y2/api';
import CategoriesBanner from './../../pages/Products/ProductCategories/ProductCategoriesEdit/CategoriesBanner';



// 2024-11-29
class newCategories {
    constructor() {
      makeAutoObservable(this)
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

export default new newCategories();