import { makeAutoObservable } from "mobx";

class collection {
    constructor() {
      makeAutoObservable(this)
    }

    // 手动支付
    manualCollection = []

    setManualCollection(res:any){
      this.manualCollection = res
    }

    // 其它方式
    newOtherCollection = {
      id:"",
      title:"",
      languages_id:"2",
      sort:"0",
      description:"",
      remark:'',
      summary:"",
      is_sys:0,
      status:1
    }
    setNewOtherCollection(res:any){
        this.newOtherCollection = res
    }

    oldOtherCollection = {
      id:"",
      title:"",
      languages_id:"2",
      sort:"0",
      description:"",
      remark:'',
      summary:"",
      is_sys:0,
      status:1
    }

    setOldOtherCollection(res:any){
      this.oldOtherCollection = res
    }

    clearNewOtherCollection(){
        this.newOtherCollection = {
            id:"",
            title:"",
            languages_id:"2",
            sort:"0",
            description:"",
            remark:'',
            summary:"",
            is_sys:0,
            status:1
        }
    }

    // 第三方服务商
    newThirdCreditCollection = {
      id:"",
      title:"",
      languages_id:"2",
      sort:"0",
      description:"",
      remark:'',
      summary:"",
      is_sys:0,
      status:1
    }
    setNewThirdCreditCollection(res:any){
      this.newThirdCreditCollection = res
    }

    clearThirdCreditCollection(){
      this.newThirdCreditCollection = {
          id:"",
          title:"",
          languages_id:"2",
          sort:"0",
          description:"",
          remark:'',
          summary:"",
          is_sys:0,
          status:1
      }
    }
    oldThirdCreditCollection = {
      id:"",
      title:"",
      languages_id:"2",
      sort:"0",
      description:"",
      remark:'',
      summary:"",
      is_sys:0,
      status:1
    }

    setOldThirdCreditCollection(res:any){
      this.oldThirdCreditCollection = res
    }

}

export default new collection();