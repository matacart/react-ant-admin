import { Drawer, Flex } from "antd"
import styled from "styled-components"
import MyButton from "@/components/Button/MyButton";
import MyInput from "@/components/Input/MyInput";
import { LeftIcon, SearchSecondIcon } from "@/components/Icons/Icons";
import { useEffect, useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import fontFamilyList from "@/../public/json/fontFamily.json";


function FontPicker({data}:{data:any}) {

    const intl = useIntl();
    
    const [open, setOpen] = useState(false);

    const [fontFamily,setFontFamily] = useState<string>("");

    const cancel = ()=>{
        setOpen(false);
    }

    const submit = ()=>{
        
        setOpen(false);
    }

    const setDefaultFontFamily = ()=>{
    }


    useEffect(()=>{
        setFontFamily(data?.name);
    },[]);

    return (
        <Scoped>
            <div className="content">
                <div style={{fontFamily:fontFamily}}>{fontFamily == "inherit" ? intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.fontFamily' }) : fontFamily}</div>
                <Flex gap={12} className="btn-box">
                    <MyButton className="btn" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.setDefault' })} onClick={setDefaultFontFamily} />
                    <MyButton className="btn" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.replace' })} onClick={()=>setOpen(true)} />
                </Flex>
            </div>
            {/* 字体选择器 */}
            <Drawer
                // getContainer={()=>rightRef.current!}
                width={296}
                closeIcon={null}
                title={
                    <Flex align="center" gap={2}>
                        <LeftIcon className="font-20 font-w-500 cursor-pointer" onClick={cancel} />
                        <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.title' })}</div>
                    </Flex>
                }
                mask={false}
                open={open}
                rootStyle={{
                    position:"absolute"
                }}
                className="my-drawer"
                classNames={{
                    header:"my-drawer-header",
                    body:"my-drawer-content"
                }}
                onClose={cancel}
                footer={
                    <Flex justify="space-between" align="center" gap={20}>
                        <div style={{flex:1}}>
                            <div style={{fontFamily:fontFamily}}>{fontFamily == "inherit" ? intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.fontFamily' }) : fontFamily}</div>
                        </div>
                        <Flex gap={8}>
                            <MyButton color="primary" variant="solid" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.submit' })} onClick={submit}/>
                        </Flex>
                    </Flex>
                }
            >
                <>
                    <Flex style={{padding: '12px'}}>
                        <MyInput placeholder={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.search' })} suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    <div className="menu-box">
                        {fontFamilyList.map((item:any,index:number)=>(
                            <Flex key={index} className="menu-item" justify="space-between" align="center" onClick={()=>{
                                
                            }}>
                                {item.label == "inherit" ? intl.formatMessage({ id: 'settings.notification.noticeEmail.right.fontPickerComponent.fontFamily' }) : item.label}
                                {item.value == fontFamily && <CheckCircleFilled className="color-356DFF font-16" />}
                            </Flex>
                        ))}
                    </div>
                </>
            </Drawer>
        </Scoped>
    )
}

export default FontPicker

const Scoped = styled.div`
    .content{
        padding: 16px;
        border-radius: 4px;
        background: #f7f8fb;
        border: 1px dashed #d7dbe7;
        .btn-box{
            margin-top: 10px;
            .btn{
                height: 36px;
                flex:1;
            }
        }
    }
`
