import { App, Collapse, ConfigProvider, Flex } from "antd"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { CaretRightOutlined } from "@ant-design/icons"
import { useCallback, useEffect, useRef, useState } from "react";
import noticeEmail from "@/store/settings/notification/noticeEmail";
import FontPickerComponent from "./Content/FontPickerComponent";
import ColorPickerItem from "./Content/ColorPickerItem";
import PageMarginsPickerItem from "./Content/PageMarginsPickerItem";
import InputText from "./Content/InputText";
import { debounce } from "lodash";
import { SaveTempTemplate } from "@/services/y2/apiEmail";
import Textarea from "./Content/Textarea";
import ImagePicker from "./Settings/ImagePicker";
import { useIntl } from "@umijs/max";



function ThemeSetting() {

    const intl = useIntl();

    const [options,setOptions] = useState([]);

    const rightRef = useRef<any>(null);

    const { message } = App.useApp();

    // 保存到服务器 -- 延迟600ms
    const saveToServer = useCallback(debounce((settingsData:any) => {
        SaveTempTemplate({
            languages_id: noticeEmail.languagesId,
            user_languages_id: noticeEmail.useLanguagesId,
            oseid: noticeEmail.oseId,
            template_code: noticeEmail.templateCode,
            order: JSON.stringify(noticeEmail.order),
            dynamicOrder: JSON.stringify(noticeEmail.dynamicOrder),
            // sections: JSON.stringify(noticeEmail.sections),
            settingsData: JSON.stringify(settingsData),
        }).then(res => {
            if (res.code == 0) {
                // console.log(res)
            }
        }).catch(err => {
            message.error(intl.formatMessage({ id: 'components.message.error' }));
        })
    }, 600), []);;

    const setSections = (id:string,value:any) => {
        console.log(id,value)
        const currentSettings = noticeEmail.settings;
        console.log(currentSettings.settingsData)
        const newSettings = {
            ...currentSettings,
            settingsData:{
                ...currentSettings.settingsData,
                [id]:value
            }
        };
        // 更新数据
        noticeEmail.setSettings(newSettings);
        console.log(newSettings)
        // 执行保存操作 -- 成功则更到历史
        saveToServer(newSettings?.settingsData || {});
    }

    const content = (setting:any) => {
        return setting?.map((item:any)=>{
            switch(item.type){
                case 'pigeon_font_picker':{
                    const data = noticeEmail.settings?.settingsData?.[item.id] || "";
                    return <FontPickerComponent key={item.id} setting={item} data={data} setSections={setSections} rightRef={rightRef} />
                }
                case 'color_picker':{
                    const data = noticeEmail.settings?.settingsData?.[item.id] || "";
                    return <ColorPickerItem key={item.id} setting={item} data={data} setSections={setSections} />
                }
                case 'page_margins_picker':{
                    const data = noticeEmail.settings?.settingsData?.[item.id] || "";
                    return <PageMarginsPickerItem key={item.id} setting={item} data={data} setSections={setSections} />
                }
                case 'textarea':{
                    const data = noticeEmail.settings?.settingsData?.[item.id] || "";
                    return <Textarea key={item.id} setting={item} data={data} setSections={setSections} />
                }
                case 'text':{
                    const data = noticeEmail.settings?.settingsData?.[item.id] || "";
                    return <InputText key={item.id} setting={item} data={data} setSections={setSections} />
                }
                case 'image_picker':{
                    const data = noticeEmail.settings?.settingsData?.[item.id] || "";
                    return <ImagePicker key={item.id} setting={item} data={data} setSections={setSections} rightRef={rightRef} />
                }
            }
        })
    }

    useEffect(()=>{
        const newOptions = noticeEmail.settings?.schema.map((setting:any,index:number)=>{
            return {
                key:index,
                label:setting.name,
                children:content(setting.settings),
                style:{
                    borderBottom: "1px solid #eef1f7",
                },
                styles: {
                    header: {
                        padding:"18px 16px",
                    },
                    body: {
                        padding:"16px",
                        boxShadow: "inset 0 -4px 2px #0000000f, inset 0 4px 2px #0000000f",
                    }
                }
            }
        })
        setOptions(newOptions);
    },[noticeEmail.settings]);


    return (
        <Scoped ref={rightRef}>
            <Flex className="right-header">
                <div className="font-20 font-w-500 color-242833">{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.themeSetting' })}</div>
            </Flex>
            <div className='right-warp'>
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadiusLG:0,
                        }
                    }}
                >
                    <Collapse
                        bordered={false}
                        expandIconPosition="end"
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? -90 : 90} />}
                        style={{ background: '#FFFFFF' }}
                        items={options}
                    />
                </ConfigProvider>
            </div>
        </Scoped>
    )
}

export default observer(ThemeSetting)


const Scoped = styled.div`
    height: 100%;
    .right-header{
        margin-bottom: 12px;
    }
    .right-warp{
        border-radius: 4px;
        padding: 0px;
        max-height: calc(100% - 43px);
        overflow-y: auto;
    }
`