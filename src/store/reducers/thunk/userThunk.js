import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, signUp, resetting, getUserInfo } from '../../../api/user';

/**
 * 登录
 */
const loginThunk = createAsyncThunk(
    'user/loginPost',
    async ({ username, password }) => {
        // 数据格式化
        const formData = new FormData();
        formData.append('username', username.trim());
        formData.append('password', password);
        formData.append('clientid', Date.now());

        try {
            const res = await login(formData);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

/**
 * 注册
 */
const signUpThunk = createAsyncThunk(
    'user/signUpPost',
    async ({
        nickname,
        username,
        password,
        code,
        area_code = '86',
        service = 'xht',
    }) => {
        // 数据格式化
        const formData = new FormData();
        formData.append('nickname', nickname.trim());
        formData.append('username', username.trim());
        formData.append('password', password.trim());
        formData.append('code', code.trim());
        formData.append('area_code', area_code.trim());
        formData.append('service', service.trim());

        try {
            const res = await signUp(formData);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

/**
 * 修改密码
 */
const resettingThunk = createAsyncThunk(
    'user/resettingPost',
    async ({
        username,
        area_code = '86',
        code,
        password,
        confirmPassword,
        service = 'xht',
    }) => {
        // 数据格式化
        const formData = new FormData();
        formData.append('username', username.trim());
        formData.append('area_code', area_code.trim());
        formData.append('code', code.trim());
        formData.append('password', password.trim());
        formData.append('confirm_password', confirmPassword.trim());
        formData.append('service', service.trim());
        formData.append('from', 'matacart');

        try {
            const res = await resetting(formData);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

/**
 * 用户信息获取
 */
const getUserInfoThunk = createAsyncThunk(
    'user/getUserInfoGet',
    async token => {
        try {
            const res = await getUserInfo(token);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

export { loginThunk, signUpThunk, resettingThunk, getUserInfoThunk };
