import { EditorTextImgIcon, HideIcon, PreviewIcon } from "@/components/Icons/Icons"
import noticeEmail, { SectionType } from "@/store/settings/notification/noticeEmail"
import { HolderOutlined } from "@ant-design/icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities" 
import { Flex } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

function SortableSection({tempSave,section}:{tempSave:(newOrder:string[],sections?:any)=>void,section:SectionType}) {

    const {
        attributes, // 绑定到元素上的 HTML 属性（如 role 、 tabIndex 等），用于无障碍访问和拖拽状态标识
        listeners, // 拖拽事件监听器（如 onMouseDown 、 onTouchStart ），绑定到拖拽手柄上
        setNodeRef, // 用于获取元素引用的函数，必须绑定到元素的 ref 属性，让 @dnd-kit 能识别拖拽目标
        transform, // 拖拽元素的变换矩阵（如 translate、rotate 等），用于实现拖拽效果
        transition, // 拖拽元素的过渡效果（如 transition ），用于平滑拖拽过程
        isDragging, // 当前元素是否正在被拖拽的状态标志
    } = useSortable({ id: section.sectionId });


    // 拖拽元素的样式
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...(isDragging ? { opacity: 0.5 } : {}),
    };


    return (
        <Scoped 
            ref={setNodeRef}
            style={style} 
            {...attributes}
            className={noticeEmail.activeSectionID === section.sectionId ? 'active' : ''} 
            onClick={()=>noticeEmail.setActiveSectionID(section.sectionId)}
        >
            <Flex className={section.disabled ? "icon-box opacity-3" : "icon-box"}>
                <EditorTextImgIcon className="font-20" />
            </Flex>
            <Flex style={{padding:"0px"}} className="content" justify="space-between" align="center">
                <div className={section.disabled ? "opacity-3 font-14 color-242833" : "font-14 color-242833"}>{section.schema.name}</div>
                <Flex className="operator-box">
                    {/* section.disabled */}
                    {section.disabled ? <Flex className="operator" justify="center" align="center" onClick={async (e)=>{
                        e.stopPropagation();
                        await noticeEmail.setSections({
                            ...noticeEmail.sections,
                            [section.sectionId]:{
                                ...section,
                                disabled:false,
                            },
                        });
                        tempSave(noticeEmail.dynamicOrder,noticeEmail.sections);
                    }}>
                        <HideIcon className="font-14" />
                    </Flex> : <Flex className="operator" justify="center" align="center" onClick={async (e)=>{
                        e.stopPropagation();
                        await noticeEmail.setSections({
                            ...noticeEmail.sections,
                            [section.sectionId]:{
                                ...section,
                                disabled:true,
                            },
                        });
                        tempSave(noticeEmail.dynamicOrder,noticeEmail.sections);
                    }}>
                        <PreviewIcon className="font-14" />
                    </Flex>}
                    <Flex className="operator drag-handle" justify="center" align="center" {...listeners}>
                        <HolderOutlined className="font-14" />
                    </Flex>
                </Flex>
            </Flex>
        </Scoped>
    )
}

export default observer(SortableSection)


const Scoped = styled.div`
    height: 60px;
    cursor: pointer;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 8px;
    position: relative;
    &:hover{
        background: #f7f8fb;
        .content .operator-box{
            display: flex;
        }
    }
    &.active:before{
        background: url('/images/icons/active-item.svg');
        content: "";
        height: 40px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
    }
    
    .icon-box{
        width: 36px;
        height: 36px;
        border: 1px solid #b8becc;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
    }
    .content{
        flex: 1;
        height: 100%;
        .operator-box{
            padding: 0px;
            display: none;
        }
        .operator{
            width: 24px;
            height: 24px;
            border-radius: 2px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover{
                background: #eaedf1;
            }
        }
    }

    .opacity-3{
        opacity: 0.3;
    }

`