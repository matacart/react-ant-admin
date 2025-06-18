import { makeAutoObservable } from "mobx";

class cousomer{
    constructor() {
        makeAutoObservable(this)
    }

    cousomerInfo = {}

    setCousomerInfo(value:any) {
        this.cousomerInfo = value
    }

}

export default new cousomer();