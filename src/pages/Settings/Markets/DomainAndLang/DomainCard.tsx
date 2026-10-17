import DefaultButton from "@/components/Button/DefaultButton";
import { CheckIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import SuccessTag from "@/components/Tag/SuccessTag";
import domainAndLang from "@/store/settings/markets/domainAndLang";
import { history } from "@umijs/max";
import { Card, Flex, Radio } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

function DomainCard() {

    const selectConfigType = (type: number) => {
        domainAndLang.setOtherInfo({
            ...domainAndLang.otherInfo,
            configType: type,
        })
    }
    
    return (
        <MyCard>
            {domainAndLang.otherInfo.marketType == 1 && <>
                <div className="font-w-500">市场域名</div>
                <Flex gap={4} align="center" className="domain-item" justify="space-between">
                    <span>{domainAndLang.otherInfo.mainDomain}（店铺主域名）</span>
                    <DefaultButton text="编辑" onClick={()=>history.push('/settings/domain')} />
                </Flex>
            </>}
            {domainAndLang.otherInfo.marketType == 2 && <>
                <div className="font-w-500">市场域名</div>
                <div className="desc font-12">将根据客户访问的域名自动显示对应语言，以便为此市场提供本地化体验</div>
                <Flex gap={12} align="stretch" className="domain-item" justify="space-between">
                    <div className={domainAndLang.otherInfo.configType == 1 ? 'item cursor-pointer active' : 'item cursor-pointer'} onClick={()=>selectConfigType(1)}>
                        <div className="font-w-500">使用主域名，并与主要市场语言一致</div>
                        <div>主域名：{domainAndLang.otherInfo.mainDomain}</div>
                        {domainAndLang.otherInfo.configType == 1 && <CheckIcon className="check-icon" />}
                    </div>
                    <div className={domainAndLang.otherInfo.configType !== 1 ? 'item cursor-pointer active' : 'item cursor-pointer'} onClick={()=>selectConfigType(3)}>
                        <div className="font-w-500">个性化域名，并配置市场专属语言</div>
                        <div>使用子文件夹或子域名来区分语言版本，有利于SEO</div>
                        {domainAndLang.otherInfo.configType !== 1 && <CheckIcon className="check-icon" />}
                    </div>
                </Flex>
                {domainAndLang.otherInfo.configType !== 1 && <div className="radio-box">
                    <Radio.Group 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                        }}
                        value={domainAndLang.otherInfo.configType} 
                        onChange={(e)=>selectConfigType(e.target.value)}
                    >
                        <div style={{width: '100%'}}>
                            <Radio value={3}>
                                <Flex align="center" gap={8}>
                                    <span className="font-w-500">子文件夹</span>
                                    <SuccessTag text="推荐" />
                                </Flex>
                            </Radio>
                            <div style={{marginLeft:"26px",marginTop:"8px"}}>
                                <div className="font-12 color-7A8499" style={{marginBottom: "8px"}} >在主域名下添加一个后缀作为市场域名</div>
                                <MyInput 
                                    prefix={domainAndLang.otherInfo.mainDomain+'/'} 
                                    style={{width: '100%', height: "36px"}}
                                    value={domainAndLang.otherInfo.configValue??""}
                                    onChange={(e:any)=>domainAndLang.setOtherInfo({...domainAndLang.otherInfo,configValue: e.target.value})}
                                />
                            </div>
                        </div>
                        <Radio value={2} disabled>子域名</Radio>
                    </Radio.Group>
                </div>}
            </>}
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .domain-item{
        margin-top: 12px;
        .item{
            position: relative;
            flex: 1;
            padding: 12px 20px;
            border: 1px solid #d7dbe7;
            border-radius: 4px;
            .check-icon{
                position: absolute;
                top: 0;
                left: 0;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                background-color: #356dff;
                border-bottom-right-radius: 2px;
                border-top-left-radius: 2px;
                color: #fff;
            }
        }
        .active{
            border: 2px solid #356dff;
        }
    }
    .radio-box{
        margin-top: 12px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        padding: 20px 20px;
    }
    .desc{
    }
`

export default observer(DomainCard)
