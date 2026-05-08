import MyButton from "@/components/Button/MyButton";
import { DataSourceIcon, LeftIcon } from "@/components/Icons/Icons";
import noticeEmail from "@/store/settings/notification/noticeEmail";
import { CheckCircleFilled } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { Drawer, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";


// 从 {{metafields.xxx}} 格式中提取 key
const extractKey = (str: string) => {
    if (!str) return "";
    const regex = /^\{\{metafields\.(.+)\}\}$/;
    const match = str.match(regex);
    return match ? match[1] : null;
};

// 动态源
const ImagePickerDataSource = ({url,variables,setUrl,rightRef}:{url:string,variables:any,setUrl:(key:string)=>void,rightRef:React.RefObject<HTMLDivElement>}) => {

    const intl = useIntl();
    
    const [options,setOptions] = useState<string[]>([]);

    const [open, setOpen] = useState(false);

    const [value,setValue] = useState<string>("");

    const cancel = ()=>{
        setOpen(false);
        setValue(extractKey(url) || "");
    }

    const submit = ()=>{
        setOpen(false);
        setUrl(value);
    }

    useEffect(()=>{
        const newOptions = variables?.map((key:string)=>{
            const value = noticeEmail.templateConfig?.usableVariable.find((item:any)=>item.key == key) || {};
            return {
                ...value,
                key:key,
            }
        }) || [];
        setOptions(newOptions);

        setValue(extractKey(url) || "");
    },[]);

    return (
        <>
            <div onClick={()=>setOpen(true)}>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePickerDataSource.replaceDataSource' })}</div>
            <MyDrawer
                getContainer={()=>rightRef.current!}
                width={296}
                closeIcon={null}
                title={
                    <Flex align="center" gap={2}>
                        <LeftIcon className="font-20 font-w-500 cursor-pointer" onClick={cancel} />
                        <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePickerDataSource.selectDataSource' })}</div>
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
                    <Flex gap={8} justify="flex-end">
                        <MyButton color="primary" variant="solid" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.imagePickerDataSource.complete' })} onClick={submit}/>
                    </Flex>
                }
            >
                <>
                    <div className="menu-box">
                        {options.map((item:any,index:number)=>(
                            <Flex key={index} className="menu-item" justify="space-between" align="center" onClick={()=>{
                                setValue(item?.key || "");
                            }}>
                                {item?.name}
                                {item?.key == value && <CheckCircleFilled className="color-356DFF font-16" />}
                            </Flex>
                        ))}
                    </div>
                </>
            </MyDrawer>
        </>
    )
};

export default observer(ImagePickerDataSource);

const MyDrawer = styled(Drawer)({
});
