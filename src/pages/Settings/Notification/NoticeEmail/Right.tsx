import noticeEmail, { SectionsType, SectionType, settingType } from "@/store/settings/notification/noticeEmail"
import { App, Flex } from "antd"
import { observer } from "mobx-react-lite";
import styled from "styled-components"
import Textarea from "./Content/Textarea";
import FontPickerComponent from "./Content/FontPickerComponent";
import ColorPickerItem from "./Content/ColorPickerItem";
import SwitchItem from "./Content/SwitchItem";
import RangeItem from "./Content/RangeItem";
import DiscountContentSelect from "./Content/DiscountContentSelect";
import TextAlignItem from "./Content/TextAlignItem";
import RadioItem from "./Content/RadioItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { SaveTempTemplate } from "@/services/y2/apiEmail";
import { debounce } from "lodash";
import LayoutItem from "./Content/LayoutItem";
import ThemeSetting from "./ThemeSetting";
import SectionHtmlEditor from "./Content/SectionHtmlEditor";
import VariableInputText from "./Content/VariableInputText";
import VariableImagePicker from "./Content/VariableImagePicker";
import VariableRichText from "./Content/VariableRichText";
import { useIntl } from "@umijs/max";
import { LeftIcon } from "@/components/Icons/Icons";

function Right() {

    const intl = useIntl();

    const { message } = App.useApp();

    const rightRef = useRef<HTMLDivElement>(null);

    // 当前选中的section
    const [activeSection, setActiveSection] = useState<SectionType | null>(null);

    const [componentSupportedVariables, setComponentSupportedVariables] = useState<any>({});

    // 保存到服务器 -- 延迟600ms
    const saveToServer = useCallback(debounce((sections:SectionsType) => {
        SaveTempTemplate({
            languages_id: noticeEmail.languagesId,
            user_languages_id: noticeEmail.useLanguagesId,
            oseid: noticeEmail.oseId,
            template_code: noticeEmail.templateCode,
            sections: JSON.stringify(sections),
            order: JSON.stringify(noticeEmail.order),
            dynamicOrder: JSON.stringify(noticeEmail.dynamicOrder),
            settingsData: JSON.stringify(noticeEmail.settings.settingsData),
        }).then(res => {
            if (res.code == 0) {
                // 更新最后保存时间戳
                noticeEmail.setLastSavedAt(Date.now());
            }
        }).catch(err => {
            // message.error(intl.formatMessage({ id: 'components.message.error' }));
        })
    }, 600), []);;

    const setSections = (id:string,value:any)=>{
        
        if (!noticeEmail.activeSectionID || !activeSection) return;  // 添加检查

        const newSettingsData = {
            ...activeSection.settingsData,
            settings:{
                ...activeSection.settingsData?.settings,
                [id]:{
                    ...activeSection.settingsData?.settings?.[id],
                    ...value,
                }
            }
        }

        const newActiveSection = {
            ...activeSection,
            settingsData:newSettingsData,
        }
        const newSections = {
            ...noticeEmail.sections,
            [noticeEmail.activeSectionID]:newActiveSection,
        }
        // 更新数据
        setActiveSection(newActiveSection);
        noticeEmail.setSections(newSections);
        // 执行保存操作 -- 成功则更到历史
        saveToServer({
            [noticeEmail.activeSectionID]:newActiveSection,
        });
    }

    useEffect(()=>{
        const section = noticeEmail.sections?.[noticeEmail.activeSectionID] || null;
        const presetSection = noticeEmail.templateConfig?.presetSection || [];
        if(presetSection.includes(noticeEmail.activeSectionID) && section?.type){
            const activeSectionType = (section?.type == 'theme' ? 'theme__dynamic_lang__' : section?.type);
            setComponentSupportedVariables(noticeEmail.templateConfig?.componentSupportedVariables?.[activeSectionType] || {});
        }else{
            setComponentSupportedVariables({});
        }
        setActiveSection(section);
    },[noticeEmail.activeSectionID]);


    return (
        <Scoped>
            {noticeEmail.activeSectionID ? <div className="right-content" ref={rightRef}>
                {noticeEmail.activeSectionID == "theme" ? <>
                    <Flex className="right-header" align="center" gap={8}>
                        <LeftIcon className="back" onClick={()=>noticeEmail.setActiveSectionID('')} />
                        <div className="font-20 font-w-500 color-242833">{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.themeSetting' })}</div>
                    </Flex>
                    <ThemeSetting/>
                </>:
                <>
                    <Flex className="right-header" align="center" gap={8}>
                        <LeftIcon className="back" onClick={()=>noticeEmail.setActiveSectionID('')} />
                        <div className="font-20 font-w-500 color-242833">{activeSection?.schema?.name || ""}</div>
                    </Flex>
                    <div className='warp'>
                        {activeSection?.schema?.settings?.map((item:settingType)=>{
                            switch(item.type){
                                case 'textarea':{
                                    const variables = componentSupportedVariables?.[item.id] || null;
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <Textarea key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} variables={variables} rightRef={rightRef} />
                                }
                                case 'richtext':{
                                    const variables = componentSupportedVariables?.[item.id] || null;
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <VariableRichText key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} variables={variables} rightRef={rightRef} />
                                }
                                case 'image_picker':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    const variables = componentSupportedVariables?.[item.id] || null;
                                    return <VariableImagePicker key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} variables={variables} rightRef={rightRef} />
                                }
                                case 'text':{
                                    const variables = componentSupportedVariables?.[item.id] || null;
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <VariableInputText key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} variables={variables} rightRef={rightRef} />
                                }
                                case 'pigeon_font_picker_component':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <FontPickerComponent key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} rightRef={rightRef} />
                                }
                                case 'color_picker':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <ColorPickerItem key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} />
                                }
                                case 'switch':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <SwitchItem key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} />
                                }
                                case 'range':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    const isHideScene = item?.hide_scene?.includes('matacartAdmin');
                                    return isHideScene ? null : <RangeItem key={item.id} setting={item} data={data} setSections={setSections} />
                                }
                                case 'discount_content_select':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <DiscountContentSelect key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} />
                                }
                                case 'text_align':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    const isHideScene = item?.hide_scene?.includes('matacartAdmin');
                                    return isHideScene ? null : <TextAlignItem key={item.id} setting={item} data={data} setSections={setSections} />
                                }
                                case 'layout':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    const isHideScene = item?.hide_scene?.includes('matacartAdmin');
                                    return isHideScene ? null : <LayoutItem key={item.id} setting={item} data={data} setSections={setSections} />
                                }
                                case 'radio':{
                                    const data = activeSection.settingsData?.settings?.[item.id] || "";
                                    return <RadioItem key={activeSection?.sectionId + item.id} setting={item} data={data} setSections={setSections} />
                                }

                                // 代码编辑
                                case 'section_html_editor':{
                                    return <SectionHtmlEditor key={item.id} setting={item} sectionId={activeSection?.sectionId} />
                                }

                                // data_source_select select
                                // default:
                                //     return null;
                            }
                        })}
                    </div>
                </>}
            </div> : <Flex className="empty font-14 color-7A8499" justify="center" align="center">{intl.formatMessage({ id: 'settings.notification.noticeEmail.right.empty' })}</Flex>}
            {/* content */}
        </Scoped>
    )
}
export default observer(Right);

