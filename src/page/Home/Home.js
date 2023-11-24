import { Button, Dropdown, Card } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './Home.scss';

const items = [
    {
        key: '1',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
            >
                3rd menu item
            </a>
        ),
    },
];

const Home = () => {
    const data = [
        {
            title: '装修网店',
            extra: (
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottom"
                    arrow
                >
                    <EllipsisOutlined className="more" />
                </Dropdown>
            ),
            children: <div className="cardWrapper">Home</div>,
        },
    ];

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="alert">
                <div className="text">
                    您的免费试用套餐已开启，为更好体验优质服务，建议您选购套餐
                </div>
                <Button type="primary">选择套餐</Button>
            </div>

            {data.map((item, index) => {
                return (
                    <Card
                        key={index}
                        title={item.title}
                        extra={item.extra}
                        bodyStyle={{ padding: 0 }}
                    >
                        {item.children}
                    </Card>
                );
            })}
        </div>
    );
};

export default Home;
