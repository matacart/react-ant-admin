import TinyMce from "@/components/MCE/TinyMce";
import rules from "@/store/settings/rules";
import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Dropdown, Flex, MenuProps, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";


const JapaneseTemplate = `
    
`
const englishTemplate = `

`

function ShippingPolicy() {

    const setContent = (content:string)=>{
        rules.setShippingPolicy({
            ...rules.shippingPolicy,
            content:content
        })
    }

    // const items: MenuProps['items'] = [
    //     {
    //       key: '1',
    //       label: (
    //         <div onClick={()=>setContent(englishTemplate)}>创建英文模版</div>
    //       ),
    //     },
    //     {
    //       key: '2',
    //       label: (
    //         <div onClick={()=>setContent(JapaneseTemplate)}>创建日文模版</div>
    //       ),
    //     },
    // ];
    

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600" style={{ marginBottom: 16 }}>发货政策</div>
                <TinyMce content={rules.shippingPolicy.content??""} setContent={setContent} />
                {/* <div style={{marginTop:8}}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button style={{height:36}}>
                            <Space>
                                替换为模板
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div> */}
            </Card>
        </Scoped>
    )
}

export default observer(ShippingPolicy)

const Scoped = styled.div`
    margin-bottom: 20px;
`
