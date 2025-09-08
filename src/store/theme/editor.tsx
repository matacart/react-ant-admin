import { generateId } from "@/utils/dataStructure";
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

    // 更新组件模板数据
    updateComponentSettings(componentId:string, newSettings:any) {
      const updatedTemplateData = this.templateData.map((res:any) => {
        if (res.type == "SECTION" && res.config?.sectionId === componentId) {
          if(this.component?.itemId){
            // 子项
            return {
              ...res,
              config: {
                ...res.config,
                settingsData: {
                  ...res.config.settingsData,
                  blocks: {
                    ...res.config.settingsData.blocks,
                    [this.component?.itemId]: {
                      ...res.config.settingsData.blocks[this.component?.itemId],
                      settings: newSettings
                    }
                  }
                }
              }
            }
          }else{
            // 父项
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

    // 添加组件
    addComponentBlock(id:string,type:string,block:any,blockOrder:string){
      const updatedTemplateData = this.templateData.map((res:any) => {
        if (res.type !== "TEMPLATE" && res.id === id) {
          return {
            ...res,
            config: { 
              ...res.config, 
              settingsData: {
                ...res.config.settingsData,
                block_order: [...res.config.settingsData.block_order,blockOrder],
                blocks: {
                  ...res.config.settingsData.blocks,
                  [blockOrder]: {
                    ...block
                  }
                }
              }
            }
          };
        }else{
          // 模块
          return res;
        }
      });
      this.templateData = updatedTemplateData; // 替换整个数组以触发响应式更新

      // 设置新增组件为选中组件

    }

    // 删除组件 id:模块id，type:模块类型，blockId:模块子组件id 
    deleteComponentBlock(id:string,type:string,blockId:string){
      const updatedTemplateData = this.templateData.map((res:any) => {
        if (res.type !== "TEMPLATE" && res.id === id) {
          const blockOrder = res.config.settingsData.block_order.filter((item:any) => item!== blockId);
          const { [blockId]:removedBlock,...remainingBlocks } = res.config.settingsData.blocks;
          return {
            ...res,
            config: {
              ...res.config,
              settingsData: {
                ...res.config.settingsData,
                block_order: blockOrder,
                blocks: remainingBlocks
              }
            }
          }
        }
        // 模板
        if(res.type == "TEMPLATE"){
          // blockId == "" 删除模块
          if(blockId == ""){
            const { [id]:removedTemplate,...remainingTemplates } = res.sections;
            return {
              ...res,
              order: res.order.filter((order:string) => order != id),
              sections: remainingTemplates
            }
          }else{
            // 删除模块子组件
            return res;
          }
          // return {
          //   ...res,
          //   sections:{
          //     ...res.sections,
          //     [id]:{
          //       ...res.sections[id],
          //       settingsData: {
          //         ...res.sections[id].settingsData,
          //         block_order: res.sections[id].settingsData.block_order.filter((item:any) => item!== blockId),
          //         blocks: {
          //           ...res.sections[id].settingsData.blocks,
          //         }
          //       }
          //     }
          //   }
          // }

        }
        return res;
      })
      this.templateData = updatedTemplateData;

      // 重置选中组件
      this.setComponent(null);
    }

    // 模板组件数据
    component:componentType | null = null;

    setComponent(value:any) {
      console.log('Setting component:', value);
      this.component = value;
    }

}

export default new editor();