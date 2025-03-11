import { Button, Card, Flex, Form, Input, message, Modal, Select } from 'antd';
import { history } from '@umijs/max';
import { ArrowLeftOutlined, ExportOutlined, InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { creatAppStore, getEmployeeList } from '@/services/y2/api';
import Rules from './../../../Settings/Rules/Rules';
import LicensesAndTerms from './LicensesAndTerms';

function BlankPage() {

    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const [employeeList,setEmployeeList] = useState();

    const createApp = () => {
        form.validateFields().then((values) => {
            // console.log(values);
            setIsModalOpen(false)
            // 提交表单
            creatAppStore(values).then(res=>{
                console.log(res)
                res.code == 0 && message.success("创建应用成功");
            })

        }).catch((errorInfo)=>{
            // console.log(errorInfo)
        }) 
       
        
    }

    useEffect(()=>{
        getEmployeeList().then(res=>{
            const newEmployeeList = res.data.map(item=>{
                return {
                    label:"员工("+item.id+")",
                    value:item.id
                }
            })
            setEmployeeList(newEmployeeList)
        })
    },[])

    return(
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/app-store")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">开发应用</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card>
                                <div className='create-content-flex'>
                                    <img src="https://s2cdn.myshopline.com/fe-files/2022/10/10/385812/addCunstomApp.svg"></img>
                                    <h3 className='font-20'>创建自定义应用</h3>
                                    <div style={{marginTop:"20px"}} className='color-7A8499'>将您商店的数据与外部服务集成或开发自定义店面。<br />开发应用需遵守《<a>API 许可和使用条款</a>》</div>
                                    <div>
                                        <Button type="primary" style={{width:"218px",height:"44px",fontWeight:"600"}} className='font-16' onClick={()=>setIsModalOpen(true)}>创建应用</Button>
                                    </div>
                                </div>
                            </Card>
                            <LicensesAndTerms />
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <Modal title="创建应用" width={620} centered open={isModalOpen} onOk={createApp} onCancel={()=>setIsModalOpen(false)} okText="创建应用">
                <Form form={form} style={{margin:"30px 0 40px 0"}} layout='vertical'>
                    <Form.Item label="应用名称" name="name" rules={[{required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请填写应用名称</div>}]}>
                        <Input placeholder="请填写应用名称" />
                    </Form.Item>
                    <Form.Item label="应用开发者" name="developer" rules={[
                        {required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请选择应用开发者</div>},
                    ]}>
                        <Select placeholder="请选择应用开发者" options={employeeList}  />
                    </Form.Item>
                    <Form.Item label="应用联系人邮箱" name="email" rules={[
                        {required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请填写应用联系人邮箱</div>},
                        { type: 'email', message: <div className='font-12' style={{marginBottom:"20px"}}>请填写正确的邮箱地址</div>},
                    ]}>
                        <Input placeholder="请填写应用联系人邮箱" />
                    </Form.Item>
                    {/* <Form.Item label="应用描述" name="email" rules={[
                        {required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请填写应用描述</div>},
                    ]}>
                        <Input placeholder="请填写应用描述" />
                    </Form.Item> */}
                </Form>
            </Modal>
        </Scoped>
        
    )
}

export default BlankPage;

const Scoped = styled.div`


.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    /* display: flex; */
                    margin-left: 12px;
                    font-size: 20px;

                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
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
            .tips{
                border: 1px solid rgba(53, 109, 255, .2);
                background-color: #e2f0ff;
                padding: 16px 16px;
                border-radius: 4px;
            }

        }
        /* &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        } */
      
    }
}

    /* .blank-page{
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
    } */
`
