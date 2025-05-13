// 新增客户

import { makeAutoObservable } from "mobx";

class addCustomerStore {

    constructor() {
        makeAutoObservable(this)
    }
    // 名
    baseFirstName:string = "";
    // 姓
    baseLastName:string = "";

    baseEmail:string = "";

    basePhone:string = "";

    // 客户订阅 -- 
    
    baseSex:string = "";

    baseBirthday:string = "";


    // 收获地址信息
    consigneePhone:string = "";

    consigneeCountry:string = "";

    consigneeFirstName:string = "";

    consigneeLastName:string = "";

    consigneeCorporation:string = "";
    
    consigneeAddress:string = "";

    consigneeDetailedAddress = "";

    consigneeCity:string = "";

    consigneeProvince:string = "";

    consigneePostcode:string = "";

    consigneeArea:string = "";

}

export default new addCustomerStore();