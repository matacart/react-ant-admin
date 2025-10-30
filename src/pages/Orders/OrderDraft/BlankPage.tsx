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
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>草稿单</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        <div className='create-content-flex'>
                            <img src="/img/blank/empty.order.png"></img>
                            <h3>管理你创建的草稿订单</h3>
                            <div>可将草稿订单发送给客户，当客户完成结账或你完成收款后将成为正式订单。</div>
                            <div>
                                <Button type="primary" className='font-14 font-w-600' style={{width:"218px",height:"44px"}} onClick={()=>{
                                    history.push('/orders/draftOrders/add')
                                }}>创建订单</Button>
                            </div>
                        </div>
                    </div>
                    <div className='create-footer'>
                        <span>详细了解 </span>
                        <span><a href='http://help.handingyun.cn/' target='_blank'>草稿单 <ExportOutlined /></a></span>
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
                    margin: 120px 0px;
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
