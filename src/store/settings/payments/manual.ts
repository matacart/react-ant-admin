import { makeAutoObservable } from "mobx"
import cookie from 'react-cookies';

interface ManualCollection {
    id:string,
    title:string,
    status:number
}

class manual{
    constructor() {
      makeAutoObservable(this)
    }
    languagesId:string = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value
    }

    reset(){
      this.languagesId = cookie.load("shop_lang") || '2'
    }
}

export default new manual()