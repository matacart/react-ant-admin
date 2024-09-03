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
  state: boolean;
}

// interface DataType2{
//     // ID
//     id: React.Key;
//     // 型号Model
//     model: string;
//     // 分组
//     group: number;
//     // 语言
//     language: string;
//     // 商品主图
//     mainImgUrl: string;
//     // 商品名称  
//     name: string;
//     // 原价
//     price: number;
//     // 特价
//     bargainPrice: number;
//     // 归属
//     belong: string;
//     // 排序
//     order: string;
//     // 共享 
//     share: boolean;
//     // 首推
//     firstRecommend: true;
//     // 状态



// }


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
  'POST /api/ApiAppstore/currentUser': (req: Request, res: Response) => {
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
      msg: '用户名或密码错误',
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
    if (grant_type == 'client_credential'
      && accessKeyId == 'hdq8v4nqcpbras5u8l'
      && accessKeySecret === 'ay9clijrp84j8lyx9ftzjyx4zdm0mstp'
    ) {
      res.send({
        access_token: '123456',
      })
    } else {
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

  // // 产品列表
  // 'POST  /api/ApiStore/product_list': (req: Request, res: Response) => {
  //   res.json({
  //     "code": 0,
  //     "msg": "ok",
  //     "count": "1356",
  //     "data": [
  //       {
  //         "id": "1276451318963",
  //         "model": "45557",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb0d391c.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb69b57f.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb6e88b3.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb6e5d8a.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb7081c8.jpg\"]",
  //         "price": "2333.0000",
  //         "quantity": "2332",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1645102429",
  //         "create_time": "2022-02-13 22:20:18",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Manchester United Away Retro Jersey 98\/99",
  //         "content1": "      ",
  //         "content": "      ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "123.0000",
  //         "start_time": "2022-02-13 22:03:38",
  //         "end_time": "2022-03-13 22:03:38",
  //         "categorys": [
  //           {
  //             "id": "1276449176618",
  //             "status": "1",
  //             "create_time": "1644759875",
  //             "update_time": "1645101956"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276451318990",
  //         "model": "09066",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f58a0a41.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f619d6e0.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6239013.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f620bca9.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6220393.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6276732.jpg\"]",
  //         "price": "123.0000",
  //         "quantity": "24342",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1645101458",
  //         "create_time": "2022-02-13 22:20:18",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Liverpool Home Retro Jersey 89\/91",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "76.0000",
  //         "start_time": "2022-02-13 22:02:17",
  //         "end_time": "2022-03-13 22:02:17",
  //         "categorys": [
  //           {
  //             "id": "1276449202210",
  //             "status": "1",
  //             "create_time": "1644759901",
  //             "update_time": "1645044607"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276451318979",
  //         "model": "51175",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f0ee156c.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1aad944.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1ac8300.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1ac65ff.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1b126cb.jpg\"]",
  //         "price": "123.0000",
  //         "quantity": "23423423",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1644762018",
  //         "create_time": "2022-02-13 22:20:18",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Manchester United Home Long Sleeve Retro Jersey",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "65.0000",
  //         "start_time": "2022-02-13 21:52:57",
  //         "end_time": "2022-03-13 21:52:57",
  //         "categorys": [
  //           {
  //             "id": "1276449202210",
  //             "status": "1",
  //             "create_time": "1644759901",
  //             "update_time": "1645044607"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276451293342",
  //         "model": "14256",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb0d391c.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb69b57f.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb6e88b3.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb6e5d8a.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb7081c8.jpg\"]",
  //         "price": "2333.0000",
  //         "quantity": "2332",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1645102466",
  //         "create_time": "2022-02-13 22:19:52",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Manchester United Away Retro Jersey 98\/99",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "123.0000",
  //         "start_time": "2022-02-13 22:03:38",
  //         "end_time": "2022-03-13 22:03:38",
  //         "categorys": [
  //           {
  //             "id": "1276449176618",
  //             "status": "1",
  //             "create_time": "1644759875",
  //             "update_time": "1645101956"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276451293329",
  //         "model": "59228",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f58a0a41.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f619d6e0.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6239013.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f620bca9.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6220393.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6276732.jpg\"]",
  //         "price": "123.0000",
  //         "quantity": "24342",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "0",
  //         "is_sys": "0",
  //         "update_time": "1645101466",
  //         "create_time": "2022-02-13 22:19:52",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Liverpool Home Retro Jersey 89\/91",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "76.0000",
  //         "start_time": "2022-02-13 22:02:17",
  //         "end_time": "2022-03-13 22:02:17",
  //         "categorys": [
  //           {
  //             "id": "1276449202210",
  //             "status": "1",
  //             "create_time": "1644759901",
  //             "update_time": "1645044607"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276451293310",
  //         "model": "54581",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f0ee156c.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1aad944.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1ac8300.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1ac65ff.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1b126cb.jpg\"]",
  //         "price": "123.0000",
  //         "quantity": "23423423",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1644761992",
  //         "create_time": "2022-02-13 22:19:52",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Manchester United Home Long Sleeve Retro Jersey",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "65.0000",
  //         "start_time": "2022-02-13 21:52:57",
  //         "end_time": "2022-03-13 21:52:57",
  //         "categorys": [
  //           {
  //             "id": "1276449202210",
  //             "status": "1",
  //             "create_time": "1644759901",
  //             "update_time": "1645044607"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276450319610",
  //         "model": "ee44",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb0d391c.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb69b57f.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb6e88b3.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb6e5d8a.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090fb7081c8.jpg\"]",
  //         "price": "2333.0000",
  //         "quantity": "2332",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1644761018",
  //         "create_time": "2022-02-13 22:03:38",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Manchester United Away Retro Jersey 98\/99",
  //         "content1": "  ",
  //         "content": "  ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "123.0000",
  //         "start_time": "2022-02-13 22:03:38",
  //         "end_time": "2022-03-13 22:03:38",
  //         "categorys": [
  //           {
  //             "id": "1276449116679",
  //             "status": "1",
  //             "create_time": "1644759815",
  //             "update_time": "0"
  //           },
  //           {
  //             "id": "1276449148640",
  //             "status": "1",
  //             "create_time": "1644759847",
  //             "update_time": "1645102320"
  //           },
  //           {
  //             "id": "1276449176618",
  //             "status": "1",
  //             "create_time": "1644759875",
  //             "update_time": "1645101956"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276450238065",
  //         "model": "sfdfs",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f58a0a41.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f619d6e0.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6239013.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f620bca9.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6220393.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f6276732.jpg\"]",
  //         "price": "123.0000",
  //         "quantity": "24342",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "0",
  //         "is_sys": "0",
  //         "update_time": "1645101483",
  //         "create_time": "2022-02-13 22:02:17",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Liverpool Home Retro Jersey 89\/91",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "76.0000",
  //         "start_time": "2022-02-13 22:02:17",
  //         "end_time": "2022-03-13 22:02:17",
  //         "categorys": [
  //           {
  //             "id": "1276449202210",
  //             "status": "1",
  //             "create_time": "1644759901",
  //             "update_time": "1645044607"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1276449678016",
  //         "model": "sddsf",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f0ee156c.jpg",
  //         "product_video": "",
  //         "additional_image": "[\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1aad944.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1ac8300.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1ac65ff.jpg\",\"\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2022-02-13\/62090f1b126cb.jpg\"]",
  //         "price": "123.0000",
  //         "quantity": "23423423",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "1.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1644760863",
  //         "create_time": "2022-02-13 21:52:57",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "Manchester United Home Long Sleeve Retro Jersey",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "65.0000",
  //         "start_time": "2022-02-13 21:52:57",
  //         "end_time": "2022-03-13 21:52:57",
  //         "categorys": [
  //           {
  //             "id": "1276449202210",
  //             "status": "1",
  //             "create_time": "1644759901",
  //             "update_time": "1645044607"
  //           }
  //         ]
  //       },
  //       {
  //         "id": "1268202499082",
  //         "model": "76969",
  //         "sku": "",
  //         "product_image": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/55\/app\/19\/2021-11-10\/618b35b893638.jpg",
  //         "product_video": "",
  //         "additional_image": "[]",
  //         "price": "320.0000",
  //         "quantity": "23322",
  //         "sales_count": "0",
  //         "minimum": "1",
  //         "subtract": "1",
  //         "stock_status_id": "7",
  //         "shipping": "1",
  //         "weight": "2.00000000",
  //         "weight_class_id": "1",
  //         "sort": "0",
  //         "is_best": "1",
  //         "is_new": "1",
  //         "is_hot": "1",
  //         "is_sys": "0",
  //         "update_time": "1636513211",
  //         "create_time": "2021-11-10 10:59:58",
  //         "employee_id": "7816664",
  //         "inquiry_status": "0",
  //         "ad_waf_status": "1",
  //         "ad_product_id": "0",
  //         "ad_product_url": null,
  //         "group_id": "0",
  //         "divided_status": "0",
  //         "divided_country": null,
  //         "divided_url": null,
  //         "is_share": "0",
  //         "status": "1",
  //         "employee_realname": "\u90b9\u96c4",
  //         "domain_id": 0,
  //         "checked": 0,
  //         "languages_id": "2",
  //         "title": "sdfsdfsd sdfsdf sdfwe",
  //         "content1": "    ",
  //         "content": "    ",
  //         "languages_name": "English",
  //         "meta_title": "",
  //         "meta_keyword": "",
  //         "meta_description": "",
  //         "product_url": "",
  //         "tag": "",
  //         "specialprice": "98.0000",
  //         "start_time": "2021-11-10 10:59:45",
  //         "end_time": "2021-12-10 10:59:45",
  //         "categorys": [
  //           {
  //             "id": "49811241",
  //             "status": "1",
  //             "create_time": "1627952503",
  //             "update_time": "1629035274"
  //           }
  //         ]
  //       }
  //     ]
  //   })
  // },
  // // 删除产品
  // 'POST /api/ApiAppstore/product_del': (req: Request, res: Response) => {
  //   res.json({
  //     code: 0,
  //     id: req?.body?.id,
  //   })
  // },
  // POST /api/ApiAppstore/doUploadPic

  'POST /api/ApiStore/file_list': (req: Request, res: Response) => {
    res.json([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ])
  },
};

