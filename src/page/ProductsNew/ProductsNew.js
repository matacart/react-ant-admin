import { Form, Divider, Button } from 'antd';
import MainHeader from '../../component/MainHeader/MainHeader';
import Content from './Content/Content';

const ProductsNew = () => {
    const header = {
        title: '添加商品',
        goBack: true,
        href: '/admin/product',
        rButtonText: '预览',
        rButtonType: 'default',
    };

    return (
        <>
            <Form
                name="trigger"
                style={{
                    width: '100%',
                    maxWidth: 1200,
                }}
                autoComplete="off"
            >
                <MainHeader {...header} />

                <Content />

                <Divider />

                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button type="primary">创建</Button>
                </div>
            </Form>
        </>
    );
};

export default ProductsNew;