const Scoped = styled.div`
    .right-content{
        width: 320px;
        position: absolute;
        left: 0;
        background-color: #eaedf1;
        padding: 0 12px;
        height: calc(100vh - 72px);
        .right-header{
            margin-bottom: 12px;
        }
        .warp{
            border-radius: 4px;
            background-color: #fff;
            padding: 12px;
            height: calc(100% - 44px);
            overflow-y: auto;
        }
        .footer{
            position: absolute;
            box-sizing: border-box;
            border-top: 1px solid #eaedf1;
            background-color: #fff;
            bottom: 0;
            width: calc(100% - 24px);
            height: 46px;
            display: flex;
            justify-content: flex-end;
            padding: 16px;
            align-items: center;
            z-index: 999;
        }
        .back{
            font-weight: 600;
            font-size: 24px;
        }
    }
    
    .empty{
        display: none;
        padding: 32px;
        background-color: #fff;
        height: 100%;
    }
    .ant-drawer{
        margin: 0 12px;
        width: 296px;
    }
    .my-drawer{
        .my-drawer-header{
            padding: 12px;
        }
        .my-drawer-content{
            padding: 0px;
        }
        .menu-box{
            padding: 0;
            height: calc(100% - 60px);
            overflow-y: auto;
            .menu-item{
                padding: 18px 16px;
                border-bottom: 1px solid #eef1f7;
                cursor: pointer;
                &:hover{
                    background-color: #f7f8fb;
                }
            }
        }
    }
    
    @media only screen and (min-width: 1600px) {
        .right-content{
            position: relative;
            .footer{
                display: none;
            }
        }
        .empty{
            margin: 0 12px;
            width: 320px;
            display: flex;
        }
        .back{
            display: none;
        }
    }

`