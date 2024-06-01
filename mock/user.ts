// import { Request, Response } from 'express';

// export default {
//   // 登陆验证
//   'POST /api/admin/login': (req: Request, res: Response) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.json({
//       code: 0,
//       msg: '登入成功',
//       data: {
//         access_token:
//           'cKwCExfHZ4dbxPBUXSOJaOXcGQAfp6f5-TWrmNJuuuUjLHrGXnZHR9=WRFdjYGdDXEvE-HtyRFJJBnNKXDvqplZfqQutL5egMTOWS6QT7OWKW6S8mwt8tJMRxOuzg9R=gRVAWSUMT3PeM',
//       },
//     });
//   },
// };
import { message } from 'antd';
import { Request, Response } from 'express';
import { fill } from 'lodash';

interface DataType {
  key: React.Key;
  imgUrl: string;
  name: string;
  price: number;
  inventory: number;
  state:boolean;
}
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(500);
  return res.json('123');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/ApiAppstore/currentUser': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      data: {
        name: 'MataCart Admin',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/ApiAppstore/newlogin': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'admin' && username === 'admin') {
      res.send({
        code: 0,
        token: 'sdfsadfasdfasf3rwetwetgeww',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'user' && username === 'user') {
      res.send({
        code: 0,
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        code: 0,
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      code: 1,
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/ApiAppstore/logout': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,

  'POST /api/ApiAppstore/reset': async (req: Request, res: Response) => {
    const { phone, username, captcha } = req.body;

    if (captcha != '123456') {
      res.send({
        code: 1,
      });
      return;
    }

    res.send({
      code: 0,
      currentAuthority: 'admin',
    });
    access = 'admin';
  },

  'POST /api/ApiAppstore/register': async (req: Request, res: Response) => {
    const { password, username } = req.body;
    await waitTime(1000);
    res.send({
      code: 0,
      token: 'sdfsadfasdfasf3rwetwetgeww',
      currentAuthority: 'admin',
    });
    access = 'admin';
    return;
  },

  'POST /api/Oauth2/gettoken': async (req: Request, res: Response) => {
    const { 
      grant_type,
      accessKeyId,
      accessKeySecret } = req.body;
    if(grant_type=='client_credential'
      && accessKeyId=='hdq8v4nqcpbras5u8l'
      && accessKeySecret==='ay9clijrp84j8lyx9ftzjyx4zdm0mstp'
    ){
      res.send({
        access_token:'123456',
      })
    }else{
      message.error('授权失败'); 
    }

  },
  'POST /api/upload': (req: Request, res: Response) => {
    const formData = new FormData();
    res.json({
      status: 'success',
      message: 'File uploaded successfully',
      fileId: '123',
      fileUrl: '#',
      fileSize: 0,
      fileName: '1'
    })
  },
  'GET /api/cloudImgList': (req: Request,res:Response) => {
    res.json([
    {
      fileId: 1,
      fileUrl:'https://s21.ax1x.com/2024/05/28/pk1JZZD.png',
      fileName: '88888888888888888888888'
    },{
      fileId: 2,
      fileUrl:'https://s21.ax1x.com/2024/05/28/pk1JZZD.png',
      fileName: '88888888888888888888888'

    },{
      fileId: 3,
      fileUrl:'https://s21.ax1x.com/2024/05/28/pk1JZZD.png',
      fileName: '88888888888888888888888'

    },{
      fileId: 4,
      fileUrl:'https://s21.ax1x.com/2024/05/28/pk1JZZD.png',
    },{
      fileId: 5,
      fileUrl:'https://s21.ax1x.com/2024/05/28/pk1JZZD.png',
    }
    ])
  },
  'GET /api/product/query' :(req:Request,res:Response) =>{
    res.status(200);
    let tempData: DataType[] = [];
    for(let i=0;i<10;++i){
        tempData.push({
            key: i.toString(),
            imgUrl: '#',
            name: i.toString(),
            price: i,
            state: false,
            inventory: i
        });
    }
    res.json(tempData);
  }
};

