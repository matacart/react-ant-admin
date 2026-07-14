import { makeAutoObservable } from "mobx";


// 账户信息
class UserInfo{
    constructor() {
        makeAutoObservable(this)
    }

    userSession:any = "";

    setUserSession(value:any){
        this.userSession = value;
    }
}

export default new UserInfo();
