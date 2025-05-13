
import React, { useEffect, useRef, useState } from 'react'
import { Flex, Modal, Space, Upload } from 'antd';
import styled from 'styled-components'
import Icon, { ExportOutlined } from '@ant-design/icons';
import RecallOrderTabs from './RecallOrderTabs';
interface MenuItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void; // 可选的点击事件处理函数
}

interface MenuProps {
  items: MenuItem[];
}

export default function RecallOrders() {

  useEffect(() => {
  }, []);

  return (
    <Scoped>
      <div className="create-warp-flex" style={{ width: "100%" }}>
        <div className="create-warp">
          <div className="create-title">
            <Flex className="create-title-left" align='center' gap={12}>
              <h3>
                弃单
              </h3>
              <div style={{paddingTop:"4px"}}>
                <a style={{ color: '#242833' }}>
                    <ExportOutlined style={{marginRight:"6px"}} />
                    <Space>导出弃单</Space>
                </a>
              </div>
            </Flex>
          </div>
          <div className="create-content">
            <div>
              <RecallOrderTabs />
            </div>
          </div>
        </div>
      </div>
    </Scoped>
  );
}


const Scoped = styled.div`
  .create-warp-flex {
    width: 100%;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    .create-warp {
      width: 100%;
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
          /* display: inline-block; */
          h3 {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin-bottom: 0;
            /* margin: 0 24px 24px 0; */
            overflow: hidden;
            color: #242833;
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
          }
        }
      }
      .create-content {
        padding: 5px 24px;
        border-radius: 6px;
        width: 100%;
        background-color: white;
      }
  
      .DynamicTabs{
        font-size: 18px;
      }
     
  
    }
  }
`