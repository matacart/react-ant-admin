import { makeAutoObservable } from "mobx";

class fileUpload{
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
}

export default fileUpload;