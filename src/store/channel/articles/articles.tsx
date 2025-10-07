import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

type ArticlesType = {
    id:string;
    languages_id:string,
    title:string,
    content:string,
    excerpt:string,
    image:string,
    meta_title: string,
    meta_keywords: string,
    meta_description: string,
    publish_time: string,
    ad_waf_status: string,
    ad_article_id:string,
    ad_article_url:string,
    status:string,
    jump_button_link:string;
    author_name:string,
    category_id:string,
    template_id:string
}

class Articles {
    constructor() {
        makeAutoObservable(this)
    }

    // 初始
    defaultArticles = {
        id: "",
        languages_id: "",
        title: "",
        content: "",
        excerpt: "",
        image: "",
        meta_title: "",
        meta_keywords: "",
        meta_description: "",
        publish_time: "",
        ad_waf_status: "",
        ad_article_id: "",
        ad_article_url: "",
        status: "0",
        jump_button_link:"",
        author_name:"",
        category_id:"",
        template_id:"0"
    }

    articles:ArticlesType = this.defaultArticles;

    setArticles(value:ArticlesType){
        this.articles = value
    }

    reset(){
        this.articles = {
            ...this.defaultArticles,
            languages_id:cookie.load("shop_lang") || '2'
        };
    }

}

export default new Articles();