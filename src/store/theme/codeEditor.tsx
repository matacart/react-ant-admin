import { makeAutoObservable } from "mobx";

interface TemplateInfo{
  id:string;
  name:string;
}


class codeEditor {
    constructor() {
      makeAutoObservable(this)
    }

    mode:string = 'auto';

    setMode(value:string){
      this.mode = value;
    }

    templateInfo:TemplateInfo | null = null;

    setTemplateInfo(value:TemplateInfo){
      this.templateInfo = value;
    }

    // 
    fileList:any[] = [];

    setFileList(value:any[]) {
      this.fileList = value;
    }

    // 
    openFileList:any = [];

    setOpenFileList(value:any) {
      this.openFileList = value;
    }

    // activeFileKey：选中的文件节点
    activeFileKey = "";

    setActiveFileKey(value:string) {
      this.activeFileKey = value;
    }

}

export default new codeEditor();