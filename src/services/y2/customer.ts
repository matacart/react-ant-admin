import { request } from '@umijs/max';

export async function getCustomerList(page: any, limit: any) {
  return request(`/api/ApiAppstore/customers_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      page: page,
      limit: limit,
    }
  })
}

  
  export async function getAddressList(page: string, limit: number, additionalParams?: string) {
    const params = additionalParams ? `${additionalParams}&page=${page}&limit=${limit}` : `?page=${page}&limit=${limit}`;
    return request(`/api/ApiAppstore/address_info${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

export async function addCustomers(newCustomerInfo?: { realname: string; familyname: string; email: string; tel: string; }) {
  return request('/api/ApiAppstore/customer_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "realname":null,
      "is_share": null,
      "add_time": null,
      "job": null,
      "sex":  null,
      "email":  null,
      "tel": null,
      "wechat":  null,
      "qq":  null,
      "country":  null,
      "city":  null,
      "address":  null,
      "postcode":  null,
      "remark":   null, 
      "status":  null,
    }
  })
}


// export async function addCustomers(newCustomerInfo?: { realname: string; familyname: string; email: string; tel: string; }): Promise<any> {
//   if (!newCustomerInfo) {
//     throw new Error('Customer info is required');
//   }

//   const data = {
//     realname: newCustomerInfo.realname,
//     familyname: newCustomerInfo.familyname,
//     email: newCustomerInfo.email,
//     tel: newCustomerInfo.tel,
//     is_share: '',
//     add_time: '',
//     job: '',
//     sex: '',
//     wechat: '',
//     qq: '',
//     country: '',
//     city: '',
//     address: '',
//     postcode: '',
//     remark: '',
//     status: '1',
//   };

//   try {
//     const response = await request('/api/ApiAppstore/customer_add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json', // 如果使用 JSON 格式的数据
//       },
//       data: data,
//     });

//     return response;
//   } catch (error) {
//     console.error('Error adding customer:', error);
//     throw error;
//   }
// }