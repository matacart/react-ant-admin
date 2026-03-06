import { makeAutoObservable } from "mobx"

class innerMsg {
    constructor() {
        makeAutoObservable(this)
    }

    selectedRowKeys: React.Key[] = []
    setSelectedRowKeys(value: React.Key[]) {
        this.selectedRowKeys = value
    }

    msgType:string = 'all'
    setMsgType(value: string) {
        this.msgType = value
    }

    actionType:string = 'all'
    setActionType(value: string) {
        this.actionType = value
    }

    // 状态初始化
    reset(){
        this.msgType = 'all'
        this.actionType = 'all'
    }

}

export default new innerMsg()