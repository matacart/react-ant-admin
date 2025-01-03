import { makeAutoObservable } from "mobx";

class fileManage {
    constructor() {
      makeAutoObservable(this)
    }

    itemsList:any = [];

    setItemsList(itemsList:any){
        this.itemsList = itemsList;
    }

    data:any = null;

    setData(data:any){
        this.data = data;
    }

}

export default new fileManage();