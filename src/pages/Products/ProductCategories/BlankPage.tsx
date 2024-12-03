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
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>分类</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        <div className='create-content-flex'>
                            <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-product/20241118171828027/imgs/category-empty.7d02c.svg"></img>
                            <h3>管理和新建前台商品分类</h3>
                            <div>合适的分类能帮助客户更快找到商品。</div>
                            <div>
                                <Button type="primary" style={{width:"218px",height:"44px",fontWeight:"600"}} onClick={()=>{
                                    history.push('/products/categories/new')
                                }}>新建商品分类</Button>
                            </div>
                        </div>
                    </div>
                    <div className='create-footer'>
                        <span>详细了解 </span>
                        <span><a href='https://shoplineapphelp.zendesk.com/' target='_blank'>分类 <ExportOutlined /></a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlankPage;

