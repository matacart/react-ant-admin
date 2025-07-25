import { makeAutoObservable } from "mobx";

interface componentType {
  id: string;
  type:string;
  itemId:string;
}

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
      console.log(componentId, newSettings)
      const updatedTemplateData = this.templateData.map((res:any) => {
        if (res.type == "SECTION" && res.config?.sectionId === componentId) {
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
        if(res.type == "TEMPLATE" && res.sections[componentId]){
          return {
            ...res,
            sections:{
              ...res.sections,
              [componentId]:{
                ...res.sections[componentId],
                settingsData: {
                  ...res.sections[componentId].settingsData,
                  settings: newSettings
                }
              }
            }
          }
        }
        return res;
      });

      this.templateData = updatedTemplateData; // 替换整个数组以触发响应式更新
    }

    // 模板组件数据
    component:componentType | null = null;

    setComponent(value:any) {
      this.component = value;
    }

}

export default new editor();