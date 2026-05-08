import MyButton from "@/components/Button/MyButton"
import MyDropdown from "@/components/Dropdown/MyDropdown"
import { DownIcon, EditorTextImgIcon } from "@/components/Icons/Icons"
import noticeEmail, { settingType } from "@/store/settings/notification/noticeEmail"
import { Drawer, Flex } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import ImagePickerDataSource from "./ImagePickerDataSource"
import ImagePicker from "./ImagePicker"
import { useIntl } from "@umijs/max"

// 判断是否是动态源
const isDynamicSource = (url: string) => {
    const regex = /^\{\{metafields\..+\}\}$/;
    return regex.test(url);
};

function VariableImagePicker({setting,data,setSections,variables,rightRef}:{
    setting:settingType,data:any,setSections:(id:string,value:any)=>void,variables:any,rightRef:any
}) {

    const intl = useIntl();

    const [value,setValue] = useState<any>({});

    const usableVariable = noticeEmail.templateConfig?.usableVariable || [];

    // 设置动态源
    const setUrl = (key:string)=>{
        setValue({
            url:`{{metafields.${key}}}`,
        })
        setSections(setting.id,{
            ...data,
            value:{
                url:`{{metafields.${key}}}`,
            }
        });
    }

    // 删除图片
    const deleteUrl = ()=>{
        setValue({
            url:"",
        });
        setSections(setting.id,{
            ...data,
            value:{
                url:"",
            }
        });
    }
    // 图片选择器
    const imagePickerRef = useRef<any>(null);
    // 更换图片
    const setStaticImg = ()=>{
        if(imagePickerRef.current){
            imagePickerRef.current.changeImg();
        }
    }
    // 设置静态文件
    const setStaticUrl = (url:string)=>{
        setValue({
            url:url,
        })
        setSections(setting.id,{
            ...data,
            value:{
                url:url,
            }
        });
    }

    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);

    return (
        <Scoped>
            <div className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
                <div className="font-12 color-7A8499 desc" >{ intl.formatMessage({ id: 'settings.notification.noticeEmail.right.variableImagePicker.desc' })}</div>
            </div>
            <div>
                {/* 动态源格式 */}
                {isDynamicSource(value?.url || "") && <div className="content">
                    <Flex align="center" gap={8}>
                        <Flex className="icon-box">
                            <EditorTextImgIcon className="font-20" />
                        </Flex>
                        <div>
                            <div className="font-12 color-7A8499" style={{marginBottom:4}}>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.variableImagePicker.title' })}</div>
                            <div className="font-14 color-242833">{ usableVariable.find((item:any)=>`{{metafields.${item.key}}}` === value?.url)?.name || "" }</div>
                        </div>
                    </Flex>
                    <Flex className="btn-box" gap={12}>
                        <MyDropdown
                            tiggerEle={<MyButton className="btn" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.variableImagePicker.replace' })} icon={<DownIcon />} iconPosition="end" />}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <ImagePickerDataSource url={value?.url || ""} setUrl={setUrl} variables={variables} rightRef={rightRef} />
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <span onClick={setStaticImg}>{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.variableImagePicker.replaceImg' })}</span>
                                        )
                                    }
                                ]
                            }}
                        />
                        <MyButton className="btn" text={intl.formatMessage({ id: 'settings.notification.noticeEmail.right.variableImagePicker.delete' })} onClick={deleteUrl} />
                    </Flex>
                </div>}
                <ImagePicker 
                    ref={imagePickerRef} 
                    url={value?.url || ""} 
                    setStaticUrl={setStaticUrl} 
                    setUrl={setUrl} 
                    deleteUrl={deleteUrl} 
                    variables={variables} 
                    rightRef={rightRef} 
                    style={{ display: isDynamicSource(value?.url || "") ? 'none' : 'block' }}
                />
                
            </div>
        </Scoped>
    )
}

export default VariableImagePicker

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
        .desc{
            margin-top: 6px;
        }
    }
    .content{
        padding: 16px;
        border-radius: 4px;
        background: #f7f8fb;
        .icon-box{
            width: 36px;
            height: 36px;
            border: 1px solid #b8becc;
            border-radius: 2px;
            align-items: center;
            justify-content: center;
        }
        .btn-box{
            margin-top: 10px;
            .btn{
                height: 36px;
                flex:1;
            }
        }
    }
`

const MyDrawer = styled(Drawer)({
});
