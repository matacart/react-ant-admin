import { makeAutoObservable } from "mobx";


// 账户信息
class userInfo{
    constructor() {
        makeAutoObservable(this)
    }

    userSession:any = "";

    setUserSession(value:any){
        this.userSession = value;
    }

    // 语言


}

export default new userInfo();