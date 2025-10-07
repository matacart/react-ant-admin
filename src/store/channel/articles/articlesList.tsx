import { makeAutoObservable } from "mobx";

class articlesList {
    constructor() {
        makeAutoObservable(this)
    }

    languagesId = "2";
    setLanguagesId(value:string){
        this.languagesId = value;
    }
}

export default new articlesList();