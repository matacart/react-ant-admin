import { EditorTextImgIcon } from "@/components/Icons/Icons"
import { Flex } from "antd"
import styled from "styled-components"
import noticeEmail, { SectionType } from "@/store/settings/notification/noticeEmail"
import { observer } from "mobx-react-lite"

function Theme({section}:{section:SectionType}) {
    return (
        <Scoped className={noticeEmail.activeSectionID === section.sectionId ? 'active' : ''} onClick={()=>noticeEmail.setActiveSectionID(section.sectionId)}>
            <Flex className="icon-box">
                <EditorTextImgIcon className="font-20" />
            </Flex>
            <div className="font-14 color-242833">{section.schema.name}</div>
        </Scoped>
    )
}

export default observer(Theme)


const Scoped = styled.div`
    height: 60px;
    cursor: pointer;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 8px;
    margin-bottom: 12px;
    position: relative;
    &:hover{
        background: #f7f8fb;
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

`