import { makeAutoObservable } from "mobx";
import type {UniqueIdentifier} from '@dnd-kit/core';
import { MutableRefObject } from "react";


export interface TreeItem {
  id: UniqueIdentifier;
  title: string;
  children?: TreeItem[];
  status?:string;
  is_url?:string;
  isSys?:string;
  is_sys?:string;
  isShare?:string;
  is_share?:string;
  is_bind?:string;
  pid?:string;
  handle?: string;
  languages_id?: string;
  isNew?: boolean;
  img?: string;
  image?:string;
  collapsed?: boolean;
  content?: string;
  sort?:string;
  openMode?:string;
  open_mode?:string;
  pageLink?:string | null;
  page_link?:string;
}
export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
    parentId: UniqueIdentifier | null;
    depth: number;
    index: number;
}

export type SensorContext = MutableRefObject<{
    items: FlattenedItem[];
    offset: number;
}>;

class navgate {

    constructor() {
      makeAutoObservable(this)
    }


    id:string = "";

    setId(value: string) {
      this.id = value;
    }
    // 导航默认语言
    languagesId:string = "2";

    setLanguagesId(value: string) {
      this.languagesId = value;
    }

    // 系统
    isSys:string = "0";

    setIsSys(value: string) {
      this.isSys = value;
    }
    // 是否共享
    isShare:string = "0";

    setIsShare(value: string) {
      this.isShare = value;
    }

    // 绑定
    isBind:string = "1";
    setIsBind(value: string) {
      this.isBind = value;
    }

    // 全部项 -- 用于删除全部导航
    itemList:TreeItems = [];
    setItemList(value: TreeItems) {
      this.itemList = value;
    }

    // 子项
    initialItems: TreeItems = [];

    setInitialItems(value: TreeItems){
      this.initialItems = value
    }

    // 移除的子项
    removeItems: TreeItems = [];
    setRemoveItems(value: TreeItems){
      this.removeItems = value;
    }

    clear = () => {
      this.id = "";
      this.languagesId = "2";
      this.isSys = "0";
      this.isShare = "0";
      this.itemList = [];
      this.removeItems = [];
      this.initialItems = [];
    }

}

export default new navgate();