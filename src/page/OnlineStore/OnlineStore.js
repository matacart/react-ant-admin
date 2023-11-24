import { Tabs } from 'antd';

import Header from '../../component/MainHeader/MainHeader';
import MyTop from './Children/MyTopic/MyTopic';
import ThemeMall from './Children/ThemeMall/ThemeMall';

const OnlineStore = () => {
    const items = [
        {
            key: '1',
            label: '我的主题',
            children: <MyTop />,
        },
        {
            key: '2',
            label: '主题商城',
            children: <ThemeMall />,
        },
    ];

    return (
        <>
            <Header props={{ title: '店铺设计' }} />
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
};

export default OnlineStore;
