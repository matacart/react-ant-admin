import { makeAutoObservable } from "mobx";

interface homeSEO {
    meta_title:string,
    meta_description:string,
    meta_keywords:string,
}

interface PassWord {
    password:string,
    gdprState:string,
    forceon:boolean,
    switchEnable:boolean
}

interface SitemapStatus{
    active: "off" | "on",
}

export interface SitemapFile{
    id:string,
}

export interface IPAddressAccess{
    id:string,
    ip_original:string,
    list_type:string,
}

export interface IPBlack{
    id:string,
    country_name:string,
    country_code:string,
}

class Preferences {

    constructor() {
        makeAutoObservable(this)
    }

    homeSEO:homeSEO = {
        meta_title: "",
        meta_description: "",
        meta_keywords: ""
    }

    setHomeSEO(seo:homeSEO){
        this.homeSEO = seo;
    }

    passWord:PassWord = {
        password: "",
        forceon:true,
        switchEnable:false,
        gdprState:"0"
    }

    setPassWord(passWord:PassWord){
        this.passWord = passWord;
    }

    sitemapStatus:SitemapStatus = {
        active: "on",
    }

    setSitemapStatus(status:SitemapStatus){
        this.sitemapStatus = status;
    }

    sitemapFileList:SitemapFile[] = [];

    setSitemapFileList(fileList:SitemapFile[]){
        this.sitemapFileList = fileList;
    }

    IPAccessList:{
        data:IPAddressAccess[],
        total:number,
    } = {
        data:[],
        total:0
    };

    setIPAddressAccessList({data,total}:{
        data:IPAddressAccess[],
        total:number,
    }){
        this.IPAccessList = {
            data,
            total,
        };
    }

    IPBlackList:{
        data:IPBlack[],
        total:number,
    } = {
        data:[],
        total:0
    };

    setIPBlackList({data,total}:{
        data:IPBlack[],
        total:number,
    }){
        this.IPBlackList = {
            data,
            total,
        };
    }
    
    socialPicture:string = "";

    setSocialPicture(picture:string){ 
        this.socialPicture = picture;
    }

    reset(){
        this.homeSEO = {
            meta_title: "",
            meta_description: "",
            meta_keywords: "",
        }
        this.passWord = {
            password: "",
            forceon:true,
            switchEnable:false,
            gdprState:"0"
        }
        this.sitemapStatus = {
            active: "on",
        }
        this.setSitemapFileList([]);
        this.setIPAddressAccessList({data:[],total:0});
        this.socialPicture = "";
    }

}

export default new Preferences();