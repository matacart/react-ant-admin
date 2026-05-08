import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

class articlesList {
    constructor() {
        makeAutoObservable(this)
    }

    languagesId = cookie.load("shop_lang") || "2";
    setLanguagesId(value:string){
        this.languagesId = value;
    }
}

export default new articlesList();