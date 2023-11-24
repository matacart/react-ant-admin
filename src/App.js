import { Route, Routes, RouterProvider } from 'react-router-dom';
import routeMap from './router/routeMap';
import { RouterBeforeEach } from './router/RouterBeforeEach';

export default function App() {
    /* // 老版本
    const RouteAuthFun = routeList => {
        return routeList.map(item => {
            return (
                <Route
                    path={item.path}
                    element={
                        <RouterBeforeEach key={item.path}>
                            {item.element}
                        </RouterBeforeEach>
                    }
                    key={item.path}
                >
                    {item.children && RouteAuthFun(item.children)}
                </Route>
            );
        });
    };

    return <Routes>{RouteAuthFun(routeMap)}</Routes>; */

    return <RouterProvider router={routeMap} />;
}
