
import { makeAutoObservable } from 'mobx';

class customAppConfigSetting {

    constructor() {
        makeAutoObservable(this)
    }

    accessRangeTitle = "后台 API 权限编辑"

    setAccessRangeTitle(value:string){
        this.accessRangeTitle = value
    }


    permissionsList = []
    setPermissionsList(value:any){
        this.permissionsList = value
    }

    // 提交权限
    newPermissionsList = []
    setNewPermissionsList(value:any){
        this.newPermissionsList = value
    }

}

export default new customAppConfigSetting();