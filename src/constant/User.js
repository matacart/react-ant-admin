import { GetIntl } from '../locales/utils';

const USER_FORM = {
    '/user/signIn': {
        type: '登录',
        title: GetIntl('UserPage_login_title'),
        submText: GetIntl('UserPage_login_text'),
        dividerLine: GetIntl('UserPage_login_dividerLine'),
    },
    '/user/signUp': {
        type: '注册',
        title: GetIntl('UserPage_register_title'),
        submText: GetIntl('UserPage_register_text'),
        dividerLine: GetIntl('UserPage_register_dividerLine'),
    },
    '/user/resetting': {
        type: '忘记密码',
        title: GetIntl('UserPage_login_forgetPassword'),
        submText: GetIntl('UserPage_resetting_text'),
        dividerLine: GetIntl('UserPage_login_dividerLine'),
    },
};

export { USER_FORM };
