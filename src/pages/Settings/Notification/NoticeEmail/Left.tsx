import styled from "styled-components"
import { Flex } from "antd";
import noticeEmail from "@/store/settings/notification/noticeEmail";
import Theme from "./Theme";
import { observer } from "mobx-react-lite";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableSection from "./SortableSection";
import { SaveTempTemplate } from "@/services/y2/apiEmail";
import { RightIcon } from "@/components/Icons/Icons";
import { useIntl } from "@umijs/max";


function Left() {

    const intl = useIntl();

    // 拖拽结束事件
    const handleDragEnd = (event:DragEndEvent) => {
        const { active, over } = event;
        // 排除原地拖拽的情况
        if (over?.id && (active.id !== over.id)) {
            const oldIndex = noticeEmail.dynamicOrder.indexOf(active.id as string);
            const newIndex = noticeEmail.dynamicOrder.indexOf(over.id as string);
            if(oldIndex !== -1 && newIndex !== -1){
                const newOrder = arrayMove(noticeEmail.dynamicOrder, oldIndex, newIndex);
                noticeEmail.setDynamicOrder(newOrder);
                tempSave(newOrder);
            }
        }
    }

    // 临时保存数据
    const tempSave = (newOrder:string[],sections?:any)=>{
        SaveTempTemplate({
            template_code:noticeEmail.templateCode,
            languages_id:noticeEmail.languagesId,
            user_languages_id:noticeEmail.useLanguagesId,
            oseid:noticeEmail.oseId,
            order:JSON.stringify(noticeEmail.order),
            dynamicOrder:JSON.stringify(newOrder),
            sections:sections ? JSON.stringify(sections) : '',
            settingsData:JSON.stringify(noticeEmail.settings?.settingsData),
        }).then(res=>{
            if(res.code == 0){
                // console.log(res);
            }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
        })
    }

    
    return (
        <Scoped>
            <div className='menu'>
                {noticeEmail.order.map(order=>{
                    const section = noticeEmail.sections[order];
                    if(section && (section.type === 'theme')){
                        return <Theme key={section.sectionId} section={section} />
                    }else{
                        // 可拖拽的SECTIONLIST
                        return (
                            <DndContext key="dnd-context" onDragEnd={handleDragEnd}>
                                <SortableContext items={noticeEmail.dynamicOrder} strategy={verticalListSortingStrategy}>
                                    {noticeEmail.dynamicOrder.map(dynamicOrder=>{
                                        const dynamicSection = noticeEmail.sections[dynamicOrder];
                                        return <SortableSection key={dynamicSection.sectionId} tempSave={tempSave} section={dynamicSection} />
                                    })}
                                </SortableContext>
                            </DndContext>
                        )
                        
                    }
                })}
            </div>
            <div className="footer">
                <Flex className="font-14 color-242833 item" justify="space-between">
                    <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.left.resetTemplate' })}</div>
                </Flex>
                <Flex className="font-14 color-242833 item" justify="space-between" onClick={()=>noticeEmail.setActiveSectionID("theme")}>
                    <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.left.themeSetting' })}</div>
                    <RightIcon className="font-20" />
                </Flex>
            </div>
        </Scoped>
    )
}
export default observer(Left)

const Scoped = styled.div`
    width: 320px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    .menu{
        margin: 0 12px 12px 12px;
        .item{
            height: 60px;
        }
    }
    .menu div {
        padding: 0 12px;
    }
    .footer{
        margin-bottom: 8px;
        width: 100%;
        border-top: 1px solid #d7dbe7;
        .item{
            padding: 12px 16px;
            cursor: pointer;
            &:hover{
                background-color: #f5f8fc;
            }
        }
    }
`