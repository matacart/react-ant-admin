import { createSlice } from '@reduxjs/toolkit';
import { setLocale } from '../../../util/auth';

export const pageSlice = createSlice({
    name: 'sider',
    initialState: {
        locale: '',
    },
    reducers: {
        setLanguage: (state, action) => {
            state.locale = action.payload;
            setLocale(action.payload);
        },
    },
});

export const { setLanguage } = pageSlice.actions;

export default pageSlice.reducer;
