import { settingType } from "@/store/settings/notification/noticeEmail"
import { LockOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { ConfigProvider, Flex, InputNumber, InputNumberProps, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

const StyledInputNumber = styled(InputNumber)`
  .ant-input-number-input {
    text-align: center;
  }
  /* 禁用状态下的背景颜色 解决默认透明 */
  &.ant-input-number-outlined.ant-input-number-disabled {
    background-color: #f5f5f5 !important;
  }
  .ant-input-number-disabled .ant-input-number-input {
    background-color: #f5f5f5 !important;
  }
`;

const ScopedNumber = ({props}:{props:InputNumberProps})=><ConfigProvider
    theme={{
        token: {
            /* 这里是你的全局 token */
            borderRadius:4
        },
    }}
    >
    <StyledInputNumber {...props} style={{
        width:"80px"
    }} />
</ConfigProvider>


function LayoutItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {

    const intl = useIntl();
    
    const [value,setValue] = useState<any>({});
        
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);


    const onChangeLayout = (value:any) => {
        setValue(value);
        setSections(setting.id, { value: value });
    };
    
    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            <Flex className="layout-container" justify="center" align="center">
                <div className="layout-circle-line"></div>
                
                    {value?.pc?.lock ? <Tooltip placement="top" title={intl.formatMessage({id:'settings.notification.noticeEmail.right.layoutItem.unlock'})} arrow={false}>
                        <Flex className="layout-btn lock" align="center" justify="center" onClick={()=>onChangeLayout({
                            pc:{
                                ...value?.pc,
                                lock:false,
                            }
                        })}>
                            <LockOutlined />
                        </Flex>
                    </Tooltip> : <Tooltip placement="top" title={intl.formatMessage({id:'settings.notification.noticeEmail.right.layoutItem.lock'})} arrow={false}>
                        <Flex className="layout-btn unlock"  align="center" justify="center" onClick={()=>onChangeLayout({
                            pc:{
                                ...value?.pc,
                                right:value?.pc?.left || 0,
                                bottom:value?.pc?.top || 0,
                                lock:true,
                            }
                        })}>
                            <LockOutlined />
                        </Flex>
                    </Tooltip>}
                <div className="layout-top-input">
                    <ScopedNumber props={{min:0,max:500, value:value?.pc?.top || 0, onChange:(layoutValue:any)=>{
                        value?.pc?.lock ? onChangeLayout({
                            pc:{
                                ...value?.pc,
                                top:layoutValue,
                                bottom:layoutValue,
                            }
                        }) : onChangeLayout({
                            pc:{
                                ...value?.pc,
                                top:layoutValue,
                            }
                        })
                    }}} />
                </div>
                <div className="layout-right-input">
                    <ScopedNumber props={{min:0,max:500, value:value?.pc?.right || 0,disabled:value?.pc?.lock, onChange:(layoutValue:any)=>onChangeLayout({
                        pc:{
                            ...value?.pc,
                            right:layoutValue,
                        }
                    })}} />
                </div>
                <div className="layout-bottom-input">
                    <ScopedNumber props={{min:0,max:500, value:value?.pc?.bottom || 0,disabled:value?.pc?.lock, onChange:(layoutValue:any)=>onChangeLayout({
                        pc:{
                            ...value?.pc,
                            bottom:layoutValue,
                        }
                    })}} />
                </div>
                <div className="layout-left-input">
                    <ScopedNumber props={{min:0,max:500, value:value?.pc?.left || 0, onChange:(layoutValue:any)=>{
                        value?.pc?.lock ? onChangeLayout({
                            pc:{
                                ...value?.pc,
                                left:layoutValue,
                                right:layoutValue,
                            }
                        }) : onChangeLayout({
                            pc:{
                                ...value?.pc,
                                left:layoutValue,
                            }
                        })
                    }}} />
                </div>
            </Flex>
        </Scoped>
    )
}

export default LayoutItem

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
    .layout-container{
        height: 150px;
        margin-top: 8px;
        position: relative;
        .layout-circle-line{
            border: 1px solid #d7dbe7;
            border-radius: 4px;
            box-sizing: border-box;
            height: 120px;
            width: 192px;
        }
        .layout-top-input{
            left: 50%;
            top: 0;
            position: absolute;
            transform: translate(-50%);
        }
        .layout-right-input{
            position: absolute;
            z-index: 1;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .layout-bottom-input{
            position: absolute;
            z-index: 1;
            left: 50%;
            bottom: 0;
            transform: translate(-50%);
        }
        .layout-left-input{
            left: 0;
            top: 50%;
            position: absolute;
            transform: translateY(-50%);
        }
        .layout-btn{
            position: absolute;
            left: 50%;
            top: 50%;
            cursor: pointer;
            background-color: #fff;
            border-radius: 4px;
            height: 28px;
            width: 32px;
            transform: translate(-50%, -50%);
            transition: .5s;
            &:hover{
                background-color: #f7f8fb;
            }
        }
        .lock{
            background-color: #f0f7ff;
        }
    }
`
