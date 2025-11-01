import { makeAutoObservable } from "mobx";

interface componentType {
  id: string;
  type:string;
  itemId:string;
}

interface templateInfoType {
  isUsing?:boolean,
  themeName:string;
  themeInfo:any,
  themeInstanceInfo:any
}

interface settingsType{
  schema:any[];
  settingsData:any;
  presets:any;
}

// 定义操作历史记录的接口
interface OperationHistory {
  type: 'templateUpdate';
  undoData: any; // 撤销时需要的数据（操作前状态）
  redoData: any; // 重做时需要的数据（操作后状态）
  timestamp: number;
}

class editor {
    constructor() {
      makeAutoObservable(this)
    }

    // 工具栏 0: 组件 1: 全局设置 2: 应用嵌入
    toolBar = 0;
    setToobar(value:number){
      this.toolBar = value;
    }

    // 临时存储状态oseid
    oseId = "";
    setOseId(value:string){
      this.oseId = value;
    }

    // 店铺语言
    languagesId = "2";
    setLanguagesId(value:string){
      this.languagesId = value;
    }

    // 编辑模式
    mode:string = 'auto';

    setMode(value:string){
      this.mode = value;
    }

    // 模板页标题
    title:string = "";
    setTitle(value:string){
      this.title = value;
    }

    // 模板信息
    templateInfo:templateInfoType = {
      themeName:"",
      themeInfo:{},
      themeInstanceInfo:{}
    };

    setTemplateInfo(data:templateInfoType) {
      this.templateInfo = data;
    }

    // 模板数据
    templateData:any = [];

    setTemplateData(data:any) {
      this.templateData = data;
    }

    // 全局配置
    settings:settingsType = {
      schema: [],
      settingsData:{},
      presets:{}
    }
    setSettings(data:any){
      this.settings = data;
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
          if(this.component?.itemId){
            // 子项
            return {
              ...res,
              sections:{
                ...res.sections,
                [componentId]:{
                  ...res.sections[componentId],
                  settingsData: {
                    ...res.sections[componentId].settingsData,
                    blocks:{
                      ...res.sections[componentId].settingsData.blocks,
                      [this.component?.itemId]:{
                        ...res.sections[componentId].settingsData.blocks[this.component?.itemId],
                        settings: newSettings
                      }
                    }
                  }
                }
              }
            };
          }else{
            // 父项
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
      // console.log('Setting component:', value);
      this.component = value;
    }

    // 操作历史记录数组，用于回退操作
    operationHistory: OperationHistory[] = [];

    // 重做操作数组，存储已撤销的操作
    redoHistory: OperationHistory[] = [];

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

    // 状态重置
    reset(){
      this.oseId = "";
      this.operationHistory = [];
      this.redoHistory = [];

      this.mode = "auto";
      this.title = "";
    }

}

export default new editor();