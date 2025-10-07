import { getCategoryList, getCategorySelect, getPlatformCategorySelect } from "@/services/y2/api";
import { action, makeAutoObservable, observable } from "mobx";
import cookie from 'react-cookies';



class globalStore {

    constructor() {
        makeAutoObservable(this)
    }

    platformCategory = []

    // getPlatformCategory(){
    //     getPlatformCategorySelect("1").then((res:any) => {
    //         this.platformCategory = res.data
    //         // console.log(res)
    //     })
    // }
    // 语言
    categorylist = [];
    setCategoryList(category:any) {
        this.categorylist = category;
    }
    // 转树形结构
    buildTree(data:any, parentId = '0') {
        return data.filter((item:any) => item.pid === parentId).map((item:any) => ({
            ...item,
            value: item.id,
            title:item.category_name,
            children: this.buildTree(data, item.id),
        }));
    }

    sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 多语言 关系
    language = [
        {
            id: "1",
            code: "zh-CN"
        },
        {
            id: "2",
            code: "en-US"
        },
        {
            id: "3",
            code: "ja-JP"
        },
        {
            id: "4",
            code: "ko-KR"
        },
        {
            id: "5",
            code: "de-DE"
        },
        {
            id: "6",
            code: "zh-TW"
        },
        {
            id: "7",
            code: "ru-RU"
        },
        {
            id: "8",
            code: "fr-FR"
        },
        {
            id: "10",
            code: "es-ES"
        },
        {
            id: "11",
            code: "pt-PT"
        },
        {
            id: "12",
            code: "th-TH"
        },
        {
            id: "13",
            code: "ms-MY"
        },
        {
            id: "14",
            code: "bn-BD"
        },
        {
            id: "15",
            code: "vi-VN"
        },
        {
            id: "16",
            code: "en-AU"
        },
        {
            id: "17",
            code: "id-ID"
        },
        {
            id: "18",
            code: "es-MX"
        },
        {
            id: "19",
            code: "ar"
        },
        {
            id: "20",
            code: "it-IT"
        }
    ];

}

export default new globalStore();