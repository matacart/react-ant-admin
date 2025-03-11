import { Button, Card, Divider, Flex, Input, Radio, RadioChangeEvent } from "antd"
import { useState } from "react";
import styled from "styled-components"

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

function SwitchingTemplateCard(){

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return (
        <Scoped>
            <Card>
                <div style={{marginBottom:"20px"}}>切换模版</div>
                <div>
                    <Radio.Group
                        className="radio-group"
                        style={style}
                        block
                        onChange={onChange}
                        value={value}
                        options={[
                            { value: 1, label: <Flex justify="space-between" style={{width:"100%"}}>
                                <div>我的模板</div>
                                <div className="color-356DFF cursor-pointe">编辑</div>
                            </Flex>
                            },
                            { value: 2, label: <Flex justify="space-between" style={{width:"100%"}}>
                                <div>我的模板2</div>
                                <div className="color-356DFF cursor-pointe">编辑</div>
                            </Flex>
                            },
                            { value: 3, label: <Flex justify="space-between" style={{width:"100%"}}>
                                <div>我的模板3</div>
                                <div className="color-356DFF cursor-pointe">编辑</div>
                            </Flex>
                            },
                        ]}
                    />
                </div>
                <Divider className="divider" />
                <Button style={{height:"36px"}}>管理模板</Button>
            </Card>
        </Scoped>
    )

}

export default SwitchingTemplateCard

const Scoped = styled.div`
    flex: 1;

    .radio-group{
        :where(.css-dev-only-do-not-override-no4izc).ant-radio-wrapper-block{
            justify-content: flex-start;
        }
    }
    .ant-radio-wrapper>span:last-child{
        display: block;
        width: 100%;
    }

    .divider{
        margin: 16px 0;
    }
    
`
    