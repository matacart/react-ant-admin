import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

type BlogsType = {
    id:string;
    languages_id:string;
    category_name:string;
    category_pid:string;
    sort:string;
    is_share:string;
    group_id:string;
    category_description:string;
    comment_mode:string;
    handle:string;
    meta_title:string;
    meta_keywords:string;
    meta_description:string;
    status:string;
    template_id:string;
}

class Blogs {
    constructor() {
        makeAutoObservable(this)
    }

    // 初始
    defaultBlogs = {
        id: "",
        languages_id:cookie.load("shop_lang") || '2',
        handle:"",
        category_name:"",
        category_pid:"",
        sort:"",
        is_share:"0",
        group_id:"",
        category_description:"",
        comment_mode:"1",
        meta_title:"",
        meta_keywords:"",
        meta_description:"",
        status:"1",
        template_id:"0"
    }

    blogs:BlogsType = this.defaultBlogs;

    setBlogs(value:BlogsType){
        this.blogs = value
    }

    reset(){
        this.blogs = {
            ...this.defaultBlogs,
        };
    }

}

export default new Blogs();