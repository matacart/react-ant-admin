import { get } from '../locales/utils';
const USER_FORM = {
    '/user/signIn': {
        type: '登录',
        title: get('UserPage_login_title'),
        submText: get('UserPage_login_text'),
        dividerLine: get('UserPage_login_dividerLine'),
    },
    '/user/signUp': {
        type: '注册',
        title: get('UserPage_register_title'),
        submText: get('UserPage_register_text'),
        dividerLine: get('UserPage_register_dividerLine'),
    },
};

export { USER_FORM };
