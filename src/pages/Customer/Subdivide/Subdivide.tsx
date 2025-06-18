
import React, { useRef, useState } from 'react'
import { Button, Card, Dropdown, Flex, Input, Space, Table, TableProps } from 'antd';
import styled from 'styled-components'
import { SearchOutlined } from '@ant-design/icons';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';


interface DataType {
    key: string;
    name: string;
    age: string;
    time: string;
}

export default function Subdivide() {

  const navigate = useNavigate();

  const columns: TableProps<DataType>['columns'] = [
      {
          title: '细分名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
      },
      {
          title: '细分规模%',
          dataIndex: 'age',
          key: 'age',
      },
      {
          title: '更新时间',
          dataIndex: 'time',
          key: 'time',
      },
      {
          title: '操作人',
          dataIndex: 'time',
          key: 'time',
          render: (text) => <>MataCart</>,
      },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'High-value',
      age: "32%",
      time: '2024-01-01',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: "32%",
      time: '2024-01-01',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: "32%",
      time: '2024-01-01',
    },
  ];

    return (
        <Scoped>
          <div className='create-warp-flex' style={{
            width: "100%"
          }}>
              <div className="create-warp">
              <div className='create-title'>
                  <div className='create-title-left'>
                  <h3>细分</h3>
                  </div>
                  <div className="button-container">
                    <PrimaryButton text="创建细分" onClick={() => { navigate('/customer/persona/detail') }} />
                  </div>
              </div>
              <div className='create-content'>
                  <Input className='create-input' style={{height:"36px"}} prefix={<SearchOutlined />} placeholder='搜索细分' />
                  <div className='table-box'>
                    <Table<DataType> 
                      columns={columns} 
                      dataSource={data} 
                      onRow={(record, index)=>({
                        onClick: () => {
                          navigate(`/customer/persona/detail?currentTab=${record.key}`)
                        }
                      })}
                    />
                  </div>
              </div>
              </div>
          </div>
        {/* ?currentTab= */}
        </Scoped>
    )

}

const Scoped = styled.div`
  .create-warp-flex {
    width: 80%;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    .create-warp {
      width: 80%;
      min-width: 500px;
      .create-title {
        margin-bottom: 20px;
        color: #474f5e;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .create-title-left {
          display: inline-block;
          h3 {
            -webkit-box-flex: 1;
            margin-bottom: 0;
            -ms-flex: 1;
            flex: 1;
            overflow: hidden;
            color: #242833;
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
          }
        }
        .button-container {
          display: inline-block;
          justify-content: space-between;
        }
      }
      .create-content {
        position: relative;
        padding: 5px 24px;
        border-radius: 6px;
        width: 100%;
        background-color: white;
        .create-input{
            margin:20px 0;
            width: 480px;
        }

        .table-box{
            .ant-table{
                border: 1px solid #eef1f7;
                border-radius: 6px;
                border-bottom: none;
            }
        }
      }
    }
  }
`
















