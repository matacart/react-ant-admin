import MyButton from "@/components/Button/MyButton";
import { DataSourceIcon, LeftIcon } from "@/components/Icons/Icons";
import noticeEmail from "@/store/settings/notification/noticeEmail";
import { CheckCircleFilled } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { Drawer, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";

// 动态源
const DataSource = forwardRef(({variables,rightRef,setVariable}:{variables:any,rightRef:React.RefObject<HTMLDivElement>,setVariable:(key:string)=>void},ref) => {

    const intl = useIntl();
    
    const [options,setOptions] = useState<string[]>([]);

    const [open, setOpen] = useState(false);

    const [value,setValue] = useState<string>("");

    useImperativeHandle(ref, () => ({
        openWithValue: (initialValue: string) => {
            setValue(initialValue);
            setOpen(true);
        }
    }));

    const cancel = ()=>{
        setOpen(false);
        setValue("");
    }

    const submit = ()=>{
        setOpen(false);
        setVariable(value);
        setValue("");
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
    },[]);

    return (
        <>
            <DataSourceIcon className="font-20 cursor-pointer" onClick={()=>setOpen(true)} />
            <MyDrawer
                getContainer={()=>rightRef.current!}
                width={296}
                closeIcon={null}
                title={
                    <Flex align="center" gap={2}>
                        <LeftIcon className="font-20 font-w-500 cursor-pointer" onClick={cancel} />
                        <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.dataSource.title' })}</div>
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
                        <MyButton color="primary" variant="solid" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.dataSource.submit' })} onClick={submit}/>
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
});

export default observer(DataSource);

const MyDrawer = styled(Drawer)({
});
