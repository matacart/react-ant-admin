import request, { baseURL } from '../util/request';

/**
 * 获取商品列表
 */
export function getProductList(page, limit, token) {
    return request({
        url: baseURL.adminApi + '/ApiStore/product_list',
        method: 'get',
        params: { page, limit, access_token: token },
    });
}

/**
 * 增加商品
 */
export function addProduct(data) {
    return request({
        url: baseURL.adminApi + '/ApiStore/product_add',
        method: 'post',
        data,
    });
}

/**
 * 删除商品
 */
export function delProduct(data) {
    return request({
        url: baseURL.adminApi + '/ApiStore/product_del',
        method: 'post',
        data,
    });
}

/**
 * 更改商品状态(上架/下架)
 */
export function changeProductStatus(data) {
    return request({
        url: baseURL.adminApi + '/ApiStore/product_status_update',
        method: 'post',
        data,
    });
}
