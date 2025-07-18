import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import Header from './Header';
import { Route } from 'react-router-dom';
import Left from './Left/Left';
import Right from './Right.tsx/Right';
import { Flex, Spin } from 'antd';
import styled from 'styled-components';

import home from "./data/InstalledSections/home.json"
import editor from '@/store/theme/editor';
export default function Editor() {


    useEffect(() => {
      // 获取组件数据
      editor.setTemplateData(home.data)
    }, [])

    return <Scoped>
      {/* header */}
      <Header />
      <Flex>
        {/* left */}
        <div className="left">
          <Left />
        </div>
        <div className="center">
            <div className="viewBox">
              <iframe src="/theme/preview?themeId=10011&&page=index" width="100%" height="100%" style={{border:"0"}} />
            </div>
        </div>
        {/* right */}
        <div className="right">
            <Right />
        </div>
      </Flex>
    </Scoped>
}

const Scoped = styled.div`

  .left{
    width: 372px;
    height: 100%;
  }
  .center{
    flex: 1;
    box-sizing: border-box;
    .viewBox{
        margin: 16px;
        background-color: #FFF;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, .1), 0 4px 20px 0 rgba(0, 0, 0, .15);
        height: calc(100% - 32px);
        .ant-spin-nested-loading{
            height: 100%;
            .ant-spin-container{
                height: 100%;
            }
        }
    }
  }
  .right{
    width: 320px;
    height: 100%;
  }
`;