// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    token?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}

declare namespace ApiStore {
  type selectTags = {
    code:number,
    count:string,
    data:any,
    msg:string,
  }
}


declare namespace ApiAppstore {
  type addressAdd = {
  }
  type employeeSelect = {
    code:number, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type roleList = {
    code:number, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type domainList = {
    code:number,
    count:string,
    data:any,
    msg:string,
  }
}

declare namespace ApiTemplate {
  type addTemplateFile = {
    code:string | number, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type deleteTemplateFile = {
    code:number, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type RenameFile = {
    code:number, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type templateFileUpload = {
    code:number, 
    data:any,
    msg:string,
    success?:boolean,
  }
}

declare namespace ApiEditor{
  type languageSchema = {
    code:number|string, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type installedSections = {
    code:number|string, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type templateInfo = {
    code:number|string, 
    data:any,
    msg:string,
    success?:boolean,
  }
  type settingsSections = {
    code:number|string, 
    data:any,
    msg:string,
    success?:boolean,
  }
}

