import { Card, Form, Input } from "antd";
import newStore from '@/store/newStore'
import React from 'react';
import { Dropdown,MenuProps, message, Space,Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { observer } from "mobx-react-lite";

import { request } from '@umijs/max';


import TinymceEditor from "@/components/MCE/TinymceEditor";
// import function from './../../User/Login';
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};



// 百度翻译请求




// 根据内容转换成相应的文字
// 1 -- 简体中文
function switchLanguage(key:number){

    // request('/api/user', {
    //     timeout: 2000,
    //     // other axios options
    //     skipErrorHandler: true,
    //     getResponse: false,
    //     requestInterceptors: [],
    //     responseInterceptors: [],
    // })
    
    // // 获取内容
    // const title = newStore.title
    // const resume = newStore.resume
    // const desc = newStore.desc


    
    // function getContent(start, end) {
    //     let arr = [];
    //     for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
    //       arr.push(String.fromCharCode(i));
    //     }
    //     return arr;
    //   }

    // ID 20241101002191964
    // NHfskl2aYaI2Z9ymBIwO


    // const ID = "20241101002191964"
    // const my = "NHfskl2aYaI2Z9ymBIwO"

    // let title_url = "20241101002191964"+title+


    




    // console.log(newStore.title)
    // console.log(newStore.resume)
    // console.log(newStore.desc)



    // switch (key) {
    //     case 1:
    //         return '简体中文'
    //     case 2:
    //         return 'E'
    //     case 3:
    //         return '简体中文'
    //     case 4:
    //         return '简体中文'
    //     case 5:
    //         return '简体中文'
    // }
}

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={()=>{
            switchLanguage(1)
        }}>简体中文</span>
      )
    },
    {
      key: '2',
      label: (
        <span onClick={()=>{console.log(111)}}>English</span>
      )
    },
    {
        key: '3',
        label: (
          <span onClick={()=>{console.log(111)}}>Japan</span>
        )
    },
    {
        key: '4',
        label: (
          <span onClick={()=>{console.log(111)}}>한국어</span>
        )
    },
    {
        key: '5',
        label: (
          <span onClick={()=>{console.log(111)}}>繁體中文</span>
        )
    },
];





const {TextArea} = Input
function ProductDataCard() {
    return (
        
        <Card title="商品信息" className='product-data-card' extra={<Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
        <Button>语言</Button>
      </Dropdown>}>
            <Form layout='vertical' className='product-form'>
                <Form.Item
                name="title"
                required
                label="商品标题"
                    rules={[
                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('请输入商品标题')) },
                    ]}
                >
                    <Input 
                    onChange={(e) => {
                        newStore.setTitle(e.target.value);
                    }}
                    placeholder="例如：冬季，毛衣" />
                </Form.Item>
                <Form.Item 
                name="resume"
                required
                label='商品摘要'>
                    <TextArea showCount maxLength={400} onBlur={(e)=>{
                        newStore.resume=e.target.value;
                    }}
                        style={{
                            resize: 'none'
                        }}
                        value={newStore.resume}
                        placeholder='请用简短的文字描述本商品'
                    >
                    </TextArea>
                </Form.Item>
                <Form.Item label='商品描述'>
                    {/* 富文本编辑器 */}
                    <TinymceEditor/>
                </Form.Item>
            </Form>


        </Card>
    )
}

export default observer(ProductDataCard);