import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';


// 博客集合详情
export async function getArticleCategorysDetail(options:{
  id:string,
  languages_id:string
},signal?:AbortSignal) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_category_detail", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 博客集合 -- 创建 更新
export async function setArticleCategorys(options:any) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_category_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 博客集合
export async function getArticleCollection() {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_category_select", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加博客集合
export async function addArticleCollection(options:any) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_category_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:options.lang,
      category_name:options.name,
      category_pid:options.parentId,
      sort:options.sort,
      is_share:'0',
      group_id:options.groupId,
      category_description:'',
      meta_title:options.seoTitle,
      meta_keywords:options.seoKeywords,
      meta_description:options.seoDescription,
      status:"1"
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 博客评论列表
export async function getArticleComments(options:{
  page?:string,
  limit?:string,
  languages_id:string
},signal?:AbortSignal) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_comment_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 创建博客
export async function createArticles(options:any) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}
// 更新博客
export async function upDateArticles(options:any) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除博客 -- 将状态更改为0
export async function delArticles(id:string) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 博客列表
export async function getArticleList(options:{page:string,limit:string,languages_id:string}) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 博客详情
export async function getArticle(options:{
  id?:string,
  languages_id?:string
}) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_info", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 博客集合列表
export async function getArticleCategorys(options:{
  page:string,
  limit:string,
  languages_id:string
},signal?:AbortSignal) {
  const res = await request<ApiArticle.Default>("/ApiArticle/article_category_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}