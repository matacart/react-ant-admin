

import { getUserInfo } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";


interface userInfoType{
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

class accountManagementStore {
    constructor() {
      makeAutoObservable(this)
    }


    userInfo:userInfoType = {
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

    // 获取账号信息
    async getUser(){
        // await getUserInfo().then(res=>{
        //     this.user = res.data.user
        //     this.loginRecord = res.data.login_record == null ? [] : res.data.login_record
        //     console.log(res.data)
        // })
    }
}

export default new accountManagementStore();

