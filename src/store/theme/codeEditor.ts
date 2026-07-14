import { makeAutoObservable } from "mobx";

interface TemplateInfo{
  id:string;
  name:string;
}


class CodeEditor {
    constructor() {
      makeAutoObservable(this)
    }

    id:string = ""; 

    setId(value:string){
      this.id = value;
    }

    mode:string = 'auto';

    setMode(value:string){
      this.mode = value;
    }

    // 版本
    versionId = '';
    setVersionId(value:string){
      this.versionId = value;
    }
    // 开发者
    isAuthor:boolean = false;
    setIsAuthor(value:boolean){
      this.isAuthor = value;
    }

    // 语言
    languageId = '2';
    setLanguageId(value:string){
      this.languageId = value;
    }

    templateInfo:TemplateInfo | null = null;

    setTemplateInfo(value:TemplateInfo){
      this.templateInfo = value;
    }

    // 文件列表
    fileList:any[] = [];

    setFileList(value:any[]) {
      this.fileList = value;
    }

    // 打开文件列表
    openFileList:any = [];

    setOpenFileList(value:any) {
      this.openFileList = value;
    }

    // activeFileKey：选中的文件节点
    activeFileKey = "";

    setActiveFileKey(value:string) {
      this.activeFileKey = value;
    }


    reset(){
      this.id = "";
      this.mode = 'auto';
      this.languageId = '2';
      this.versionId = '';
      this.templateInfo = null;
      this.fileList = [];
      this.openFileList = [];
      this.activeFileKey = "";
      this.isAuthor = false;
    }
}

export default new CodeEditor();
