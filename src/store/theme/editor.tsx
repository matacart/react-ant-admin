import { makeAutoObservable } from "mobx";

class editor {
    constructor() {
      makeAutoObservable(this)
    }

    // 模板数据
    templateData:any = [];

    setTemplateData(data:any) {
      this.templateData = data;
    }

    updateComponentSettings(componentId:string, newSettings:any) {
      const updatedTemplateData = this.templateData.map((res:any) => {
        if (res.config?.sectionId === componentId) {
          return {
            ...res,
            config: {
              ...res.config,
              settingsData: {
                ...res.config.settingsData,
                settings: newSettings
              }
            }
          };
        }
        return res;
      });
  
      this.templateData = updatedTemplateData; // 替换整个数组以触发响应式更新
    }

    // 模板组件数据
    component = null;

    setComponent(value:any) {
      this.component = value;
    }

}

export default new editor();