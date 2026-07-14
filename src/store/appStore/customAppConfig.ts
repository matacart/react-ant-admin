
import { makeAutoObservable } from 'mobx';

class CustomAppConfig {


    constructor() {
        makeAutoObservable(this)
    }

    appInfo:any = {}

    setAppInfo(data:any){
        this.appInfo = data
    }

}

export default new CustomAppConfig();