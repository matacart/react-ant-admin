import React from 'react';
import { Card, Divider, Form } from 'antd';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';


export default function CustomInformationEdit() {

  const onSearch = (value: string) => {
    console.log('Searched:', value);
  };

  return (
    <Scoped>
      <Card
        style={{ width: '300px' }}
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
            <div>   
                <p style={{fontSize:'16px',color:'#242833'}}>客户</p> 
                     <Search
              placeholder="搜索或创建客户"
              onSearch={onSearch}
              style={{ width: 250,  }} 
            />
                              </div>
                              </div>
        }
      >
 
    
      <Form>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#474F5E', justifyContent: 'space-between' }}>
                         <div><p style={{ fontSize: '14px', color: '#242833' }}>收获地址</p></div>
                         <button  style={{ fontSize: '14px', color: '#356DFF', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        编辑
                         </button>
                     </div>
                     <div style={{ fontSize: '14px',color: '#B8BECC',textAlign: 'left', }}>暂无地址 </div>
        </Form>
         <Divider/>
         <Form>
         <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#474F5E', justifyContent: 'space-between' }}>
                         <div><p style={{ fontSize: '14px', color: '#242833' }}>账单地址</p></div>
                         <button style={{ fontSize: '14px', color: '#356DFF', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        编辑
                         </button>
                     </div>
             <div style={{ fontSize: '14px',color: '#B8BECC',textAlign: 'left', }}>暂无地址 </div>
         </Form>
         </Card>
    </Scoped>
  );
}

const Scoped = styled.div`
  .ant-card {
    background-color: #f7f8fb;
  }

  .item {
    margin-bottom: 20px;
  }
`;