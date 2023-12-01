import { createSlice } from '@reduxjs/toolkit';

/**
 * createSlice() 接收一组 reducer 函数的对像和一个 slice 名称，并自动生成与 reducer 和 state 对应的 action creators 和 action types
 */
export const siderSlice = createSlice({
    name: 'sider',
    initialState: {
        path: '/home',
        menu: {},
    },
    reducers: {
        updatePath: (state, action) => {
            state.path = action.payload;
        },
        updataMenu: (state, action) => {
            Object.assign(state.menu, action.payload);
        },
    },
});

export const { updatePath, updataMenu } = siderSlice.actions;

export default siderSlice.reducer;
