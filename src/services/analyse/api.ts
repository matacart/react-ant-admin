
// import { request } from '@umijs/max';

// export async function getAnalyse() {
//     return request('/api/ApiAnalyse/report', {
//         method: 'GET',
//         ...(options || {}),
//     });
// }
import { request } from '@umijs/max';

export async function getAnalyse(options?: Record<string, any>) {
    return request('/api/ApiAnalyse/report', {
        method: 'GET',
        ...(options || {}),
    });
}