import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index'

// configureStore() 封装了 redux 中 createStore，可以自动组合 slice 的 reducer，可以添加任何 Redux 中间件，默认情况下包含 redux-thunk

/**
 * 创建 store 状态存储仓库
 */
const store = configureStore({
    reducer: rootReducer,
})

export default store
