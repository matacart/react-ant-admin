import { Flex } from "antd"
import styled from "styled-components"
import MySelect from "@/components/Select/MySelect";
import { settingType } from "@/store/settings/notification/noticeEmail";

function DiscountContentSelect({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {

    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            {/* <MySelect style={{width:"100%",height:"36px"}} value={data.value.value} /> */}
        </Scoped>
    )
}

export default DiscountContentSelect

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`
