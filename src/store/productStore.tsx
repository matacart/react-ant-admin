import { action, observable,makeAutoObservable } from "mobx";



// model层存放数据

class ProductStore {

    // 
    // @observable limit = 10;
    // @action setLimit = (limit: number) => {
    //     this.limit = limit;
    // }
    
    // @observable page = 1;
    // @action setPage = (page: number) => {
    //     this.page = page;
    // }


    // @observable language = 2;
    // @action setLanguage = (language: any) => {
    //     this.language = language;
    // }


    // // 
    // @observable productList: any[] = [];

    // 款式
  attributes = []

  setAttributes(value:[]){
    this.attributes = value
  }

}

export default new ProductStore();