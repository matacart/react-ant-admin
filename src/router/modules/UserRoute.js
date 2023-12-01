import User from '../../page/User/User';
import UserForm from '../../page/User/component/UserForm/UserForm';

const UserRoute = [
    {
        path: '/user',
        name: 'user',
        element: <User />,
        children: [
            {
                // 注册
                path: '/user/signUp',
                name: 'signUp',
                element: <UserForm />,
                handle: { title: '注册' },
            },
            {
                // 登录
                path: '/user/signIn',
                name: 'signIn',
                element: <UserForm />,
                handle: { title: '登录' },
            },
            {
                // 忘记密码
                path: '/user/resetting',
                name: 'resetting',
                element: <UserForm />,
                handle: { title: '忘记密码' },
            },
        ],
    },
];

export default UserRoute;
