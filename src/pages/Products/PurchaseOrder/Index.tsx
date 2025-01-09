import { Button, Tabs } from 'antd';
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ProductsSelectCard from '@/components/Card/ProductsSelectCard';
import { history } from '@umijs/max';
import SelectCard from './List/SelectCard';
import purchaseOrderStore from '@/store/product/purchaseOrder/purchaseOrderStore';
import { observer } from 'mobx-react-lite';


const TabLabel = styled.div`
    font-size: 16px;
`;

function Index() {

    const items = [
        {
            label: <TabLabel>全部</TabLabel>,
            children: (<SelectCard/>),
            key: '-1',
            closable: false,
        },
        {
            label: <TabLabel>草稿</TabLabel>,
            children:  (<SelectCard/>),
            key: '1',
            closable: false,
        },
        {
            label: <TabLabel>已订购</TabLabel>,
            children:  (<SelectCard/>),
            key: '2',
            closable: false,
        },
        {
            label: <TabLabel>部分收货</TabLabel>,
            children:  (<SelectCard/>),
            key: '3',
            closable: false,
        },
        {
            label: <TabLabel>收货完成</TabLabel>,
            children:  (<SelectCard/>),
            key: '4',
            closable: false,
        },
        {
            label: <TabLabel>已关闭</TabLabel>,
            children:  (<SelectCard/>),
            key: '0',
            closable: false,
        }
    ];

    return(
        <Scoped>
            <div className='create-warp-flex' style={{ width: "100%" }}>
                <div className="create-warp">
                    <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>采购订单</h3>
                    </div>
                    <div className='create-title-right'>
                        <Button type="primary" onClick={() => { history.push('/products/purchase_orders/new') }} style={{ marginTop: "10px", height: "36px", fontSize: "14px" }}>创建采购订单</Button>
                    </div>
                    </div>
                    <div className='create-content'>
                        <Tabs
                            onChange={(activeKey)=>{
                                console.log(activeKey)
                                // purchaseOrderStore.setTagsStatus(activeKey)
                                switch (activeKey) {
                                    case '-1':
                                        purchaseOrderStore.setTagsStatus("")
                                        break;
                                    case '1':
                                        purchaseOrderStore.setTagsStatus("草稿")
                                        break;
                                    case '2':
                                        purchaseOrderStore.setTagsStatus("已订购")
                                        break;
                                    case '3':
                                        purchaseOrderStore.setTagsStatus("部分收货")
                                        break;
                                    case '4':
                                        purchaseOrderStore.setTagsStatus("部分收货")
                                        break;
                                }
                            }}
                            // activeKey={activeKey}
                            // onEdit={onEdit}
                            items={items}
                            // !默认不销毁
                            // destroyInactiveTabPane
                            // tabBarExtraContent={operations}
                        />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(Index);


const Scoped = styled.div`
    .create-warp-flex{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #474f5e;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        .create-warp{
            width: 100%;
            min-width: 500px;
            .create-title{
                padding-bottom: 0px;
                color: #474f5e;
                font-size: 14px;
                line-height: 20px;
                display: flex;
                justify-content: space-between;
                align-content: center;
                .create-title-left{
                    display: inline-block;
                    h3{
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        margin: 0 24px 24px 0;
                        overflow: hidden;
                        color: #242833;
                        font-size: 24px;
                        font-weight: 600;
                        line-height: 32px;
                    }
                }
                .create-title-right{
                    display: inline-block;
        
                }
            }
            .create-content{
                position: relative;
                top: 10px;
                padding: 5px 24px;
                border-radius: 6px;
                width: 100%;
                background-color: white;
                
            }
        }
    }
`



