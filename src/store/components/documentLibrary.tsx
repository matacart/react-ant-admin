import { makeAutoObservable } from "mobx";

// 文件库临时数据

class documentLibrary{

    constructor() {
        makeAutoObservable(this)
    }
    // ----- 文件数据
    // 选中文件的序号
    selectFileIndex:any = {};
    setSelectFileIndex(value:any) {
        this.selectFileIndex = value;
    }
    
    // 选中文件
    selectFileList: any = [];
    setSelectFileList(value: any) {
        this.selectFileList = value;
    }

    // 清空数据
    clear(){
        this.selectFileIndex = {};
        this.selectFileList = [];
    }

}

export default new documentLibrary();
