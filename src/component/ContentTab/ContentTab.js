import { Tabs } from 'antd';
import './ContentTab.scss';

const ContentTab = ({ items }) => {
    const onChange = key => {
        console.log(key);
    };

    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            size="large"
        />
    );
};

export default ContentTab;
