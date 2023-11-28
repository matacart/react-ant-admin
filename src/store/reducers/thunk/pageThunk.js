import { createAsyncThunk } from '@reduxjs/toolkit';

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

export { loginThunk, signUpThunk, getUserInfoThunk };
