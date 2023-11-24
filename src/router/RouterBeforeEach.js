import { useEffect, useMemo } from 'react';
import {
    matchRoutes,
    useLocation,
    Navigate,
    useMatches,
    useOutlet,
} from 'react-router-dom';
import routeMap from './routeMap';
import { getToken } from '../util/auth';
import { message } from 'antd';
import store from '../store/store';
import { updatePath } from '../store/reducers/slice/siderSlice';

/**
 * 高阶组件，用于实现路由鉴权等。
 * @param {*} param
 * @returns
 */
export const RouterBeforeEach = () => {
    // 获取当前路由状态 Hook
    const location = useLocation();
    const matches = useMatches();
    const outlet = useOutlet();

    // 通过 store.dispatch 调用 其具体的 action 方法。
    store.dispatch(updatePath(location.pathname));

    /**
     * 当前路径是否在白名单？
     * 当前是否已登录？
     * 都不是则重向定到 Login
     */
    const page = useMemo(() => {
        if (
            !getToken() &&
            location.pathname !== '/user/signIn' &&
            location.pathname !== '/user/signUp'
        ) {
            message.error('登录信息已过期，请重新登录！');
            return <Navigate to="/user/signIn" replace />;
        }
        if (
            getToken() &&
            (location.pathname === '/' || location.pathname === '/user/signIn')
        ) {
            return <Navigate to="/admin/home" />;
        }
        return outlet;
    }, [getToken(), location.pathname]);

    /**
     * 模仿 vue-router 后置钩子修改网页标题
     */
    useEffect(() => {
        document.title = matches[2].handle.title + ' - MataCart';
    }, [matches]);

    return page;
};

/* // 老版本
export const RouterBeforeEach = ({ children }) => {
    // 获取当前路由状态 Hook
    const location = useLocation();
    const navigate = useNavigate();
    const mathchs = matchRoutes(routeMap, location);

    // 通过 store.dispatch 调用 其具体的 action 方法。
    store.dispatch(updatePath(location.pathname));

    const isExist = mathchs.some(item => item.pathname === location.pathname);

    useEffect(() => {
        if (
            !getToken() &&
            location.pathname !== '/user/signIn' &&
            location.pathname !== '/user/signUp'
        ) {
            message.error('登录信息已过期，请重新登录！');
            navigate('/user/signIn');
        } else {
            if (getToken() && isExist) {
                if (
                    location.pathname === '/' ||
                    location.pathname === '/user/signIn'
                ) {
                    navigate('/admin/home');
                } else {
                    navigate(location.pathname);
                }
            }
        }
    }, [getToken(), location.pathname]);

    return children;
}; */
