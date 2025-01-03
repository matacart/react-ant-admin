import { Button } from 'antd';
import './BlankPage.scss';
import { history } from '@umijs/max';
import { ExportOutlined } from '@ant-design/icons';

function BlankPage() {
    return(
        <div className='blank-page'>
            <div className='create-warp-flex' style={{ width: "100%" }}>
                <div className="create-warp">
                    <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>采购订单</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        <div className='create-content-flex'>
                            <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-product/20241118171828027/imgs/purchase-empty.c0c86.svg"></img>
                            <h3>添加和管理你的采购单</h3>
                            <div>你将在此处添加和管理采购单</div>
                            <div>
                                <Button type="primary" style={{width:"218px",height:"44px",fontWeight:"600"}} onClick={()=>{
                                    history.push("/products/purchase_orders/new")
                                }}>创建采购订单</Button>
                            </div>
                        </div>
                    </div>
                    <div className='create-footer'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlankPage;

