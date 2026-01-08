import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

type BlogsType = {
    id:string;
    languages_id:string,
    title:string,
    template_id:string
}

class Blogs {
    constructor() {
        makeAutoObservable(this)
    }

    // 初始
    defaultBlogs = {
        id: "",
        languages_id: "",
        title: "",
        template_id:"0"
    }

    blogs:BlogsType = this.defaultBlogs;

    setBlogs(value:BlogsType){
        this.blogs = value
    }

    reset(){
        this.blogs = {
            ...this.defaultBlogs,
            languages_id:cookie.load("shop_lang") || '2'
        };
    }

}

export default new Blogs();