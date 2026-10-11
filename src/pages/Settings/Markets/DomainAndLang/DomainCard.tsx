import DefaultButton from "@/components/Button/DefaultButton";
import domainAndLang from "@/store/settings/markets/domainAndLang";
import { history } from "@umijs/max";
import { Card, Flex } from "antd";
import styled from "styled-components";

function DomainCard() {
    return (
        <MyCard>
            <>
                <div className="font-w-500">市场域名</div>
                <Flex gap={4} align="center" className="domain-item" justify="space-between">
                    <span>{domainAndLang.otherInfo.mainDomain}（店铺主域名）</span>
                    <DefaultButton text="编辑" onClick={()=>history.push('/settings/domain')} />
                </Flex>
            </>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .domain-item{
        /* margin-top: 12px; */
    }
`

export default DomainCard