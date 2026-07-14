import { makeAutoObservable } from "mobx";

type ArticlesType = {
    id: string;
    lang:string;
    title:string;
    metaTitle:string;
    metaDescription:string;
    metaKeywords:string;
    productUrl:string;
    imgUrl:string;
    content:string;
    abstract:string;
    releaseTime:string;
    template_id:string;
    status:string;
    ad_waf_status:string;
    ad_article_id:string;
    ad_article_url:string;
    author_name:string;
    category_id:string;
    jump_button_link:string;
}

class Articles {

    constructor() {
        makeAutoObservable(this)
    }

    defaultNewArticles = {
        id:"",
        lang:"2",
        title:"",
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        productUrl: '',
        imgUrl:'',
        content:'',
        abstract:'',
        releaseTime:'',

        template_id:'0',
        status:'1',
        ad_waf_status:'0',
        ad_article_id:'',
        ad_article_url:'',
        author_name:'',
        category_id:'',
        jump_button_link:''
    }

    newArticles:ArticlesType = this.defaultNewArticles;

    setNewArticles(articles: any) {
        this.newArticles = articles
    }

    resetNewArticles = () => {
        // 或者使用初始值
        this.newArticles = this.defaultNewArticles;
    };

    oldArticles:ArticlesType = {
        lang: "",
        title: "",
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        productUrl: '',
        imgUrl: '',
        content: '',
        abstract: '',
        releaseTime: '',

        template_id: '',
        status: '',
        ad_waf_status: '0',
        ad_article_id: '',
        ad_article_url: '',
        author_name: '',
        category_id: '',
        jump_button_link: '',
        id: ""
    }

    setOldArticles(articles: any) {
        this.oldArticles = articles
    }
}

export default new Articles();