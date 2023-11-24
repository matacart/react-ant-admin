import { combineReducers } from 'redux';
import userSlice from './slice/userSlice';
import siderSlice from './slice/siderSlice';

/**
 * 将 Reducer 整合，后续直接暴露出去即可，就不用再在 store 中重新整合，提升代码的健壮性
 */
const rootReducer = combineReducers({
    user: userSlice,
    sider: siderSlice,
});

export default rootReducer;
