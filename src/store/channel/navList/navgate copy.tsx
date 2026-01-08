import { makeAutoObservable } from "mobx";

type navListType = {
    languages_id:string;
    title:string;
    meta_title:string;
    meta_description:string;
    meta_keywords:string;
    content:string;
    status:string;
    url:string;
    alt_url:string;
}


class navListStore {

    constructor() {
        makeAutoObservable(this)
    }

    default = {
        languages_id:"2",
        title:"",
        content:'',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        url: '',
        app_id:"19", //商店ID
        is_sys:'0',
        is_share:'0',
        status_header:'0',
        status_sidebox:'0',
        status_footer:'0',
        header_sort:'0',
        sidebox_sort:'0',
        footer_sort:'0',
        page_open_new_window:'0',
        is_url:'0',
        pid:'0',
        alt_url:'',
        template_id:'0',
        status:'1',
    }

    newNavgate:navListType = this.default;

    setNewNavgate(navgate: any) {
        this.newNavgate = navgate
    }

    newNavListChild = [];

    setNewListChild = (res:any) =>{
        this.newNavListChild = res
    }

    resetNewCustomPage = () => {
        // 或者使用初始值
        this.newNavgate = this.default;
    };

}

export default new navListStore();