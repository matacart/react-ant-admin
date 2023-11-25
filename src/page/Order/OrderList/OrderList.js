import MainHeader from '../../../component/MainHeader/MainHeader';
import MainContent from '../../../component/MainContent/MainContent';

const OrderList = () => {
    const data = {
        header: { title: '订单列表' },
        content: {
            header: {},
        },
    };

    return (
        <>
            <MainHeader {...data.header} />

            <MainContent />
        </>
    );
};

export default OrderList;
