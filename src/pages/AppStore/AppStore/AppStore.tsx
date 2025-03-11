
import React, { useRef, useState } from 'react'
import { Button, Dropdown, Flex, Space } from 'antd';
import { Tabs } from 'antd'
import styled from 'styled-components'
import Icon, { ExportOutlined, ImportOutlined, ShopOutlined } from '@ant-design/icons'; 
import { history } from '@umijs/max';
import {useIntl, useModel } from '@umijs/max';
import MyAppsCard from './MyAppsCard';
import RecommendedAppsCard from './RecommendedAppsCard';

export default function MyApps() {

  return (
    <Scoped>
      <div className='create-warp-flex' style={{
        width: "100%"
      }}>
        <div className="create-warp">
          <div className='create-title'>
            <div className='create-title-left'>
              <h3 style={{
                position: 'relative',
                top: 10,
                display: 'inline-block',
              }}>我的应用</h3>
            </div>
            <div className="button-container">
              <Button 
                onClick={() => { history.push('/app-store/custom-app') }}
                style={{
                  backgroundColor: 'WHITE',
                  marginRight: '12px',
                  width: "90px", height: "36px", fontSize: "14px",
                }}>
                开发应用
              </Button>
              <Button 
                type="primary"
                icon={<ShopOutlined />}
                onClick={() => { window.open('https://www.handingyun.cn/appstore') }}
                style={{ height: "36px", fontSize: "14px" }}
              >
                前往应用市场
              </Button>
            </div>
          </div>
          <div style={{height:"20px"}}></div>
          <div className='create-content'>
              <MyAppsCard />
              <div className='font-20 color-242833 font-w-600' style={{margin:"60px 0 20px 0"}}>推荐应用</div>
              <RecommendedAppsCard />
          </div>
        </div>
      </div>
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
        padding-bottom: 0px;
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
            -ms-flex: 1;
            flex: 1;
            margin: 0 24px 24px 0;
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
    }
  }
`
















