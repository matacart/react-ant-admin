import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


class recallOrdersList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = cookie.load("shop_lang") || '2';

    setLanguages(res:string){
        this.languages = res
    }
}

export default new recallOrdersList();