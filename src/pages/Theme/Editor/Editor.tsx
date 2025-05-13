import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { useState } from 'react';
import Header from './Header';
import { Route } from 'react-router-dom';
import { Outlet } from '@umijs/max';

export default function Editor() {

    return <>
      <ProLayout
        style={{
          height: '100vh',
        }}
        collapsedButtonRender={false}
        collapsed
        layout="top"
        contentStyle={{padding: 0}}
        headerRender={()=>{
          return <Header />
        }}
      >
        <div style={{backgroundColor:"#eaedf1"}}>
          <Outlet />
        </div>
      </ProLayout>
    </>;
}