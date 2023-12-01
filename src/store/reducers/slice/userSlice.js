import { createSlice } from '@reduxjs/toolkit';
import {
    loginThunk,
    signUpThunk,
    resettingThunk,
    getUserInfoThunk,
} from '../thunk/userThunk';
import { setToken, setUserInfo } from '../../../util/auth';

/**
 * createSlice() 接收一组 reducer 函数的对像和一个 slice 名称，并自动生成与 reducer 和 state 对应的 action creators 和 action types
 */
export const userSlice = createSlice({
    name: 'user',
    // 初始化 state
    initialState: {
        token: '',
        userInfo: null,
    },
    reducers: {
        // action 类型名：action函数
        increment: state => {
            console.log(state.token);
        },
    },
    // 允许 createSlice 响应和更新自己的状态（异步）
    extraReducers(builder) {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.token = action.payload.data.access_token;
                // token缓存
                setToken(action.payload.data.access_token);
            } else return action.payload;
        });
        builder.addCase(signUpThunk.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(resettingThunk.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload.user;
            setUserInfo(action.payload.user);
        });
    },
});

export const { increment } = userSlice.actions;

export default userSlice.reducer;
