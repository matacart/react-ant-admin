import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface InventoryConfig{
    status:number,
    locationIds:string[],
}



class Inventory{
    constructor() {
        makeAutoObservable(this)
    }

    inventoryConfig:InventoryConfig={
        status:0,
        locationIds:[]
    }
    setInventoryConfig(value:InventoryConfig){
        this.inventoryConfig = value;
    }

    reset(){
       
    }

}

export default new Inventory();
