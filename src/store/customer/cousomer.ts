import { makeAutoObservable } from "mobx";

class Customer{
    constructor() {
        makeAutoObservable(this)
    }

    cousomerInfo = {}

    setCousomerInfo(value:any) {
        this.cousomerInfo = value
    }

}

export default new Customer();
