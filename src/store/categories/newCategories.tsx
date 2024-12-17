import { makeAutoObservable } from "mobx";
import { reset } from '@/services/y2/api';
import CategoriesBanner from './../../pages/Products/ProductCategories/ProductCategoriesEdit/CategoriesBanner';
import { values } from 'lodash';



// 2024-11-29
class newCategories {
    constructor() {
      makeAutoObservable(this)
    }

    languages = "2";

    setLanguage(value:string){
      this.languages = value;
    }

    title:string = "";

    content:string = "";
    // 父分类id --一级为0
    categoryPid = "0";

    status:string = "1";

    setStatus(value:string) {
      this.status = value;
    }

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

    isBind = "1";
    setIsBind(value:string) {
      this.isBind = value;
    }

    // 推荐
    isHome = false;
    isHot = false;
    isBest = false;
    isNew = false;

    setIsHome(value: boolean) {
      this.isHome = value;
    }
    setIsHot(value: boolean) {
      this.isHot = value;
    }
    setIsBest(value: boolean) {
      this.isBest = value;
    }
    setIsNew(value: boolean) {
      this.isNew = value;
    }
    
    isShare = "0"
    setIsShare(value: string) {
      this.isShare = value;
    }

    // 品库
    partsWarehouse = "0"
    setPartsWarehouse(value: string) {
      this.partsWarehouse = value;
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
      this.status = "1";
      this.isBind = "1";
      this.isHome = false;
      this.isHot = false;
      this.isBest = false;
      this.isNew = false;
      this.isShare = "0";
      this.partsWarehouse = "0";
      this.languages = "2";
      this.metaTitle = "";
      this.metaKeyword = "";
      this.metaDescription = "";
      this.productUrl = "";
    }
    
}

export default new newCategories();