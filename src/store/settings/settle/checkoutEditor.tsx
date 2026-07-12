import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface configType{
    personalizations:any;
    checkout:any;
    styleSystem:any;
}

// 定义操作历史记录的接口
interface OperationHistory {
  type: 'templateUpdate';
  undoData: any; // 撤销时需要的数据（操作前状态）
  redoData: any; // 重做时需要的数据（操作后状态）
  timestamp: number;
}


class checkoutEditor {
    constructor() {
      makeAutoObservable(this)
    }

    // 当前选中的页面
    activeItem = {
        key:"1-1",
        label:"checkoutPage"
    };
    setActiveItem(value:{ key:string,label:string;}){
        this.activeItem = value;
    }


    // 后台语言
    useLanguagesId = localStorage.getItem("USE_LANG") || '2';
    setUseLanguagesId(value:string){
        this.useLanguagesId = value;
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 结账配置ID
    profileId = ""
    setProfileId(value:string){
        this.profileId = value;
    }

    // 设备
    device:'pc'|'mobile' = 'pc';
    setDevice(value:'pc'|'mobile'){
      this.device = value;
    }

    // 临时编号
    oseId = "";
    setOseId(value:string){
      this.oseId = value;
    }

    // 最后保存时间戳
    lastSavedAt = 0;
    setLastSavedAt(value: number) {
        this.lastSavedAt = value;
    }

    // 模板配置
    config:configType = {
        personalizations: undefined,
        checkout: undefined,
        styleSystem: undefined
    };
    setConfig(value:configType){
        this.config = value;
    }

    // 操作历史记录数组，用于回退操作
    operationHistory:OperationHistory[] = [];
    // 重做历史记录数组，用于重做操作
    redoHistory:OperationHistory[] = [];
    // 添加操作到历史记录
    addToOperationHistory(operation: OperationHistory) {
      // 限制历史记录数量为10条
      if (this.operationHistory.length >= 10) {
        this.operationHistory.shift(); // 移除最旧的记录
      }
      this.operationHistory.push(operation);
      // 添加新操作时清空重做历史
      this.redoHistory = [];
    }
    // 获取最新的历史操作（用于撤销）
    getLastOperation(): OperationHistory | null {
      if (this.operationHistory.length > 0) {
        return this.operationHistory[this.operationHistory.length - 1];
      }
      return null;
    }
    // 从历史记录中移除最新操作（用于撤销）
    removeLastOperation() {
      if (this.operationHistory.length > 0) {
        const lastOperation = this.operationHistory.pop();
        // 将移除的操作添加到重做历史中
        if (lastOperation) {
          if (this.redoHistory.length >= 10) {
            this.redoHistory.shift(); // 限制重做历史最多10条记录
          }
          this.redoHistory.push(lastOperation);
        }
      }
    }
    // 获取最新的重做操作
    getLastRedoOperation(): OperationHistory | null {
      if (this.redoHistory.length > 0) {
        return this.redoHistory[this.redoHistory.length - 1];
      }
      return null;
    }
    // 从重做历史中移除最新操作（用于重做）
    removeLastRedoOperation() {
      if (this.redoHistory.length > 0) {
        const lastRedoOperation = this.redoHistory.pop();
        // 将重做的操作放回操作历史中
        if (lastRedoOperation) {
          if (this.operationHistory.length >= 10) {
            this.operationHistory.shift(); // 限制操作历史最多10条记录
          }
          this.operationHistory.push(lastRedoOperation);
        }
      }
    }

    reset(){
        this.languagesId = cookie.load("shop_lang") || '2';
        this.useLanguagesId = localStorage.getItem("USE_LANG") || '2';
        this.device = 'pc';
        this.oseId = "";
        this.lastSavedAt = 0;
        this.config = {
            personalizations: undefined,
            checkout: undefined,
            styleSystem: undefined
        };
        this.operationHistory = [];
        this.redoHistory = [];
    }

}

export default new checkoutEditor();