import { makeAutoObservable } from "mobx";

class collection {
    constructor() {
      makeAutoObservable(this)
    }

    manualCollection = []

    setManualCollection(res:any){
        this.manualCollection = res
    }
}

export default new collection();