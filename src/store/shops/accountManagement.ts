

import { makeAutoObservable } from "mobx";


interface UserInfoType{
    area_code:string;
    contact_code:string;
    contact_email:string;
    contact_phone:string;
    data_sharing:string;
    data_sharing_time:string;
    email:string;
    id:string;
    languages_id:string;
    mobile:string;
    reg_time:string;
    status:string;
}

class AccountManagement{
    constructor() {
      makeAutoObservable(this)
    }

    userInfo:UserInfoType = {
        area_code: "",
        contact_code: "",
        contact_email: "",
        contact_phone: "",
        data_sharing: "",
        data_sharing_time: "",
        email: "",
        id: "",
        languages_id: "",
        mobile: "",
        reg_time: "",
        status: ""
    }

    setUserInfo(value:any){
        this.userInfo = value
    }

    loginRecord:any = []

    setLoginRecord(value:any[]){
        this.loginRecord = value
    }
}

export default new AccountManagement();

