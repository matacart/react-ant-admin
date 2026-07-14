import { makeAutoObservable } from "mobx";

// 店铺状态

class Shop {
    constructor() {
        makeAutoObservable(this)
    }

    language = '2'

    setLanguage(value:string){
        this.language = value
    }

}

export default new Shop()
