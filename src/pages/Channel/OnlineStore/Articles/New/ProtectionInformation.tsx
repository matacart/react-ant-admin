import { Card, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { QuestionCircleOutlined } from "@ant-design/icons"
import articles from "@/store/channel/website/articles";
import DefenseModal from "@/components/Modal/DefenseModal"
import { useState } from "react"


 function ProtectionInformation(){

    const setAdData = (status,adId,adUrl)=>{
        articles.setNewArticles({
            ...articles.newArticles,
            ad_waf_status: status,
            ad_article_id:adId,
            ad_article_url:adUrl
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">防护信息
                        <Tooltip title="用于广告优化">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                    <DefenseModal adStatus={articles.newArticles.ad_waf_status} adData={articles.newArticles} setAdData={setAdData}  />
                </div>
                <div className="item between">
                    <span>防护开关</span>
                    <Switch onChange={(e) => {
                            articles.setOldArticles({
                                ...articles.newArticles,
                                ad_waf_status: e ? '1' : '0'
                            })
                        }}
                        checked={articles.newArticles.ad_waf_status == '1'?true:false}
                    />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(ProtectionInformation)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
.item{
        /* margin-bottom: 10px; */
        margin-top: 12px;
}
.between{
    display: flex;
    justify-content: space-between;
}
a{
    font-weight: 400;
}
`
