import { Form, Divider, Button } from 'antd';
import MainHeader from '../../component/MainHeader/MainHeader';
import Content from './Content/Content';
import { useGetIntl } from '../../locales/utils';

const ProductsNew = () => {
    const getIntl = useGetIntl();
    const header = {
        title: getIntl.get('ProductNew_title'),
        goBack: true,
        href: '/admin/product',
        rButtonText: getIntl.get('ProductNew_rButton_text'),
        rButtonType: 'default',
    };

    /**
     * 创建商品事件
     */
    const createProduct = () => {};

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
                    <Button type="primary" onClick={createProduct}>
                        {getIntl.get('Create')}
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default ProductsNew;
