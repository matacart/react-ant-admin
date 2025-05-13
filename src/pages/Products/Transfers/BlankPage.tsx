import { Button } from 'antd';
import { history } from '@umijs/max';
import { ExportOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function BlankPage() {
    return(
        <Scoped>
            <div className='create-warp-flex' style={{ width: "100%" }}>
                <div className="create-warp">
                    <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>转移</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        <div className='create-content-flex'>
                            <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-product/20241118171828027/imgs/transfer-receipt-empty.fbead.svg"></img>
                            <h3>暂无库存转移数据</h3>
                            <div style={{visibility:"hidden"}}>你将在此处添加和管理采购单</div>
                            {/* <div style={{marginTop:"10px"}}></div> */}
                            <div>
                                <Button type="primary" style={{width:"218px",height:"44px",fontWeight:"600"}} onClick={()=>{
                                    // history.push('/products/categories/new')
                                }}>创建库存转移</Button>
                            </div>
                        </div>
                    </div>
                    <div className='create-footer'>
                        <span>详细了解 </span>
                        <span><a href='https://shoplineapphelp.zendesk.com/' target='_blank'>转移 <ExportOutlined /></a></span>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default BlankPage;

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
                // margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-content: center;
            .create-title-left{
                display: inline-block;
                h3 {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                margin: 0 24px 24px 0;
                overflow: hidden;
                color: #242833;
                font-size: 24px;
                font-weight: 600;
                line-height: 32px;
                margin-bottom: 41px;
                }
            }
            .create-title-right{
                display: inline-block;
            }
    
            }
            .create-content{
                position: relative;
                top: -10px;
                padding: 5px 24px;
                border-radius: 6px;
                width: 100%;
                background-color: white;
                .create-content-flex{
                    margin: 60px 0px;
                    text-align: center;
                    h3{
                        font-weight: 600;
                    }
                    div:nth-child(3){
                        margin-top: 12px;
                        font-size: 14px;
                    }
                    div:nth-child(4){
                        margin-top: 32px;
                        // font-size: 14px;
                    }
                }
            }
            .create-footer{
                font-size: 14px;
                text-align: center;
                margin-top: 24px;
            }
        }
    }
`
