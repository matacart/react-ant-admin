import { ArrowLeftOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Dropdown, Flex, Form, Input, MenuProps, message, Select, Space } from 'antd'
import styled from 'styled-components';
import { history } from '@umijs/max';

import { UnfoldIcon } from '@/components/Icons/Icons';
import WarningTag from '@/components/Tag/WarningTag';
import ScreeningConditionCard from './ScreeningConditionCard';
import CustomerListCard from "../../Components/CustomerListCard"


function SubdivideAdd(){

  const aItems: MenuProps['items'] = [
    {
      key: '1',
      label:"本地导入",

    },
    {
      key: '2',
      label: "shopify表格导入",
    },
    {
      key: '3',
      label: "店铺搬迁导入",
    }
  ];


  return (
      <Scoped>
          <div className='mc-layout-wrap'>
              <div className="mc-layout">
                  <div className="mc-header">
                      <div className="mc-header-left">
                          <div className="mc-header-left-secondary" onClick={()=>{
                              history.push('/customer/persona/list')
                          }}>
                            <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                          </div>
                          <Flex align='center' className="mc-header-left-content">
                            <div style={{marginRight:"4px"}}>客户细分：新建细分</div>
                            <WarningTag text='草稿' />
                          </Flex>
                      </div>
                      <div className='mc-header-right' >
                        <Flex style={{ fontSize:"14px",marginRight:"24px" }}>
                          <Dropdown disabled menu={{ items: aItems }} trigger={['click']}>
                            <Flex style={{cursor:"not-allowed"}} className='cursor-pointer'>
                              <div style={{marginRight:"8px"}}><ImportOutlined /></div>
                              <Space>
                                导入
                              </Space>
                              <UnfoldIcon />
                            </Flex>
                          </Dropdown>
                          <Flex style={{marginLeft:"12px",cursor:"not-allowed"}} onClick={()=>{}}>
                              <div style={{marginRight:"8px"}}><ExportOutlined /></div>
                              <div>导出</div>
                          </Flex>
                        </Flex>
                        <Button
                          disabled
                          style={{
                            backgroundColor: 'WHITE',
                            marginRight: '12px',
                            height: "36px",
                            fontSize: "14px",
                          }}>
                          使用细分
                        </Button>
                        <Button
                          disabled
                          type="primary"
                          style={{ height: "36px", fontSize: "14px" }}
                        >
                          添加客户
                        </Button>
                      </div>
                  </div>
                  <div className='mc-layout-main'>
                      <div className='mc-layout-content'>
                        <ScreeningConditionCard />
                        <CustomerListCard />
                      </div>
                  </div>
                  {/* <Divider/>
                  <div className='mc-footer'>
                      <Button type='primary' onClick={async ()=>{
                      }}>创建</Button>
                  </div> */}
              </div>
          </div>
      </Scoped>
  )
}

export default SubdivideAdd

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
                    margin-left: 12px;
                    font-size: 20px;
                }
            }

            &-right {
              display: flex;
              align-items: center;
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
            gap:20px

        }
    }
}
`