

import { getUserInfo } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";


class accountManagementStore {
    constructor() {
      makeAutoObservable(this)
    }

    // Contact information
    // contactInformationForm = useForm();
    // contactInformationForm = {}
    
    contactForm:any = {}
    // setContactInformationForm(value:any){
    //     this.contactInformationForm = value
    // }


    submit(){
        // this.contactForm.submit();
    }

    user:any = {}

    setUser(value:any){
        this.user = value
    }

    loginRecord:any = []

    // 获取店铺
    async getUser(){
        await getUserInfo().then(res=>{
            this.user = res.data.user
            this.loginRecord = res.data.login_record == null ? [] : res.data.login_record
            console.log(res.data)
        })
    }
}

export default new accountManagementStore();

