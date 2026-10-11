import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';
 
export interface LanguageType {
    id:string,
    assigned:boolean,
    checked:boolean,
    isDefault:boolean,
    languageCode:string,
    languageName:string,
    languageNameDefault:string,
    sortNumber:number,
}


class ShopLang {
    constructor() {
      makeAutoObservable(this)
    }

    // 刷新店铺语言
    refresh = false;
    setRefresh(){
        this.refresh = !this.refresh;
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    hasLanguages:LanguageType[] = [];

    setHasLanguages(value:LanguageType[]){
        this.hasLanguages = value;
    }

    unHasLanguages:LanguageType[] = [];

    setUnHasLanguages(value:LanguageType[]){
        this.unHasLanguages = value;
    }

    reset(){
        // 重置更新状态
        this.hasLanguages = [];
        this.unHasLanguages = [];
    }
}

export default new ShopLang();
