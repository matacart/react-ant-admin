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

    
    setId(value:string){
      this.id = value;
    }

    categoriesData:categories = {}

    setCategoriesData(value:any) {
      this.categoriesData = value;
    }

    languages = "2";

    title:string = "";

    content:string = "";
    // 父分类id --一级为0
    categoryPid = "0";

    status:string = "1";


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

    setStatus(value:string) {
      this.status = value;
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

    // 初始化
    categoriesInit(res:any){
      this.setCategoryPid(res.pid)
      this.setCategoriesData(res.data)
      this.setTitle(res.title)
      this.setContent((res.content == null)? "" : res.content)
      this.setCoverImg(res.category_image)
      this.setStatus(res.status)
      this.setIsBind(res.is_bind)
      this.setIsHome(res.is_home.toString() == "0" ? false : true)
      this.setIsHot(res.is_hot == "0" ? false : true)
      this.setIsBest(res.is_best == "0" ? false : true)
      this.setIsNew(res.is_new == "0" ? false : true)
      this.setIsShare(res.is_share)
      this.setPartsWarehouse(res.is_sys)
      this.setMetaTitle(res.meta_title)
      this.setMetaKeyword(res.meta_keyword)
      this.setMetaDescription(res.meta_description)
      this.setId(res.id)
    }


    reset() {
      this.title = "";
      this.categoryPid = "0";
      this.coverImg = "";
      this.content = "";
      this.languages = "2";
      this.status = "1";
      this.isBind = "1";
      this.metaTitle = "";
      this.metaKeyword = "";
      this.metaDescription = "";
      this.productUrl = "";
    }
    
}

export default new editCategories();