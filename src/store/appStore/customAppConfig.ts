
import { makeAutoObservable } from 'mobx';

class customAppConfig {


    constructor() {
        makeAutoObservable(this)
    }

    appInfo:any = {}

    setAppInfo(data:any){
        this.appInfo = data
    }

}

export default new customAppConfig();