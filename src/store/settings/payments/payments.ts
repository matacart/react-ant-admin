import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


interface ManualCollection {
    id:string,
    title:string,
    status:number
}


class Payments {
    constructor() {
      makeAutoObservable(this)
    }

    languagesId:string = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value
    }

    // 手动支付
    manualCollectionList:ManualCollection[] = []

    setManualCollectionList(res:ManualCollection[]){
      this.manualCollectionList = res
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

export default new Payments();
