import { action, observable } from "mobx";


class ProductStore {


    // 
    

    

    @observable language = 2;
    

    @action setLanguage = (language: number) => {
        this.language = language;
    }



}

export default new ProductStore();