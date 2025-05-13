import { Button, Checkbox, Divider, Flex, Modal } from 'antd';
import { history } from '@umijs/max';
import { ExclamationCircleOutlined, ExportOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import UploadImportDrag from '@/components/UploadFile/UploadImportDrag';

function BlankPage() {

    const [modal, contextHolder] = Modal.useModal();

    // 
    const confirmExcel = () => {
        modal.confirm({
            width:620,
            title: '导入客户',
            icon: <></>,
            centered:true,
            destroyOnClose:true,
            content: <>
                <div style={{margin:"8px 0px"}}>下载<a style={{margin:"0 8px"}}>批量导入模板</a>以查看所需格式的示例。若表格导入出现问题，可查看<a style={{margin:"0 8px"}}>常见问题</a></div>
                <div>
                    <UploadImportDrag size={10} />
                </div>
                <div style={{margin:"8px 0px"}}>支持 .xlsx，.xls，.csv 格式文件，大小不能超过10M</div>
                <div style={{margin:"8px 0px"}}>
                    <Checkbox>覆盖拥有相同邮箱或电话的现有客户</Checkbox>
                    {/* <span></span> */}
                </div>
            </>,
            okText: '上传并导入',
            cancelText: '取消',
        });
    };

    const confirmShopify = () => {
        modal.confirm({
          title: '通过Shopify csv批量导入客户',
          width:620,
          centered:true,
          icon: <></>,
          content: <>
                <div style={{margin:"8px 0px"}}>下载<a style={{margin:"0 8px"}}>批量导入模板</a>以查看所需格式的示例。若表格导入出现问题，可查看<a style={{margin:"0 8px"}}>常见问题</a></div>
                <div>
                    <UploadImportDrag size={10} />
                </div>
                <div style={{margin:"8px 0px"}}>支持 .xlsx，.xls，.csv 格式文件，大小不能超过10M</div>
                <div style={{margin:"8px 0px"}}>
                    <Checkbox>覆盖拥有相同邮箱或电话的现有客户</Checkbox>
                    {/* <span></span> */}
                </div>
            </>,
          okText: '上传并导入',
          cancelText: '取消',
        });
    };

    const confirmStoreRelocation = () => {
        modal.confirm({
          title: '店铺搬迁',
          centered:true,
          icon: <></>,
          content: '暂不支持',
          okText: '确认',
          cancelText: '取消',
        });
    };

    return(
        <Scoped>
            <div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>客户</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        <div className='create-content-flex'>
                            <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-product/20241118171828027/imgs/purchase-empty.c0c86.svg"></img>
                            <h3>添加和管理你的客户</h3>
                            <div>在此添加和管理注册或下单的客户，你也可直接导入客户</div>
                            <div>
                                <Button type="primary" style={{width:"218px",height:"44px",fontWeight:"600"}} onClick={()=>{
                                    // history.push('/products/categories/new')
                                    history.push('/customer/management/operate/add')
                                }}>添加客户</Button>
                            </div>
                            <Divider plain style={{margin:"30px 0"}}>批量导入客户</Divider>
                            <Flex gap="40px">
                                <div className='controls color-474F5E font-14' onClick={confirmExcel}>
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/import-local.40c0b.svg"></img>
                                    <div className='controls-text'>通过Excel批量导入</div>
                                </div>
                                <div className='controls color-474F5E font-14' onClick={confirmShopify}>
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/import-shopify.92922.svg"></img>
                                    <div className='controls-text'>导入Shopify客户</div>
                                </div>
                                <div className='controls color-474F5E font-14' onClick={confirmStoreRelocation}>
                                    <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/import-relocation.50ea3.svg"></img>
                                    <div className='controls-text'>店铺搬迁导入</div>
                                </div>
                            </Flex>
                        </div>
                    </div>
                    <div className='create-footer'>
                    </div>
                </div>
            </div>
            {/* Excel批量导入 */}
            {contextHolder}
        </Scoped>
        
    )
}

export default BlankPage;

const Scoped = styled.div`
    .create-warp-flex{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
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
                    margin: 60px 40px;
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
                    .controls{
                        flex:1;
                        background-color: #f5f5f5;
                        padding: 24px 24px;
                        cursor: pointer;
                        img{
                            width: 40px;
                            height: 40px;
                        }
                        .controls-text{
                            margin-top: 20px;
                        }
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

