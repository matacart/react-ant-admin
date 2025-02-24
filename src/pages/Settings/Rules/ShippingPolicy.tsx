import TinyMce from "@/components/MCE/TinyMce";
import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Dropdown, Flex, MenuProps, Space } from "antd";
import { useState } from "react";
import styled from "styled-components";


const JapaneseTemplate = `
    
`
const englishTemplate = `

`

function ShippingPolicy() {

    const [refundPolicyText,setRefundPolicyText] = useState("")

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div onClick={()=>setRefundPolicyText(englishTemplate)}>创建英文模版</div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={()=>setRefundPolicyText(JapaneseTemplate)}>创建日文模版</div>
          ),
        },
    ];
    

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600" style={{ marginBottom: 16 }}>发货政策</div>
                <TinyMce refundPolicyText={refundPolicyText} />
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

export default ShippingPolicy

const Scoped = styled.div`
    margin-bottom: 20px;
`
