import DefaultButton from "@/components/Button/DefaultButton"
import { SettingsTaxIcon } from "@/components/Icons/Icons"
import { history } from "@umijs/max"
import { Card, Flex } from "antd"
import styled from "styled-components"

function DomainConfig() {
    return (
        <MyCard>
            <div className='font-w-500'>店铺设置</div>
            <div className='font-12 color-7A8499'>管理影响你的整个商店的国际设置</div>
            <div>
                <Flex className='item' justify='space-between' align='center'>
                    <Flex align='center'>
                        <Flex className='item-img-box' align='center' justify='center'>
                            <SettingsTaxIcon />
                        </Flex>
                        <Flex justify='center' gap={8} vertical>
                            <div className='font-w-500'>{"税费"}</div>
                            <div className='font-12 color-474F5E'>{"收税"}</div>
                        </Flex>
                    </Flex>
                    <DefaultButton text='编辑' onClick={() => history.push(`/settings/taxes`)} />
                </Flex>
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .item{
        padding: 20px 0px;
        border-bottom: 1px solid #E5E5E5;
        .item-img-box{
            width: 60px;
            height: 60px;
            border-radius: 4px;
            margin-right: 8px;
            background-color: #F7F8FB;
        }
    }
`

export default DomainConfig


