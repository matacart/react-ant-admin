import { makeAutoObservable } from "mobx";

class recallOrdersList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = "2"

    setLanguages(res:string){
        this.languages = res
    }
}

export default new recallOrdersList();