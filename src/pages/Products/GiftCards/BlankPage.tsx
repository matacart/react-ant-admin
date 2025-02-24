import { Button, Flex } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { history } from '@umijs/max';

function BlankPage() {
    return(
        <Scoped>
            <div className='blank-page'>
                <div className='create-warp-flex' style={{ width: "100%" }}>
                    <div className="create-warp">
                        <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>礼品卡</h3>
                            </div>
                        </div>
                        <div className='create-content'>
                            <div className='create-content-flex'>
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-product/20250219163709492/imgs/EmptyIcon.7b9d4.svg"></img>
                                <h3>创建和发放礼品卡</h3>
                                <div style={{marginTop:"20px"}}>你可在此处创建或直接发放礼品卡，以吸引更多客户并增加网站流量</div>
                                <Flex justify='center' gap={20}>
                                    <Button type="primary" className='font-14' style={{width:"200px",height:"46px",fontWeight:"600"}} onClick={()=>{
                                        // history.push('/products/gift-cards-products/new')
                                    }}>创建礼品卡商品</Button>
                                    <Button className='font-14' style={{width:"200px",height:"46px",fontWeight:"600"}} onClick={()=>{
                                        history.push('/products/gift-cards/new')
                                    }}>发放礼品卡</Button>
                                </Flex>
                            </div>
                        </div>
                        <div className='create-footer'>
                            <span>详细了解 </span>
                            <span><a href='https://shoplineapphelp.zendesk.com/' target='_blank'>礼品卡 <ExportOutlined /></a></span>
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default BlankPage;

const Scoped = styled.div`
    .blank-page{
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
                            height: 500px;
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
    }
`




